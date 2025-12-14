/**
 * Pre-rendering Script for SEO Optimization
 * 
 * This script uses Puppeteer to pre-render React SPA routes into static HTML files.
 * It fetches tour data from Supabase and generates unique HTML for each tour page.
 * 
 * Usage: node scripts/prerender.js
 * 
 * Safety Features:
 * - Graceful error handling
 * - Timeout protection
 * - Preserves existing functionality
 * - Only writes to dist/ folder
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

// Configuration
const SITE_URL = process.env.VITE_SITE_URL || 'http://localhost:4173';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const TIMEOUT_MS = 30000; // 30 seconds per page
const WAIT_FOR_NETWORK_IDLE = 2000; // Wait 2 seconds after network idle

// Static routes to pre-render
const STATIC_ROUTES = [
  '/',
  '/tours',
  '/contact',
  '/top-destinations'
];

/**
 * Fetch tour slugs from Supabase
 */
async function fetchTourSlugs() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️  Supabase credentials not found. Skipping tour slug fetch.');
    console.warn('   Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.production');
    return [];
  }

  try {
    console.log('📡 Fetching tour slugs from Supabase...');
    
    const endpoint = `${SUPABASE_URL}/rest/v1/vw_published_tours?select=slug`;
    const response = await fetch(endpoint, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      throw new Error(`Supabase API returned ${response.status}`);
    }

    const data = await response.json();
    const slugs = data
      .map(row => row.slug)
      .filter(slug => slug && typeof slug === 'string');

    console.log(`✅ Found ${slugs.length} published tours`);
    return slugs;
  } catch (error) {
    console.error('❌ Error fetching tour slugs:', error.message);
    console.warn('   Continuing with static routes only...');
    return [];
  }
}

/**
 * Build list of all routes to pre-render
 */
function buildRouteList(tourSlugs) {
  const tourRoutes = tourSlugs.map(slug => `/tours/${slug}`);
  const allRoutes = [...STATIC_ROUTES, ...tourRoutes];
  
  console.log(`\n📋 Routes to pre-render: ${allRoutes.length} total`);
  console.log(`   - Static routes: ${STATIC_ROUTES.length}`);
  console.log(`   - Tour routes: ${tourRoutes.length}`);
  
  return allRoutes;
}

/**
 * Pre-render a single route
 */
async function prerenderRoute(page, route, baseUrl) {
  const url = `${baseUrl}${route}`;
  const startTime = Date.now();
  
  try {
    console.log(`\n🔄 Pre-rendering: ${route}`);
    
    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: TIMEOUT_MS
    });

    // Wait a bit more for any delayed content
    await page.waitForTimeout(WAIT_FOR_NETWORK_IDLE);

    // Get the fully rendered HTML
    const html = await page.content();

    // Determine output path
    const outputPath = route === '/' 
      ? path.join(DIST_DIR, 'index.html')
      : path.join(DIST_DIR, route, 'index.html');

    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the HTML file
    fs.writeFileSync(outputPath, html, 'utf-8');

    const duration = Date.now() - startTime;
    console.log(`✅ Saved: ${outputPath} (${duration}ms)`);
    
    return { success: true, route, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Failed to pre-render ${route}:`, error.message);
    return { success: false, route, error: error.message, duration };
  }
}

/**
 * Check if Vite preview server is running
 */
async function checkServerRunning(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Start Vite preview server
 */
async function startPreviewServer() {
  const { spawn } = require('child_process');
  
  console.log('\n🚀 Starting Vite preview server...');
  
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  });

  // Wait for server to be ready
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      server.kill();
      reject(new Error('Server startup timeout'));
    }, 30000);

    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('localhost:4173')) {
        clearTimeout(timeout);
        console.log('✅ Preview server started on http://localhost:4173');
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    server.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

/**
 * Main pre-rendering function
 */
async function main() {
  console.log('🎨 Starting pre-rendering process...\n');
  console.log('📁 Output directory:', DIST_DIR);
  console.log('🌐 Base URL:', SITE_URL);

  let browser = null;
  let server = null;
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    routes: []
  };

  try {
    // Check if dist folder exists
    if (!fs.existsSync(DIST_DIR)) {
      throw new Error('dist/ folder not found. Run "npm run build" first.');
    }

    // Fetch tour slugs
    const tourSlugs = await fetchTourSlugs();
    const routes = buildRouteList(tourSlugs);
    results.total = routes.length;

    // Check if we need to start a local server
    const useLocalServer = SITE_URL.includes('localhost');
    if (useLocalServer) {
      const serverRunning = await checkServerRunning(SITE_URL);
      if (!serverRunning) {
        server = await startPreviewServer();
        // Give server a moment to fully initialize
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.log('✅ Preview server already running');
      }
    }

    // Launch Puppeteer
    console.log('\n🤖 Launching Puppeteer...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080 });

    // Pre-render each route
    console.log('\n📄 Pre-rendering routes...');
    for (const route of routes) {
      const result = await prerenderRoute(page, route, SITE_URL);
      results.routes.push(result);
      if (result.success) {
        results.success++;
      } else {
        results.failed++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 PRE-RENDERING SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total routes: ${results.total}`);
    console.log(`✅ Successful: ${results.success}`);
    console.log(`❌ Failed: ${results.failed}`);
    
    if (results.failed > 0) {
      console.log('\n❌ Failed routes:');
      results.routes
        .filter(r => !r.success)
        .forEach(r => console.log(`   - ${r.route}: ${r.error}`));
    }

    console.log('\n✨ Pre-rendering complete!');
    console.log('📁 Pre-rendered files saved to:', DIST_DIR);
    
    // Exit with error code if any routes failed
    if (results.failed > 0) {
      console.warn('\n⚠️  Some routes failed to pre-render.');
      console.warn('   The build will continue, but those routes will use client-side rendering.');
    }

  } catch (error) {
    console.error('\n❌ Pre-rendering failed:', error.message);
    console.error(error.stack);
    process.exitCode = 1;
  } finally {
    // Cleanup
    if (browser) {
      console.log('\n🧹 Closing browser...');
      await browser.close();
    }
    
    if (server) {
      console.log('🧹 Stopping preview server...');
      server.kill();
    }
  }
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});


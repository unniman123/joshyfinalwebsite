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
const SKIP_PRERENDER = process.env.SKIP_PRERENDER === 'true';

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
async function checkServerRunning(url, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (response.ok) {
        console.log(`✅ Server is responding at ${url}`);
        return true;
      }
    } catch (error) {
      if (i < maxRetries - 1) {
        console.log(`   Retry ${i + 1}/${maxRetries - 1}...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  return false;
}

/**
 * Start Vite preview server
 */
async function startPreviewServer() {
  const { spawn } = require('child_process');
  
  console.log('\n🚀 Starting Vite preview server...');
  
  // Use npm run preview instead of npx for Windows compatibility
  const isWindows = process.platform === 'win32';
  const command = isWindows ? 'npm.cmd' : 'npm';
  const args = ['run', 'preview'];
  
  const server = spawn(command, args, {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe',
    shell: isWindows,
    env: { ...process.env, FORCE_COLOR: '0' }
  });

  // Wait for server to be ready
  return new Promise((resolve, reject) => {
    let serverStarted = false;
    const timeout = setTimeout(() => {
      if (!serverStarted) {
        console.warn('⚠️  Server startup timeout - attempting to continue anyway...');
        // Don't kill the server, just resolve
        serverStarted = true;
        resolve(server);
      }
    }, 15000); // Reduced to 15 seconds

    // Listen to both stdout and stderr
    const checkOutput = (data) => {
      const output = data.toString();
      // Log all output for debugging
      if (output.trim()) {
        console.log('   Server:', output.trim());
      }
      
      // Check for various success patterns
      if (!serverStarted && (
        output.includes('Local:') || 
        output.includes('localhost:4173') ||
        output.includes('localhost') ||
        output.includes('preview server') ||
        output.includes('http://') ||
        output.match(/:\d{4}/)
      )) {
        serverStarted = true;
        clearTimeout(timeout);
        console.log('✅ Preview server detected as running');
        // Give it a moment to fully initialize
        setTimeout(() => resolve(server), 2000);
      }
    };

    server.stdout.on('data', checkOutput);
    server.stderr.on('data', checkOutput);

    server.on('error', (error) => {
      if (!serverStarted) {
        clearTimeout(timeout);
        reject(error);
      }
    });

    server.on('exit', (code) => {
      if (!serverStarted && code !== 0) {
        clearTimeout(timeout);
        reject(new Error(`Server exited with code ${code}`));
      }
    });
  });
}

/**
 * Main pre-rendering function
 */
async function main() {
  // Check if pre-rendering should be skipped
  if (SKIP_PRERENDER) {
    console.log('⏭️  Pre-rendering skipped (SKIP_PRERENDER=true)');
    console.log('   Your site will use client-side rendering.');
    return;
  }

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
      console.log('\n🔍 Checking if preview server is running...');
      let serverRunning = await checkServerRunning(SITE_URL);
      
      if (!serverRunning) {
        try {
          server = await startPreviewServer();
          // Verify server is actually responding
          console.log('\n🔍 Verifying server is responding...');
          serverRunning = await checkServerRunning(SITE_URL);
          
          if (!serverRunning) {
            throw new Error('Server started but not responding to requests');
          }
        } catch (serverError) {
          console.error('❌ Failed to start preview server:', serverError.message);
          console.warn('⚠️  Skipping pre-rendering. Build will continue.');
          console.warn('   To enable pre-rendering, manually run: npm run preview');
          console.warn('   Then in another terminal: node scripts/prerender.cjs');
          return; // Exit gracefully without pre-rendering
        }
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
    console.warn('\n⚠️  Build will continue without pre-rendering.');
    console.warn('   Your site will still work with client-side rendering.');
    // Don't fail the build - set exit code to 0
    process.exitCode = 0;
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


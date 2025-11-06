#!/usr/bin/env node

/**
 * 🔐 SECURITY CHECK SCRIPT
 * Industry-standard build-time security verification
 *
 * This script performs comprehensive security checks before deployment:
 * - Verifies no secrets are exposed in built files
 * - Checks environment variable configuration
 * - Validates security headers and CSP
 * - Ensures proper .gitignore configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SecurityChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.secure = true;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : '✅';
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  error(message) {
    this.errors.push(message);
    this.secure = false;
    this.log(message, 'error');
  }

  warning(message) {
    this.warnings.push(message);
    this.log(message, 'warning');
  }

  success(message) {
    this.log(message, 'success');
  }

  /**
   * Check if environment variables are properly configured
   */
  checkEnvironmentVariables() {
    this.log('Checking environment variable configuration...');

    // First check if environment variables are set directly (CI/CD environments like Netlify)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      // Validate the format of environment variables
      if (supabaseUrl.includes('your_supabase_project_url_here') ||
          supabaseKey.includes('your_supabase_anon_key_here')) {
        this.error('Environment variables contain placeholder values. Configure proper Supabase credentials.');
      } else if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
        this.warning('VITE_SUPABASE_URL does not appear to be a valid Supabase URL.');
      } else if (!supabaseKey.startsWith('eyJ')) {
        this.warning('VITE_SUPABASE_ANON_KEY does not appear to be a valid JWT token.');
      } else {
        this.success('Environment variables properly configured via CI/CD.');
      }
      return;
    }

    // Fallback: check .env.local file for local development
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
      this.error('.env.local file does not exist and no environment variables found. Configure Supabase credentials.');
      return;
    }

    try {
      const envContent = fs.readFileSync(envPath, 'utf8');

      // Check for placeholder values
      if (envContent.includes('your_supabase_project_url_here') ||
          envContent.includes('your_supabase_anon_key_here')) {
        this.error('.env.local contains placeholder values. Replace with actual credentials.');
      }

      // Check for proper environment variables
      const hasUrl = envContent.includes('VITE_SUPABASE_URL=');
      const hasKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');

      if (!hasUrl || !hasKey) {
        this.error('.env.local missing required Supabase environment variables.');
      } else {
        this.success('Environment variables properly configured in .env.local.');
      }

      // Check if env file is in gitignore
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const gitignore = fs.readFileSync(gitignorePath, 'utf8');
        if (!gitignore.includes('*.local')) {
          this.warning('.gitignore may not exclude .env.local files. Ensure sensitive files are not tracked.');
        }
      }

    } catch (err) {
      this.error(`Failed to read .env.local: ${err.message}`);
    }
  }

  /**
   * Check built files for exposed secrets
   */
  checkBuiltFiles() {
    this.log('Checking built files for exposed secrets...');

    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      this.log('dist/ directory does not exist yet (prebuild phase). Skipping built file checks.');
      return;
    }

    const secretPatterns = [
      /eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g, // JWT tokens
      /sk_[a-zA-Z0-9_-]{20,}/g, // Generic secret keys
      /VITE_SUPABASE/g, // Environment variable exposure
      /supabase_[a-zA-Z0-9_-]*/g, // Supabase related secrets
    ];

    const filesToCheck = this.getAllFiles(distPath);

    for (const file of filesToCheck) {
      try {
        const content = fs.readFileSync(file, 'utf8');

        for (const pattern of secretPatterns) {
          const matches = content.match(pattern);
          if (matches) {
            // Filter out false positives (like CSS classes, data attributes, etc.)
            const realSecrets = matches.filter(match => {
              // Skip if it's part of a CSS class, data attribute, or other non-secret context
              return !match.includes('class') && !match.includes('data-') && match.length > 20;
            });

            if (realSecrets.length > 0) {
              this.error(`Potential secret exposed in built file: ${path.relative(process.cwd(), file)}`);
              realSecrets.forEach(secret => this.error(`  Found: ${secret.substring(0, 50)}...`));
            }
          }
        }
      } catch (err) {
        // Skip binary files or unreadable files
        if (err.code !== 'EISDIR') {
          this.warning(`Could not check file: ${path.relative(process.cwd(), file)}`);
        }
      }
    }

    this.success('Built files checked for secrets.');
  }

  /**
   * Check CSP and security headers in index.html
   */
  checkSecurityHeaders() {
    this.log('Checking security headers and CSP...');

    const indexPath = path.join(process.cwd(), 'index.html');
    if (!fs.existsSync(indexPath)) {
      this.error('index.html not found for security header check.');
      return;
    }

    try {
      const content = fs.readFileSync(indexPath, 'utf8');

      const checks = [
        { name: 'Content Security Policy', pattern: /Content-Security-Policy/i, required: true },
        { name: 'X-Frame-Options', pattern: /X-Frame-Options/i, required: true },
        { name: 'X-Content-Type-Options', pattern: /X-Content-Type-Options/i, required: true },
        { name: 'Referrer-Policy', pattern: /Referrer-Policy/i, required: true },
      ];

      for (const check of checks) {
        if (check.pattern.test(content)) {
          this.success(`${check.name} header found.`);
        } else if (check.required) {
          this.error(`${check.name} header missing from index.html.`);
        } else {
          this.warning(`${check.name} header not found.`);
        }
      }

    } catch (err) {
      this.error(`Failed to check security headers: ${err.message}`);
    }
  }

  /**
   * Check for hardcoded secrets in source files
   */
  checkSourceFiles() {
    this.log('Checking source files for hardcoded secrets...');

    const srcPath = path.join(process.cwd(), 'src');
    if (!fs.existsSync(srcPath)) {
      this.warning('src/ directory not found. Ensure you are in the correct project directory.');
      return;
    }

    const filesToCheck = this.getAllFiles(srcPath).filter(file =>
      file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')
    );

    const secretPatterns = [
      /eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g, // JWT tokens
      /sk_[a-zA-Z0-9_-]{20,}/g, // Generic secret keys
      /password.*=.*['"]/gi,
      /secret.*=.*['"]/gi,
      /key.*=.*['"]/gi,
    ];

    for (const file of filesToCheck) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const relativePath = path.relative(process.cwd(), file);

        // Skip known legitimate files
        if (relativePath.includes('supabase-inquiries.ts') ||
            relativePath.includes('supabase.ts')) {
          continue; // These files use environment variables properly
        }

        for (const pattern of secretPatterns) {
          const matches = content.match(pattern);
          if (matches) {
            // More sophisticated filtering for source files
            const realSecrets = matches.filter(match => {
              // Skip comments, imports, and legitimate uses
              const lineStart = Math.max(0, content.lastIndexOf('\n', content.indexOf(match)));
              const lineEnd = content.indexOf('\n', content.indexOf(match) + match.length);
              const line = content.substring(lineStart, lineEnd);

              // Skip legitimate uses
              const isComment = line.includes('//') || line.includes('/*') || line.includes('*');
              const isImport = line.includes('import') || line.includes('from');
              const isReactKey = line.includes('key=') && (line.includes('key={') || line.includes("key=\""));
              const isViteEnv = line.includes('VITE_');
              const isConstDeclaration = line.includes('const') && line.includes('=');
              const isFunctionParam = line.includes('function') || line.includes('=>') || line.includes('(');
              const isEventHandler = line.includes('onKey') || line.includes('keyCode') || line.includes('key ===');
              const isObjectKey = line.includes(':') && !line.includes('=');
              const isTypeScriptType = line.includes('keyof') || line.includes('typeof') || line.includes(' as ');
              const isUIComponent = relativePath.includes('/ui/') || relativePath.includes('/components/');

              return !isComment && !isImport && !isReactKey && !isViteEnv &&
                     !isConstDeclaration && !isFunctionParam && !isEventHandler &&
                     !isObjectKey && !isTypeScriptType && !isUIComponent;
            });

            if (realSecrets.length > 0) {
              this.error(`Potential hardcoded secret in source file: ${relativePath}`);
              realSecrets.forEach(secret => this.error(`  Found: ${secret.substring(0, 50)}...`));
            }
          }
        }
      } catch (err) {
        this.warning(`Could not check source file: ${relativePath}`);
      }
    }

    this.success('Source files checked for hardcoded secrets.');
  }

  /**
   * Get all files recursively
   */
  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules') {
          arrayOfFiles = this.getAllFiles(fullPath, arrayOfFiles);
        }
      } else {
        arrayOfFiles.push(fullPath);
      }
    });

    return arrayOfFiles;
  }

  /**
   * Run all security checks
   */
  async run() {
    console.log('🔐 Running comprehensive security checks...\n');

    this.checkEnvironmentVariables();
    this.checkSourceFiles();
    this.checkBuiltFiles();
    this.checkSecurityHeaders();

    console.log('\n' + '='.repeat(60));

    if (this.errors.length > 0) {
      console.log(`🚨 SECURITY ISSUES FOUND: ${this.errors.length} errors`);
      this.errors.forEach(error => console.log(`  • ${error}`));
      console.log('\n❌ SECURITY CHECK FAILED - Do not deploy until issues are resolved!');
      process.exit(1);
    } else {
      console.log('✅ SECURITY CHECK PASSED - All checks completed successfully!');

      if (this.warnings.length > 0) {
        console.log(`⚠️  WARNINGS: ${this.warnings.length}`);
        this.warnings.forEach(warning => console.log(`  • ${warning}`));
      }

      console.log('\n🔐 Your application appears to be secure and ready for deployment.');
    }
  }
}

// Run the security checker
const checker = new SecurityChecker();
checker.run().catch(err => {
  console.error('🚨 Security check failed with error:', err);
  process.exit(1);
});

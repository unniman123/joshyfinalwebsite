/**
 * Copy Hero Image as OG Image
 * 
 * Simple script to copy one of the hero banner images to use as the OG image.
 * This is a quick solution that doesn't require image processing libraries.
 * 
 * Run: node scripts/copy-og-image.cjs
 */

const fs = require('fs');
const path = require('path');

// Configuration - choose your preferred hero image
const SOURCE_IMAGE = path.join(__dirname, '..', 'src', 'assets', 'Ayurveda treatments KeralaToursGlobal.jpg');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'og-home-image.jpg');

function copyOGImage() {
  try {
    console.log('📋 Copying hero image for OG use...');
    
    // Check if source exists
    if (!fs.existsSync(SOURCE_IMAGE)) {
      throw new Error(`Source image not found: ${SOURCE_IMAGE}`);
    }

    // Copy the file
    fs.copyFileSync(SOURCE_IMAGE, OUTPUT_PATH);
    
    const stats = fs.statSync(OUTPUT_PATH);
    console.log('✅ OG image copied successfully!');
    console.log(`📁 Saved to: ${OUTPUT_PATH}`);
    console.log(`💾 Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log('\n💡 Tip: For best results, use an image editor to create a 1200x630px version with text overlay.');
    
    return OUTPUT_PATH;
  } catch (error) {
    console.error('❌ Error copying OG image:', error.message);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  copyOGImage();
  process.exit(0);
}

module.exports = { copyOGImage };


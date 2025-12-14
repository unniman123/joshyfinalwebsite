/**
 * Generate Open Graph Image for Homepage
 * 
 * This script creates a 1200x630px image optimized for social media sharing
 * by combining hero images from the homepage into an attractive collage.
 * 
 * Requirements: Install sharp package
 * Run: node scripts/generate-og-image.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configuration
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 630;
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'og-home-image.jpg');

// Source images from assets (hero banner images)
const SOURCE_IMAGES = [
  path.join(__dirname, '..', 'src', 'assets', 'Ayurveda treatments KeralaToursGlobal.jpg'),
  path.join(__dirname, '..', 'src', 'assets', 'KTG Ammachi.jpg'),
  path.join(__dirname, '..', 'src', 'assets', 'Rameswaramtemple KeralaToursGlobal.png'),
  path.join(__dirname, '..', 'src', 'assets', 'Stilt Fishing in Sri Lanka.jpg'),
];

// Overlay text configuration
const OVERLAY_CONFIG = {
  title: 'KeralaToursGlobal',
  subtitle: 'Discover Kerala & India | Ayurveda | Global Holidays',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

async function generateOGImage() {
  try {
    console.log('🎨 Starting OG image generation...');

    // Verify source images exist
    const availableImages = SOURCE_IMAGES.filter(img => fs.existsSync(img));
    
    if (availableImages.length === 0) {
      throw new Error('No source images found! Please check the paths.');
    }

    console.log(`📸 Found ${availableImages.length} source images`);

    // Strategy: Create a 2x2 grid or single hero image
    let baseImage;

    if (availableImages.length === 1) {
      // Single image - resize and crop to fit
      baseImage = await sharp(availableImages[0])
        .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, {
          fit: 'cover',
          position: 'center'
        })
        .toBuffer();
    } else if (availableImages.length >= 2) {
      // Create a collage with 2 or more images
      const halfWidth = Math.floor(OUTPUT_WIDTH / 2);
      const halfHeight = Math.floor(OUTPUT_HEIGHT / 2);

      // Process first 4 images (or less if not available)
      const processedImages = await Promise.all(
        availableImages.slice(0, 4).map(async (imgPath, index) => {
          const width = availableImages.length === 2 ? halfWidth : halfWidth;
          const height = availableImages.length === 2 ? OUTPUT_HEIGHT : halfHeight;
          
          return {
            input: await sharp(imgPath)
              .resize(width, height, {
                fit: 'cover',
                position: 'center'
              })
              .toBuffer(),
            top: availableImages.length === 2 ? 0 : (index >= 2 ? halfHeight : 0),
            left: index % 2 === 0 ? 0 : halfWidth
          };
        })
      );

      // Create base canvas
      baseImage = await sharp({
        create: {
          width: OUTPUT_WIDTH,
          height: OUTPUT_HEIGHT,
          channels: 3,
          background: { r: 0, g: 0, b: 0 }
        }
      })
        .composite(processedImages)
        .jpeg({ quality: 90 })
        .toBuffer();
    }

    // Add a semi-transparent overlay with text (optional - can be done with SVG)
    const overlayHeight = 150;
    const textOverlay = Buffer.from(`
      <svg width="${OUTPUT_WIDTH}" height="${overlayHeight}">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0.7" />
            <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.9" />
          </linearGradient>
        </defs>
        <rect width="${OUTPUT_WIDTH}" height="${overlayHeight}" fill="url(#grad)"/>
        <text x="50%" y="45%" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">
          ${OVERLAY_CONFIG.title}
        </text>
        <text x="50%" y="75%" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.9">
          ${OVERLAY_CONFIG.subtitle}
        </text>
      </svg>
    `);

    // Composite the overlay at the bottom
    const finalImage = await sharp(baseImage)
      .composite([
        {
          input: textOverlay,
          top: OUTPUT_HEIGHT - overlayHeight,
          left: 0
        }
      ])
      .jpeg({ quality: 90, progressive: true })
      .toFile(OUTPUT_PATH);

    console.log('✅ OG image generated successfully!');
    console.log(`📁 Saved to: ${OUTPUT_PATH}`);
    console.log(`📏 Dimensions: ${finalImage.width}x${finalImage.height}`);
    console.log(`💾 Size: ${(finalImage.size / 1024).toFixed(2)} KB`);

    return OUTPUT_PATH;
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  generateOGImage()
    .then(() => {
      console.log('\n🎉 Done! You can now use this image for social media sharing.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Failed to generate OG image:', error.message);
      process.exit(1);
    });
}

module.exports = { generateOGImage };


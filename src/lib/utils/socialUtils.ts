import { SOCIAL_BRAND_COLORS, SOCIAL_PLATFORMS, type SocialPlatform } from '@/lib/constants/socialBrands';

/**
 * Get the CSS class name for a social media platform
 */
export function getSocialIconClass(platform: SocialPlatform): string {
  return `social-icon social-icon--${platform}`;
}

/**
 * Get the brand colors for a social media platform
 */
export function getSocialBrandColors(platform: SocialPlatform) {
  return SOCIAL_BRAND_COLORS[platform];
}

/**
 * Get the platform configuration (name, aria-label, etc.)
 */
export function getSocialPlatformConfig(platform: SocialPlatform) {
  return SOCIAL_PLATFORMS[platform];
}

/**
 * Validate if a string is a valid social platform
 */
export function isValidSocialPlatform(platform: string): platform is SocialPlatform {
  return platform in SOCIAL_BRAND_COLORS;
}

/**
 * Get all available social platforms
 */
export function getAllSocialPlatforms(): SocialPlatform[] {
  return Object.keys(SOCIAL_BRAND_COLORS) as SocialPlatform[];
}
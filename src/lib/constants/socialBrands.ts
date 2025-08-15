// Social Media Brand Colors and Constants
// Based on official brand guidelines for each platform

export const SOCIAL_BRAND_COLORS = {
  facebook: {
    background: '#1877F2',
    hover: '#166FE5',
    icon: '#FFFFFF'
  },
  instagram: {
    background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
    hover: '#E4405F',
    icon: '#FFFFFF'
  },
  twitter: {
    background: '#000000',
    hover: '#1DA1F2', // Legacy Twitter blue for hover
    icon: '#FFFFFF'
  },
  linkedin: {
    background: '#0A66C2',
    hover: '#004182',
    icon: '#FFFFFF'
  },
  pinterest: {
    background: '#BD081C',
    hover: '#9B0000',
    icon: '#FFFFFF'
  }
} as const;

export type SocialPlatform = keyof typeof SOCIAL_BRAND_COLORS;

// Social media platform configuration
export const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    ariaLabel: 'Visit our Facebook page'
  },
  instagram: {
    name: 'Instagram',
    ariaLabel: 'Visit our Instagram profile'
  },
  twitter: {
    name: 'Twitter/X',
    ariaLabel: 'Visit our Twitter/X profile'
  },
  linkedin: {
    name: 'LinkedIn',
    ariaLabel: 'Visit our LinkedIn page'
  },
  pinterest: {
    name: 'Pinterest',
    ariaLabel: 'Visit our Pinterest profile'
  }
} as const;

// Icon sizing constants
export const SOCIAL_ICON_SIZES = {
  default: {
    width: '48px',
    height: '48px',
    borderRadius: '8px'
  },
  mobile: {
    width: '44px',
    height: '44px',
    borderRadius: '6px'
  }
} as const;

// Animation constants
export const SOCIAL_ANIMATIONS = {
  transition: 'all 0.3s ease',
  hoverScale: '1.1',
  hoverShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
} as const;
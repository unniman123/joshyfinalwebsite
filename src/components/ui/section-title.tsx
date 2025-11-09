import React from 'react';
import { cn } from '@/lib/utils';

/**
 * SectionTitle Component
 * 
 * A reusable, modern section title component that follows the brand design system.
 * Features a gradient badge design with left accent bar for visual hierarchy.
 * 
 * Design Rationale:
 * - Uses brand burgundy colors for consistency
 * - Modern gradient badge replaces outdated hanging board design
 * - Responsive typography with proper mobile-first sizing
 * - Accessible with semantic HTML and proper contrast
 * - Clean, minimal design that doesn't distract from content
 */

export interface SectionTitleProps {
  /**
   * The title text to display
   */
  title: string;
  
  /**
   * Visual style variant
   * - 'gradient-badge': Modern gradient with accent bar (default, recommended)
   * - 'underline': Minimalist with decorative underline
   * - 'pill': Refined pill design with optional icon
   */
  variant?: 'gradient-badge' | 'underline' | 'pill';
  
  /**
   * Tourism-optimized color scheme
   * - 'custom-brand': Orange & peach with sky blue - Your custom brand colors (Recommended!)
   * - 'ocean-breeze': Deep navy & sky blue - Trust, calm, adventure (Best for beach/cruise tours)
   * - 'sunset-glow': Coral & gold - Energy, warmth, excitement (Best for adventure tours)
   * - 'tropical-paradise': Teal & orange - Vibrant, exotic, wanderlust (Best for tropical destinations)
   * - 'adventure-green': Forest green & sage - Nature, eco-tourism (Best for nature tours)
   * - 'luxury-travel': Gold & navy - Premium, elegant (Best for luxury packages)
   */
  colorScheme?: 'custom-brand' | 'ocean-breeze' | 'sunset-glow' | 'tropical-paradise' | 'adventure-green' | 'luxury-travel';
  
  /**
   * Alignment of the title
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Size of the title
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Optional subtitle text
   */
  subtitle?: string;
  
  /**
   * Optional icon component (for pill variant)
   */
  icon?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Semantic heading level (h1-h6)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const SectionTitle = ({
  title,
  variant = 'gradient-badge',
  colorScheme = 'custom-brand',
  align = 'center',
  size = 'lg',
  subtitle,
  icon,
  className = '',
  as: Component = 'h2',
}: SectionTitleProps) => {
  // Responsive size mappings
  const sizeClasses = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl lg:text-4xl',
    xl: 'text-3xl md:text-4xl lg:text-5xl',
  };

  // Alignment classes
  const alignClasses = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right',
  };

  // Tourism-optimized color scheme mappings
  const colorSchemes = {
    'custom-brand': {
      accentBar: 'bg-[hsl(var(--brand-green))]',
      background: 'bg-[hsl(var(--brand-yellow))]',
      text: 'text-[hsl(var(--brand-green))]',
      pillBg: 'bg-[hsl(var(--brand-yellow))]',
      underline: 'bg-[hsl(var(--brand-green))]',
    },
    'ocean-breeze': {
      accentBar: 'bg-gradient-to-b from-[hsl(var(--ocean-navy))] to-[hsl(var(--ocean-sky))]',
      background: 'bg-gradient-to-br from-white via-[hsl(var(--ocean-light))] to-white',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--ocean-navy))] to-[hsl(var(--ocean-sky))]',
      pillBg: 'bg-gradient-to-r from-[hsl(var(--ocean-navy))] to-[hsl(var(--ocean-sky))]',
      underline: 'bg-gradient-to-r from-[hsl(var(--ocean-navy))] to-[hsl(var(--ocean-sky))]',
    },
    'sunset-glow': {
      accentBar: 'bg-gradient-to-b from-[hsl(var(--sunset-coral))] to-[hsl(var(--sunset-gold))]',
      background: 'bg-gradient-to-br from-white via-[hsl(var(--sunset-beige))] to-white',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--sunset-coral))] to-[hsl(var(--sunset-gold))]',
      pillBg: 'bg-gradient-to-r from-[hsl(var(--sunset-coral))] to-[hsl(var(--sunset-gold))]',
      underline: 'bg-gradient-to-r from-[hsl(var(--sunset-coral))] to-[hsl(var(--sunset-gold))]',
    },
    'tropical-paradise': {
      accentBar: 'bg-gradient-to-b from-[hsl(var(--tropical-teal))] to-[hsl(var(--tropical-orange))]',
      background: 'bg-gradient-to-br from-white via-[hsl(var(--tropical-sand))] to-white',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--tropical-teal))] to-[hsl(var(--tropical-orange))]',
      pillBg: 'bg-gradient-to-r from-[hsl(var(--tropical-teal))] to-[hsl(var(--tropical-orange))]',
      underline: 'bg-gradient-to-r from-[hsl(var(--tropical-teal))] to-[hsl(var(--tropical-orange))]',
    },
    'adventure-green': {
      accentBar: 'bg-gradient-to-b from-[hsl(var(--adventure-forest))] to-[hsl(var(--adventure-sage))]',
      background: 'bg-gradient-to-br from-white via-[hsl(var(--adventure-cream))] to-white',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--adventure-forest))] to-[hsl(var(--adventure-sage))]',
      pillBg: 'bg-gradient-to-r from-[hsl(var(--adventure-forest))] to-[hsl(var(--adventure-sage))]',
      underline: 'bg-gradient-to-r from-[hsl(var(--adventure-forest))] to-[hsl(var(--adventure-sage))]',
    },
    'luxury-travel': {
      accentBar: 'bg-gradient-to-b from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-navy))]',
      background: 'bg-gradient-to-br from-white via-[hsl(var(--luxury-champagne))] to-white',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-navy))]',
      pillBg: 'bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-navy))]',
      underline: 'bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-navy))]',
    },
  };

  const colors = colorSchemes[colorScheme];

  // Render gradient badge variant (recommended)
  if (variant === 'gradient-badge') {
    return (
      <div className={cn('relative z-10 mb-8 md:mb-10', `flex ${alignClasses[align]}`, className)}>
        <div className="inline-flex flex-col gap-2">
          {/* Main title badge with gradient and accent bar */}
          <div className="section-title-badge inline-flex items-center gap-0 rounded-lg md:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Left accent bar - dynamic color scheme */}
            <div className={cn('w-1.5 md:w-2 h-full flex-shrink-0', colors.accentBar)} />
            
            {/* Title content with gradient background */}
            <div className={cn('px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center gap-3', colors.background)}>
              <Component className={cn(
                sizeClasses[size],
                'font-bold leading-tight mb-0',
                colors.text
              )}>
                {title}
              </Component>
            </div>
          </div>
          
          {/* Optional subtitle */}
          {subtitle && (
            <p className="text-sm md:text-base text-muted-foreground px-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Render underline variant (minimalist)
  if (variant === 'underline') {
    return (
      <div className={cn('relative z-10 mb-8 md:mb-10', `flex flex-col ${alignClasses[align]}`, className)}>
        <Component className={cn(
          sizeClasses[size],
          'font-bold text-foreground leading-tight mb-3 relative inline-block'
        )}>
          {title}
          {/* Decorative underline with dynamic gradient */}
          <span className={cn('absolute bottom-0 left-0 right-0 h-1 rounded-full transform translate-y-2', colors.underline)} />
        </Component>
        
        {subtitle && (
          <p className="text-sm md:text-base text-muted-foreground mt-4">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  // Render pill variant (refined with icon)
  if (variant === 'pill') {
    // Determine text color based on color scheme
    const pillTextColor = colorScheme === 'custom-brand' ? colors.text : 'text-white';
    const iconBgColor = colorScheme === 'custom-brand' ? 'bg-[hsl(var(--brand-green))]/20' : 'bg-white/20';
    const iconTextColor = colorScheme === 'custom-brand' ? 'text-[hsl(var(--brand-green))]' : 'text-white';
    
    return (
      <div className={cn('relative z-10 mb-8 md:mb-10', `flex ${alignClasses[align]}`, className)}>
        <div className="inline-flex flex-col gap-2">
          {/* Pill badge with optional icon */}
          <div className={cn('section-title-pill inline-flex items-center gap-3 px-4 md:px-6 lg:px-8 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]', colors.pillBg)}>
            {icon && (
              <span className={cn('flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full backdrop-blur-sm flex items-center justify-center', iconBgColor, iconTextColor)}>
                {icon}
              </span>
            )}
            
            <Component className={cn(
              sizeClasses[size],
              'font-bold leading-tight mb-0',
              pillTextColor
            )}>
              {title}
            </Component>
          </div>
          
          {subtitle && (
            <p className="text-sm md:text-base text-muted-foreground px-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default SectionTitle;


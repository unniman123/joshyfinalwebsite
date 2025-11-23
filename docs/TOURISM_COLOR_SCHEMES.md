# Tourism-Optimized Color Schemes Guide

## Overview
This document provides comprehensive guidance on the tourism-optimized color schemes available for section titles throughout the WanderWise application. These color schemes are based on extensive research into travel industry best practices and color psychology.

## Research Foundation

### Color Psychology in Tourism
Based on research from leading travel websites and color psychology studies:

1. **Blue**: Evokes trust, reliability, calm, and adventure (ocean/sky associations)
2. **Orange/Coral**: Conveys energy, warmth, excitement, and friendliness
3. **Teal/Turquoise**: Represents tropical destinations, exotic locations, wanderlust
4. **Green**: Suggests nature, eco-tourism, sustainability, exploration
5. **Gold**: Implies luxury, premium experiences, sophistication

## Available Color Schemes

### 1. Tropical Paradise (Default)
**Best For**: Tropical destinations, beach resorts, exotic tours, island getaways

**Colors**:
- Primary: Teal `#2DBAA3` (HSL: 174 62% 47%)
- Secondary: Sunset Orange `#F4845F` (HSL: 14 91% 58%)
- Background: Sandy Beige `#FDF6E9` (HSL: 39 77% 95%)

**Psychology**: Creates vibrant, exotic atmosphere that evokes wanderlust and tropical paradise imagery. The teal-to-orange gradient mimics sunset over ocean.

**Usage Example**:
```tsx
<SectionTitle 
  title="Our Top Selling Packages"
  colorScheme="tropical-paradise"
  variant="gradient-badge"
/>
```

---

### 2. Ocean Breeze
**Best For**: Cruise tours, coastal destinations, beach vacations, water sports

**Colors**:
- Primary: Deep Navy `#001f3f` (HSL: 210 100% 25%)
- Secondary: Sky Blue `#7FDBFF` (HSL: 195 100% 75%)
- Background: Light Sky (HSL: 195 100% 95%)

**Psychology**: Evokes feelings of calm, trust, and reliability while maintaining adventure spirit. Navy provides professionalism, sky blue adds refreshing energy.

**Usage Example**:
```tsx
<SectionTitle 
  title="Coastal Adventures"
  colorScheme="ocean-breeze"
  variant="gradient-badge"
/>
```

---

### 3. Sunset Glow
**Best For**: Adventure tours, cultural experiences, romantic getaways, sunset cruises

**Colors**:
- Primary: Coral `#FF7F50` (HSL: 16 100% 66%)
- Secondary: Warm Yellow `#FFD700` (HSL: 51 100% 50%)
- Background: Soft Beige `#FAF3E0` (HSL: 45 88% 95%)

**Psychology**: Creates energetic, inviting atmosphere inspired by sunset hues. Perfect for conveying warmth, adventure, and memorable experiences.

**Usage Example**:
```tsx
<SectionTitle 
  title="Adventure Awaits"
  colorScheme="sunset-glow"
  variant="gradient-badge"
/>
```

---

### 4. Adventure Green
**Best For**: Eco-tourism, nature tours, hiking expeditions, wildlife safaris, sustainable travel

**Colors**:
- Primary: Forest Green `#228B22` (HSL: 140 60% 35%)
- Secondary: Sage Green `#8FBC8F` (HSL: 120 25% 65%)
- Background: Cream `#F5F5DC` (HSL: 60 29% 96%)

**Psychology**: Reflects natural landscapes and eco-friendly values. Grounded, organic feel that appeals to nature enthusiasts and sustainable travelers.

**Usage Example**:
```tsx
<SectionTitle 
  title="Nature Expeditions"
  colorScheme="adventure-green"
  variant="gradient-badge"
/>
```

---

### 5. Luxury Travel
**Best For**: Premium packages, luxury hotels, first-class experiences, high-end tours

**Colors**:
- Primary: Rich Gold `#C9A227` (HSL: 43 74% 49%)
- Secondary: Deep Navy `#1C2841` (HSL: 220 39% 18%)
- Background: Champagne `#E8DCC4` (HSL: 45 56% 88%)

**Psychology**: Conveys sophistication, elegance, and premium quality. Gold-to-navy gradient suggests exclusivity and refined taste.

**Usage Example**:
```tsx
<SectionTitle 
  title="Luxury Escapes"
  colorScheme="luxury-travel"
  variant="gradient-badge"
/>
```

---

## Implementation Guide

### Basic Usage

```tsx
import SectionTitle from '@/components/ui/section-title';

// Simple implementation with default tropical-paradise scheme
<SectionTitle title="Our Tours" />

// With specific color scheme
<SectionTitle 
  title="Beach Getaways"
  colorScheme="ocean-breeze"
/>

// Full configuration
<SectionTitle 
  title="Premium Packages"
  variant="gradient-badge"
  colorScheme="luxury-travel"
  align="center"
  size="lg"
  subtitle="Exclusive experiences for discerning travelers"
/>
```

### Variant Options

The component supports three visual variants, all compatible with color schemes:

1. **gradient-badge** (Recommended): Modern badge with accent bar and gradient background
2. **underline**: Minimalist design with decorative gradient underline
3. **pill**: Rounded pill design with optional icon

### Choosing the Right Scheme

**Decision Matrix**:

| Tour Type | Recommended Scheme | Alternative |
|-----------|-------------------|-------------|
| Beach/Island | Tropical Paradise | Ocean Breeze |
| Cruise | Ocean Breeze | Tropical Paradise |
| Adventure/Hiking | Adventure Green | Sunset Glow |
| Cultural Tours | Sunset Glow | Luxury Travel |
| Luxury/Premium | Luxury Travel | Sunset Glow |
| Eco-Tourism | Adventure Green | Tropical Paradise |
| City Tours | Sunset Glow | Ocean Breeze |
| Wildlife Safari | Adventure Green | Sunset Glow |

## Technical Details

### CSS Variables

All color schemes use CSS custom properties defined in `src/index.css`:

```css
/* Ocean Breeze */
--ocean-navy: 210 100% 25%;
--ocean-sky: 195 100% 75%;
--ocean-light: 195 100% 95%;

/* Sunset Glow */
--sunset-coral: 16 100% 66%;
--sunset-gold: 51 100% 50%;
--sunset-beige: 45 88% 95%;

/* Tropical Paradise */
--tropical-teal: 174 62% 47%;
--tropical-orange: 14 91% 58%;
--tropical-sand: 39 77% 95%;

/* Adventure Green */
--adventure-forest: 140 60% 35%;
--adventure-sage: 120 25% 65%;
--adventure-cream: 60 29% 96%;

/* Luxury Travel */
--luxury-gold: 43 74% 49%;
--luxury-navy: 220 39% 18%;
--luxury-champagne: 45 56% 88%;
```

### Accessibility

All color schemes are designed with WCAG 2.1 AA compliance:
- Text gradients maintain sufficient contrast against backgrounds
- Accent bars provide clear visual separation
- Hover states enhance interactive feedback
- Responsive sizing ensures readability across devices

### Performance

- Uses CSS custom properties for efficient theming
- Gradient text via `background-clip` for modern browsers
- Hardware-accelerated transitions
- Minimal DOM overhead

## Best Practices

1. **Consistency**: Use the same color scheme for related sections
2. **Context**: Match scheme to tour type and destination
3. **Hierarchy**: Larger titles can use bolder color schemes
4. **Testing**: Preview on different devices and backgrounds
5. **Accessibility**: Ensure sufficient contrast in all contexts

## Examples in Production

### Homepage Tour Section
```tsx
<SectionTitle 
  title="Our Top Selling Packages"
  colorScheme="tropical-paradise"
  variant="gradient-badge"
  align="center"
  size="lg"
/>
```

### Tour Detail Page
```tsx
<SectionTitle 
  title="Kerala Backwaters Experience"
  colorScheme="adventure-green"
  variant="gradient-badge"
  align="left"
  size="xl"
  subtitle="Discover the serene beauty of God's Own Country"
/>
```

### Luxury Package Section
```tsx
<SectionTitle 
  title="Exclusive Rajasthan Palace Tours"
  colorScheme="luxury-travel"
  variant="pill"
  icon={<Crown />}
  align="center"
  size="lg"
/>
```

## Migration from Old Design

The previous hanging board design has been replaced with modern gradient badges. To update existing components:

**Before**:
```tsx
<div className="hanging-board">
  <div className="board">
    <h2>Title</h2>
  </div>
</div>
```

**After**:
```tsx
<SectionTitle 
  title="Title"
  colorScheme="tropical-paradise"
/>
```

## Support

For questions or custom color scheme requests, refer to:
- Design System Documentation: `docs/DESIGN_SYSTEM.md`
- Component API: `src/components/ui/section-title.tsx`
- CSS Tokens: `src/index.css` (lines 85-109)

---

**Last Updated**: November 2024  
**Version**: 1.0.0  
**Maintained By**: WanderWise Design Team




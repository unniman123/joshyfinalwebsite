import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				textColor: theme => ({
					"namaste-foreground": theme('colors.namaste.foreground')
				}),
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				/* button primary maps to token for consistent CTA styling */
				'button-primary': {
					DEFAULT: 'hsl(var(--button-primary-bg))',
					foreground: 'hsl(var(--button-primary-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Tour agency custom colors
				golden: {
					DEFAULT: 'hsl(var(--golden))',
					dark: 'hsl(var(--golden-dark))',
					light: 'hsl(var(--golden-light))'
				},
				'warm-red': {
					DEFAULT: 'hsl(var(--warm-red))',
					dark: 'hsl(var(--warm-red-dark))'
				},
				'warm-gray': 'hsl(var(--warm-gray))',
				success: 'hsl(var(--success))',
				/* namaste token for Tailwind use */
				namaste: {
					DEFAULT: 'hsl(var(--namaste-bg))',
					foreground: 'hsl(var(--namaste-foreground))'
				},
				promo: {
					magenta: 'hsl(var(--promo-magenta))',
					'foreground': 'hsl(var(--promo-magenta-foreground))'
				},
				/* tour image background token */
				tourImage: {
					DEFAULT: 'hsl(var(--tour-image-bg))',
					foreground: 'hsl(var(--tour-image-bg-foreground))'
				},
				/* day out package image bg */
				dayOutImage: {
					DEFAULT: 'hsl(var(--dayout-image-bg))',
					foreground: 'hsl(var(--dayout-image-bg-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-golden': 'var(--gradient-golden)',
				'gradient-warm': 'var(--gradient-warm)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'golden': 'var(--shadow-golden)',
				'warm': 'var(--shadow-warm)',
				'card': 'var(--shadow-card)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'scale-up': 'scale-up 0.4s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

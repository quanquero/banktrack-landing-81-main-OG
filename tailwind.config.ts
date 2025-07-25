
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
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				// Custom colors for our banking app
				bank: {
					blue: '#1E88E5',
					lightBlue: '#64B5F6',
					navy: '#0D47A1',
					gray: '#607D8B',
					lightGray: '#ECEFF1',
					success: '#4CAF50',
					error: '#F44336',
					warning: '#FF9800'
				}
			},
			fontFamily: {
				sans: ['SF Pro Display', 'Inter', 'sans-serif'],
				mono: ['SF Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'transfer': {
					'0%': { left: '0', opacity: '0', transform: 'scale(0.8)' },
					'10%': { opacity: '1', transform: 'scale(1)' },
					'90%': { opacity: '1', transform: 'scale(1)' },
					'100%': { left: 'calc(100% - 16px)', opacity: '0', transform: 'scale(0.8)' }
				},
				'transfer-fast': {
					'0%': { left: '0', opacity: '0', transform: 'scale(0.8)' },
					'10%': { opacity: '1', transform: 'scale(1)' },
					'90%': { opacity: '1', transform: 'scale(1)' },
					'100%': { left: 'calc(100% - 16px)', opacity: '0', transform: 'scale(0.8)' }
				},
				'flow-particles': {
					'0%': { transform: 'translateX(-50%)' },
					'100%': { transform: 'translateX(0%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-up': 'fade-up 0.6s ease-out forwards',
				'slide-left': 'slide-left 0.6s ease-out forwards',
				'slide-right': 'slide-right 0.6s ease-out forwards',
				'spin-slow': 'spin-slow 12s linear infinite',
				'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'transfer': 'transfer 3s ease-in-out infinite',
				'transfer-fast': 'transfer-fast 1.5s ease-in-out infinite',
				'flow-particles': 'flow-particles 2s linear infinite'
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
				'neu': '10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff',
				'inner-neu': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

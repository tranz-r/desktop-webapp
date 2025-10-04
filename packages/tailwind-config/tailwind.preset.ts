import type { Config } from 'tailwindcss'

const preset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Corporate Color Palette - Using Admin App's Sophisticated Colors
        corporate: {
          navy: {
            50: '#f5f3f7',
            100: '#ebe6ef',
            200: '#d7cedf',
            300: '#bbabc8',

            400: '#9b85ad',
            500: '#9568b0',
            600: '#7a5294',
            700: '#654378',
            800: '#533963',
            900: '#463154',
            950: '#1e3a8a'
          },
          purple: {
            50: '#f5f3f7',
            100: '#ebe6ef',
            200: '#d7cedf',
            300: '#bbabc8',
            400: '#9b85ad',
            500: '#9568b0',
            600: '#7a5294',
            700: '#654378',
            800: '#533963',
            900: '#463154'
          },
          teal: {
            50: '#f0f9fa',
            100: '#daf1f4',
            200: '#b8e3e9',
            300: '#a4cbd1',
            400: '#7db8c2',
            500: '#5aa5b3',
            600: '#4a8a9a',
            700: '#3f7080',
            800: '#375c68',
            900: '#314d57'
          },
          grey: {
            50: '#f8f7fa',
            100: '#f1eef5',
            200: '#e3deeb',
            300: '#bbabc8',
            400: '#a695b5',
            500: '#9180a2',
            600: '#7c6b8f',
            700: '#675a76',
            800: '#544b61',
            900: '#474052'
          }
        },
        // Semantic colors - Using Admin App's HSL CSS custom properties
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          '50': '#f5f3f7',
          '100': '#ebe6ef',
          '200': '#d7cedf',
          '300': '#bbabc8',
          '400': '#9b85ad',
          '500': '#9568b0',
          '600': '#7a5294',
          '700': '#654378',
          '800': '#533963',
          '900': '#463154',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          '50': '#f8f7fa',
          '100': '#f1eef5',
          '200': '#e3deeb',
          '300': '#bbabc8',
          '400': '#a695b5',
          '500': '#9180a2',
          '600': '#7c6b8f',
          '700': '#675a76',
          '800': '#544b61',
          '900': '#474052',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        accent: {
          '50': '#f0f9fa',
          '100': '#daf1f4',
          '200': '#b8e3e9',
          '300': '#a4cbd1',
          '400': '#7db8c2',
          '500': '#5aa5b3',
          '600': '#4a8a9a',
          '700': '#3f7080',
          '800': '#375c68',
          '900': '#314d57',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      // Corporate Typography Scale - Responsive font sizes
      fontSize: {
        // Corporate heading scale
        'corporate-hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 56px
        'corporate-hero-mobile': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 40px
        'corporate-display': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }], // 48px
        'corporate-display-mobile': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 36px
        
        // Corporate heading hierarchy
        'corporate-h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 40px
        'corporate-h1-mobile': ['2rem', { lineHeight: '1.25', letterSpacing: '0' }], // 32px
        'corporate-h2': ['2rem', { lineHeight: '1.25', letterSpacing: '0' }], // 32px
        'corporate-h2-mobile': ['1.75rem', { lineHeight: '1.3', letterSpacing: '0' }], // 28px
        'corporate-h3': ['1.75rem', { lineHeight: '1.3', letterSpacing: '0' }], // 28px
        'corporate-h3-mobile': ['1.5rem', { lineHeight: '1.35', letterSpacing: '0' }], // 24px
        'corporate-h4': ['1.5rem', { lineHeight: '1.35', letterSpacing: '0' }], // 24px
        'corporate-h4-mobile': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }], // 20px
        'corporate-h5': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }], // 20px
        'corporate-h5-mobile': ['1.125rem', { lineHeight: '1.45', letterSpacing: '0' }], // 18px
        'corporate-h6': ['1.125rem', { lineHeight: '1.45', letterSpacing: '0' }], // 18px
        'corporate-h6-mobile': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }], // 16px
        
        // Corporate body text scale
        'corporate-body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }], // 18px
        'corporate-body-lg-mobile': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }], // 16px
        'corporate-body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }], // 16px
        'corporate-body-mobile': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }], // 14px
        'corporate-body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }], // 14px
        'corporate-body-sm-mobile': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0' }], // 12px
        
        // Corporate caption and small text
        'corporate-caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }], // 12px
        'corporate-caption-mobile': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }], // 11px
        'corporate-micro': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.05em' }], // 10px
        'corporate-micro-mobile': ['0.5625rem', { lineHeight: '1.4', letterSpacing: '0.05em' }], // 9px
      },
      // Corporate font family configuration
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'corporate-sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'corporate-serif': ['Georgia', 'Times New Roman', 'serif'],
        'corporate-mono': ['Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      // Corporate font weight scale
      fontWeight: {
        'corporate-thin': '100',
        'corporate-extralight': '200',
        'corporate-light': '300',
        'corporate-normal': '400',
        'corporate-medium': '500',
        'corporate-semibold': '600',
        'corporate-bold': '700',
        'corporate-extrabold': '800',
        'corporate-black': '900',
      },
      // Corporate letter spacing
      letterSpacing: {
        'corporate-tighter': '-0.05em',
        'corporate-tight': '-0.025em',
        'corporate-normal': '0em',
        'corporate-wide': '0.025em',
        'corporate-wider': '0.05em',
        'corporate-widest': '0.1em',
      },
      // Corporate line height
      lineHeight: {
        'corporate-none': '1',
        'corporate-tight': '1.25',
        'corporate-snug': '1.375',
        'corporate-normal': '1.5',
        'corporate-relaxed': '1.625',
        'corporate-loose': '2',
        'corporate-body': '1.6',
        'corporate-heading': '1.2',
      },
      // CSS Custom Properties for dynamic theming - Using Admin App Colors
      backgroundImage: {
        'corporate-gradient': 'linear-gradient(135deg, hsl(276.8571 28.0000% 50.9804%) 0%, hsl(266.0440 85.0467% 58.0392%) 100%)',
        'accent-gradient': 'linear-gradient(135deg, hsl(197.0667 96.5665% 45.6863%) 0%, hsl(189.1837 71.0145% 72.9412%) 100%)',
        'gradient-primary': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--muted)) 100%)',
        // Webflow-style animated gradients
        'webflow-gradient': `
          radial-gradient(circle at 20% 80%, hsl(276.8571 28.0000% 60%) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, hsl(197.0667 96.5665% 55%) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, hsl(266.0440 85.0467% 65%) 0%, transparent 50%),
          linear-gradient(135deg, hsl(220 23.07% 95%) 0%, hsl(233.7931 16.0221% 35.4902%) 100%)
        `,
        'webflow-subtle': `
          radial-gradient(circle at 30% 70%, hsl(276.8571 28.0000% 45%) 0%, transparent 40%),
          radial-gradient(circle at 70% 30%, hsl(197.0667 96.5665% 40%) 0%, transparent 40%),
          linear-gradient(135deg, hsl(220 20% 98%) 0%, hsl(233.7931 15% 92%) 100%)
        `
      },
      animation: {
        'corporate-fade-in': 'fadeIn 0.6s ease-in-out',
        'corporate-slide-up': 'slideUp 0.6s ease-out',
        'webflow-gradient-flow': 'webflowFlow 20s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        webflowFlow: {
          '0%, 100%': {
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%, 0% 0%'
          },
          '25%': {
            backgroundPosition: '25% 25%, 75% 75%, 25% 75%, 25% 25%'
          },
          '50%': {
            backgroundPosition: '50% 50%, 50% 50%, 50% 50%, 50% 50%'
          },
          '75%': {
            backgroundPosition: '75% 75%, 25% 25%, 75% 25%, 75% 75%'
          }
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}

export default preset
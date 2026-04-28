const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter_400Regular', 'sans-serif'],
      },
      colors: {
        border: 'rgb(var(--color-border) / <alpha-value>)',
        input: 'rgb(var(--color-input) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--color-card-foreground) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--color-secondary-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        destructive: 'rgb(var(--color-destructive) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)'
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px'
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px'
      },
      borderWidth: {
        hairline: hairlineWidth()
      },
      fontSize: {
        'heading-xl': ['32px', { lineHeight: '40px', fontFamily: 'Inter_700Bold', letterSpacing: '-0.6px' }],
        'heading-lg': ['24px', { lineHeight: '32px', fontFamily: 'Inter_700Bold', letterSpacing: '-0.4px' }],
        'heading-md': ['20px', { lineHeight: '28px', fontFamily: 'Inter_600SemiBold', letterSpacing: '-0.2px' }],
        'body-lg': ['18px', { lineHeight: '28px', fontFamily: 'Inter_400Regular' }],
        'body-md': ['16px', { lineHeight: '24px', fontFamily: 'Inter_400Regular' }],
        'body-sm': ['14px', { lineHeight: '20px', fontFamily: 'Inter_400Regular' }],
        caption: ['12px', { lineHeight: '16px', fontFamily: 'Inter_500Medium', letterSpacing: '0.2px' }]
      },
      boxShadow: {
        card: '0px 8px 24px rgba(15, 23, 42, 0.08)',
        elevated: '0px 16px 32px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};

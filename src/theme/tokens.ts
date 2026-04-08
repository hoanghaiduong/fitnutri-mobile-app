import type { ThemeTokens } from '@/types/theme';

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
} as const;

export const shadows = {
  light: {
    card: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 6,
    },
  },
  dark: {
    card: {
      shadowColor: '#020617',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.28,
      shadowRadius: 28,
      elevation: 8,
    },
  },
} as const;

export const lightTheme: ThemeTokens = {
  colors: {
    background: '248 250 252',
    foreground: '15 23 42',
    card: '255 255 255',
    cardForeground: '15 23 42',
    primary: '37 99 235',
    primaryForeground: '248 250 252',
    secondary: '241 245 249',
    secondaryForeground: '15 23 42',
    muted: '241 245 249',
    mutedForeground: '100 116 139',
    border: '226 232 240',
    input: '226 232 240',
    destructive: '220 38 38',
    success: '22 163 74',
    warning: '217 119 6',
  },
};

export const darkTheme: ThemeTokens = {
  colors: {
    background: '2 6 23',
    foreground: '226 232 240',
    card: '15 23 42',
    cardForeground: '226 232 240',
    primary: '96 165 250',
    primaryForeground: '2 6 23',
    secondary: '30 41 59',
    secondaryForeground: '226 232 240',
    muted: '30 41 59',
    mutedForeground: '148 163 184',
    border: '51 65 85',
    input: '51 65 85',
    destructive: '248 113 113',
    success: '74 222 128',
    warning: '251 191 36',
  },
};

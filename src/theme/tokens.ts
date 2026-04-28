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
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.06,
      shadowRadius: 32,
      elevation: 6,
    },
  },
  dark: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 36,
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
    primary: '16 185 129',
    primaryForeground: '255 255 255',
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
    primary: '52 211 153',
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

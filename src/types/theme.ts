export type ThemeMode = 'system' | 'light' | 'dark';

export type SemanticColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  destructive: string;
  success: string;
  warning: string;
};

export type ThemeTokens = {
  colors: SemanticColors;
};

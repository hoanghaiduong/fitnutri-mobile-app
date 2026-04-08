import { PropsWithChildren, useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { vars } from 'nativewind';

import { useAppTheme } from '@/hooks/use-app-theme';
import { useThemeStore } from '@/store/theme-store';

const createVars = (colors: Record<string, string>) =>
  vars({
    '--color-background': colors.background,
    '--color-foreground': colors.foreground,
    '--color-card': colors.card,
    '--color-card-foreground': colors.cardForeground,
    '--color-primary': colors.primary,
    '--color-primary-foreground': colors.primaryForeground,
    '--color-secondary': colors.secondary,
    '--color-secondary-foreground': colors.secondaryForeground,
    '--color-muted': colors.muted,
    '--color-muted-foreground': colors.mutedForeground,
    '--color-border': colors.border,
    '--color-input': colors.input,
    '--color-destructive': colors.destructive,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
  });

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const hydrate = useThemeStore((state) => state.hydrate);
  const hydrated = useThemeStore((state) => state.hydrated);
  const { isDark, tokens } = useAppTheme();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return null;
  }

  return (
    <View className="flex-1 bg-background" style={createVars(tokens.colors)}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {children}
    </View>
  );
};

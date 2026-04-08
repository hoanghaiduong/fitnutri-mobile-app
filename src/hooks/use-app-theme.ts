import { useColorScheme } from 'react-native';

import { darkTheme, lightTheme } from '@/theme/tokens';
import { useThemeStore } from '@/store/theme-store';

export const useAppTheme = () => {
  const systemColorScheme = useColorScheme();
  const mode = useThemeStore((state) => state.mode);

  const resolvedTheme = mode === 'system' ? (systemColorScheme ?? 'light') : mode;
  const tokens = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return {
    mode,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    tokens,
  };
};

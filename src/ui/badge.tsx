import { View, type ViewProps } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgba } from '@/lib/color';
import { Text } from '@/ui/text';

type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'destructive';

type BadgeProps = ViewProps & {
  label: string;
  className?: string;
  variant?: BadgeVariant;
};

export const Badge = ({ label, variant = 'neutral', style, ...props }: BadgeProps) => {
  const { isDark, tokens } = useAppTheme();

  const palette = {
    neutral: {
      backgroundColor: toRgba(tokens.colors.secondary, isDark ? 0.9 : 0.96),
      borderColor: toRgba(tokens.colors.border, isDark ? 0.55 : 0.75),
      textTone: 'default' as const,
    },
    primary: {
      backgroundColor: toRgba(tokens.colors.primary, isDark ? 0.18 : 0.12),
      borderColor: toRgba(tokens.colors.primary, isDark ? 0.28 : 0.18),
      textTone: 'primary' as const,
    },
    success: {
      backgroundColor: toRgba(tokens.colors.success, isDark ? 0.18 : 0.12),
      borderColor: toRgba(tokens.colors.success, isDark ? 0.28 : 0.18),
      textTone: 'success' as const,
    },
    warning: {
      backgroundColor: toRgba(tokens.colors.warning, isDark ? 0.18 : 0.12),
      borderColor: toRgba(tokens.colors.warning, isDark ? 0.28 : 0.18),
      textTone: 'warning' as const,
    },
    destructive: {
      backgroundColor: toRgba(tokens.colors.destructive, isDark ? 0.18 : 0.12),
      borderColor: toRgba(tokens.colors.destructive, isDark ? 0.28 : 0.18),
      textTone: 'destructive' as const,
    },
  }[variant] || {
    backgroundColor: toRgba(tokens.colors.secondary, isDark ? 0.9 : 0.96),
    borderColor: toRgba(tokens.colors.border, isDark ? 0.55 : 0.75),
    textTone: 'default' as const,
  };

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          borderRadius: 999,
          borderWidth: 1,
          borderColor: palette.borderColor,
          backgroundColor: palette.backgroundColor,
          paddingHorizontal: 11,
          paddingVertical: 6,
        },
        style,
      ]}
      {...props}
    >
      <Text tone={palette.textTone} variant="caption">
        {label}
      </Text>
    </View>
  );
};

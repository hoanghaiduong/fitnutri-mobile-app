import { View, type ViewProps } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { cn } from '@/lib/cn';
import { toRgb, toRgba } from '@/lib/color';

type CardProps = ViewProps & {
  className?: string;
  elevated?: boolean;
  glass?: boolean;
};

export const Card = ({ className, elevated = false, glass = false, style, ...props }: CardProps) => {
  const { isDark, tokens } = useAppTheme();

  return (
    <View
      {...props}
      className={cn('rounded-xl border bg-card p-4', className)}
      style={[
        {
          backgroundColor: toRgb(tokens.colors.card),
          borderColor: toRgba(tokens.colors.border, isDark ? 0.72 : 0.9),
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: elevated ? 10 : 6 },
          shadowOpacity: isDark ? (elevated ? 0.18 : 0.1) : elevated ? 0.08 : 0.05,
          shadowRadius: elevated ? 20 : 14,
          elevation: elevated ? 5 : 2,
        },
        style,
      ]}
    />
  );
};

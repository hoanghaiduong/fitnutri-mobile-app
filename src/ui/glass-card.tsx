import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

type GlassCardProps = ViewProps & {
  className?: string;
};

export const GlassCard = ({ className, style, ...props }: GlassCardProps) => (
  <View
    className={cn(
      'rounded-[24px] border border-transparent bg-card/85 p-4 shadow-card',
      className,
    )}
    style={[{ borderColor: 'rgba(255, 255, 255, 0.4)' }, style]}
    {...props}
  />
);

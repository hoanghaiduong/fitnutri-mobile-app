import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

type GlassCardProps = ViewProps & {
  className?: string;
};

export const GlassCard = ({ className, ...props }: GlassCardProps) => (
  <View
    className={cn(
      'rounded-[24px] border border-white/40 bg-card/85 p-4 shadow-card',
      className,
    )}
    {...props}
  />
);

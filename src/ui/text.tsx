import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { cn } from '@/lib/cn';

type TextVariant = 'heading-xl' | 'heading-lg' | 'heading-md' | 'body-lg' | 'body-md' | 'body-sm' | 'caption';
type TextTone = 'default' | 'muted' | 'primary' | 'success' | 'destructive' | 'warning' | 'inverse';

type TextProps = RNTextProps & {
  className?: string;
  variant?: TextVariant;
  tone?: TextTone;
};

const variantClassMap: Record<TextVariant, string> = {
  'heading-xl': 'text-heading-xl font-bold tracking-tight',
  'heading-lg': 'text-heading-lg font-bold tracking-tight',
  'heading-md': 'text-heading-md font-semibold tracking-tight',
  'body-lg': 'text-body-lg',
  'body-md': 'text-body-md',
  'body-sm': 'text-body-sm',
  caption: 'text-caption font-medium',
};

const toneClassMap: Record<TextTone, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-success',
  destructive: 'text-destructive',
  warning: 'text-warning',
  inverse: 'text-primary-foreground',
};

export const Text = ({ className, style, tone = 'default', variant = 'body-md', ...props }: TextProps) => {
  return <RNText {...props} className={cn(variantClassMap[variant], toneClassMap[tone], className)} style={style} />;
};

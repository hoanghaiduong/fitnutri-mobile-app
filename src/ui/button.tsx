import { forwardRef, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { Text } from '@/ui/text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

const buttonVariants = cva(
  'items-center justify-center rounded-lg border disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-primary bg-primary',
        secondary: 'border-secondary bg-secondary',
        outline: 'border-border bg-transparent',
        ghost: 'border-transparent bg-transparent',
        destructive: 'border-destructive bg-destructive',
      },
      size: {
        sm: 'min-h-10 px-4',
        md: 'min-h-12 px-5',
        lg: 'min-h-14 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const textToneByVariant: Record<ButtonVariant, 'inverse' | 'default'> = {
  primary: 'inverse',
  secondary: 'default',
  outline: 'default',
  ghost: 'default',
  destructive: 'inverse',
};

type ButtonProps = Omit<PressableProps, 'style'> & VariantProps<typeof buttonVariants> & {
  className?: string;
  labelClassName?: string;
  loading?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  title: string;
};

export const Button = forwardRef<View, ButtonProps>(
  ({
    className,
    disabled,
    labelClassName,
    leftSlot,
    loading = false,
    rightSlot,
    size,
    title,
    variant,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    const tone = textToneByVariant[(variant ?? 'primary') as ButtonVariant];

    return (
      <Pressable
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={({ pressed }) => ({ opacity: pressed && !isDisabled ? 0.8 : isDisabled ? 0.5 : 1 })}
        disabled={isDisabled}
        {...props}
      >
        <View className="flex-row items-center justify-center gap-2">
          {loading ? <ActivityIndicator size="small" /> : leftSlot}
          <Text className={labelClassName} tone={tone} variant="body-md">
            {title}
          </Text>
          {!loading ? rightSlot : null}
        </View>
      </Pressable>
    );
  },
);

Button.displayName = 'Button';

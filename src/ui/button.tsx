import { forwardRef, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { cn } from '@/lib/cn';
import { Text } from '@/ui/text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

const PRESS_SPRING = { damping: 15, stiffness: 400, mass: 0.6 };
const RELEASE_SPRING = { damping: 12, stiffness: 200, mass: 0.6 };

const buttonVariants = cva(
  'items-center justify-center rounded-[18px] border flex-row overflow-hidden disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border-primary bg-primary shadow-sm shadow-primary/30',
        secondary: 'border-transparent bg-secondary shadow-sm shadow-secondary/10',
        outline: 'border-border bg-transparent',
        ghost: 'border-transparent bg-transparent',
        destructive: 'border-destructive bg-destructive shadow-sm shadow-destructive/30',
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
    const scale = useSharedValue(1);

    const animStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: isDisabled ? 0.5 : 1,
    }));

    const handlePressIn = () => {
      if (!isDisabled) {
        scale.value = withSpring(0.97, PRESS_SPRING);
      }
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, RELEASE_SPRING);
    };

    return (
      <AnimatedPressable
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={animStyle}
        disabled={isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      >
        <View className="flex-row items-center justify-center gap-2">
          {loading ? <ActivityIndicator size="small" /> : leftSlot}
          <Text className={labelClassName} tone={tone} variant="body-md">
            {title}
          </Text>
          {!loading ? rightSlot : null}
        </View>
      </AnimatedPressable>
    );
  },
);

Button.displayName = 'Button';

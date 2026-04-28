import { BlurView } from 'expo-blur';
import { type ReactNode } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useAppTheme } from '@/hooks/use-app-theme';
import { cn } from '@/lib/cn';
import { toRgb, toRgba } from '@/lib/color';

const PRESS_SPRING = { damping: 18, stiffness: 350, mass: 0.5 };
const RELEASE_SPRING = { damping: 14, stiffness: 180, mass: 0.5 };

type CardProps = ViewProps & {
  className?: string;
  elevated?: boolean;
  glass?: boolean;
  pressable?: boolean;
  onPress?: () => void;
  children?: ReactNode;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Card = ({ className, elevated = false, glass = false, pressable = false, onPress, style, children, ...props }: CardProps) => {
  const { isDark, tokens } = useAppTheme();
  const scale = useSharedValue(1);

  const shadowStyle = {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: elevated ? 16 : 8 },
    shadowOpacity: isDark ? (elevated ? 0.24 : 0.12) : elevated ? 0.08 : 0.04,
    shadowRadius: elevated ? 32 : 16,
    elevation: elevated ? 8 : 2,
  };

  const borderStyle = {
    borderColor: toRgba(tokens.colors.border, isDark ? 0.5 : 0.9),
    borderWidth: 1,
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (pressable) {
      scale.value = withSpring(0.985, PRESS_SPRING);
    }
  };

  const handlePressOut = () => {
    if (pressable) {
      scale.value = withSpring(1, RELEASE_SPRING);
    }
  };

  const Wrapper = pressable ? AnimatedPressable : View;
  const wrapperProps = pressable
    ? { onPress, onPressIn: handlePressIn, onPressOut: handlePressOut, style: [pressable ? animStyle : undefined] }
    : {};

  if (glass) {
    return (
      <Wrapper {...wrapperProps}>
        <View style={[shadowStyle, style]}>
          <BlurView
            intensity={isDark ? 40 : 75}
            tint={isDark ? 'dark' : 'light'}
            className={cn('overflow-hidden rounded-2xl p-4', className)}
            style={[borderStyle, { backgroundColor: toRgba(tokens.colors.card, isDark ? 0.7 : 0.85) }]}
            {...props}
          >
            {children}
          </BlurView>
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper {...wrapperProps}>
      <View
        {...props}
        className={cn('rounded-2xl p-4', className)}
        style={[
          shadowStyle,
          borderStyle,
          { backgroundColor: toRgb(tokens.colors.card) },
          style,
        ]}
      >
        {children}
      </View>
    </Wrapper>
  );
};

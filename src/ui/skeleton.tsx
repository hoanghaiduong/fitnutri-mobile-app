import { useEffect, useRef } from 'react';
import { Animated, View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

type SkeletonProps = ViewProps & {
  className?: string;
};

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.85, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.45, duration: 700, useNativeDriver: true }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={cn('rounded-2xl bg-secondary', className)}
      style={{ opacity }}
      {...props}
    />
  );
};

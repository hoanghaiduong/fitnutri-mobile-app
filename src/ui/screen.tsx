import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks/use-app-theme';
import { cn } from '@/lib/cn';
import { toRgb } from '@/lib/color';

type ScreenProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  scrollable?: boolean;
  keyboardAware?: boolean;
};

export const Screen = ({
  children,
  className,
  contentClassName,
  keyboardAware = false,
  scrollable = false,
}: ScreenProps) => {
  const { tokens } = useAppTheme();
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 20 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <View className={cn('flex-grow', contentClassName)}>{children}</View>
    </ScrollView>
  ) : (
    <View className={cn('flex-1 px-4 py-5', contentClassName)}>{children}</View>
  );

  const wrappedContent = keyboardAware ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: toRgb(tokens.colors.background) }}>
      <View className={cn('flex-1 bg-background', className)}>{wrappedContent}</View>
    </SafeAreaView>
  );
};

import { View } from 'react-native';

import { Button } from '@/ui/button';
import { Text } from '@/ui/text';

type ErrorStateProps = {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const ErrorState = ({
  actionLabel = 'Try again',
  message,
  onAction,
  title = 'Something went wrong',
}: ErrorStateProps) => (
  <View className="items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/10 px-6 py-10">
    <Text className="text-center" variant="heading-md">{title}</Text>
    <Text className="text-center" tone="muted">{message}</Text>
    {onAction ? <Button onPress={onAction} title={actionLabel} variant="destructive" /> : null}
  </View>
);

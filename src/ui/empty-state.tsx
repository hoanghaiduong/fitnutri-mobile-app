import { View } from 'react-native';

import { EmptyIllustration } from '@/components/illustrations/empty-illustration';
import { Button } from '@/ui/button';
import { Text } from '@/ui/text';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({
  actionLabel,
  description,
  onAction,
  title,
}: EmptyStateProps) => (
  <View className="items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-6 py-10">
    <EmptyIllustration />
    <Text className="text-center" variant="heading-md">
      {title}
    </Text>
    <Text className="text-center" tone="muted">
      {description}
    </Text>
    {actionLabel && onAction ? (
      <Button onPress={onAction} title={actionLabel} variant="secondary" />
    ) : null}
  </View>
);

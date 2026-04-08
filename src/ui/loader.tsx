import { View } from 'react-native';

import { Skeleton } from '@/ui/skeleton';
import { Text } from '@/ui/text';

type LoaderProps = {
  label?: string;
};

export const Loader = ({ label = 'Đang tải...' }: LoaderProps) => (
  <View className="gap-4 py-6">
    <View className="gap-3">
      <Skeleton className="h-40 w-full" />
      <View className="flex-row gap-3">
        <Skeleton className="h-24 flex-1" />
        <Skeleton className="h-24 flex-1" />
      </View>
      <Skeleton className="h-20 w-full" />
    </View>
    <Text className="text-center" tone="muted">
      {label}
    </Text>
  </View>
);

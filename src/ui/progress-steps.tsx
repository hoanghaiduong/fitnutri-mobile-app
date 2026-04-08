import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { Text } from '@/ui/text';

type ProgressStepsProps = {
  current: number;
  total: number;
};

export const ProgressSteps = ({ current, total }: ProgressStepsProps) => (
  <View className="gap-3">
    <View className="flex-row items-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={cn(
            'h-2 rounded-full bg-primary/20',
            index + 1 === current ? 'w-8 bg-primary' : 'flex-1',
          )}
        />
      ))}
    </View>
    <Text tone="primary" variant="caption">
      Bước {current}/{total}
    </Text>
  </View>
);

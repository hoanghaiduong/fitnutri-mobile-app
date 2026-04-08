import { View } from 'react-native';

import { cn } from '@/lib/cn';

type PaginationDotsProps = {
  total: number;
  activeIndex: number;
};

export const PaginationDots = ({ activeIndex, total }: PaginationDotsProps) => (
  <View className="flex-row items-center justify-center gap-2">
    {Array.from({ length: total }).map((_, index) => (
      <View
        key={index}
        className={cn(
          'h-2.5 rounded-full bg-primary/20',
          index === activeIndex ? 'w-8 bg-primary' : 'w-2.5',
        )}
      />
    ))}
  </View>
);

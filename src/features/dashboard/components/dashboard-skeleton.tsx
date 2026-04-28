import { View } from 'react-native';

import { Skeleton } from '@/ui/skeleton';

export const DashboardSkeleton = () => (
  <View className="gap-6 px-4 py-5">
    {/* Menu + Badge */}
    <View className="gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-6 w-36 rounded-full" />
    </View>

    {/* Greeting */}
    <View className="gap-2">
      <Skeleton className="h-9 w-64 rounded-lg" />
      <Skeleton className="h-4 w-80 rounded-lg" />
    </View>

    {/* Goal badge */}
    <Skeleton className="h-14 w-40 rounded-[18px]" />

    {/* Progress card */}
    <Skeleton className="h-52 w-full rounded-[28px]" />

    {/* Calories section */}
    <View className="gap-3">
      <Skeleton className="h-6 w-56 rounded-lg" />
      <View className="flex-row gap-3">
        <Skeleton className="h-48 flex-1 rounded-[28px]" />
        <View className="flex-1 gap-3">
          <Skeleton className="h-20 w-full rounded-[24px]" />
          <Skeleton className="h-20 w-full rounded-[24px]" />
          <Skeleton className="h-20 w-full rounded-[24px]" />
        </View>
      </View>
    </View>

    {/* Meal timeline */}
    <View className="gap-4">
      <Skeleton className="h-6 w-40 rounded-lg" />
      <Skeleton className="h-36 w-full rounded-[28px]" />
      <Skeleton className="h-36 w-full rounded-[28px]" />
    </View>
  </View>
);

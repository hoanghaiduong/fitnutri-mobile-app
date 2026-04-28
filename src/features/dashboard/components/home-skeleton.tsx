import { View } from 'react-native';

import { Skeleton } from '@/ui/skeleton';

export const HomeSkeleton = () => (
  <View className="gap-6 px-4 py-5">
    {/* Search bar */}
    <Skeleton className="h-12 w-full rounded-2xl" />

    {/* Avatar row */}
    <View className="flex-row items-center justify-between">
      <Skeleton className="h-8 w-24 rounded-full" />
      <Skeleton className="h-14 w-14 rounded-full" />
    </View>

    {/* Badge + heading */}
    <View className="gap-3">
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="h-8 w-64 rounded-lg" />
      <Skeleton className="h-4 w-72 rounded-lg" />
    </View>

    {/* Quick stats */}
    <View className="flex-row gap-2">
      <Skeleton className="h-9 flex-1 rounded-full" />
      <Skeleton className="h-9 flex-1 rounded-full" />
      <Skeleton className="h-9 flex-1 rounded-full" />
    </View>

    {/* Streak widget */}
    <Skeleton className="h-44 w-full rounded-[30px]" />

    {/* Goal card */}
    <Skeleton className="h-40 w-full rounded-[30px]" />

    {/* Action buttons */}
    <View className="gap-3">
      <View className="flex-row gap-3">
        <Skeleton className="h-12 flex-1 rounded-[18px]" />
        <Skeleton className="h-12 flex-1 rounded-[18px]" />
      </View>
      <View className="flex-row gap-3">
        <Skeleton className="h-12 flex-1 rounded-[18px]" />
        <Skeleton className="h-12 flex-1 rounded-[18px]" />
      </View>
    </View>

    {/* Overview card */}
    <Skeleton className="h-64 w-full rounded-[32px]" />
  </View>
);

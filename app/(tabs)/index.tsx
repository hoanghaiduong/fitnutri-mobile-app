import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppSidebar } from '@/components/app-sidebar';
import { AppTopSearch } from '@/components/app-top-search';
import { ScreenState } from '@/components/screen-state';
import { TopbarMenu } from '@/components/topbar-menu';
import { ROUTES } from '@/constants/routes';
import { useDashboardOverview } from '@/features/dashboard/hooks/use-dashboard-overview';
import { Avatar } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

const quickStats = [
  { label: 'Năng lượng', icon: 'flash-outline', color: '#D97706' },
  { label: 'Protein', icon: 'barbell-outline', color: '#2563EB' },
  { label: 'Tiến độ', icon: 'analytics-outline', color: '#16A34A' },
] as const;

const HomeScreen = () => {
  const { data, error, execute, loading } = useDashboardOverview();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Screen scrollable>
      <AppSidebar onClose={() => setSidebarOpen(false)} visible={sidebarOpen} />

      <ScreenState
        loading={loading}
        loadingLabel="Đang tải tổng quan..."
        error={error}
        onRetry={() => {
          void execute();
        }}
        isEmpty={!loading && !error && !data}
        emptyTitle="Chưa có dữ liệu tổng quan"
        emptyDescription="Các chỉ số nhanh và lối tắt sẽ xuất hiện ở đây sau khi đồng bộ."
      >
        {data ? (
          <View className="gap-6 pb-44">
            <View className="gap-4 px-1 pb-1">
              <AppTopSearch
                leftSlot={<TopbarMenu onPress={() => setSidebarOpen(true)} />}
                placeholder="Tìm món ăn, macros, kế hoạch..."
              />

              <View className="flex-row justify-end">
                <Avatar className="h-14 w-14" name={data.greetingName} />
              </View>

              <View className="gap-2">
                <Badge label="FitNutri AI" variant="primary" />
                <Text className="max-w-[280px]" variant="heading-xl">Chào buổi sáng, {data.greetingName}!</Text>
                <Text className="max-w-[320px]" tone="muted" variant="body-sm">
                  Tóm tắt nhanh về calories, macros và kế hoạch hôm nay để bạn bắt đầu ngày mới gọn gàng hơn.
                </Text>
              </View>

              <View className="flex-row gap-2">
                {quickStats.map((item) => (
                  <View key={item.label} className="rounded-full bg-secondary/70 px-3 py-2">
                    <View className="flex-row items-center gap-1.5">
                      <Ionicons color={item.color} name={item.icon} size={16} />
                      <Text variant="caption">{item.label}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <Card elevated glass className="gap-4 rounded-[30px] p-5">
              <View className="flex-row items-center justify-between">
                <View className="gap-1">
                  <Text tone="muted" variant="caption">Mục tiêu hiện tại</Text>
                  <Text tone="primary" variant="heading-md">{data.goalLabel}</Text>
                </View>
                <View className="items-end gap-1">
                  <Text tone="muted" variant="caption">Tiến độ tuần</Text>
                  <Text variant="body-sm">{data.weeklyProgress}%</Text>
                </View>
              </View>
              <View className="h-2 overflow-hidden rounded-full bg-primary/10">
                <View className="h-full rounded-full bg-primary" style={{ width: `${data.weeklyProgress}%` }} />
              </View>
              <Button
                onPress={() => router.push(ROUTES.dashboardDetail)}
                rightSlot={<Ionicons color="#FFFFFF" name="arrow-forward" size={18} />}
                title="Mở dashboard chi tiết"
              />
            </Card>

            <View className="gap-3">
              <View className="flex-row gap-3">
                <Button
                  className="flex-1"
                  leftSlot={<Ionicons name="calendar-outline" size={18} />}
                  onPress={() => router.push(ROUTES.weeklyPlan)}
                  title="Lịch tuần"
                  variant="secondary"
                />
                <Button
                  className="flex-1"
                  leftSlot={<Ionicons name="calendar-clear-outline" size={18} />}
                  onPress={() => router.push(ROUTES.monthlyPlan)}
                  title="Lịch tháng"
                  variant="secondary"
                />
              </View>
              <View className="flex-row gap-3">
                <Button
                  className="flex-1"
                  leftSlot={<Ionicons name="restaurant-outline" size={18} />}
                  onPress={() => router.push(ROUTES.result)}
                  title="Thực đơn hôm nay"
                  variant="outline"
                />
                <Button
                  className="flex-1"
                  leftSlot={<Ionicons name="leaf-outline" size={18} />}
                  onPress={() => router.push(ROUTES.emeraldVitality)}
                  title="Emerald Vitality"
                  variant="outline"
                />
              </View>
            </View>

            <Card elevated glass className="gap-5 rounded-[30px] p-5">
              <View className="flex-row items-end justify-between">
                <Text variant="heading-md">Tổng quan nhanh</Text>
                <Text tone="muted" variant="caption">Cập nhật hôm nay</Text>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 rounded-[22px] bg-secondary/65 p-4">
                  <Text tone="muted" variant="caption">Calories đã nạp</Text>
                  <Text variant="heading-md">{data.caloriesConsumed}</Text>
                  <Text className="mt-1" tone="muted" variant="caption">Duy trì ổn định</Text>
                </View>
                <View className="flex-1 rounded-[22px] bg-secondary/65 p-4">
                  <Text tone="muted" variant="caption">Calories còn lại</Text>
                  <Text tone="primary" variant="heading-md">{data.caloriesRemaining}</Text>
                  <Text className="mt-1" tone="muted" variant="caption">Còn dư cho bữa tối</Text>
                </View>
              </View>

              <View className="gap-3 rounded-[24px] bg-secondary/65 p-4">
                <View className="flex-row items-center justify-between">
                  <Text variant="body-sm">Nhịp calories trong ngày</Text>
                  <Text tone="primary" variant="caption">Ổn định</Text>
                </View>
                <View className="flex-row items-end gap-2 pt-1">
                  {[48, 72, 58, 86, 64, 74, 68].map((height, index) => (
                    <View key={index} className="flex-1">
                      <View className="h-[88px] w-full rounded-full bg-primary/10">
                        <View className="absolute bottom-0 w-full rounded-full bg-primary" style={{ height }} />
                      </View>
                    </View>
                  ))}
                </View>
                <View className="flex-row justify-between">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                    <Text key={day} tone="muted" variant="caption">{day}</Text>
                  ))}
                </View>
              </View>
            </Card>
          </View>
        ) : null}
      </ScreenState>
    </Screen>
  );
};

export default HomeScreen;

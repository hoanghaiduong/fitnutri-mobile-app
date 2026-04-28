import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';

import { AppTopSearch } from '@/components/app-top-search';
import { ScreenState } from '@/components/screen-state';
import { TopbarMenu } from '@/components/topbar-menu';
import { ROUTES } from '@/constants/routes';
import { useUIStore } from '@/store/ui-store';
import { useDashboardOverview } from '@/features/dashboard/hooks/use-dashboard-overview';
import { HomeSkeleton } from '@/features/dashboard/components/home-skeleton';
import { StreakWidget } from '@/features/dashboard/components/streak-widget';
import { useStreakStore, calculateStreak } from '@/store/streak-store';
import { Avatar } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

const quickStats = [
  { label: 'Năng lượng', icon: 'flash-outline', color: '#10B981' },
  { label: 'Protein', icon: 'barbell-outline', color: '#2563EB' },
  { label: 'Tiến độ', icon: 'analytics-outline', color: '#16A34A' },
] as const;

const HomeScreen = () => {
  const { data, error, execute, loading } = useDashboardOverview();
  const openSidebar = useUIStore((state) => state.openSidebar);
  const checkIns = useStreakStore((state) => state.checkIns);
  const calculations = useMemo(() => calculateStreak(checkIns), [checkIns]);
  const currentStreak = calculations.currentStreak;

  return (
    <Screen scrollable>


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
        skeleton={<HomeSkeleton />}
      >
        {data ? (
          <View className="gap-6 pb-44">
            <View className="gap-4 px-1 pb-1">
              <AppTopSearch
                leftSlot={<TopbarMenu onPress={openSidebar} />}
                placeholder="Tìm món ăn, macros, kế hoạch..."
              />

              <View className="flex-row items-center justify-between">
                <View 
                  className="flex-row items-center gap-1.5 rounded-full bg-[#FEE2E2] px-3 py-1.5 shadow-sm"
                  style={{ borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)' }}
                >
                  <Ionicons color="#EF4444" name="flame" size={18} />
                  <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>{currentStreak}</Text>
                </View>
                <Avatar className="h-14 w-14 shadow-sm" name={data.greetingName} />
              </View>

              <View className="gap-2">
                <Badge label="FitNutri AI 🌿" variant="primary" />
                <Text className="max-w-[280px]" variant="heading-xl">Chào buổi sáng, {data.greetingName}!</Text>
                <Text className="max-w-[320px]" tone="muted" variant="body-sm">
                  Tóm tắt nhanh phân tích calories và lộ trình sức khỏe, để bạn bắt đầu một ngày mới gọn gàng hơn.
                </Text>
              </View>

              <View className="flex-row gap-2 mt-1">
                {quickStats.map((item) => (
                  <View key={item.label} className="rounded-full bg-secondary/80 px-3.5 py-2.5">
                    <View className="flex-row items-center gap-1.5">
                      <Ionicons color={item.color} name={item.icon} size={16} />
                      <Text variant="caption">{item.label}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View>
              <StreakWidget />
            </View>

            <View>
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
                <View className="h-2.5 overflow-hidden rounded-full bg-primary/20">
                  <View className="h-full rounded-full bg-primary" style={{ width: `${data.weeklyProgress}%` }} />
                </View>
                <Button
                  onPress={() => router.push(ROUTES.dashboardDetail)}
                  rightSlot={<Ionicons color="#FFFFFF" name="arrow-forward" size={18} />}
                  title="Mở dashboard chi tiết"
                />
              </Card>
            </View>

            <View className="gap-3">
              <View className="flex-row gap-3">
                <Button
                  className="flex-1"
                  leftSlot={<Ionicons name="calendar" size={18} color="#3B82F6" />}
                  onPress={() => router.push(ROUTES.weeklyPlan)}
                  title="Lịch tuần"
                  variant="secondary"
                />
                <Button
                  className="flex-1"
                  leftSlot={<Ionicons name="calendar-clear" size={18} color="#A855F7" />}
                  onPress={() => router.push(ROUTES.monthlyPlan)}
                  title="Lịch tháng"
                  variant="secondary"
                />
              </View>
              <View className="flex-row gap-3">
                <Button
                  className="flex-1"
                  leftSlot={<Ionicons name="restaurant" size={18} color="#FFFFFF" />}
                  onPress={() => router.push(ROUTES.result)}
                  title="Thực đơn hôm nay"
                  variant="primary"
                />
                <Button
                  className="flex-1 border-emerald-500/30 bg-emerald-500/10"
                  leftSlot={<Ionicons name="sparkles" size={18} color="#10B981" />}
                  onPress={() => router.push(ROUTES.emeraldVitality)}
                  title="Emerald Vitality"
                  variant="outline"
                />
              </View>
            </View>

            <View>
              <Card elevated glass className="gap-5 rounded-[32px] p-6">
                <View className="flex-row items-end justify-between">
                  <Text variant="heading-md">Tổng quan nhanh</Text>
                  <Text tone="muted" variant="caption">Cập nhật hôm nay</Text>
                </View>

                <View className="flex-row gap-3">
                  <View className="flex-1 rounded-[24px] bg-secondary/70 p-4.5 p-4 items-center justify-center text-center">
                    <Text tone="muted" variant="caption">Nạp vào</Text>
                    <Text variant="heading-lg" className="my-1">{data.caloriesConsumed}</Text>
                    <Text tone="muted" variant="caption">kcal</Text>
                  </View>
                  <View className="flex-1 rounded-[24px] bg-primary/10 p-4.5 p-4 items-center justify-center text-center border border-primary/20">
                    <Text tone="primary" variant="caption">Còn lại</Text>
                    <Text tone="primary" variant="heading-lg" className="my-1">{data.caloriesRemaining}</Text>
                    <Text tone="primary" variant="caption">kcal</Text>
                  </View>
                </View>

                <View className="gap-4 rounded-[24px] bg-secondary/50 p-5 mt-2">
                  <View className="flex-row items-center justify-between">
                    <Text variant="body-sm" className="font-semibold">Nhịp điệu Calories</Text>
                    <Text tone="primary" variant="caption">Ổn định</Text>
                  </View>
                  <View className="flex-row items-end gap-2.5 pt-2">
                    {[48, 72, 58, 86, 64, 74, 68].map((height, index) => (
                      <View key={index} className="flex-1">
                        <View className="h-[96px] w-full rounded-full bg-primary/15">
                          <View className="absolute bottom-0 w-full rounded-full bg-primary" style={{ height }} />
                        </View>
                      </View>
                    ))}
                  </View>
                  <View className="flex-row justify-between pt-1">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                      <Text key={day} tone="muted" variant="caption">{day}</Text>
                    ))}
                  </View>
                </View>
              </Card>
            </View>
          </View>
        ) : null}
      </ScreenState>
    </Screen>
  );
};

export default HomeScreen;

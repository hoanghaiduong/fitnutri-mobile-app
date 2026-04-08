import { Link } from 'expo-router';
import { View } from 'react-native';

import { ScreenState } from '@/components/screen-state';
import { ROUTES } from '@/constants/routes';
import { useMonthlyPlan } from '@/features/plans/hooks/use-monthly-plan';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const MonthlyPlanScreen = () => {
  const { data, error, execute, loading } = useMonthlyPlan();
  const planItems = data ?? [];

  return (
    <Screen scrollable>
      <ScreenState
        loading={loading}
        loadingLabel="Đang tải lịch tháng..."
        error={error}
        onRetry={() => {
          void execute();
        }}
        isEmpty={!loading && !error && planItems.length === 0}
        emptyTitle="Chưa có lịch tháng"
        emptyDescription="Lịch luyện tập theo tháng sẽ xuất hiện ở đây sau khi được tạo."
      >
        <View className="gap-6 pb-8">
          <View className="overflow-hidden rounded-[28px] border border-primary/10 bg-primary/10 p-5">
            <View className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/20" />
            <Text tone="primary" variant="caption">Lộ trình tháng</Text>
            <Text className="mt-1" variant="heading-lg">Theo dõi đều nhịp trong cả tháng</Text>
            <Text className="mt-2" tone="muted" variant="body-sm">
              Xem nhanh tiến độ tập luyện, dinh dưỡng và các ngày cần tập trung nhiều hơn.
            </Text>

            <View className="mt-4 self-start rounded-full bg-card p-1">
              <View className="flex-row gap-1">
                <Link href={ROUTES.weeklyPlan} asChild>
                  <Button size="sm" title="Tuần" variant="ghost" />
                </Link>
                <Button size="sm" title="Tháng" />
              </View>
            </View>
          </View>

          <Card elevated className="gap-6">
            <View className="flex-row items-center justify-between">
              <Text variant="heading-md">Tháng 5, 2024</Text>
              <View className="flex-row gap-2">
                <Button size="sm" title="◀" variant="ghost" />
                <Button size="sm" title="▶" variant="ghost" />
              </View>
            </View>

            <View className="flex-row justify-between rounded-2xl bg-secondary px-3 py-2">
              {weekDays.map((day) => (
                <Text key={day} className="w-8 text-center" tone="muted" variant="caption">
                  {day}
                </Text>
              ))}
            </View>

            <View className="flex-row flex-wrap gap-y-4 rounded-2xl bg-card p-2">
              {planItems.map((item) => (
                <View key={item.day} className="w-[14.28%] items-center justify-center gap-1 py-1">
                  <View className={item.isToday ? 'h-9 w-9 items-center justify-center rounded-full bg-primary shadow-card' : 'h-9 w-9 items-center justify-center rounded-full bg-transparent'}>
                    <Text tone={item.isToday ? 'inverse' : 'default'} variant="body-sm">{item.day}</Text>
                  </View>
                  <View className="h-2 items-center justify-center">
                    {item.hasCompletedWorkout ? <View className="h-1.5 w-1.5 rounded-full bg-primary" /> : null}
                    {!item.hasCompletedWorkout && item.hasPlannedWorkout ? <View className="h-1.5 w-1.5 rounded-full bg-success/60" /> : null}
                  </View>
                </View>
              ))}
            </View>

            <View className="flex-row flex-wrap gap-4 border-t border-border pt-4">
              <View className="flex-row items-center gap-2 rounded-full bg-primary/10 px-3 py-2">
                <View className="h-2 w-2 rounded-full bg-primary" />
                <Text variant="caption">Hoàn thành</Text>
              </View>
              <View className="flex-row items-center gap-2 rounded-full bg-success/10 px-3 py-2">
                <View className="h-2 w-2 rounded-full bg-success/60" />
                <Text variant="caption">Dự kiến tập</Text>
              </View>
            </View>
          </Card>

          <Card elevated className="gap-4 bg-secondary">
            <Text variant="heading-md">Tiến độ tháng</Text>
            <View className="gap-3">
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text variant="body-sm">Tập luyện</Text>
                  <Text tone="primary" variant="caption">12/20 buổi</Text>
                </View>
                <View className="h-2 rounded-full bg-card">
                  <View className="h-2 w-3/5 rounded-full bg-primary" />
                </View>
              </View>
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text variant="body-sm">Dinh dưỡng</Text>
                  <Text tone="primary" variant="caption">22/30 ngày</Text>
                </View>
                <View className="h-2 rounded-full bg-card">
                  <View className="h-2 w-[73%] rounded-full bg-primary" />
                </View>
              </View>
            </View>
          </Card>

          <Card elevated className="gap-4 border-l-4 border-l-primary">
            <View className="flex-row items-start justify-between">
              <View>
                <Text tone="muted" variant="caption">Ngày đang chọn</Text>
                <Text variant="heading-md">16 Tháng 5</Text>
              </View>
              <View className="rounded-full bg-primary/10 px-3 py-2">
                <Text tone="primary" variant="caption">2400 kcal</Text>
              </View>
            </View>
            <Text tone="muted" variant="body-sm">Tập chân & bụng • 60 phút • cường độ vừa đến cao</Text>
            <Button title="Xem chi tiết ngày" />
          </Card>
        </View>
      </ScreenState>
    </Screen>
  );
};

export default MonthlyPlanScreen;

import { Animated, ScrollView, View } from 'react-native';
import { useEffect, useRef } from 'react';

import { MealThumbnail } from '@/components/illustrations/meal-thumbnail';
import { ScreenState } from '@/components/screen-state';
import { useDashboardOverview } from '@/features/dashboard/hooks/use-dashboard-overview';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

const accentColorMap = {
  primary: '#2563EB',
  warning: '#D97706',
  info: '#16A34A',
} as const;

const DashboardDetailScreen = () => {
  const { data, error, execute, loading } = useDashboardOverview();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(14);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Screen>
      <ScreenState
        loading={loading}
        loadingLabel="Đang tải dashboard..."
        error={error}
        onRetry={() => {
          void execute();
        }}
        isEmpty={!loading && !error && !data}
        emptyTitle="Chưa có dữ liệu dashboard"
        emptyDescription="Phần tổng quan sẽ xuất hiện ở đây sau khi đồng bộ xong."
      >
        {data ? (
          <Animated.View style={{ flex: 1, opacity, transform: [{ translateY }] }}>
            <ScrollView contentContainerStyle={{ gap: 24, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
              <View className="gap-4 px-1 pb-1">
                <Badge label="Dashboard chuyên sâu" variant="primary" />
                <View className="gap-2">
                  <Text className="max-w-[280px]" variant="heading-xl">Chào buổi sáng, {data.greetingName}!</Text>
                  <Text className="max-w-[320px]" tone="muted" variant="body-sm">
                    Hôm nay là một ngày tốt để tiếp tục mục tiêu {data.goalLabel.toLowerCase()} với bữa ăn và lịch tập phù hợp.
                  </Text>
                </View>
                <View className="self-start rounded-[18px] bg-primary/10 px-[14px] py-[10px]">
                  <Text tone="muted" variant="caption">Mục tiêu hiện tại</Text>
                  <Text tone="primary" variant="body-sm">{data.goalLabel}</Text>
                </View>
              </View>

              <Card elevated glass className="gap-5 rounded-[28px] p-5">
                <View className="flex-row items-center justify-between">
                  <Text tone="muted" variant="body-sm">Tiến độ tuần này</Text>
                  <Text tone="primary" variant="body-sm">{data.weeklyProgress}%</Text>
                </View>
                <View className="h-[10px] overflow-hidden rounded-full bg-primary/10">
                  <View className="h-full rounded-full bg-primary" style={{ width: `${data.weeklyProgress}%` }} />
                </View>
                <View className="gap-4 rounded-[24px] bg-secondary/80 p-4">
                  <View className="flex-row items-center justify-between">
                    <Text variant="body-sm">Biểu đồ calories tuần</Text>
                    <Text tone="primary" variant="caption">Xu hướng tích cực</Text>
                  </View>
                  <View className="flex-row items-end gap-2 pt-1">
                    {data.trendPoints.map((point, index) => (
                      <View key={index} className="flex-1">
                        <View className="h-24 w-full rounded-full bg-primary/10">
                          <View className="absolute bottom-0 w-full rounded-full bg-primary" style={{ height: point }} />
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

              <View className="gap-4">
                <View className="flex-row items-end justify-between px-1">
                  <Text variant="heading-md">Tổng quan calories & macros</Text>
                  <Text tone="muted" variant="caption">Cập nhật hôm nay</Text>
                </View>
                <View className="flex-row gap-[14px]">
                  <Card elevated glass className="flex-1 items-center justify-center gap-[14px] rounded-[28px] p-5">
                    <View className="h-[154px] w-[154px] items-center justify-center rounded-full border-[10px] border-primary/20 bg-background">
                      <Text variant="heading-lg">{data.caloriesConsumed}</Text>
                      <Text tone="muted" variant="caption">/ {data.caloriesTarget} KCAL</Text>
                    </View>
                    <View className="items-center rounded-[18px] bg-primary/10 px-[14px] py-[10px]">
                      <Text tone="muted" variant="caption">Còn lại</Text>
                      <Text tone="primary" variant="heading-md">{data.caloriesRemaining}</Text>
                    </View>
                  </Card>

                  <View className="flex-1 gap-3">
                    {data.macros.map((macro) => {
                      const progress = Math.min(100, Math.round((macro.consumed / macro.target) * 100));
                      const accent = accentColorMap[macro.accent];
                      return (
                        <Card key={macro.label} elevated glass className="gap-2.5 rounded-[24px] p-[14px]">
                          <View className="flex-row items-center justify-between">
                            <Text variant="caption">{macro.label}</Text>
                            <Text tone="muted" variant="caption">{macro.consumed}g / {macro.target}g</Text>
                          </View>
                          <View className="h-2 overflow-hidden rounded-full bg-primary/10">
                            <View className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: accent }} />
                          </View>
                        </Card>
                      );
                    })}
                  </View>
                </View>
              </View>

              <View className="gap-4">
                <View className="flex-row items-center justify-between px-1">
                  <Text variant="heading-md">Thực đơn hôm nay</Text>
                  <Button size="sm" title="Xem tất cả" variant="ghost" />
                </View>
                <View className="gap-[14px] border-l-2 border-primary/20 pl-[14px]">
                  {data.timeline.map((meal, index) => (
                    <View key={meal.id} className="relative">
                      <View className={`absolute left-[-23px] top-10 h-4 w-4 rounded-full border-4 ${meal.completed ? 'bg-primary' : 'bg-primary/30'} border-background`} />
                      <Card elevated glass className="gap-3 overflow-hidden rounded-[28px] p-3">
                        <MealThumbnail variant={index === 0 ? 'breakfast' : index === 1 ? 'lunch' : 'snack'} width={320} />
                        <View className="gap-1 px-1">
                          <Text tone={meal.completed ? 'primary' : 'muted'} variant="caption">{meal.mealType} • {meal.time}</Text>
                          <Text variant="body-sm">{meal.title}</Text>
                          <Text tone="muted" variant="caption">{meal.calories} Kcal • {meal.protein}g protein</Text>
                        </View>
                      </Card>
                    </View>
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <View className="flex-row gap-3">
                  <Button className="flex-1" title="Tạo thực đơn mới" />
                  <Button className="flex-1" title="Tìm thực phẩm" variant="outline" />
                </View>
                <View className="flex-row gap-3">
                  <Button className="flex-1" title="Theo dõi cân nặng" variant="secondary" />
                  <Button className="flex-1" title="Đánh giá hệ thống" variant="secondary" />
                </View>
              </View>

              <Card elevated glass className="gap-4 rounded-[28px] p-5">
                <Text variant="heading-md">Tóm tắt hồ sơ</Text>
                <View className="flex-row justify-between gap-3">
                  {[{ label: 'BMI', value: `${data.bmi}` }, { label: 'Cân nặng', value: `${data.weightKg}kg` }, { label: 'BMR', value: `${data.bmr}` }].map((item) => (
                    <View key={item.label} className="flex-1 rounded-[18px] bg-secondary/80 px-[14px] py-3">
                      <Text tone="muted" variant="caption">{item.label}</Text>
                      <Text variant="body-sm">{item.value}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            </ScrollView>
          </Animated.View>
        ) : null}
      </ScreenState>
    </Screen>
  );
};

export default DashboardDetailScreen;

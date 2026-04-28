import { Link } from 'expo-router';
import { FlatList, View } from 'react-native';

import { ScreenState } from '@/components/screen-state';
import { TopbarMenu } from '@/components/topbar-menu';
import { ROUTES } from '@/constants/routes';
import { useUIStore } from '@/store/ui-store';
import { useWeeklyPlan } from '@/features/plans/hooks/use-weekly-plan';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

const statusStyles = {
  completed: 'bg-card border-border',
  active: 'bg-card border-primary bg-primary/5',
  upcoming: 'bg-card border-border opacity-90',
  insight: 'bg-primary/10 border-primary/20',
} as const;

const WeeklyPlanScreen = () => {
  const { data, error, execute, loading } = useWeeklyPlan();
  const openSidebar = useUIStore((state) => state.openSidebar);
  const planItems = data ?? [];

  return (
    <Screen>
      <ScreenState
        loading={loading}
        loadingLabel="Đang tải lịch tuần..."
        error={error}
        onRetry={() => {
          void execute();
        }}
        isEmpty={!loading && !error && planItems.length === 0}
        emptyTitle="Chưa có lịch tuần"
        emptyDescription="Timeline luyện tập sẽ xuất hiện ở đây sau khi được tạo."
      >
        <FlatList
          data={planItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="gap-6 pb-6">
              <View className="mb-2 px-1">
                <TopbarMenu onPress={openSidebar} />
              </View>
              <View className="overflow-hidden rounded-[28px] border border-primary/10 bg-primary/10 p-5">
                <View className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/20" />
                <Text tone="primary" variant="caption">Lộ trình tuần</Text>
                <Text className="mt-1" variant="heading-lg">Giữ nhịp tập luyện ổn định</Text>
                <Text className="mt-2" tone="muted" variant="body-sm">
                  Theo dõi từng buổi tập, ngày nghỉ và gợi ý AI để duy trì cường độ hợp lý suốt tuần.
                </Text>

                <View className="mt-4 self-start rounded-full bg-card p-1">
                  <View className="flex-row gap-1">
                    <Button size="sm" title="Tuần" />
                    <Link href={ROUTES.monthlyPlan} asChild>
                      <Button size="sm" title="Tháng" variant="ghost" />
                    </Link>
                  </View>
                </View>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View className="border-l-2 border-primary/20 pl-4 ml-1 mb-5">
              <View className="relative">
                <View className={`absolute -left-[23px] top-8 h-4 w-4 rounded-full border-4 border-background ${item.status === 'active' ? 'bg-primary' : item.status === 'completed' ? 'bg-success' : 'bg-muted'}`} />
                <Card elevated pressable className={`gap-3 ${statusStyles[item.status]}`}>
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1 gap-1">
                      <Text tone={item.status === 'active' || item.status === 'insight' ? 'primary' : 'muted'} variant="caption">
                        {item.dayLabel}
                      </Text>
                      <Text variant="heading-md">{item.title}</Text>
                    </View>
                    {item.status === 'completed' ? <Text tone="success">✓</Text> : null}
                    {item.status === 'active' ? <Text tone="primary">●</Text> : null}
                  </View>
                  <Text tone="muted" variant="body-sm">{item.subtitle}</Text>
                  {item.status === 'active' ? <Button title="Chi tiết buổi tập" /> : null}
                </Card>
              </View>
            </View>
          )}
        />
      </ScreenState>
    </Screen>
  );
};

export default WeeklyPlanScreen;

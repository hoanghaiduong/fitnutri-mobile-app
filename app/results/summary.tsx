import { View } from 'react-native';

import { MealThumbnail } from '@/components/illustrations/meal-thumbnail';
import { ScreenState } from '@/components/screen-state';
import { TopbarMenu } from '@/components/topbar-menu';
import { useUIStore } from '@/store/ui-store';
import { useResultSummary } from '@/features/plans/hooks/use-result-summary';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

const ResultSummaryScreen = () => {
  const { data, error, execute, loading } = useResultSummary();
  const openSidebar = useUIStore((state) => state.openSidebar);

  return (
    <Screen scrollable>
      <ScreenState
        loading={loading}
        loadingLabel="Đang tải thực đơn..."
        error={error}
        onRetry={() => {
          void execute();
        }}
        isEmpty={!loading && !error && !data}
        emptyTitle="Chưa có thực đơn"
        emptyDescription="Thực đơn hôm nay sẽ xuất hiện ở đây sau khi được tạo."
      >
        {data ? (
          <View className="gap-6 pb-8">
            <View className="mb-2 px-1">
              <TopbarMenu onPress={openSidebar} />
            </View>
            <View className="gap-3 px-1 pb-1">
              <Badge label="Kết quả đề xuất" variant="primary" />
              <View className="gap-2">
                <Text className="max-w-[280px]" variant="heading-xl">Thực đơn hôm nay</Text>
                <Text className="max-w-[320px]" tone="muted" variant="body-sm">
                  Bản kế hoạch này cân bằng giữa calories, protein và khả năng duy trì lâu dài trong ngày.
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              {[
                { label: 'Kcal', value: `${data.calories}` },
                { label: 'Pro', value: `${data.protein}g` },
                { label: 'Carb', value: `${data.carbs}g` },
                { label: 'Fat', value: `${data.fat}g` },
              ].map((item) => (
                <Card key={item.label} elevated glass className="flex-1 items-center gap-1.5 rounded-[24px] p-[14px]">
                  <Text tone="muted" variant="caption">{item.label}</Text>
                  <Text tone="primary" variant="heading-md">{item.value}</Text>
                </Card>
              ))}
            </View>

            <Card elevated glass className="gap-2 rounded-[28px] p-5">
              <Text tone="primary" variant="heading-md">Gợi ý từ AI</Text>
              <Text tone="muted" variant="body-sm">{data.insight}</Text>
              <Text tone="muted" variant="caption">Nguồn: Bảng thành phần thực phẩm Việt Nam</Text>
            </Card>

            <View className="gap-4">
              <View className="flex-row items-center justify-between px-1">
                <Text variant="heading-md">Các bữa ăn đề xuất</Text>
                <Text tone="muted" variant="caption">Cá nhân hoá</Text>
              </View>
              <View className="gap-4 border-l-2 border-primary/20 pl-[14px]">
                {data.meals.map((meal) => (
                  <View key={meal.id} className="relative">
                    <View className="absolute left-[-23px] top-[34px] h-4 w-4 rounded-full border-4 border-background bg-primary" />
                    <Card elevated glass className="gap-3 overflow-hidden rounded-[28px] p-3">
                      <MealThumbnail variant={meal.imageVariant} width={320} />
                      <View className="gap-1 px-1">
                        <View className="flex-row items-center justify-between">
                          <Text variant="heading-md">{meal.mealType}</Text>
                          <View className="rounded-full bg-secondary px-3 py-1.5">
                            <Text variant="caption">{meal.time}</Text>
                          </View>
                        </View>
                        <Text variant="body-sm">{meal.title}</Text>
                        <Text tone="muted" variant="caption">{meal.calories} kcal • {meal.protein}g protein</Text>
                      </View>
                      <Button size="sm" title="Đổi món" variant="secondary" />
                    </Card>
                  </View>
                ))}
              </View>
            </View>

            <Card elevated glass className="gap-3 rounded-[28px] p-5">
              <Text variant="heading-md">Tóm tắt lựa chọn</Text>
              <Text tone="muted" variant="body-sm">
                Các món được gợi ý ưu tiên tính cân bằng dinh dưỡng, khả năng duy trì và cảm giác ngon miệng cho cả ngày.
              </Text>
              <Button size="lg" title="Bắt đầu thực đơn này" />
            </Card>
          </View>
        ) : null}
      </ScreenState>
    </Screen>
  );
};

export default ResultSummaryScreen;

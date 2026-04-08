import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View } from 'react-native';

import { AppTopSearch } from '@/components/app-top-search';
import { ROUTES } from '@/constants/routes';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

const resultCards = [
  {
    title: 'Kết quả đề xuất',
    description: 'Xem tóm tắt gợi ý dinh dưỡng và các điểm đáng chú ý mới nhất.',
    icon: 'sparkles-outline',
    route: ROUTES.result,
  },
  {
    title: 'Emerald Vitality',
    description: 'Mở nhanh feature chuyên sâu để xem thêm các gợi ý nổi bật.',
    icon: 'leaf-outline',
    route: ROUTES.emeraldVitality,
  },
] as const;

const ResultsScreen = () => (
  <Screen scrollable>
    <View className="gap-6 pb-44">
      <View className="gap-4 px-1 pt-2">
        <AppTopSearch placeholder="Tìm kết quả, đề xuất..." />
        <Badge label="Khám phá" variant="success" />
        <Text className="max-w-[280px]" variant="heading-xl">
          Gợi ý và kết quả
        </Text>
        <Text className="max-w-[320px]" tone="muted" variant="body-sm">
          Đây là khu vực mở nhanh các màn tổng hợp, đề xuất và feature nổi bật của FitNutri.
        </Text>
      </View>

      <View className="gap-4">
        {resultCards.map((item) => (
          <Card key={item.title} elevated glass className="gap-4 rounded-[28px] p-5">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 gap-2">
                <Text variant="heading-md">{item.title}</Text>
                <Text tone="muted" variant="body-sm">
                  {item.description}
                </Text>
              </View>
              <View className="h-12 w-12 items-center justify-center rounded-[18px] bg-success/10">
                <Ionicons color="#16A34A" name={item.icon} size={22} />
              </View>
            </View>

            <Button
              onPress={() => router.push(item.route)}
              rightSlot={<Ionicons color="#FFFFFF" name="arrow-forward" size={18} />}
              title="Mở ngay"
            />
          </Card>
        ))}
      </View>
    </View>
  </Screen>
);

export default ResultsScreen;

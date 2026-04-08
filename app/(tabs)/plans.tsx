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

const planCards = [
  {
    title: 'Lịch tuần',
    description: 'Xem nhanh nhịp độ ăn uống và tập luyện trong 7 ngày tới.',
    icon: 'calendar-outline',
    route: ROUTES.weeklyPlan,
  },
  {
    title: 'Lịch tháng',
    description: 'Theo dõi bức tranh dài hơn để cân chỉnh mục tiêu ổn định.',
    icon: 'calendar-clear-outline',
    route: ROUTES.monthlyPlan,
  },
] as const;

const PlansScreen = () => (
  <Screen scrollable>
    <View className="gap-6 pb-44">
      <View className="gap-4 px-1 pt-2">
        <AppTopSearch placeholder="Tìm lịch tuần, lịch tháng..." />
        <Badge label="Lộ trình" variant="primary" />
        <Text className="max-w-[280px]" variant="heading-xl">
          Kế hoạch của bạn
        </Text>
        <Text className="max-w-[320px]" tone="muted" variant="body-sm">
          Tổng hợp nhanh những lối tắt quan trọng để bạn mở lịch tuần, lịch tháng và bám sát mục tiêu.
        </Text>
      </View>

      <View className="gap-4">
        {planCards.map((item) => (
          <Card key={item.title} elevated glass className="gap-4 rounded-[28px] p-5">
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 gap-2">
                <Text variant="heading-md">{item.title}</Text>
                <Text tone="muted" variant="body-sm">
                  {item.description}
                </Text>
              </View>
              <View className="h-12 w-12 items-center justify-center rounded-[18px] bg-primary/10">
                <Ionicons color="#2563EB" name={item.icon} size={22} />
              </View>
            </View>

            <Button
              onPress={() => router.push(item.route)}
              rightSlot={<Ionicons color="#FFFFFF" name="arrow-forward" size={18} />}
              title={`Mở ${item.title.toLowerCase()}`}
            />
          </Card>
        ))}
      </View>
    </View>
  </Screen>
);

export default PlansScreen;

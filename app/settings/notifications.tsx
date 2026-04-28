import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Text } from '@/ui/text';
import { useAppTheme } from '@/hooks/use-app-theme';

const NotificationRow = ({ label, description, initValue = true }: any) => {
  const { tokens } = useAppTheme();
  const [value, setValue] = useState(initValue);
  
  return (
    <View className="flex-row items-center justify-between py-4 border-b border-border last:border-b-0">
      <View className="flex-1 pr-4 gap-1">
        <Text variant="body-md" className="font-medium">{label}</Text>
        <Text tone="muted" variant="caption">{description}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={setValue} 
        trackColor={{ true: `rgb(${tokens.colors.primary})`, false: `rgb(${tokens.colors.border})` }}
      />
    </View>
  );
}

const NotificationsBody = () => {
  const { tokens } = useAppTheme();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: `rgb(${tokens.colors.background})` }}>
      <View className="flex-row items-center justify-between px-5 py-2">
        <Button 
          variant="secondary" 
          size="sm"
          onPress={() => router.back()} 
          leftSlot={<Ionicons name="arrow-back" size={20} color={`rgb(${tokens.colors.foreground})`} />}
          className="w-10 h-10 p-0 rounded-full bg-secondary/80 justify-center items-center"
          title=""
        />
        <Text variant="heading-md">Cài đặt Thông báo</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="flex-1 px-5 pt-8 gap-6">
        <Card elevated glass className="px-5 rounded-[28px] overflow-hidden">
          <NotificationRow 
            label="Nhắc nhở luyện tập & dinh dưỡng"
            description="Thông báo đẩy nhắc nhở lịch tập, uống nước, và bữa ăn trong ngày."
            initValue={true}
          />
          <NotificationRow 
            label="Mẹo & Kiến thức sức khỏe"
            description="Nhận các mẹo hữu ích từ FitNutri hàng tuần qua ứng dụng."
            initValue={false}
          />
          <NotificationRow 
            label="Chương trình ưu đãi"
            description="Cập nhật khuyến mãi khi nâng cấp gói thành viên."
            initValue={true}
          />
          <NotificationRow 
            label="Thông báo qua Email"
            description="Nhận báo cáo hàng tuần vào hộp thư email của bạn."
            initValue={false}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default function NotificationsScreen() {
  return (
    <AppErrorBoundary>
      <NotificationsBody />
    </AppErrorBoundary>
  );
}

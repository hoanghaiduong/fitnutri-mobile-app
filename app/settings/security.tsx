import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';
import { useAppTheme } from '@/hooks/use-app-theme';
import { TopBarMenu } from '@/components/topbar-menu';

const SecurityBody = () => {
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
        <Text variant="heading-md">Mật khẩu & Bảo mật</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="flex-1 px-5 pt-8 gap-6">
        <Text tone="muted" variant="body-sm">
          Bạn nên sử dụng mật khẩu mạnh mà bạn không sử dụng ở nơi nào khác.
        </Text>

        <Card elevated glass className="p-5 gap-5 rounded-[28px]">
          <Input 
            label="Mật khẩu hiện tại" 
            placeholder="Nhập mật khẩu cũ" 
            secureTextEntry 
          />
          <Input 
            label="Mật khẩu mới" 
            placeholder="Tối thiểu 8 ký tự" 
            secureTextEntry 
          />
          <Input 
            label="Xác nhận mật khẩu mới" 
            placeholder="Nhập lại mật khẩu mới" 
            secureTextEntry 
          />

          <View className="mt-2">
            <Button title="Đổi mật khẩu" />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default function SecurityScreen() {
  return (
    <AppErrorBoundary>
      <SecurityBody />
    </AppErrorBoundary>
  );
}

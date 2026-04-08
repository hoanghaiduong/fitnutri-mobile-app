import { router } from 'expo-router';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { AppSidebar } from '@/components/app-sidebar';
import { AppTopSearch } from '@/components/app-top-search';
import { ThemeToggle } from '@/components/theme-toggle';
import { TopbarMenu } from '@/components/topbar-menu';
import { useSettingsForm } from '@/features/settings/hooks/use-settings-form';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useAuthStore } from '@/store/auth-store';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const SettingsBody = () => {
  const { form, loading, onSubmit, submitting } = useSettingsForm();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { tokens } = useAppTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: `rgb(${tokens.colors.background})` }}>
        <View className="flex-1 items-center justify-center gap-3">
          <ActivityIndicator color={`rgb(${tokens.colors.primary})`} />
          <Text tone="muted" variant="body-sm">Đang tải cài đặt...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: `rgb(${tokens.colors.background})` }}>
      <AppSidebar onClose={() => setSidebarOpen(false)} visible={sidebarOpen} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 208, gap: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View className="gap-4 px-1 pb-1">
          <AppTopSearch
            leftSlot={<TopbarMenu onPress={() => setSidebarOpen(true)} />}
            placeholder="Tìm cài đặt, giao diện..."
          />
          <View className="flex-row justify-end">
            <Badge label="Cá nhân hoá" variant="primary" />
          </View>
          <View className="gap-2">
            <Text tone="primary" variant="caption">Thiết lập tài khoản</Text>
            <Text className="max-w-[280px]" variant="heading-xl">Cài đặt</Text>
            <Text className="max-w-[320px]" tone="muted" variant="body-sm">
              Quản lý hồ sơ, giao diện và phiên làm việc theo cách sạch hơn, thoáng hơn và nhất quán hơn toàn app.
            </Text>
          </View>
        </View>

        <Card elevated glass className="gap-3 rounded-[28px] p-5">
          <Text tone="muted" variant="caption">PHIÊN HIỆN TẠI</Text>
          <View className="rounded-[18px] bg-secondary px-4 py-3.5">
            <Text className="font-semibold" variant="body-sm">{user?.email ?? 'guest@fitnutri.app'}</Text>
          </View>
        </Card>

        <Card elevated glass className="gap-5 rounded-[28px] p-5">
          <View className="gap-1.5">
            <Text variant="heading-md">Thông tin hiển thị</Text>
            <Text tone="muted" variant="caption">Tên này sẽ dùng trong lời chào và hồ sơ cá nhân.</Text>
          </View>
          <Controller
            control={form.control}
            name="displayName"
            render={({ field, fieldState }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                label="Tên hiển thị"
                placeholder="Nhập tên của bạn"
                error={fieldState.error?.message}
              />
            )}
          />
          <View className="border-t border-border/60 pt-4">
            <Button onPress={() => void onSubmit()} loading={submitting} title="Lưu thay đổi" size="lg" />
          </View>
        </Card>

        <Card elevated glass className="gap-5 rounded-[28px] p-5">
          <View className="gap-1.5">
            <Text variant="heading-md">Giao diện</Text>
            <Text tone="muted" variant="body-sm">
              Chọn sáng, tối hoặc để ứng dụng tự theo hệ thống. Giao diện giờ dùng cùng một context với toàn app.
            </Text>
          </View>
          <ThemeToggle />
        </Card>

        <Button
          onPress={() => {
            void logout().then(() => {
              router.replace('/auth/login');
            });
          }}
          title="Đăng xuất"
          variant="destructive"
          size="lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsScreen = () => (
  <AppErrorBoundary>
    <SettingsBody />
  </AppErrorBoundary>
);

export default SettingsScreen;

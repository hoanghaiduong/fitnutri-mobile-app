import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Controller } from 'react-hook-form';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@/components/app-error-boundary';

import { ThemeToggle } from '@/components/theme-toggle';
import { useSettingsForm } from '@/features/settings/hooks/use-settings-form';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useAuthStore } from '@/store/auth-store';
import { useSettingsStore } from '@/store/settings-store';
import { useUIStore } from '@/store/ui-store';
import { Avatar } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const SettingsRow = ({ icon, label, value = '', onPress = () => { }, rightIcon = 'chevron-forward', color = '#64748B', isDestructive = false }: any) => (
  <Pressable onPress={onPress} className="flex-row items-center justify-between py-3.5 border-b border-border last:border-b-0">
    <View className="flex-row items-center gap-3.5">
      <View className="w-9 h-9 items-center justify-center rounded-full" style={{ backgroundColor: isDestructive ? '#FEE2E2' : `${color}25` }}>
        <Ionicons name={icon} size={18} color={isDestructive ? '#EF4444' : color} />
      </View>
      <Text variant="body-md" className="font-medium" style={isDestructive ? { color: '#EF4444' } : {}}>{label}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      {value ? <Text tone="muted" variant="body-sm">{value}</Text> : null}
      {rightIcon ? <Ionicons name={rightIcon} size={16} color="#94A3B8" /> : null}
    </View>
  </Pressable>
);

const SettingsSwitchRow = ({ icon, label, value, onValueChange, color = '#64748B' }: any) => {
  const { tokens } = useAppTheme();
  return (
    <View className="flex-row items-center justify-between py-3.5 border-b border-border last:border-b-0">
      <View className="flex-row items-center gap-3.5">
        <View className="w-9 h-9 items-center justify-center rounded-full" style={{ backgroundColor: `${color}25` }}>
          <Ionicons name={icon} size={18} color={color} />
        </View>
        <Text variant="body-md" className="font-medium">{label}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ true: `rgb(${tokens.colors.primary})`, false: `rgb(${tokens.colors.border})` }}
      />
    </View>
  );
};

const SettingsBody = () => {
  const { form, loading, onSubmit, submitting } = useSettingsForm();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { tokens } = useAppTheme();
  const openSidebar = useUIStore((state) => state.openSidebar);

  
  const biometricsEnabled = useSettingsStore((state) => state.biometricsEnabled);
  const setBiometrics = useSettingsStore((state) => state.setBiometrics);
  const [bioType, setBioType] = useState('Sinh trắc học');
  const [bioIcon, setBioIcon] = useState('finger-print-outline');

  useEffect(() => {
    (async () => {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        setBioType('Face ID');
        setBioIcon('scan-outline');
      } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBioType('Vân tay');
        setBioIcon('finger-print-outline');
      }
    })();
  }, []);

  const handleBiometricsToggle = async (value: boolean) => {
    if (!value) {
      setBiometrics(false);
      return;
    }
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    
    if (!hasHardware || !isEnrolled) {
      Alert.alert('Không khả dụng', 'Thiết bị của bạn không hỗ trợ hoặc chưa cài đặt vân tay / Face ID.');
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Xác thực để bật đăng nhập nhanh',
      fallbackLabel: 'Sử dụng mật khẩu',
      cancelLabel: 'Hủy',
    });

    if (success) {
      setBiometrics(true);
    }
  };

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

  const handleLogout = () => {
    void logout().then(() => {
      router.replace('/auth/login');
    });
  };

  return (
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: `rgb(${tokens.colors.background})` }}>
      <View className="flex-row items-center justify-between px-5 py-2">
        <Pressable onPress={openSidebar} className="w-10 h-10 items-center justify-center rounded-full bg-secondary/80">
          <Ionicons name="menu" size={22} color={`rgb(${tokens.colors.foreground})`} />
        </Pressable>
        <Text variant="heading-md">Hồ sơ cá nhân</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 160, gap: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View className="items-center mt-2 mb-2 gap-3">
          <View className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-md" name={form.watch('displayName') || user?.email || 'User'} />
            <Pressable className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary items-center justify-center border-2 border-background">
              <Ionicons name="camera" size={14} color="#FFF" />
            </Pressable>
          </View>
          <View className="items-center gap-1">
            <Text variant="heading-xl">{form.watch('displayName') || user?.email?.split('@')[0] || 'Tài khoản'}</Text>
            <Text tone="muted" variant="body-md">{user?.email ?? 'guest@fitnutri.app'}</Text>
          </View>
          <Badge label="Thành viên Miễn phí" variant="neutral" style={{ alignSelf: 'center' }} />
        </View>

        <View className="gap-2">
          <Text tone="muted" variant="caption" className="ml-2 uppercase tracking-wide">Tài khoản</Text>
          <Card elevated glass className="gap-0 rounded-[28px] overflow-hidden px-5 py-2">
            <Controller
              control={form.control}
              name="displayName"
              render={({ field, fieldState }) => (
                <View className="py-3">
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    label="Tên hiển thị"
                    placeholder="Nhập tên của bạn"
                    error={fieldState.error?.message}
                  />
                  {form.formState.isDirty && (
                    <View className="pt-3">
                      <Button onPress={() => void onSubmit()} loading={submitting} title="Lưu thay đổi" size="sm" />
                    </View>
                  )}
                </View>
              )}
            />
            <SettingsRow icon="mail-outline" label="Email" value={user?.email || ''} rightIcon="" color="#3B82F6" />
            <SettingsSwitchRow icon={bioIcon} label={`Đăng nhập bằng ${bioType}`} value={biometricsEnabled} onValueChange={handleBiometricsToggle} color="#10B981" />
            <SettingsRow icon="shield-checkmark-outline" label="Bảo mật & Mật khẩu" onPress={() => router.push('/settings/security')} color="#8B5CF6" />
          </Card>
        </View>

        <View className="gap-2">
          <Text tone="muted" variant="caption" className="ml-2 uppercase tracking-wide">Hệ thống & Giao diện</Text>
          <Card elevated glass className="gap-3 rounded-[28px] p-5">
            <ThemeToggle />
            <View className="border-t border-border mt-1">
              <SettingsRow icon="notifications-outline" label="Thông báo" onPress={() => router.push('/settings/notifications')} color="#F59E0B" />
              <SettingsRow icon="language-outline" label="Ngôn ngữ" value="Tiếng Việt" onPress={() => router.push('/settings/language')} color="#8B5CF6" />
            </View>
          </Card>
        </View>

        <View className="gap-2">
          <Text tone="muted" variant="caption" className="ml-2 uppercase tracking-wide">Khác</Text>
          <Card elevated glass className="gap-0 rounded-[28px] px-5 py-2">
            <SettingsRow icon="help-circle-outline" label="Trợ giúp & Hỗ trợ" color="#64748B" />
            <SettingsRow icon="information-circle-outline" label="Về FitNutri" value="v1.0.0" rightIcon="" color="#64748B" />
            <SettingsRow icon="log-out-outline" label="Đăng xuất" isDestructive onPress={handleLogout} rightIcon="" />
          </Card>
        </View>
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

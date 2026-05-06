import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';
import { useAppTheme } from '@/hooks/use-app-theme';
import { biometricPreferenceService, type BiometricPreferenceResult } from '@/services/biometric-preference-service';

const getBiometricFailureMessage = (result: Extract<BiometricPreferenceResult, { ok: false }>): string => {
  if (result.reason === 'unsupported') {
    return 'Thiết bị của bạn chưa đặt mật mã máy hoặc chưa cài đặt Face ID / vân tay.';
  }

  if (result.reason === 'persist_failed') {
    return 'Không thể lưu cài đặt. Vui lòng thử lại sau.';
  }

  switch (result.authenticationError) {
    case 'user_cancel':
    case 'app_cancel':
    case 'system_cancel':
      return 'Bạn đã hủy xác thực nên app chưa bật mở khóa nhanh.';
    case 'not_enrolled':
      return 'Thiết bị chưa đặt mật mã máy hoặc chưa cài Face ID / vân tay. Hãy bật khóa màn hình trong cài đặt hệ thống trước.';
    case 'lockout':
      return 'Xác thực thiết bị đang bị khóa do thử sai nhiều lần. Hãy mở khóa thiết bị rồi thử lại.';
    case 'not_available':
    case 'passcode_not_set':
      return 'Hệ điều hành chưa cho app dùng xác thực thiết bị. Hãy kiểm tra mật mã khóa màn hình rồi thử lại.';
    case 'authentication_failed':
    case 'timeout':
    case 'unable_to_process':
      return 'Không xác thực được bằng khóa máy. Vui lòng thử lại.';
    default:
      return 'Không mở được yêu cầu xác thực thiết bị. Vui lòng thử lại.';
  }
};

const SecurityBody = () => {
  const { tokens } = useAppTheme();
  
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const [supported, enabled] = await Promise.all([
          biometricPreferenceService.isSupported(),
          biometricPreferenceService.isEnabled(),
        ]);

        if (!mounted) {
          return;
        }

        setIsBiometricSupported(supported);
        setIsBiometricEnabled(enabled);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void init();

    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleBiometric = async (value: boolean) => {
    const result = await biometricPreferenceService.setEnabled(
      value,
      'Xác thực để bật mở khóa bằng Face ID / vân tay / mật mã'
    );

    if (result.ok) {
      setIsBiometricEnabled(result.enabled);
      return;
    }

    Alert.alert('Chưa bật được', getBiometricFailureMessage(result));
  };

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

        <Card elevated glass className="p-5 flex-row items-center justify-between rounded-[28px]">
          <View className="flex-1 mr-4">
            <Text variant="body-md" className="mb-1 font-semibold">Mở khóa bằng Face ID / vân tay / mật mã</Text>
            {!isBiometricSupported && !isLoading && (
              <Text tone="muted" variant="caption">
                Thiết bị của bạn chưa đặt mật mã máy hoặc chưa cài đặt Face ID / vân tay.
              </Text>
            )}
          </View>
          <Switch 
            value={isBiometricEnabled}
            onValueChange={handleToggleBiometric}
            disabled={isLoading}
            trackColor={{ false: '#CBD5E1', true: `rgb(${tokens.colors.primary})` }}
          />
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

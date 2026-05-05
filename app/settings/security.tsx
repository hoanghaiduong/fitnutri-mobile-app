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
import { settingsApi } from '@/services/api/settings-api';
import { tokenService } from '@/services/token-service';
import { biometricService } from '@/services/biometric-service';

const SecurityBody = () => {
  const { tokens } = useAppTheme();
  
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isHardwareSupported, setIsHardwareSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supported = await biometricService.isSupported();
      setIsHardwareSupported(supported);
      
      const enabled = await tokenService.isBiometricEnabled();
      setIsBiometricEnabled(enabled);
      
      setIsLoading(false);
    };
    init();
  }, []);

  const handleToggleBiometric = async (value: boolean) => {
    if (value) {
      const authResult = await biometricService.authenticate('Xác thực để bật mở khóa bằng Face ID / Vân tay');
      if (!authResult) {
         return; 
      }
    }
    
    setIsBiometricEnabled(value);
    
    try {
      await settingsApi.updatePreferences({ biometricUnlockEnabled: value });
      await tokenService.setBiometricEnabled(value);
      
      const currentTokens = await tokenService.getTokens();
      if (currentTokens) {
         await tokenService.saveTokens(currentTokens);
      }
    } catch (e) {
      setIsBiometricEnabled(!value);
      await tokenService.setBiometricEnabled(!value);
      Alert.alert('Lỗi', 'Không thể lưu cài đặt. Vui lòng thử lại sau.');
    }
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
            <Text variant="heading-sm" className="mb-1">Mở khóa bằng Face ID / vân tay</Text>
            {!isHardwareSupported && !isLoading && (
              <Text tone="muted" variant="caption">
                Thiết bị của bạn không hỗ trợ hoặc chưa cài đặt sinh trắc học.
              </Text>
            )}
          </View>
          <Switch 
            value={isBiometricEnabled}
            onValueChange={handleToggleBiometric}
            disabled={!isHardwareSupported || isLoading}
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

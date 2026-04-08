import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View } from 'react-native';

import { ROUTES } from '@/constants/routes';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const RegisterStep1Screen = () => (
  <AuthShell
    accent="primary"
    eyebrow="Tạo tài khoản"
    heroIcon="person-add-outline"
    sectionBadge="Bước 1/2"
    sectionTitle="Thông tin cơ bản"
    sectionDescription="Nhập vài thông tin đầu tiên để bắt đầu tạo tài khoản FitNutri."
    subtitle="Bắt đầu với những thông tin cần thiết để tạo tài khoản mới."
    title="Tạo tài khoản mới"
    footer={
      <View className="items-center gap-2">
        <Text tone="muted" variant="caption">
          Đã có tài khoản?
        </Text>
        <Button onPress={() => router.replace(ROUTES.login)} size="sm" title="Đăng nhập" variant="ghost" />
      </View>
    }
  >
    <View className="gap-4">
      <Input label="Họ và tên" placeholder="Nguyễn Văn A" />
      <Input autoCapitalize="none" autoComplete="email" label="Email" placeholder="tenban@example.com" />
      <Input autoComplete="new-password" label="Mật khẩu" placeholder="Tạo mật khẩu an toàn" secureTextEntry />
    </View>

    <View className="border-t border-border/40 pt-4">
      <Button
        className="w-full"
        leftSlot={<Ionicons color="#FFFFFF" name="arrow-forward" size={18} />}
        onPress={() => router.push(ROUTES.registerStep2)}
        size="lg"
        title="Tiếp tục"
      />
    </View>
  </AuthShell>
);

export default RegisterStep1Screen;

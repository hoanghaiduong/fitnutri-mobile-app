import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { ROUTES } from '@/constants/routes';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { useForgotPasswordForm } from '@/features/auth/hooks/use-forgot-password-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const ForgotPasswordScreen = () => {
  const { form, onSubmit, submitting } = useForgotPasswordForm();

  return (
    <AuthShell
      accent="warning"
      eyebrow="Khôi phục mật khẩu"
      heroIcon="shield-checkmark-outline"
      sectionBadge="Email xác minh"
      sectionTitle="Nhận mã OTP qua email"
      sectionDescription="Nhập email đã đăng ký để chúng tôi gửi mã xác thực."
      subtitle="Khôi phục quyền truy cập bằng một bước xác minh ngắn gọn."
      title="Quên mật khẩu"
      footer={
        <View className="items-center gap-2">
          <Text tone="muted" variant="caption">
            Đã nhớ lại thông tin đăng nhập?
          </Text>
          <Button onPress={() => router.replace(ROUTES.login)} size="sm" title="Quay lại đăng nhập" variant="ghost" />
        </View>
      }
    >
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            autoCapitalize="none"
            autoComplete="email"
            error={fieldState.error?.message}
            keyboardType="email-address"
            label="Email"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder="tenban@example.com"
            value={field.value}
          />
        )}
      />

      <View className="gap-3 border-t border-border/40 pt-4">
        <Button
          className="w-full"
          leftSlot={<Ionicons color="#FFFFFF" name="mail-outline" size={18} />}
          loading={submitting}
          onPress={onSubmit}
          size="lg"
          title="Gửi mã OTP"
        />
        <Text tone="muted" variant="caption">
          Sau khi xác nhận OTP, bạn sẽ được đưa tiếp vào luồng trong app hiện có.
        </Text>
      </View>
    </AuthShell>
  );
};

export default ForgotPasswordScreen;

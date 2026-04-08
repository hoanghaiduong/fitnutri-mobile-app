import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { ROUTES } from '@/constants/routes';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { usePhoneLoginForm } from '@/features/auth/hooks/use-phone-login-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const PhoneLoginScreen = () => {
  const { form, onSubmit, submitting } = usePhoneLoginForm();

  return (
    <AuthShell
      accent="primary"
      eyebrow="Đăng nhập SMS"
      heroIcon="chatbubble-ellipses-outline"
      sectionBadge="Số điện thoại"
      sectionTitle="Nhận mã OTP qua SMS"
      sectionDescription="Nhập số điện thoại của bạn, chúng tôi sẽ gửi mã xác minh để đăng nhập nhanh."
      subtitle="Đăng nhập nhanh bằng số điện thoại mà không cần nhập mật khẩu."
      title="Đăng nhập bằng số điện thoại"
      footer={
        <View className="items-center gap-2">
          <Text tone="muted" variant="caption">
            Muốn quay lại các cách đăng nhập khác?
          </Text>
          <Button onPress={() => router.replace(ROUTES.login)} size="sm" title="Quay lại đăng nhập" variant="ghost" />
        </View>
      }
    >
      <Controller
        control={form.control}
        name="phone"
        render={({ field, fieldState }) => (
          <Input
            autoComplete="tel"
            error={fieldState.error?.message}
            keyboardType="phone-pad"
            label="Số điện thoại"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder="09xxxxxxxx"
            value={field.value}
          />
        )}
      />

      <View className="gap-3 border-t border-border/40 pt-4">
        <Button
          className="w-full"
          leftSlot={<Ionicons color="#FFFFFF" name="paper-plane-outline" size={18} />}
          loading={submitting}
          onPress={onSubmit}
          size="lg"
          title="Gửi mã SMS"
        />
        <Text tone="muted" variant="caption">
          Sau khi xác minh OTP, bạn sẽ được đưa thẳng vào luồng thiết lập hồ sơ.
        </Text>
      </View>
    </AuthShell>
  );
};

export default PhoneLoginScreen;

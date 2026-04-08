import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { ROUTES } from '@/constants/routes';
import { type OtpChannel, type OtpIntent } from '@/features/auth/constants';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { useOtpCountdown } from '@/features/auth/hooks/use-otp-countdown';
import { useOtpForm } from '@/features/auth/hooks/use-otp-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const normalizeParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);

const otpConfigMap: Record<
  OtpIntent,
  {
    accent: 'primary' | 'success' | 'warning';
    eyebrow: string;
    heroIcon: 'key-outline' | 'mail-open-outline' | 'chatbubble-ellipses-outline';
    title: string;
    subtitle: string;
    sectionBadge: string;
    sectionTitle: string;
    sectionDescription: string;
  }
> = {
  'phone-login': {
    accent: 'primary',
    eyebrow: 'Đăng nhập SMS',
    heroIcon: 'chatbubble-ellipses-outline',
    title: 'Nhập mã xác minh',
    subtitle: 'Mã OTP vừa được gửi tới số điện thoại của bạn.',
    sectionBadge: 'SMS OTP',
    sectionTitle: 'Xác minh số điện thoại',
    sectionDescription: 'Điền đúng 6 chữ số để tiếp tục đăng nhập vào FitNutri.',
  },
  register: {
    accent: 'success',
    eyebrow: 'Kích hoạt tài khoản',
    heroIcon: 'mail-open-outline',
    title: 'Xác minh đăng ký',
    subtitle: 'Chỉ còn một bước xác minh để kích hoạt tài khoản mới.',
    sectionBadge: 'Bước cuối',
    sectionTitle: 'Nhập mã OTP vừa nhận',
    sectionDescription: 'Sau khi xác minh, tài khoản sẽ sẵn sàng để tiếp tục thiết lập hồ sơ.',
  },
  'reset-password': {
    accent: 'warning',
    eyebrow: 'Khôi phục mật khẩu',
    heroIcon: 'key-outline',
    title: 'Xác nhận OTP',
    subtitle: 'Nhập mã được gửi tới email của bạn để tiếp tục.',
    sectionBadge: 'Bảo mật',
    sectionTitle: 'Kiểm tra mã xác thực',
    sectionDescription: 'Mã OTP giúp đảm bảo chỉ đúng chủ tài khoản mới có thể tiếp tục.',
  },
};

const OtpScreen = () => {
  const params = useLocalSearchParams<{ mode?: string | string[]; target?: string | string[]; channel?: string | string[] }>();
  const rawMode = normalizeParam(params.mode);
  const rawTarget = normalizeParam(params.target);
  const rawChannel = normalizeParam(params.channel);

  const mode: OtpIntent = rawMode === 'phone-login' || rawMode === 'register' ? rawMode : 'reset-password';
  const channel: OtpChannel = rawChannel === 'sms' ? 'sms' : 'email';
  const config = otpConfigMap[mode];
  const { form, onSubmit, submitting } = useOtpForm({ mode, target: rawTarget });
  const { canResend, remainingSeconds, resend } = useOtpCountdown();

  return (
    <AuthShell
      accent={config.accent}
      eyebrow={config.eyebrow}
      heroIcon={config.heroIcon}
      sectionBadge={config.sectionBadge}
      sectionDescription={config.sectionDescription}
      sectionTitle={config.sectionTitle}
      subtitle={config.subtitle}
      title={config.title}
      footer={
        <View className="items-center gap-2">
          <Text tone="muted" variant="caption">
            {canResend
              ? `Bạn có thể yêu cầu gửi lại ${channel === 'sms' ? 'SMS' : 'mã OTP'} ngay bây giờ.`
              : `Chưa nhận được mã? Gửi lại sau ${remainingSeconds}s.`}
          </Text>
          <Button
            disabled={!canResend}
            onPress={() => {
              void resend();
            }}
            size="sm"
            title={channel === 'sms' ? 'Gửi lại SMS' : 'Gửi lại OTP'}
            variant="ghost"
          />
          <Button onPress={() => router.replace(ROUTES.login)} size="sm" title="Quay lại đăng nhập" variant="ghost" />
        </View>
      }
    >
      <Controller
        control={form.control}
        name="code"
        render={({ field, fieldState }) => (
          <Input
            error={fieldState.error?.message}
            keyboardType="number-pad"
            label="Mã OTP"
            maxLength={6}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder="123456"
            value={field.value}
          />
        )}
      />

      <View className="gap-3 border-t border-border/40 pt-4">
        <Button
          className="w-full"
          leftSlot={<Ionicons color="#FFFFFF" name="checkmark-circle-outline" size={18} />}
          loading={submitting}
          onPress={onSubmit}
          size="lg"
          title="Xác nhận"
        />
        <Text tone="muted" variant="caption">
          {channel === 'sms'
            ? 'Nếu chưa thấy SMS, hãy kiểm tra lại tín hiệu mạng hoặc đợi vài giây trước khi gửi lại.'
            : 'Nếu chưa thấy email, hãy kiểm tra thư mục Spam hoặc Quảng cáo trước khi yêu cầu gửi lại.'}
        </Text>
      </View>
    </AuthShell>
  );
};

export default OtpScreen;

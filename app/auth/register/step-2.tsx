import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { ROUTES } from '@/constants/routes';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { useToast } from '@/hooks/use-toast';
import { otpService } from '@/services/otp-service';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const RegisterStep2Screen = () => {
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!phone.trim()) {
      toast('Thiếu số điện thoại', 'Vui lòng nhập số điện thoại để nhận OTP.', 'destructive');
      return;
    }

    try {
      setSubmitting(true);
      await otpService.startCountdown();
      router.push({
        pathname: ROUTES.otp,
        params: {
          channel: 'sms',
          mode: 'register',
          target: phone,
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      accent="success"
      eyebrow="Hoàn thiện đăng ký"
    heroIcon="call-outline"
    sectionBadge="Bước 2/2"
    sectionTitle="Xác minh số điện thoại"
    sectionDescription="Sau bước này, hệ thống sẽ gửi OTP để bạn kích hoạt tài khoản."
    subtitle="Xác nhận số điện thoại để hoàn tất quá trình đăng ký."
    title="Kích hoạt tài khoản"
      footer={
        <View className="items-center gap-2">
          <Text tone="muted" variant="caption">
            Muốn sửa lại thông tin ở bước trước?
          </Text>
          <Button onPress={() => router.back()} size="sm" title="Quay lại" variant="ghost" />
        </View>
      }
    >
      <View className="gap-4">
        <Input keyboardType="phone-pad" label="Số điện thoại" onChangeText={setPhone} placeholder="09xxxxxxxx" value={phone} />
        <Input label="Mã giới thiệu (tuỳ chọn)" onChangeText={setReferralCode} placeholder="FITNUTRI2026" value={referralCode} />
      </View>

      <View className="border-t border-border/40 pt-4">
        <Button
          className="w-full"
          leftSlot={<Ionicons color="#FFFFFF" name="mail-open-outline" size={18} />}
          loading={submitting}
          onPress={handleSubmit}
          size="lg"
          title="Xác nhận và nhận OTP"
        />
      </View>
    </AuthShell>
  );
};

export default RegisterStep2Screen;

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@/constants/routes';
import { type OtpIntent } from '@/features/auth/constants';
import { otpSchema, type OtpFormValues } from '@/features/auth/schema';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/services/auth-api';
import { otpService } from '@/services/otp-service';
import { useAuthStore } from '@/store/auth-store';

type UseOtpFormOptions = {
  mode: OtpIntent;
  target?: string;
};

const normalizePhone = (value?: string) => value?.replace(/[^\d+]/g, '') ?? '';

export const useOtpForm = ({ mode, target }: UseOtpFormOptions) => {
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);

  const form = useForm<OtpFormValues>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = form.handleSubmit(async () => {
    await authApi.verifyOtp();
    await otpService.resetCountdown();

    if (mode === 'phone-login') {
      const phone = normalizePhone(target);
      await login({ phone, provider: 'phone' });
      toast('Đăng nhập thành công', 'Số điện thoại của bạn đã được xác minh.', 'success');
      router.replace(ROUTES.profileSetup1);
      return;
    }

    if (mode === 'register') {
      const phone = normalizePhone(target);
      await login({ phone, provider: 'phone', name: phone ? `User ${phone.slice(-4)}` : 'New User' });
      toast('Tạo tài khoản thành công', 'Xác minh OTP hoàn tất, hãy tiếp tục thiết lập hồ sơ.', 'success');
      router.replace(ROUTES.profileSetup1);
      return;
    }

    const email = target && target.includes('@') ? target : 'debug@fitnutri.app';
    await login({ email, password: 'otp-recovery', provider: 'password', name: email.split('@')[0] });
    toast('Xác minh thành công', 'Bạn đã được đăng nhập tạm thời để tiếp tục trong ứng dụng.', 'success');
    router.replace(ROUTES.profileSetup1);
  });

  return { form, onSubmit, submitting: form.formState.isSubmitting };
};

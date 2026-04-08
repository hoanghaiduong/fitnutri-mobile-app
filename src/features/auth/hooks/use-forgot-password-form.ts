import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@/constants/routes';
import { type OtpChannel, type OtpIntent } from '@/features/auth/constants';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/features/auth/schema';
import { useToast } from '@/hooks/use-toast';
import { otpService } from '@/services/otp-service';

const RESET_MODE: OtpIntent = 'reset-password';
const RESET_CHANNEL: OtpChannel = 'email';

export const useForgotPasswordForm = () => {
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await otpService.startCountdown();
    toast('Đã gửi mã OTP', 'Vui lòng kiểm tra email để lấy mã xác thực.', 'success');
    router.push({
      pathname: ROUTES.otp,
      params: {
        channel: RESET_CHANNEL,
        mode: RESET_MODE,
        target: values.email,
      },
    });
  });

  return { form, onSubmit, submitting: form.formState.isSubmitting };
};

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@/constants/routes';
import { type OtpChannel, type OtpIntent } from '@/features/auth/constants';
import { phoneLoginSchema, type PhoneLoginFormValues } from '@/features/auth/schema';
import { useToast } from '@/hooks/use-toast';
import { otpService } from '@/services/otp-service';

const PHONE_LOGIN_MODE: OtpIntent = 'phone-login';
const PHONE_LOGIN_CHANNEL: OtpChannel = 'sms';

export const usePhoneLoginForm = () => {
  const { toast } = useToast();

  const form = useForm<PhoneLoginFormValues>({
    defaultValues: {
      phone: '',
    },
    resolver: zodResolver(phoneLoginSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await otpService.startCountdown();
    toast('Đã gửi mã SMS', 'Vui lòng kiểm tra điện thoại để lấy mã xác thực.', 'success');
    router.push({
      pathname: ROUTES.otp,
      params: {
        channel: PHONE_LOGIN_CHANNEL,
        mode: PHONE_LOGIN_MODE,
        target: values.phone,
      },
    });
  });

  return { form, onSubmit, submitting: form.formState.isSubmitting };
};

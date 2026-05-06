import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import { getPostLoginRoute } from '@/features/auth/navigation';
import { loginSchema, type LoginFormValues } from '@/features/auth/schema';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth-store';

export const useLoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const session = await login({
      email: values.email,
      password: values.password,
      name: values.email.split('@')[0],
    });
    toast('Đăng nhập thành công', 'Phiên làm việc đã được khởi tạo.', 'success');
    router.replace(getPostLoginRoute(session));
  });

  return { form, onSubmit, submitting: form.formState.isSubmitting };
};

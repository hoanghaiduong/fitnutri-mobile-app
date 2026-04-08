import { useToastStore, type ToastTone } from '@/store/toast-store';

export const useToast = () => {
  const show = useToastStore((state) => state.show);

  const toast = (title: string, description?: string, tone: ToastTone = 'default') => {
    show({ title, description, tone });
  };

  return { toast };
};

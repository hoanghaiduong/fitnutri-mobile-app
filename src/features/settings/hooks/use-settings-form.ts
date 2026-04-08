import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { settingsSchema, type SettingsFormValues } from '@/features/settings/schema';
import { useToast } from '@/hooks/use-toast';
import { profileService } from '@/services/profile-service';

export const useSettingsForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      displayName: '',
    },
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    const load = async () => {
      const displayName = await profileService.getDisplayName();
      form.reset({ displayName });
      setLoading(false);
    };

    void load();
  }, [form]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await profileService.saveDisplayName(values.displayName.trim());
      toast('Đã lưu cài đặt', 'Tên hiển thị đã được cập nhật.', 'success');
    } finally {
      setSubmitting(false);
    }
  });

  return {
    form,
    loading,
    onSubmit,
    submitting,
  };
};

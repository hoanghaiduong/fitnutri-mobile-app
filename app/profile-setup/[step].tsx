import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { ROUTES } from '@/constants/routes';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useAuthStore } from '@/store/auth-store';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const titles = {
  'step-1': 'Thông tin cơ thể',
  'step-2': 'Mục tiêu luyện tập',
  'step-3': 'Dinh dưỡng & sở thích',
  'step-4': 'Hoàn tất hồ sơ',
} as const;

const subtitles = {
  'step-1': 'Nhập vài thông tin cơ bản để cá nhân hoá lộ trình.',
  'step-2': 'Chọn mục tiêu và cường độ mà bạn muốn theo đuổi.',
  'step-3': 'Thêm sở thích dinh dưỡng để hệ thống gợi ý hợp hơn.',
  'step-4': 'Xác nhận và bắt đầu vào dashboard của bạn.',
} as const;

const nextRoute = {
  'step-1': ROUTES.profileSetup2,
  'step-2': ROUTES.profileSetup3,
  'step-3': ROUTES.profileSetup4,
} as const;

const chipsByStep = {
  'step-1': ['Chiều cao', 'Cân nặng', 'Tuổi'],
  'step-2': ['Tăng cơ', 'Giảm mỡ', 'Duy trì'],
  'step-3': ['Ăn sạch', 'Ít dầu', 'Dễ duy trì'],
  'step-4': ['KCAL', 'Macros', 'Ready'],
} as const;

const placeholderA = {
  'step-1': 'Ví dụ: 170 cm',
  'step-2': 'Ví dụ: Tăng cơ',
  'step-3': 'Ví dụ: Không ăn hải sản',
  'step-4': 'Ví dụ: 2200 kcal',
} as const;

const placeholderB = {
  'step-1': 'Ví dụ: 65 kg',
  'step-2': 'Ví dụ: 4 buổi/tuần',
  'step-3': 'Ví dụ: Thích salad, ức gà',
  'step-4': 'Ví dụ: 150g protein',
} as const;

const ProfileSetupBody = () => {
  const { step } = useLocalSearchParams<{ step?: 'step-1' | 'step-2' | 'step-3' | 'step-4' }>();
  const currentStep = step ?? 'step-1';
  const stepNumber = Number(currentStep.replace('step-', ''));
  const completeProfile = useAuthStore((state) => state.completeProfile);
  const { tokens } = useAppTheme();
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    try {
      setError(null);
      if (currentStep === 'step-4') {
        setSubmitting(true);
        await completeProfile();
        router.replace(ROUTES.dashboard);
        return;
      }

      router.push(nextRoute[currentStep]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tiếp tục hồ sơ.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 'step-1') {
      router.replace(ROUTES.login);
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: `rgb(${tokens.colors.background})` }}>
      <View className="flex-1 justify-between px-5 py-6">
        <View className="gap-6">
          <View className="gap-3 px-1">
            <Badge label={`Bước ${stepNumber}/4`} variant="primary" />
            <View className="gap-2">
              <Text className="max-w-[280px]" variant="heading-xl">{titles[currentStep]}</Text>
              <Text className="max-w-[320px]" tone="muted" variant="body-sm">{subtitles[currentStep]}</Text>
            </View>
            <View className="flex-row gap-2 pt-1">
              {[1, 2, 3, 4].map((item) => (
                <View key={item} className={`h-2 flex-1 rounded-full ${item <= stepNumber ? 'bg-primary' : 'bg-primary/15'}`} />
              ))}
            </View>
            <View className="flex-row flex-wrap gap-2 pt-1">
              {chipsByStep[currentStep].map((chip) => (
                <View key={chip} className="rounded-full bg-primary/10 px-3.5 py-2">
                  <Text tone="primary" variant="caption">{chip}</Text>
                </View>
              ))}
            </View>
          </View>

          <Card elevated glass className="gap-4 rounded-[28px] p-5">
            <Input value={valueA} onChangeText={setValueA} placeholder={placeholderA[currentStep]} label="Thông tin 1" />
            <Input value={valueB} onChangeText={setValueB} placeholder={placeholderB[currentStep]} label="Thông tin 2" />
            {error ? <Text tone="destructive" variant="caption">{error}</Text> : null}
            <Text tone="muted" variant="caption">
              Nếu có lỗi trong bước này, màn hình sẽ hiện thông báo thay vì trắng màn.
            </Text>
          </Card>
        </View>

        <View className="flex-row gap-3 pt-4">
          <Button className="flex-1" onPress={handleBack} title="Quay lại" variant="secondary" size="lg" />
          <Button className="flex-[1.2]" onPress={handleNext} size="lg" title={currentStep === 'step-4' ? 'Hoàn tất & vào app' : 'Tiếp tục'}>
            {submitting ? <ActivityIndicator color="#FFFFFF" /> : null}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ProfileSetupScreen = () => (
  <AppErrorBoundary>
    <ProfileSetupBody />
  </AppErrorBoundary>
);

export default ProfileSetupScreen;

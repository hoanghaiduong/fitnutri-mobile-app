import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Text } from '@/ui/text';
import { useAppTheme } from '@/hooks/use-app-theme';

const LanguageRow = ({ label, isSelected, onPress }: any) => {
  const { tokens } = useAppTheme();
  
  return (
    <Pressable 
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-border last:border-b-0"
    >
      <Text variant="body-md" className={isSelected ? "font-bold text-primary" : "font-medium"}>
        {label}
      </Text>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={24} color={`rgb(${tokens.colors.primary})`} />
      )}
    </Pressable>
  );
}

const LanguageBody = () => {
  const { tokens } = useAppTheme();
  const [selected, setSelected] = useState('vi');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: `rgb(${tokens.colors.background})` }}>
      <View className="flex-row items-center justify-between px-5 py-2">
        <Button 
          variant="secondary" 
          size="sm"
          onPress={() => router.back()} 
          leftSlot={<Ionicons name="arrow-back" size={20} color={`rgb(${tokens.colors.foreground})`} />}
          className="w-10 h-10 p-0 rounded-full bg-secondary/80 justify-center items-center"
          title=""
        />
        <Text variant="heading-md">Ngôn ngữ</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="flex-1 px-5 pt-8 gap-6">
        <Text tone="muted" variant="body-sm">
          Thay đổi ngôn ngữ hiển thị trên toàn bộ ứng dụng FitNutri.
        </Text>

        <Card elevated glass className="px-5 rounded-[28px] overflow-hidden">
          <LanguageRow 
            label="Tiếng Việt"
            isSelected={selected === 'vi'}
            onPress={() => setSelected('vi')}
          />
          <LanguageRow 
            label="English"
            isSelected={selected === 'en'}
            onPress={() => setSelected('en')}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default function LanguageScreen() {
  return (
    <AppErrorBoundary>
      <LanguageBody />
    </AppErrorBoundary>
  );
}

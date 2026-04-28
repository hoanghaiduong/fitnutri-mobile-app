import { View } from 'react-native';

import { useThemeStore } from '@/store/theme-store';
import { Button } from '@/ui/button';
import { Text } from '@/ui/text';
import type { ThemeMode } from '@/types/theme';

const options: ThemeMode[] = ['system', 'light', 'dark'];

export const ThemeToggle = () => {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

  return (
    <View className="gap-3">
      <Text variant="body-sm">Giao diện ứng dụng</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const label = option === 'light' ? 'Sáng' : option === 'dark' ? 'Tối' : 'Hệ thống';
          return (
            <Button
              key={option}
              onPress={() => {
                void setMode(option);
              }}
              size="sm"
              title={label}
              variant={mode === option ? 'primary' : 'secondary'}
            />
          );
        })}
      </View>
    </View>
  );
};

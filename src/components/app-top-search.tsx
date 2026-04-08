import { Ionicons } from '@expo/vector-icons';
import { type ReactNode, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { useToast } from '@/hooks/use-toast';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { Text } from '@/ui/text';

type AppTopSearchProps = {
  leftSlot?: ReactNode;
  placeholder?: string;
};

export const AppTopSearch = ({ leftSlot, placeholder = 'Tìm kiếm nhanh...' }: AppTopSearchProps) => {
  const { toast } = useToast();
  const { isDark, tokens } = useAppTheme();
  const [language, setLanguage] = useState<'VI' | 'EN'>('VI');
  const [query, setQuery] = useState('');

  const toggleLanguage = () => {
    const nextLanguage = language === 'VI' ? 'EN' : 'VI';
    setLanguage(nextLanguage);
    toast('Đã đổi ngôn ngữ', `Chế độ hiển thị tạm thời chuyển sang ${nextLanguage}.`, 'success');
  };

  return (
    <View className="flex-row items-center gap-3">
      {leftSlot}

      <View
        className="flex-1 flex-row items-center rounded-[22px] px-4 py-3"
        style={{
          backgroundColor: toRgba(tokens.colors.card, isDark ? 0.88 : 0.96),
          borderColor: toRgba(tokens.colors.border, isDark ? 0.64 : 0.88),
          borderWidth: 1,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.12 : 0.05,
          shadowRadius: 18,
          elevation: 3,
        }}
      >
        <Ionicons color={toRgba(tokens.colors.mutedForeground, 0.92)} name="search-outline" size={18} />
        <TextInput
          className="ml-2 flex-1 text-body-sm text-foreground"
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={toRgba(tokens.colors.mutedForeground, 0.9)}
          returnKeyType="search"
          selectionColor={toRgb(tokens.colors.primary)}
          style={{ color: toRgb(tokens.colors.foreground) }}
          value={query}
        />
      </View>

      <Pressable
        onPress={toggleLanguage}
        style={({ pressed }) => ({
          opacity: pressed ? 0.86 : 1,
        })}
      >
        <View
          className="flex-row items-center gap-2 rounded-[22px] px-3.5 py-3"
          style={{
            backgroundColor: toRgba(tokens.colors.card, isDark ? 0.88 : 0.96),
            borderColor: toRgba(tokens.colors.border, isDark ? 0.64 : 0.88),
            borderWidth: 1,
          }}
        >
          <Ionicons color={toRgb(tokens.colors.primary)} name="language-outline" size={18} />
          <Text tone="primary" variant="caption">
            {language}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

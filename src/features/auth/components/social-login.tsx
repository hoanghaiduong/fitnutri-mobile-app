import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { socialProviders, type SocialProvider } from '@/features/auth/constants';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb } from '@/lib/color';
import { Button } from '@/ui/button';
import { Text } from '@/ui/text';

type SocialLoginProps = {
  activeMethod?: SocialProvider | 'phone' | null;
  onPhonePress?: () => void;
  onProviderPress: (provider: SocialProvider) => void;
};

const iconMap: Record<SocialProvider, keyof typeof Ionicons.glyphMap> = {
  google: 'logo-google',
  facebook: 'logo-facebook',
  apple: 'logo-apple',
};

const brandColorMap: Record<SocialProvider, string> = {
  google: '#EA4335',
  facebook: '#1877F2',
  apple: '#111827',
};

export const SocialLogin = ({ activeMethod, onPhonePress, onProviderPress }: SocialLoginProps) => {
  const { tokens } = useAppTheme();
  const appleColor = toRgb(tokens.colors.foreground);

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-3">
        <View className="h-px flex-1 bg-border/70" />
        <Text tone="muted" variant="caption">
          Hoặc tiếp tục với
        </Text>
        <View className="h-px flex-1 bg-border/70" />
      </View>

      {socialProviders.map((provider) => (
        <Button
          key={provider.id}
          className="w-full"
          leftSlot={
            <Ionicons
              color={provider.id === 'apple' ? appleColor : brandColorMap[provider.id]}
              name={iconMap[provider.id]}
              size={18}
            />
          }
          loading={activeMethod === provider.id}
          onPress={() => onProviderPress(provider.id)}
          size="md"
          title={`Tiếp tục với ${provider.label}`}
          variant="outline"
        />
      ))}

      {onPhonePress ? (
        <Button
          className="w-full"
          leftSlot={<Ionicons color={toRgb(tokens.colors.primary)} name="chatbubble-ellipses-outline" size={18} />}
          loading={activeMethod === 'phone'}
          onPress={onPhonePress}
          size="md"
          title="Nhận mã qua SMS"
          variant="outline"
        />
      ) : null}
    </View>
  );
};

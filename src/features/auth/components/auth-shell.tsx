import { Ionicons } from '@expo/vector-icons';
import { type ComponentProps, type ReactNode } from 'react';
import { View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { Badge } from '@/ui/badge';
import { Card } from '@/ui/card';
import { Screen } from '@/ui/screen';
import { Text } from '@/ui/text';

type AuthAccent = 'primary' | 'success' | 'warning';
type IoniconName = ComponentProps<typeof Ionicons>['name'];

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  accent?: AuthAccent;
  eyebrow?: string;
  heroIcon?: IoniconName;
  sectionBadge?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  sectionIcon?: IoniconName;
};

const badgeVariantByAccent = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
} as const;

const toneByAccent = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
} as const;

export const AuthShell = ({
  accent = 'primary',
  children,
  eyebrow = 'FitNutri AI',
  footer,
  heroIcon = 'leaf-outline',
  sectionBadge,
  sectionDescription,
  sectionIcon,
  sectionTitle,
  subtitle,
  title,
}: AuthShellProps) => {
  const { isDark, tokens } = useAppTheme();
  const accentColor = tokens.colors[accent];

  const accentTone = toneByAccent[accent];
  const accentSoft = toRgba(accentColor, isDark ? 0.18 : 0.1);
  const accentBorder = toRgba(accentColor, isDark ? 0.28 : 0.16);
  const heroBackground = isDark ? toRgba(tokens.colors.card, 0.94) : toRgba(tokens.colors.secondary, 0.92);
  const heroBorder = toRgba(tokens.colors.border, isDark ? 0.68 : 0.88);
  const formBackground = isDark ? toRgba(tokens.colors.card, 0.98) : toRgba(tokens.colors.card, 0.995);
  const footerBackground = isDark ? toRgba(tokens.colors.card, 0.88) : toRgba(tokens.colors.secondary, 0.72);

  return (
    <Screen keyboardAware scrollable contentClassName="justify-center">
      <View className="pb-8 pt-2" style={{ gap: 14 }}>
        <View
          className="relative overflow-hidden rounded-[30px] px-5 py-5"
          style={{
            backgroundColor: heroBackground,
            borderColor: heroBorder,
            borderWidth: 1,
          }}
        >
          <View
            className="absolute -right-6 -top-6 h-24 w-24 rounded-full"
            style={{ backgroundColor: toRgba(accentColor, isDark ? 0.14 : 0.1) }}
          />
          <View
            className="absolute -left-8 bottom-0 h-20 w-20 rounded-full"
            style={{ backgroundColor: toRgba(tokens.colors.border, isDark ? 0.16 : 0.28) }}
          />

          <View className="gap-4">
            <View className="flex-row items-start justify-between gap-4">
              <View
                className="rounded-full border px-3 py-2"
                style={{
                  backgroundColor: accentSoft,
                  borderColor: accentBorder,
                }}
              >
                <Text tone={accentTone} variant="caption">
                  {eyebrow}
                </Text>
              </View>

              <View
                className="h-12 w-12 items-center justify-center rounded-[18px] border"
                style={{
                  backgroundColor: toRgba(tokens.colors.card, isDark ? 0.36 : 0.8),
                  borderColor: accentBorder,
                }}
              >
                <Ionicons color={toRgb(accentColor)} name={heroIcon} size={22} />
              </View>
            </View>

            <View className="gap-2">
              <Text className="max-w-[280px]" variant="heading-xl">
                {title}
              </Text>
              <Text className="max-w-[320px]" tone="muted" variant="body-sm">
                {subtitle}
              </Text>
            </View>
          </View>
        </View>

        <Card
          elevated
          glass
          className="gap-5 rounded-[28px] p-5"
          style={{
            backgroundColor: formBackground,
            borderColor: accentBorder,
          }}
        >
          {(sectionBadge || sectionTitle || sectionDescription) ? (
            <View className="flex-row items-start justify-between gap-4">
              <View className="flex-1 gap-2">
                {sectionBadge ? <Badge label={sectionBadge} variant={badgeVariantByAccent[accent]} /> : null}
                {sectionTitle ? <Text variant="heading-md">{sectionTitle}</Text> : null}
                {sectionDescription ? (
                  <Text tone="muted" variant="body-sm">
                    {sectionDescription}
                  </Text>
                ) : null}
              </View>

              <View
                className="h-11 w-11 items-center justify-center rounded-[16px] border"
                style={{
                  backgroundColor: accentSoft,
                  borderColor: accentBorder,
                }}
              >
                <Ionicons color={toRgb(accentColor)} name={sectionIcon ?? heroIcon} size={18} />
              </View>
            </View>
          ) : null}

          {children}
        </Card>

        {footer ? (
          <Card
            glass
            className="rounded-[22px] p-4"
            style={{
              backgroundColor: footerBackground,
              borderColor: toRgba(tokens.colors.border, isDark ? 0.56 : 0.82),
            }}
          >
            {footer}
          </Card>
        ) : null}
      </View>
    </Screen>
  );
};

import { type ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/ui/text';

type HeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  eyebrow?: string;
};

export const Header = ({ eyebrow, rightSlot, subtitle, title }: HeaderProps) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingVertical: 6 }}>
    <View style={{ flex: 1, gap: 6 }}>
      {eyebrow ? (
        <Text tone="primary" variant="caption">
          {eyebrow}
        </Text>
      ) : null}
      <Text variant="heading-lg">{title}</Text>
      {subtitle ? <Text tone="muted" variant="body-sm">{subtitle}</Text> : null}
    </View>
    {rightSlot}
  </View>
);

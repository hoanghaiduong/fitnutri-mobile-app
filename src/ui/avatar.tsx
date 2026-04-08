import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';
import { Text } from '@/ui/text';

type AvatarProps = ViewProps & {
  name: string;
  className?: string;
};

export const Avatar = ({ className, name, ...props }: AvatarProps) => {
  const initials = name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return (
    <View
      className={cn(
        'h-12 w-12 items-center justify-center rounded-full bg-secondary',
        className,
      )}
      {...props}
    >
      <Text variant="body-sm">{initials}</Text>
    </View>
  );
};

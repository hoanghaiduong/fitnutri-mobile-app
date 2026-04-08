import { forwardRef } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { cn } from '@/lib/cn';
import { toRgb, toRgba } from '@/lib/color';
import { useAppTheme } from '@/hooks/use-app-theme';
import { Text } from '@/ui/text';

type InputProps = TextInputProps & {
  className?: string;
  error?: string;
  label?: string;
  hint?: string;
};

export const Input = forwardRef<TextInput, InputProps>(
  ({ className, error, hint, label, style, ...props }, ref) => {
    const { tokens } = useAppTheme();

    return (
      <View className="gap-2">
        {label ? <Text variant="body-sm">{label}</Text> : null}
        <TextInput
          ref={ref}
          className={cn(
            'min-h-12 rounded-lg border bg-card px-4 text-body-md text-foreground',
            props.editable === false && 'opacity-50',
            className,
          )}
          placeholderTextColor={toRgb(tokens.colors.mutedForeground)}
          style={[
            {
              borderColor: error ? toRgb(tokens.colors.destructive) : toRgba(tokens.colors.input, 0.85),
              color: toRgb(tokens.colors.foreground),
              backgroundColor: toRgb(tokens.colors.card),
            },
            style,
          ]}
          {...props}
        />
        {error ? <Text tone="destructive" variant="caption">{error}</Text> : null}
        {!error && hint ? <Text variant="caption">{hint}</Text> : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

import Svg, { Defs, Ellipse, LinearGradient, Rect, Stop } from 'react-native-svg';
import { View } from 'react-native';

type MealThumbnailProps = {
  variant?: 'breakfast' | 'lunch' | 'snack';
  width?: number;
  height?: number;
};

const palette = {
  breakfast: ['#FDE68A', '#FCA5A5', '#BFDBFE'],
  lunch: ['#A7F3D0', '#FDE68A', '#FCA5A5'],
  snack: ['#DDD6FE', '#FBCFE8', '#BFDBFE'],
} as const;

export const MealThumbnail = ({ height = 112, variant = 'breakfast', width = 220 }: MealThumbnailProps) => {
  const [a, b, c] = palette[variant];

  return (
    <View style={{ width, height }}>
      <Svg height={height} viewBox="0 0 220 112" width={width}>
        <Defs>
          <LinearGradient id="mealBg" x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0%" stopColor="#F8FAFC" />
            <Stop offset="100%" stopColor="#ECFDF5" />
          </LinearGradient>
        </Defs>
        <Rect fill="url(#mealBg)" height="112" rx="24" width="220" x="0" y="0" />
        <Ellipse cx="110" cy="60" fill="#0F172A" fillOpacity="0.06" rx="58" ry="24" />
        <Ellipse cx="110" cy="54" fill="#FFFFFF" rx="58" ry="24" />
        <Ellipse cx="90" cy="50" fill={a} rx="18" ry="11" />
        <Ellipse cx="112" cy="57" fill={b} rx="20" ry="12" />
        <Ellipse cx="132" cy="48" fill={c} rx="18" ry="10" />
        <Ellipse cx="120" cy="66" fill="#86EFAC" rx="24" ry="8" />
      </Svg>
    </View>
  );
};

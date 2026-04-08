import Svg, { Circle, Defs, Ellipse, LinearGradient, Rect, Stop } from 'react-native-svg';
import { View } from 'react-native';

type EmptyIllustrationProps = { size?: number };

export const EmptyIllustration = ({ size = 160 }: EmptyIllustrationProps) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 160 160">
      <Defs>
        <LinearGradient id="emptyBg" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0%" stopColor="#DBEAFE" />
          <Stop offset="100%" stopColor="#DCFCE7" />
        </LinearGradient>
      </Defs>
      <Circle cx="80" cy="80" r="64" fill="url(#emptyBg)" />
      <Rect x="42" y="42" width="76" height="56" rx="18" fill="#FFFFFF" />
      <Rect x="56" y="58" width="48" height="10" rx="5" fill="#BFDBFE" />
      <Rect x="52" y="76" width="56" height="10" rx="5" fill="#A7F3D0" />
      <Circle cx="112" cy="112" r="18" fill="#FFFFFF" />
      <Rect x="104" y="104" width="16" height="16" rx="8" fill="#22C55E" />
      <Ellipse cx="80" cy="132" rx="34" ry="8" fill="#0F172A" fillOpacity="0.08" />
    </Svg>
  </View>
);

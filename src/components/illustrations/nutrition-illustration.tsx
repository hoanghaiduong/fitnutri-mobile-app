import Svg, { Circle, Defs, Ellipse, LinearGradient, Rect, Stop } from 'react-native-svg';
import { View } from 'react-native';

type NutritionIllustrationProps = { size?: number };

export const NutritionIllustration = ({ size = 260 }: NutritionIllustrationProps) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 260 260">
      <Defs>
        <LinearGradient id="n-bg" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0%" stopColor="#DCFCE7" />
          <Stop offset="100%" stopColor="#DBEAFE" />
        </LinearGradient>
      </Defs>
      <Circle cx="130" cy="130" r="110" fill="url(#n-bg)" />
      <Ellipse cx="130" cy="208" rx="56" ry="12" fill="#0F172A" fillOpacity="0.08" />
      <Rect x="68" y="92" width="124" height="74" rx="28" fill="#FFFFFF" />
      <Circle cx="96" cy="129" r="18" fill="#F59E0B" />
      <Circle cx="130" cy="123" r="20" fill="#22C55E" />
      <Circle cx="162" cy="132" r="18" fill="#60A5FA" />
      <Rect x="86" y="78" width="88" height="18" rx="9" fill="#FFFFFF" fillOpacity="0.9" />
    </Svg>
  </View>
);

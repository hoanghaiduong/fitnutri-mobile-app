import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { View } from 'react-native';

type CoachIllustrationProps = { size?: number };

export const CoachIllustration = ({ size = 260 }: CoachIllustrationProps) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 260 260">
      <Defs>
        <LinearGradient id="c-bg" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0%" stopColor="#E0F2FE" />
          <Stop offset="100%" stopColor="#DCFCE7" />
        </LinearGradient>
      </Defs>
      <Circle cx="130" cy="130" r="110" fill="url(#c-bg)" />
      <Rect x="80" y="70" width="100" height="120" rx="30" fill="#FFFFFF" />
      <Circle cx="112" cy="110" r="8" fill="#2563EB" />
      <Circle cx="148" cy="110" r="8" fill="#2563EB" />
      <Path d="M110 142c10 10 30 10 40 0" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" fill="none" />
      <Rect x="96" y="54" width="68" height="24" rx="12" fill="#BFDBFE" />
      <Circle cx="72" cy="162" r="20" fill="#FFFFFF" fillOpacity="0.95" />
      <Path d="M72 148v28M58 162h28" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" />
    </Svg>
  </View>
);

import Svg, { Circle, Defs, Line, LinearGradient, Polyline, Rect, Stop } from 'react-native-svg';
import { View } from 'react-native';

type InsightsIllustrationProps = { size?: number };

export const InsightsIllustration = ({ size = 260 }: InsightsIllustrationProps) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size} viewBox="0 0 260 260">
      <Defs>
        <LinearGradient id="i-bg" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0%" stopColor="#DBEAFE" />
          <Stop offset="100%" stopColor="#EDE9FE" />
        </LinearGradient>
      </Defs>
      <Circle cx="130" cy="130" r="110" fill="url(#i-bg)" />
      <Rect x="64" y="74" width="132" height="112" rx="28" fill="#FFFFFF" />
      <Line x1="88" y1="158" x2="88" y2="110" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
      <Line x1="120" y1="158" x2="120" y2="98" stroke="#93C5FD" strokeWidth="8" strokeLinecap="round" />
      <Line x1="152" y1="158" x2="152" y2="120" stroke="#86EFAC" strokeWidth="8" strokeLinecap="round" />
      <Polyline points="82,122 114,104 146,114 176,88" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="176" cy="88" r="10" fill="#2563EB" />
    </Svg>
  </View>
);

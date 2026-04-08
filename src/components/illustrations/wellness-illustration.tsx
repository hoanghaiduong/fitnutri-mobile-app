import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { View } from 'react-native';

type WellnessIllustrationProps = {
  size?: number;
};

export const WellnessIllustration = ({ size = 260 }: WellnessIllustrationProps) => (
  <View style={{ width: size, height: size }}>
    <Svg height={size} viewBox="0 0 260 260" width={size}>
      <Defs>
        <LinearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0%" stopColor="#DBEAFE" />
          <Stop offset="100%" stopColor="#D1FAE5" />
        </LinearGradient>
        <LinearGradient id="card" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <Stop offset="100%" stopColor="#ECFDF5" stopOpacity="0.96" />
        </LinearGradient>
      </Defs>

      <Circle cx="130" cy="130" fill="url(#bg)" r="112" />
      <Circle cx="130" cy="130" fill="#FFFFFF" fillOpacity="0.4" r="82" />

      <Rect fill="url(#card)" height="116" rx="28" width="116" x="72" y="72" />
      <Rect fill="#BFDBFE" height="16" rx="8" width="56" x="102" y="96" />
      <Rect fill="#A7F3D0" height="16" rx="8" width="40" x="88" y="122" />
      <Rect fill="#86EFAC" height="16" rx="8" width="52" x="120" y="122" />
      <Rect fill="#FDE68A" height="16" rx="8" width="76" x="92" y="148" />

      <Circle cx="198" cy="86" fill="#FFFFFF" fillOpacity="0.92" r="24" />
      <Path d="M198 73c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16Zm-4 10h8v12h-8V83Zm-6 4h20v8h-20v-8Z" fill="#10B981" />

      <Circle cx="58" cy="178" fill="#FFFFFF" fillOpacity="0.92" r="24" />
      <Path d="M58 163c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16Zm0 7c4 0 8 3 8 8 0 4-4 8-8 8s-8-4-8-8c0-5 4-8 8-8Z" fill="#2563EB" />

      <Ellipse cx="130" cy="222" fill="#0F172A" fillOpacity="0.08" rx="54" ry="10" />
    </Svg>
  </View>
);

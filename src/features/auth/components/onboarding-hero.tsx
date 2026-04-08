import { View } from 'react-native';

import { CoachIllustration } from '@/components/illustrations/coach-illustration';
import { InsightsIllustration } from '@/components/illustrations/insights-illustration';
import { NutritionIllustration } from '@/components/illustrations/nutrition-illustration';
import { GlassCard } from '@/ui/glass-card';
import { Text } from '@/ui/text';

type OnboardingHeroProps = {
  accent: string;
};

const accentMap: Record<string, { icon: string; chipA: string; chipB: string }> = {
  nutrition: { icon: '🥗', chipA: '🌿', chipB: '🥑' },
  insights: { icon: '📈', chipA: '📊', chipB: '⚡' },
  coach: { icon: '🤖', chipA: '💪', chipB: '🧠' },
};

const IllustrationByAccent = ({ accent }: { accent: string }) => {
  if (accent === 'nutrition') {
    return <NutritionIllustration size={260} />;
  }

  if (accent === 'insights') {
    return <InsightsIllustration size={260} />;
  }

  return <CoachIllustration size={260} />;
};

export const OnboardingHero = ({ accent }: OnboardingHeroProps) => {
  const current = accentMap[accent] ?? { icon: '✨', chipA: '🌟', chipB: '💫' };

  return (
    <View className="items-center justify-center py-4">
      <View className="relative h-80 w-80 items-center justify-center rounded-full bg-primary/10">
        <View className="absolute h-64 w-64 rounded-full bg-success/10" />
        <IllustrationByAccent accent={accent} />

        <GlassCard className="absolute h-24 w-24 items-center justify-center rounded-[28px] bg-card/92">
          <Text className="text-4xl">{current.icon}</Text>
        </GlassCard>

        <View className="absolute right-4 top-8 h-16 w-16 items-center justify-center rounded-[20px] border border-white/40 bg-card/85 shadow-card">
          <Text className="text-2xl">{current.chipA}</Text>
        </View>
        <View className="absolute bottom-10 left-4 h-16 w-16 items-center justify-center rounded-[20px] border border-white/40 bg-card/85 shadow-card">
          <Text className="text-2xl">{current.chipB}</Text>
        </View>
      </View>
    </View>
  );
};

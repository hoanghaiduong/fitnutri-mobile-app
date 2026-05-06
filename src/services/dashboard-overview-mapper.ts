import type { DashboardOverview, MacroStat } from '@/types/dashboard';

type NutritionProfileLike = Record<string, unknown> | null | undefined;

const DEFAULT_CALORIES_TARGET = 2200;
const DEFAULT_TREND_POINTS = [42, 55, 51, 70, 64, 76, 68];

const goalLabels: Record<string, string> = {
  'gain-muscle': 'Tăng cơ',
  gain_muscle: 'Tăng cơ',
  muscle_gain: 'Tăng cơ',
  build_muscle: 'Tăng cơ',
  'lose-fat': 'Giảm mỡ',
  lose_fat: 'Giảm mỡ',
  lose_weight: 'Giảm cân',
  weight_loss: 'Giảm cân',
  maintain: 'Duy trì',
  maintenance: 'Duy trì',
  healthy: 'Sống khỏe',
  improve_health: 'Sống khỏe',
};

const activityMultipliers: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  active: 1.55,
  moderate: 1.55,
  very_active: 1.725,
};

const getString = (profile: NutritionProfileLike, ...keys: string[]): string | null => {
  for (const key of keys) {
    const value = profile?.[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
};

const getNumber = (profile: NutritionProfileLike, ...keys: string[]): number | null => {
  for (const key of keys) {
    const value = profile?.[key];
    const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const formatGoalLabel = (profile: NutritionProfileLike): string => {
  const rawGoal = getString(profile, 'targetGoal', 'goalNormalizedInternal', 'goalRawSemantic', 'goal');
  if (!rawGoal) {
    return 'Sống khỏe';
  }

  const normalized = rawGoal.toLowerCase().replace(/\s+/g, '_');
  return goalLabels[normalized] ?? rawGoal;
};

const calculateBmi = (weightKg: number | null, heightCm: number | null): number => {
  if (!weightKg || !heightCm) {
    return 0;
  }

  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
};

const calculateBmr = (
  profile: NutritionProfileLike,
  weightKg: number | null,
  heightCm: number | null
): number => {
  const explicitBmr = getNumber(profile, 'bmr', 'basalMetabolicRate');
  if (explicitBmr) {
    return Math.round(explicitBmr);
  }

  const age = getNumber(profile, 'age');
  if (!weightKg || !heightCm || !age) {
    return 0;
  }

  const gender = getString(profile, 'gender')?.toLowerCase();
  const genderAdjustment = gender === 'female' ? -161 : 5;
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + genderAdjustment);
};

const calculateCaloriesTarget = (profile: NutritionProfileLike, bmr: number): number => {
  const explicitTarget = getNumber(profile, 'dailyCalories', 'caloriesTarget', 'targetCalories');
  if (explicitTarget) {
    return Math.round(explicitTarget);
  }

  if (!bmr) {
    return DEFAULT_CALORIES_TARGET;
  }

  const activityLevel = getString(profile, 'activityLevel')?.toLowerCase() ?? 'light';
  const multiplier = activityMultipliers[activityLevel] ?? activityMultipliers.light;
  const goal = getString(profile, 'targetGoal', 'goalNormalizedInternal', 'goal')?.toLowerCase() ?? '';
  const goalAdjustment = goal.includes('gain') || goal.includes('muscle') ? 300 : goal.includes('lose') ? -400 : 0;

  return Math.round(bmr * multiplier + goalAdjustment);
};

const buildMacros = (
  profile: NutritionProfileLike,
  weightKg: number | null,
  caloriesTarget: number
): MacroStat[] => {
  const explicitProtein = getNumber(profile, 'proteinG', 'proteinGrams');
  const explicitCarbs = getNumber(profile, 'carbsG', 'carbsGrams');
  const explicitFat = getNumber(profile, 'fatG', 'fatGrams');

  const proteinTarget = explicitProtein ?? Math.round((weightKg ?? 70) * 1.6);
  const fatTarget = explicitFat ?? Math.round((caloriesTarget * 0.25) / 9);
  const carbsTarget = explicitCarbs ?? Math.round((caloriesTarget - proteinTarget * 4 - fatTarget * 9) / 4);

  return [
    { label: 'PRO', consumed: getNumber(profile, 'proteinConsumed') ?? 0, target: proteinTarget, accent: 'primary' },
    { label: 'CARB', consumed: getNumber(profile, 'carbsConsumed') ?? 0, target: Math.max(0, carbsTarget), accent: 'warning' },
    { label: 'FAT', consumed: getNumber(profile, 'fatConsumed') ?? 0, target: fatTarget, accent: 'info' },
  ];
};

export const createDashboardOverviewFromProfile = (profile: NutritionProfileLike): DashboardOverview => {
  const weightKg = getNumber(profile, 'weightKg', 'weight') ?? 0;
  const heightCm = getNumber(profile, 'heightCm', 'height');
  const bmr = calculateBmr(profile, weightKg, heightCm);
  const caloriesTarget = calculateCaloriesTarget(profile, bmr);
  const caloriesConsumed = getNumber(profile, 'caloriesConsumed', 'todayCalories') ?? 0;

  return {
    greetingName: getString(profile, 'fullName', 'username') ?? 'bạn',
    goalLabel: formatGoalLabel(profile),
    weeklyProgress: clamp(Math.round(getNumber(profile, 'weeklyProgress') ?? 0), 0, 100),
    caloriesConsumed,
    caloriesTarget,
    caloriesRemaining: Math.max(0, caloriesTarget - caloriesConsumed),
    macros: buildMacros(profile, weightKg, caloriesTarget),
    timeline: [],
    bmi: calculateBmi(weightKg, heightCm),
    weightKg,
    bmr,
    trendPoints: DEFAULT_TREND_POINTS,
    recentPlans: [],
  };
};

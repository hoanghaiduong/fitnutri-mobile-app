export type MacroStat = {
  label: string;
  consumed: number;
  target: number;
  accent: 'primary' | 'warning' | 'info';
};

export type MealTimelineItem = {
  id: string;
  mealType: string;
  time: string;
  title: string;
  calories: number;
  protein: number;
  completed: boolean;
};

export type DashboardOverview = {
  greetingName: string;
  goalLabel: string;
  weeklyProgress: number;
  caloriesConsumed: number;
  caloriesTarget: number;
  caloriesRemaining: number;
  macros: MacroStat[];
  timeline: MealTimelineItem[];
  bmi: number;
  weightKg: number;
  bmr: number;
  trendPoints: number[];
  recentPlans: { id: string; title: string; calories: number; imageVariant?: 'breakfast' | 'lunch' | 'snack' }[];
};

export type MonthlyDay = {
  day: number;
  hasCompletedWorkout?: boolean;
  hasPlannedWorkout?: boolean;
  isToday?: boolean;
};

export type WeeklyTimelineItem = {
  id: string;
  dayLabel: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'upcoming' | 'insight';
};

export type ResultSummary = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  insight: string;
  meals: {
    id: string;
    mealType: string;
    time: string;
    title: string;
    calories: number;
    protein: number;
    imageVariant?: 'breakfast' | 'lunch' | 'snack';
  }[];
};

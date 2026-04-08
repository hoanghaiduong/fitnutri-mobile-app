import type { ActivityLevel, DietStyle, FitnessGoal, ProfileSetupDraft } from '@/types/profile';

export const defaultProfileSetupDraft: ProfileSetupDraft = {
  fullName: '',
  age: 25,
  gender: 'male',
  heightCm: 170,
  weightKg: 65,
  goal: 'gain-muscle',
  activityLevel: 'light',
  workoutsPerWeek: 4,
  workoutMinutes: 45,
  trainingTypes: ['Gym'],
  allergies: ['Hải sản'],
  dislikedFoods: ['Thịt bò'],
  dietStyle: 'keto',
  favoriteMeals: '',
  avoidMeals: '',
  dailyCalories: 2400,
  proteinGrams: 180,
  carbsGrams: 300,
  fatGrams: 53,
};

export const goalOptions: { value: FitnessGoal; title: string; description: string; emoji: string }[] = [
  { value: 'gain-muscle', title: 'Tăng cơ', description: 'Xây dựng khối lượng cơ bắp và sức mạnh.', emoji: '💪' },
  { value: 'lose-fat', title: 'Giảm mỡ', description: 'Giảm cân khoa học và bền vững.', emoji: '⚖️' },
  { value: 'maintain', title: 'Duy trì', description: 'Giữ dáng và cải thiện sức bền.', emoji: '⚡' },
];

export const activityOptions: { value: ActivityLevel; title: string; description: string; emoji: string }[] = [
  { value: 'sedentary', title: 'Văn phòng', description: 'Ít vận động, ngồi nhiều.', emoji: '🪑' },
  { value: 'light', title: 'Vận động nhẹ', description: 'Đi bộ hoặc tập 1-2 buổi/tuần.', emoji: '🚶' },
  { value: 'active', title: 'Tích cực', description: 'Tập 3-5 buổi/tuần đều đặn.', emoji: '🏃' },
];

export const trainingTypeOptions = ['Gym', 'Cardio', 'Yoga', 'HIIT', 'Bơi lội'];
export const dietStyleOptions: { value: DietStyle; label: string; emoji: string }[] = [
  { value: 'balanced', label: 'Balanced', emoji: '🥗' },
  { value: 'keto', label: 'Keto', emoji: '🥑' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'paleo', label: 'Paleo', emoji: '🔥' },
];

export type Gender = 'male' | 'female' | 'other';
export type FitnessGoal = 'gain-muscle' | 'lose-fat' | 'maintain';
export type ActivityLevel = 'sedentary' | 'light' | 'active';
export type DietStyle = 'balanced' | 'keto' | 'vegan' | 'paleo';

export type ProfileSetupDraft = {
  fullName: string;
  age: number | null;
  gender: Gender;
  heightCm: number | null;
  weightKg: number | null;
  goal: FitnessGoal;
  activityLevel: ActivityLevel;
  workoutsPerWeek: number;
  workoutMinutes: number;
  trainingTypes: string[];
  allergies: string[];
  dislikedFoods: string[];
  dietStyle: DietStyle;
  favoriteMeals: string;
  avoidMeals: string;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
};

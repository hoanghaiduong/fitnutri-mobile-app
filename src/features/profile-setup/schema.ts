import { z } from 'zod';

export const profileStep1Schema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập ít nhất 2 ký tự.'),
  age: z.coerce.number().min(12, 'Tuổi phải từ 12 trở lên.').max(100, 'Tuổi không hợp lệ.'),
  gender: z.enum(['male', 'female', 'other']),
  heightCm: z.coerce.number().min(120, 'Chiều cao không hợp lệ.').max(230, 'Chiều cao không hợp lệ.'),
  weightKg: z.coerce.number().min(30, 'Cân nặng không hợp lệ.').max(250, 'Cân nặng không hợp lệ.'),
});

export const profileStep2Schema = z.object({
  goal: z.enum(['gain-muscle', 'lose-fat', 'maintain']),
  activityLevel: z.enum(['sedentary', 'light', 'active']),
  workoutsPerWeek: z.coerce.number().min(1).max(7),
  workoutMinutes: z.coerce.number().min(15).max(120),
  trainingTypes: z.array(z.string()).min(1, 'Chọn ít nhất 1 loại tập.'),
});

export const profileStep3Schema = z.object({
  allergies: z.array(z.string()),
  dislikedFoods: z.array(z.string()),
  dietStyle: z.enum(['balanced', 'keto', 'vegan', 'paleo']),
  favoriteMeals: z.string().optional(),
  avoidMeals: z.string().optional(),
});

export const profileStep4Schema = z.object({
  dailyCalories: z.coerce.number().min(1200).max(5000),
  proteinGrams: z.coerce.number().min(40).max(400),
  carbsGrams: z.coerce.number().min(50).max(600),
  fatGrams: z.coerce.number().min(20).max(200),
});

export type ProfileStep1Values = z.infer<typeof profileStep1Schema>;
export type ProfileStep2Values = z.infer<typeof profileStep2Schema>;
export type ProfileStep3Values = z.infer<typeof profileStep3Schema>;
export type ProfileStep4Values = z.infer<typeof profileStep4Schema>;

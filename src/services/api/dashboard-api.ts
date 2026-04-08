import { fakeApi } from '@/lib/fake-api';
import { apiClient } from '@/lib/api-client';
import type { DashboardOverview } from '@/types/dashboard';

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    await apiClient.request({ path: '/dashboard/overview', requiresAuth: true });

    return fakeApi.get(() => ({
      greetingName: 'Minh',
      goalLabel: 'Tăng cơ',
      weeklyProgress: 65,
      caloriesConsumed: 1450,
      caloriesTarget: 2200,
      caloriesRemaining: 750,
      macros: [
        { label: 'PRO', consumed: 110, target: 150, accent: 'primary' },
        { label: 'CARB', consumed: 180, target: 250, accent: 'warning' },
        { label: 'FAT', consumed: 45, target: 65, accent: 'info' },
      ],
      timeline: [
        { id: '1', mealType: 'Bữa sáng', time: '07:30', title: 'Bánh mì bơ trứng chần', calories: 420, protein: 25, completed: true },
        { id: '2', mealType: 'Bữa trưa', time: '12:30', title: 'Salmon & Quinoa Salad', calories: 580, protein: 40, completed: false },
        { id: '3', mealType: 'Bữa tối', time: '19:00', title: 'Ức gà áp chảo & bông cải', calories: 450, protein: 45, completed: false },
      ],
      bmi: 22.4,
      weightKg: 75,
      bmr: 1850,
      trendPoints: [42, 55, 51, 70, 64, 76, 68],
      recentPlans: [
        { id: '1', title: 'Keto Mediterranean', calories: 1800, imageVariant: 'breakfast' },
        { id: '2', title: 'Power Poke Bowl', calories: 2100, imageVariant: 'lunch' },
        { id: '3', title: 'Lean Muscle Prep', calories: 2300, imageVariant: 'snack' },
      ],
    }));
  },
};

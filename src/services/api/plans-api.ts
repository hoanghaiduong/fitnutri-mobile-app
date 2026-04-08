import { fakeApi } from '@/lib/fake-api';
import { apiClient } from '@/lib/api-client';
import type { MonthlyDay, ResultSummary, WeeklyTimelineItem } from '@/types/plan';

const monthlyDays: MonthlyDay[] = Array.from({ length: 31 }).map((_, index) => {
  const day = index + 1;

  return {
    day,
    hasCompletedWorkout: [1, 2, 6, 7, 10, 13, 14, 16].includes(day),
    hasPlannedWorkout: [4, 9, 17, 20, 21, 24].includes(day),
    isToday: day === 16,
  };
});

const weeklyTimeline: WeeklyTimelineItem[] = [
  { id: '1', dayLabel: 'Thứ Hai • 15 Tháng 5', title: 'Tập Ngực & Tay sau', subtitle: 'High Protein - 2200 kcal', status: 'completed' },
  { id: '2', dayLabel: 'Thứ Ba • 16 Tháng 5', title: 'Tập Chân & Bụng', subtitle: 'Balanced Growth - 2400 kcal', status: 'active' },
  { id: '3', dayLabel: 'Thứ Tư • 17 Tháng 5', title: 'Nghỉ ngơi & Phục hồi', subtitle: 'Yoga nhẹ hoặc đi bộ', status: 'upcoming' },
  { id: '4', dayLabel: 'AI Insight', title: 'Tối ưu carb cho buổi tập cường độ cao vào Thứ Sáu.', subtitle: 'Chuẩn bị bữa tối giàu carb từ tối hôm trước.', status: 'insight' },
];

const resultSummary: ResultSummary = {
  calories: 2150,
  protein: 140,
  carbs: 200,
  fat: 65,
  insight: 'Thực đơn này phù hợp mục tiêu tăng cơ, tránh hoàn toàn hải sản và ưu tiên protein từ gà, trứng, sữa chua Hy Lạp.',
  meals: [
    { id: '1', mealType: 'Bữa sáng', time: '07:00 - 08:30', title: 'Phở gà gạo lứt', calories: 350, protein: 30, imageVariant: 'breakfast' },
    { id: '2', mealType: 'Bữa trưa', time: '12:00 - 13:00', title: 'Ức gà nướng măng tây', calories: 520, protein: 55, imageVariant: 'lunch' },
    { id: '3', mealType: 'Bữa phụ', time: '15:30 - 16:00', title: 'Sữa chua Hy Lạp & hạt', calories: 280, protein: 15, imageVariant: 'snack' },
  ],
};

export const plansApi = {
  getMonthlyPlan: async (): Promise<MonthlyDay[]> => {
    await apiClient.request({ path: '/plans/monthly', requiresAuth: true });
    return fakeApi.get(() => monthlyDays);
  },
  getWeeklyPlan: async (): Promise<WeeklyTimelineItem[]> => {
    await apiClient.request({ path: '/plans/weekly', requiresAuth: true });
    return fakeApi.get(() => weeklyTimeline);
  },
  getResultSummary: async (): Promise<ResultSummary> => {
    await apiClient.request({ path: '/plans/result-summary', requiresAuth: true });
    return fakeApi.get(() => resultSummary);
  },
};

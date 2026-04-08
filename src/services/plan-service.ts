import { plansApi } from '@/services/api/plans-api';

export const planService = {
  getMonthlyPlan: async () => plansApi.getMonthlyPlan(),
  getWeeklyPlan: async () => plansApi.getWeeklyPlan(),
  getResultSummary: async () => plansApi.getResultSummary(),
};

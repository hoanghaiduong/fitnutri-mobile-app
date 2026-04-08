import { dashboardApi } from '@/services/api/dashboard-api';

export const dashboardService = {
  getOverview: async () => dashboardApi.getOverview(),
};

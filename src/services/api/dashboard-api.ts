import { AppError } from '@/lib/app-error';
import { profileApi } from '@/services/api/profile-api';
import { createDashboardOverviewFromProfile } from '@/services/dashboard-overview-mapper';
import type { DashboardOverview } from '@/types/dashboard';

const unwrapProfile = (responseData: unknown): Record<string, unknown> | null => {
  if (!responseData || typeof responseData !== 'object') {
    return null;
  }

  const data = (responseData as { data?: unknown }).data;
  if (data && typeof data === 'object') {
    return data as Record<string, unknown>;
  }

  return responseData as Record<string, unknown>;
};

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    try {
      const profileResponse = await profileApi.getProfile();
      return createDashboardOverviewFromProfile(unwrapProfile(profileResponse.data));
    } catch (error) {
      if (error instanceof AppError && error.status === 404) {
        return createDashboardOverviewFromProfile(null);
      }

      throw error;
    }
  },
};

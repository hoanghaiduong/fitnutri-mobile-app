import { useEffect } from 'react';

import { useRequest } from '@/hooks/use-request';
import { dashboardService } from '@/services/dashboard-service';

export const useDashboardOverview = () => {
  const request = useRequest(dashboardService.getOverview);

  useEffect(() => {
    void request.execute();
  }, [request.execute]);

  return request;
};

import { useEffect } from 'react';

import { useRequest } from '@/hooks/use-request';
import { planService } from '@/services/plan-service';

export const useWeeklyPlan = () => {
  const request = useRequest(planService.getWeeklyPlan);

  useEffect(() => {
    void request.execute();
  }, [request.execute]);

  return request;
};

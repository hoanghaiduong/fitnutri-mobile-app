import { useEffect } from 'react';

import { useRequest } from '@/hooks/use-request';
import { planService } from '@/services/plan-service';

export const useMonthlyPlan = () => {
  const request = useRequest(planService.getMonthlyPlan);

  useEffect(() => {
    void request.execute();
  }, [request.execute]);

  return request;
};

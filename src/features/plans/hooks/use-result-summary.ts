import { useEffect } from 'react';

import { useRequest } from '@/hooks/use-request';
import { planService } from '@/services/plan-service';

export const useResultSummary = () => {
  const request = useRequest(planService.getResultSummary);

  useEffect(() => {
    void request.execute();
  }, [request.execute]);

  return request;
};

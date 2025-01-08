import { useQuery } from '@tanstack/react-query';
import * as API from '@/peopleops/types';

export const useDashboardIndicators = (props?: { enabled: boolean }) => {
  const queryResult = useQuery({
    queryKey: ['dashboard-indicators'],
    queryFn: () => API.Dashboard.getIndicators(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!props?.enabled,
    meta: {
      name: 'dashboard-indicators',
    },
  });

  return queryResult;
};

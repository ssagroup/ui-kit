import { ErrorBoundary } from 'react-error-boundary';

import { DashboardError } from '@components/DashboardError';
import { LoadingDashboard } from '@components/LoadingDashboard';
import { useDashboard } from '@entities/dashboard';
import { Dashboard } from '@shared/dashboard';
import {
  InfraDashPanelDataPeriodProvider,
  useInfraDashPanelDataPeriod,
  UseInfraDashPanelDataPeriodOptions,
} from '@shared/context';

import {
  DashboardPanelGrid,
  DashboardPanelGridProps,
} from '../../features/DashboardPanelGrid';

export type DashboardViewerProps = {
  dashboardId?: number;
  dashboard?: Dashboard;
} & Omit<DashboardPanelGridProps, 'dashboard'> &
  UseInfraDashPanelDataPeriodOptions;

export const DashboardViewer = ({
  dashboard,
  dashboardId,
  ...props
}: DashboardViewerProps) => {
  const dashboardById = useDashboard(dashboardId ?? -1, {
    enabled: !!dashboardId && !dashboard,
  });

  const DashboardWrapper: React.FC<{
    dashboard: Dashboard;
  }> = ({ dashboard }) => {
    const panelDataPeriod = useInfraDashPanelDataPeriod({ ...props });
    return (
      <InfraDashPanelDataPeriodProvider value={panelDataPeriod}>
        <ErrorBoundary
          fallback={<DashboardError>Something went wrong</DashboardError>}>
          <DashboardPanelGrid {...props} dashboard={dashboard} />
        </ErrorBoundary>
      </InfraDashPanelDataPeriodProvider>
    );
  };

  if (dashboard) {
    return <DashboardWrapper dashboard={dashboard} />;
  }
  if (!dashboardById.isLoaded) {
    return <LoadingDashboard />;
  }
  if (dashboardById.error) {
    return <DashboardError />;
  }
  return <DashboardWrapper dashboard={dashboardById.data} />;
};

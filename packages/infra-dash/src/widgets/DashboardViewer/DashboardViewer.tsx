import { ErrorBoundary } from 'react-error-boundary';

import { DashboardError } from '@components/DashboardError';
import { LoadingDashboard } from '@components/LoadingDashboard';
import { useDashboard } from '@entities/dashboard';
import { Dashboard } from '@shared/dashboard';

import {
  DashboardPanelGrid,
  DashboardPanelGridProps,
} from '../../features/DashboardPanelGrid';

export type DashboardViewerProps = {
  dashboardId?: number;
  dashboard?: Dashboard;
} & Omit<DashboardPanelGridProps, 'dashboard'>;

export const DashboardViewer = ({
  dashboard,
  dashboardId,
  ...props
}: DashboardViewerProps) => {
  const dashboardById = useDashboard(dashboardId ?? -1, {
    enabled: !!dashboardId && !dashboard,
  });
  if (dashboard) {
    return (
      <ErrorBoundary
        fallback={<DashboardError>Something went wrong</DashboardError>}>
        <DashboardPanelGrid {...props} dashboard={dashboard} />
      </ErrorBoundary>
    );
  }
  if (!dashboardById.isLoaded) {
    return <LoadingDashboard />;
  }
  if (dashboardById.error) {
    return <DashboardError />;
  }
  return (
    <ErrorBoundary
      fallback={<DashboardError>Something went wrong</DashboardError>}>
      <DashboardPanelGrid {...props} dashboard={dashboardById.data} />
    </ErrorBoundary>
  );
};

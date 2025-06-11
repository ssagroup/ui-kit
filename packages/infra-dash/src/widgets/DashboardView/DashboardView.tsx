import { ErrorBoundary } from 'react-error-boundary';

import { DashboardError } from '@components/DashboardError';
import { LoadingDashboard } from '@components/LoadingDashboard';
import { useDashboard } from '@entities/dashboard';
import { Dashboard } from '@shared/dashboard';

import { DashboardViewBase, DashboardViewBaseProps } from './DashboardViewBase';

export type DashboardViewProps = {
  dashboardId?: number;
  dashboard?: Dashboard;
} & Omit<DashboardViewBaseProps, 'dashboard'>;

export const DashboardView = (props: DashboardViewProps) => {
  let dashboard: Dashboard | undefined = undefined;
  if ('dashboard' in props) {
    dashboard = props.dashboard;
  }
  const dashboardId = 'dashboardId' in props ? props.dashboardId : undefined;
  const dashboardById = useDashboard(dashboardId ?? -1, {
    enabled: !!dashboardId,
  });
  if (dashboard) {
    return (
      <ErrorBoundary fallback={<div>Error loading dashboard</div>}>
        <DashboardViewBase {...props} dashboard={dashboard} />
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
    <ErrorBoundary fallback={<DashboardError />}>
      <DashboardViewBase {...props} dashboard={dashboardById.data} />
    </ErrorBoundary>
  );
};

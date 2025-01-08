import { DepartmentIndicatorWidgets } from '@peopleops/components/DepartmentIndicatorGraph';
import { DashboardLayout, DashboardTable, Widgets } from './components';

export const Dashboard = () => (
  <DashboardLayout>
    <DashboardTable />
    <Widgets />
    <DepartmentIndicatorWidgets />
  </DashboardLayout>
);

import {
  useDashboardCharts,
  useDashboardEvents,
  useDashboardGraphs,
  useDashboardIndicators,
} from '@peopleops/hooks/dashboard';
import * as C from '@peopleops/components';
import * as S from '../styles';

export const Widgets = () => {
  const indicators = useDashboardIndicators({
    enabled: true,
  });
  const charts = useDashboardCharts({
    enabled: true,
  });
  const events = useDashboardEvents();
  const graphs = useDashboardGraphs({
    enabled: true,
  });
  return (
    <S.Widgets>
      <C.EventsWithLoader isFetching={events.isFetching} />
      <C.SeniorityLevelWithLoader isFetching={charts.isFetching} />
      <C.EducationLevelWithLoader isFetching={charts.isFetching} />
      <C.AgeChartWithLoader isFetching={charts.isFetching} />
      <C.StaffTypeWithLoader isFetching={indicators.isFetching} />
      <C.GenderWithLoader isFetching={indicators.isFetching} />
      <C.WorkScheduleWithLoader isFetching={indicators.isFetching} />
      <C.EmploymentTypeWithLoader isFetching={charts.isFetching} />
      <C.DepartmentsWithLoader isFetching={charts.isFetching} />
      <C.FTEWithLoader isFetching={graphs.isFetching} />
      <C.HeadCountByFullCompanyWithLoader isFetching={graphs.isFetching} />
      <C.SeniorityProductionEmployeesWithLoader
        isFetching={graphs.isFetching}
      />
      <C.ProductionAdministrativeWithLoader isFetching={graphs.isFetching} />
      <C.ResourcesOnBenchWithLoader isFetching={graphs.isFetching} />
      <C.UtilizationWithLoader isFetching={graphs.isFetching} />
    </S.Widgets>
  );
};

import * as C from '@hr/components';

import * as S from '../styles';

export const Widgets = () => (
  <S.Widgets>
    <C.EventsWithLoader isFetching={false} />
    <C.SeniorityLevelWithLoader isFetching={false} />
    <C.EducationLevelWithLoader isFetching={false} />
    <C.AgeChartWithLoader isFetching={false} />
    <C.StaffTypeWithLoader isFetching={false} />
    <C.GenderWithLoader isFetching={false} />
    <C.WorkScheduleWithLoader isFetching={false} />
    <C.EmploymentTypeWithLoader isFetching={false} />
    <C.DepartmentsWithLoader isFetching={false} />
    <C.FTEWithLoader isFetching={false} />
    <C.HeadCountByFullCompanyWithLoader isFetching={false} />
    <C.SeniorityProductionEmployeesWithLoader isFetching={false} />
    <C.ProductionAdministrativeWithLoader isFetching={false} />
    <C.ResourcesOnBenchWithLoader isFetching={false} />
    <C.UtilizationWithLoader isFetching={false} />
  </S.Widgets>
);

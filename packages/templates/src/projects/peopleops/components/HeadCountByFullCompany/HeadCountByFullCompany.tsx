import { useTranslation } from '@ssa-ui-kit/core';
import { DashboardGraphs } from '@/peopleops/types';
import { useDashboardGraphsData } from '@peopleops/hooks/dashboard';
import { WidgetBarLineChart, WithWidgetLoader } from '..';

export const HeadCountByFullCompany = ({
  data = [],
  timestamps = [],
}: {
  data: DashboardGraphs['headCountByFullCompanyGraph'];
  timestamps: DashboardGraphs['timeStamps'];
}) => {
  const { t } = useTranslation();
  return (
    <WidgetBarLineChart
      title={t('widgets.headCountByFullCompany.title')}
      data={data}
      timestamps={timestamps}
      gridArea="headCountByFullCompany"
      maxVisibleLines={5}
    />
  );
};

export const HeadCountByFullCompanyWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const { headCountByFullCompanyGraph = [], timeStamps = [] } =
    useDashboardGraphsData();
  return (
    <WithWidgetLoader
      title={'widgets.headCountByFullCompany.title'}
      css={{ gridArea: 'headCountByFullCompany' }}
      isFetching={isFetching}>
      <HeadCountByFullCompany
        data={headCountByFullCompanyGraph}
        timestamps={timeStamps}
      />
    </WithWidgetLoader>
  );
};

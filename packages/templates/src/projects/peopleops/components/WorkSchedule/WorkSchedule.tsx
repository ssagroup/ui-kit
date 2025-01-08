import { useTranslation } from '@ssa-ui-kit/core';
import { css } from '@emotion/css';
import { pathOr } from '@ssa-ui-kit/utils';
import { DashboardIndicators } from '@/peopleops/types';
import { useDashboardIndicators } from '@peopleops/hooks/dashboard';
import { Distribution, DistributionContentSingle } from '../Distribution';
import { WithWidgetLoader } from '..';

export const WorkSchedule = ({
  fullTime = 0,
  fullTimePercentage = 0,
  fullTimeColor,
  partTime = 0,
  partTimePercentage = 0,
  partTimeColor,
}: DashboardIndicators['diagrams']['workSchedule']) => {
  const { t } = useTranslation();
  const distributionData: Array<DistributionContentSingle> = [
    {
      label: t('widgets.workSchedule.fullTime'),
      value: fullTimePercentage,
      valueOutput: `${fullTimePercentage}% (${fullTime})`,
      backgroundCSS: css`
        background-color: ${fullTimeColor};
      `,
    },
    {
      label: t('widgets.workSchedule.partTime'),
      value: partTimePercentage,
      valueOutput: `${partTimePercentage}% (${partTime})`,
      backgroundCSS: css`
        background-color: ${partTimeColor};
      `,
    },
  ];
  return (
    <Distribution
      css={{ gridArea: 'workSchedule' }}
      contentCSS={{
        '& > div:last-of-type': {
          textAlign: 'right',
        },
      }}
      title={t('widgets.workSchedule.title')}
      data={distributionData}
    />
  );
};

export const WorkScheduleWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const indicators = useDashboardIndicators();
  const data = pathOr<
    typeof indicators,
    DashboardIndicators['diagrams']['workSchedule']
  >({}, ['data', 'result', 'diagrams', 'workSchedule'])(indicators);
  return (
    <WithWidgetLoader
      title={'widgets.workSchedule.title'}
      css={{ gridArea: 'workSchedule' }}
      isFetching={isFetching}>
      <WorkSchedule {...data} />
    </WithWidgetLoader>
  );
};

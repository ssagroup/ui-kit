import { useTranslation } from '@ssa-ui-kit/core';
import { css } from '@emotion/css';
import { pathOr } from '@ssa-ui-kit/utils';
import { DashboardIndicators } from '@/peopleops/types';
import { useDashboardIndicators } from '@peopleops/hooks/dashboard';
import { Distribution, DistributionContentSingle } from '../Distribution';
import { WithWidgetLoader } from '..';

export const EmploymentType = ({
  contractors,
  contractorsPercentage,
  contractorsColor,
  staff,
  staffPercentage,
  staffColor,
}: DashboardIndicators['diagrams']['employmentType']) => {
  const { t } = useTranslation();
  const distributionData: Array<DistributionContentSingle> = [
    {
      label: t('widgets.employmentType.contractors'),
      value: contractorsPercentage,
      valueOutput: `${contractorsPercentage}% (${contractors})`,
      backgroundCSS: css`
        background-color: ${contractorsColor};
      `,
    },
    {
      label: t('widgets.employmentType.staff'),
      value: staffPercentage,
      valueOutput: `${staffPercentage}% (${staff})`,
      backgroundCSS: css`
        background-color: ${staffColor};
      `,
    },
  ];
  return (
    <Distribution
      css={{ gridArea: 'employmentType' }}
      contentCSS={{
        '& > div:last-of-type': {
          textAlign: 'right',
        },
      }}
      title={t('widgets.employmentType.title')}
      data={distributionData}
    />
  );
};

export const EmploymentTypeWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const indicators = useDashboardIndicators();
  const data = pathOr<
    typeof indicators,
    DashboardIndicators['diagrams']['employmentType']
  >({}, ['data', 'result', 'diagrams', 'employmentType'])(indicators);
  return (
    <WithWidgetLoader
      title={'widgets.employmentType.title'}
      css={{ gridArea: 'employmentType' }}
      isFetching={isFetching}>
      <EmploymentType {...data} />
    </WithWidgetLoader>
  );
};

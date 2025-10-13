import { css } from '@emotion/css';
import { useDashboardIndicators } from '@hr/hooks/dashboard';

import { useTranslation } from '@ssa-ui-kit/core';

import { pathOr } from '@ssa-ui-kit/utils';

import { DashboardIndicators } from '@/hr/types';

import { Distribution, DistributionContentSingle } from '../Distribution';

import { WithWidgetLoader } from '..';

export const StaffType = ({
  administrative = 0,
  administrativePercentage = 0,
  administrativeColor,
  production = 0,
  productionPercentage = 0,
  productionColor,
}: DashboardIndicators['diagrams']['staffType']) => {
  const { t } = useTranslation();
  const distributionData: Array<DistributionContentSingle> = [
    {
      label: t('widgets.staffType.production'),
      value: productionPercentage,
      valueOutput: `${productionPercentage}% (${production})`,
      backgroundCSS: css`
        background-color: ${productionColor};
      `,
    },
    {
      label: t('widgets.staffType.administrative'),
      value: administrativePercentage,
      valueOutput: `${administrativePercentage}% (${administrative})`,
      backgroundCSS: css`
        background-color: ${administrativeColor}!important;
      `,
    },
  ];
  return (
    <Distribution
      css={{ gridArea: 'staffType' }}
      contentCSS={{
        '& > div:last-of-type': {
          textAlign: 'right',
        },
      }}
      title={t('widgets.staffType.title')}
      data={distributionData}
    />
  );
};

export const StaffTypeWithLoader = ({
  isFetching,
}: {
  isFetching: boolean;
}) => {
  const indicators = useDashboardIndicators();
  const data = pathOr<
    typeof indicators,
    DashboardIndicators['diagrams']['staffType']
  >({}, ['result', 'diagrams', 'staffType'])(indicators);
  return (
    <WithWidgetLoader
      title={'widgets.staffType.title'}
      css={{ gridArea: 'staffType' }}
      isFetching={isFetching}>
      <StaffType {...data} />
    </WithWidgetLoader>
  );
};

import { useTranslation } from '@ssa-ui-kit/core';
import { css } from '@emotion/css';
import { pathOr } from '@ssa-ui-kit/utils';
import { DashboardIndicators } from '@/peopleops/types';
import { useDashboardIndicators } from '@peopleops/hooks/dashboard';
import { Distribution, DistributionContentSingle } from '../Distribution';
import { WithWidgetLoader } from '..';

export const Gender = ({
  male = 0,
  malePercentage = 0,
  maleColor,
  female = 0,
  femalePercentage = 0,
  femaleColor,
  others = 0,
  othersPercentage = 0,
  othersColor,
}: DashboardIndicators['diagrams']['genderType']) => {
  const { t } = useTranslation();
  const distributionData: Array<DistributionContentSingle> = [
    {
      label: t('widgets.gender.male'),
      value: malePercentage,
      valueOutput: `${malePercentage}% (${male})`,
      backgroundCSS: css`
        background-color: ${maleColor};
      `,
    },
  ];
  if (others !== undefined && othersPercentage > 0) {
    distributionData.push({
      label: t('widgets.gender.others'),
      value: othersPercentage,
      valueOutput: `${othersPercentage}% (${others})`,
      backgroundCSS: css`
        background-color: ${othersColor};
      `,
    });
  }
  distributionData.push({
    label: t('widgets.gender.female'),
    value: femalePercentage,
    valueOutput: `${femalePercentage}% (${female})`,
    backgroundCSS: css`
      background-color: ${femaleColor};
    `,
  });
  return (
    <Distribution
      css={{ gridArea: 'gender' }}
      contentCSS={{
        '& > div:last-of-type': {
          textAlign: 'right',
        },
      }}
      title={t('widgets.gender.title')}
      data={distributionData}
    />
  );
};

export const GenderWithLoader = ({ isFetching }: { isFetching: boolean }) => {
  const indicators = useDashboardIndicators();
  const data = pathOr<
    typeof indicators,
    DashboardIndicators['diagrams']['genderType']
  >({}, ['result', 'diagrams', 'genderType'])(indicators);
  return (
    <WithWidgetLoader
      title={'widgets.gender.title'}
      css={{ gridArea: 'gender' }}
      isFetching={isFetching}>
      <Gender {...data} />
    </WithWidgetLoader>
  );
};

import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';
import { Wrapper } from '@ssa-ui-kit/core';
import { useCurrency } from '@trading/contexts';
import { MarketRolesProps } from './types';
import { DistributionMultiline } from '../Distribution';
import { WithWidgetLoader } from '..';

export const MarketRoles = ({
  roleMaker = 0,
  roleMakerPercents = 0,
  roleTaker = 0,
  roleTakerPercents = 0,
  roleMakerCost = 0,
  roleMakerCostPercents = 0,
  roleTakerCost = 0,
  roleTakerCostPercents = 0,
}: MarketRolesProps) => {
  const { t } = useTranslation();
  const { currency } = useCurrency();
  const theme = useTheme();
  return (
    <Wrapper css={{ gridArea: 'roles' }}>
      <DistributionMultiline
        css={{
          '& > div:first-of-type': {
            height: 26,
          },
          '& > div:last-of-type': {
            justifyContent: 'space-evenly',
          },
          [theme.mediaQueries.md]: {
            '& > div:last-of-type': {
              justifyContent: 'space-around',
            },
          },
        }}
        title={t('market-roles.title')}
        rows={[
          {
            leftPercent: roleMakerCostPercents,
            leftText:
              roleMakerCost + ' ' + currency + ' ' + t('market-roles.makers'),
            rightPercent: roleTakerCostPercents,
            rightText:
              roleTakerCost + ' ' + currency + ' ' + t('market-roles.takers'),
          },
          {
            leftPercent: roleMakerPercents,
            leftText: roleMaker + ' ' + t('market-roles.makers'),
            rightPercent: roleTakerPercents,
            rightText: roleTaker + ' ' + t('market-roles.takers'),
          },
        ]}
      />
    </Wrapper>
  );
};

export const MarketRolesWithLoader = ({
  isFetching,
  ...props
}: MarketRolesProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'market-roles.title'}
    css={{ gridArea: 'roles' }}
    isFetching={isFetching}>
    <MarketRoles {...props} />
  </WithWidgetLoader>
);

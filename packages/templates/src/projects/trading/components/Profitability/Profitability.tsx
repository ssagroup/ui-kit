import { useTranslation } from 'react-i18next';
import { ProfitabilityProps } from './types';
import { Distribution } from '../Distribution';
import { WithWidgetLoader } from '..';

export const Profitability = ({
  profit = 0,
  profitPercents = 0,
  loss = 0,
  lossPercents = 0,
  currency = '',
}: ProfitabilityProps) => {
  const { t } = useTranslation();

  return (
    <Distribution
      css={{ gridArea: 'profitability' }}
      title={t('profitability.title')}
      leftPercent={profitPercents}
      leftText={`${profit} ${currency} ${t('profitability.profit')}`}
      rightPercent={lossPercents}
      rightText={`${loss} ${currency} ${t('profitability.loss')}`}
    />
  );
};

export const ProfitabilityWithLoader = ({
  isFetching,
  ...props
}: ProfitabilityProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'profitability.title'}
    css={{ gridArea: 'profitability' }}
    isFetching={isFetching}>
    <Profitability {...props} />
  </WithWidgetLoader>
);

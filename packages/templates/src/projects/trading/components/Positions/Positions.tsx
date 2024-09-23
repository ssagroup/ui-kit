import { useTranslation } from 'react-i18next';
import { Distribution } from '../Distribution';
import { PositionsProps } from './types';
import { WithWidgetLoader } from '..';

export const Positions = ({
  profitPositions = 0,
  profitPositionsPercent = 0,
  lossPositions = 0,
  lossPositionsPercents = 0,
}: PositionsProps) => {
  const { t } = useTranslation();
  return (
    <Distribution
      css={{ gridArea: 'positions' }}
      title={t('positions.title')}
      leftPercent={profitPositionsPercent}
      leftText={profitPositions + ' ' + t('positions.profit')}
      rightPercent={lossPositionsPercents}
      rightText={lossPositions + ' ' + t('positions.loss')}
    />
  );
};

export const PositionsWithLoader = ({
  isFetching,
  ...props
}: PositionsProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'positions.title'}
    css={{ gridArea: 'positions' }}
    isFetching={isFetching}>
    <Positions {...props} />
  </WithWidgetLoader>
);

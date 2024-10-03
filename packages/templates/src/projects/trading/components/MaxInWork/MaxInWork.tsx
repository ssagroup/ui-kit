import { useTranslation } from '@contexts';
import { Card } from './Card';
import { BalanceInfo } from './BalanceInfo';
import { Progress } from './Progress';
import { BalanceAmount } from './BalanceAmount';
import { MaxInWorkProps } from './types';
import { WithWidgetLoader } from '..';

export const MaxInWork = ({
  amount = 0,
  percent = 0,
  currency,
  ...props
}: MaxInWorkProps) => {
  const { t } = useTranslation();
  return (
    <Card
      title={t('max-in-work.title')}
      css={{
        gridArea: 'max',
        '& > div:last-of-type': { justifyContent: 'center' },
      }}
      {...props}>
      <BalanceInfo percent={percent} text={t('max-in-work.balance')} />
      <Progress percent={percent > 100 ? 100 : percent} />
      <BalanceAmount amount={amount} currency={currency} />
    </Card>
  );
};

export const MaxInWorkWithLoader = ({
  isFetching,
  ...props
}: MaxInWorkProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'max-in-work.title'}
    css={{ gridArea: 'max', paddingBottom: 25 }}
    isFetching={isFetching}>
    <MaxInWork {...props} />
  </WithWidgetLoader>
);

import { useTranslation } from 'react-i18next';
import { AccountBalance } from '@ssa-ui-kit/widgets';
import { transformBalanceData as transform } from '@trading/utils';
import { BalanceProps } from './types';
import { WithWidgetLoader } from '..';

export const Balance = ({ balance }: BalanceProps) => {
  const { t } = useTranslation();
  const transformedData = transform(balance);

  return (
    <AccountBalance
      title={t('balance.title')}
      css={{
        background: 'white',
        gridArea: 'balance',
        '& > div:last-of-type': {
          height: '100%',
          alignContent: 'center',
        },
      }}
      {...transformedData}
    />
  );
};

export const BalanceWithLoader = ({
  isFetching,
  ...props
}: BalanceProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'balance.title'}
    css={{ gridArea: 'balance', background: 'white' }}
    isFetching={isFetching}>
    <Balance {...props} />
  </WithWidgetLoader>
);

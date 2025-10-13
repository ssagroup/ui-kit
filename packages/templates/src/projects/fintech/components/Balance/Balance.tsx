import { transformBalanceData as transform } from '@fintech/utils';

import { AccountBalance } from '@ssa-ui-kit/widgets';

import { useTranslation } from '@contexts';

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
        '& .pie-chart-wrapper p': {
          fontSize: 12,
        },
        '& ul li h6': {
          whiteSpace: 'nowrap',
        },
        '& > div:last-of-type': {
          height: '100%',
          justifyContent: 'center',
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

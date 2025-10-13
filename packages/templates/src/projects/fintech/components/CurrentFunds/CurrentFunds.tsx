import { useTheme } from '@emotion/react';
import { useCurrency } from '@fintech/contexts';

import { Wrapper } from '@ssa-ui-kit/core';

import { useTranslation } from '@contexts';

import { DistributionMultiline } from '../Distribution';

import * as S from './styles';
import { CurrentFundsProps, TitleBarProps } from './types';

import { WithWidgetLoader } from '..';

export const CurrentFunds = ({
  longFunds = 0,
  longFundsPercents = 0,
  shortFunds = 0,
  shortFundsPercents = 0,
  isAdditionalRightBar,
  title,
  styles,
}: Omit<CurrentFundsProps, 'total' | 'totalPercents'> & TitleBarProps) => {
  const { t } = useTranslation();
  const { currency } = useCurrency();
  return (
    <Wrapper css={styles}>
      <DistributionMultiline
        css={S.Title}
        title={t(title)}
        rows={[
          {
            leftPercent: longFundsPercents,
            leftText: `${longFunds} ${currency}`,
            rightPercent: shortFundsPercents,
            rightText: `${shortFunds} ${currency}`,
          },
        ]}
        isAdditionalRightBar={isAdditionalRightBar}
      />
    </Wrapper>
  );
};

export const CurrentFundsWithLoader = ({
  isFetching,
  ...props
}: Omit<CurrentFundsProps, 'total' | 'totalPercents'> &
  TitleBarProps & { isFetching: boolean }) => {
  const theme = useTheme();
  return (
    <WithWidgetLoader
      title={props.title}
      css={props.styles}
      isFetching={isFetching}>
      <CurrentFunds
        {...props}
        styles={[
          props.styles,
          {
            '& h3': {
              fontSize: 14,
              [theme.mediaQueries.md]: {
                fontSize: 16,
              },
            },
            '& > div > div': {
              '&:first-of-type': {
                marginBottom: 0,
              },
              '&:last-of-type': {
                justifyContent: 'center',
              },
            },
          },
        ]}
      />
    </WithWidgetLoader>
  );
};

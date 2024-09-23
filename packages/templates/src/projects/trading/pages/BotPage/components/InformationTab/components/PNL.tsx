import { useTheme } from '@emotion/react';
import { CardBase, CardContent, Typography, Icon } from '@ssa-ui-kit/core';
import type { TradingScoreboardProps } from '@ssa-ui-kit/widgets';
import { propOr } from '@ssa-ui-kit/utils';
import { Bot } from '@trading/types';
import { useCurrency } from '@trading/contexts';
import * as S from '../styles';

export const PNL = ({
  bot,
  title,
  propertyName,
  propertyUpName,
  showArrow = true,
}: TradingScoreboardProps['items'][0] & {
  bot: Bot;
  propertyName: 'pnl' | 'pnlInvestment' | 'pnlTotal';
  propertyUpName: 'pnlUp' | 'pnlInvestmentUp' | 'pnlTotalUp';
  showArrow?: boolean;
}) => {
  const theme = useTheme();
  const { currency } = useCurrency();
  const statistics = propOr<Bot, Bot['statistics']>({}, 'statistics')(bot);
  const pnl = propOr<Bot['statistics'], number>(0, propertyName)(statistics);
  const pnlUp = propOr<Bot['statistics'], boolean | null>(
    null,
    propertyUpName,
  )(statistics);

  return (
    <CardBase role="button" tabIndex={0} css={S.infoCardWrapper}>
      <CardContent
        css={{
          gap: 0,
          flexDirection: 'row',
          alignItems: 'center',
          [theme.mediaQueries.md]: {
            gap: 2,
          },
        }}>
        <Typography variant="h5" weight="bold" color={theme.colors.greyDarker}>
          {pnl === 0 ? '' : pnl > 0 ? '+' : ''}
          {pnl}
        </Typography>
        <Typography
          data-testid="unit"
          variant="h6"
          weight="lighter"
          css={{
            display: 'flex',
            fontWeight: 400,
            marginLeft: 2,
          }}>
          <span
            css={{
              textWrap: 'nowrap',
            }}>
            {currency}
          </span>
          {showArrow && pnl && (
            <div
              css={{
                display: 'flex',
                alignSelf: 'center',
                marginLeft: 3,
              }}>
              <Icon
                name={pnlUp ? 'arrow-up' : 'arrow-down'}
                color={pnlUp ? theme.colors.green : theme.colors.pink}
                size={16}
              />
            </div>
          )}
        </Typography>
      </CardContent>
      <Typography css={{ fontSize: '12px' }}>{title}</Typography>
    </CardBase>
  );
};

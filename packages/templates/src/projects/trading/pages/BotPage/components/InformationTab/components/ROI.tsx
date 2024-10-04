import { useTheme } from '@emotion/react';
import { CardBase, CardContent, Typography, Icon } from '@ssa-ui-kit/core';
import type { TradingScoreboardProps } from '@ssa-ui-kit/widgets';
import { propOr } from '@ssa-ui-kit/utils';
import { Bot } from '@trading/types';
import * as S from '../styles';

export const ROI = ({
  bot,
  title,
  propertyName,
  showArrow = true,
}: TradingScoreboardProps['items'][0] & { bot: Bot } & {
  propertyName: 'roi' | 'roiInvestment' | 'roiTotal';
  showArrow?: boolean;
}) => {
  const theme = useTheme();
  const statistics = propOr<Bot, Bot['statistics']>({}, 'statistics')(bot);
  const roi = statistics[propertyName] || 0;

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
          {roi === 0 ? '' : roi > 0 ? '+' : ''}
          {roi}
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
          %
          {showArrow && statistics[propertyName] ? (
            <div
              css={{
                display: 'flex',
                alignSelf: 'center',
                marginLeft: 3,
              }}>
              <Icon
                name={statistics[propertyName] > 0 ? 'arrow-up' : 'arrow-down'}
                color={
                  statistics[propertyName] > 0
                    ? theme.colors.green
                    : theme.colors.pink
                }
                size={16}
              />
            </div>
          ) : null}
        </Typography>
      </CardContent>
      <Typography css={{ fontSize: '12px' }}>{title}</Typography>
    </CardBase>
  );
};

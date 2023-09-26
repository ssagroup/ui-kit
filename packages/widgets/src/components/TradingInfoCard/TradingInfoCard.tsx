import { css, useTheme } from '@emotion/react';
import { CardBase, CardContent, Typography } from '@ssa-ui-kit/core';

import TradingInfoCardContent from './TradingInfoCardContent';
import TradingInfoCardTooltip from './TradingInfoCardTooltip';
import { ITradingInfoCardProps } from './types';

const TradingInfoCard = ({
  value,
  unit,
  title,
  onClick,
  icon,
}: ITradingInfoCardProps) => {
  const theme = useTheme();
  const number = Number(value);
  const isInteger = Number.isInteger(number);
  const currentValue = Number.isNaN(number) ? value : Math.floor(number);

  return (
    <CardBase
      data-testid="card"
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
      css={css`
        align-items: flex-start;
        width: fit-content;
        min-width: 123px;
        background: ${theme.colors.greyLighter};
        padding: 4px 10px;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
        user-select: none;

        &:active {
          background: ${theme.colors.white};
          box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow24};
        }
      `}>
      {isInteger || Number.isNaN(number) ? (
        <TradingInfoCardContent value={currentValue} unit={unit} icon={icon} />
      ) : (
        <TradingInfoCardTooltip
          trigger={
            <TradingInfoCardContent
              value={currentValue}
              unit={unit}
              icon={icon}
            />
          }>
          {value} {unit}
        </TradingInfoCardTooltip>
      )}
      <CardContent>
        <Typography css={{ fontSize: '12px' }}>{title}</Typography>
      </CardContent>
    </CardBase>
  );
};

export default TradingInfoCard;

import { css, useTheme } from '@emotion/react';
import {
  CardContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Typography,
} from '@ssa-ui-kit/core';
import StatisticCardContent from './StatisticCardContent';

export interface StatisticCardProps {
  value: string | number;
  unit?: string;
  title?: string;
  onClick?: () => void;
}

const StatisticCard = ({ value, unit, title, onClick }: StatisticCardProps) => {
  const theme = useTheme();
  const number = Number(value);
  const isInteger = Number.isInteger(number);
  const isNumber = isNaN(number) ? value : Math.floor(number);

  return (
    <button
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
      css={css`
        display: flex;
        flex-direction: column;
        width: fit-content;
        min-width: 123px;
        background: ${theme.colors.greyLighter};
        padding: 4px 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
        user-select: none;

        &:active {
          background: ${theme.colors.white};
          box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow24};
        }
      `}>
      {isInteger || isNaN(number) ? (
        <StatisticCardContent value={isNumber} unit={unit} />
      ) : (
        <Tooltip
          offsetPx={0}
          enableHover={true}
          enableClick={false}
          arrowProps={{ width: 18, height: 3, fill: '#474a50' }}>
          <TooltipTrigger>
            <div data-testid="hover-element">
              <StatisticCardContent value={isNumber} unit={unit} />
            </div>
          </TooltipTrigger>
          <TooltipContent
            css={css`
              padding: 4px 5px;
              border-radius: 2px;
              background: #474a50;
              color: ${theme.colors.white};
              font-size: 12px;
              font-weight: 600;
              line-height: 15px;

              svg {
                margin-bottom: -1px;
              }
            `}>
            {value} {unit}
          </TooltipContent>
        </Tooltip>
      )}

      <CardContent>
        <Typography css={{ fontSize: '12px' }}>{title}</Typography>
      </CardContent>
    </button>
  );
};

export default StatisticCard;

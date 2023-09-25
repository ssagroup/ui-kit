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
}

const StatisticCard = ({ value, unit, title }: StatisticCardProps) => {
  const theme = useTheme();
  const number = Number(value);
  const isInteger = Number.isInteger(number);
  const isNumber = isNaN(number) ? value : Math.floor(number);
  return (
    <button
      onClick={() => console.log('Clicked!')}
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
      {isInteger ? (
        <StatisticCardContent value={isNumber} unit={unit} />
      ) : (
        <Tooltip enableHover={true} arrowProps={{ width: 15, height: 6 }}>
          <TooltipTrigger>
            <div>
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

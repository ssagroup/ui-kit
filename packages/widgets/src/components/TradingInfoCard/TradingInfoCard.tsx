import { CardContent, Typography } from '@ssa-ui-kit/core';

import TradingInfoCardContent from './TradingInfoCardContent';
import TradingInfoCardTooltip from './TradingInfoCardTooltip';
import TradingInfoCardWrapper from './TradingInfoCardWrapper';
import { ITradingInfoCardProps } from './types';

const TradingInfoCard = ({
  value,
  unit,
  title,
  onClick,
  icon,
  link,
}: ITradingInfoCardProps) => {
  const number = Number(value);
  const isInteger = Number.isInteger(number);
  const currentValue = Number.isNaN(number) ? value : Math.floor(number);

  return (
    <TradingInfoCardWrapper onClick={onClick} link={link}>
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
    </TradingInfoCardWrapper>
  );
};

export default TradingInfoCard;

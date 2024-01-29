import { CardContent, Typography } from '@ssa-ui-kit/core';

import TradingInfoCardContent from './TradingInfoCardContent';
import TradingInfoCardTooltip from './TradingInfoCardTooltip';
import TradingInfoCardWrapper from './TradingInfoCardWrapper';
import { ITradingInfoCardProps } from './types';

const TradingInfoCardView = ({
  value,
  unit,
  title,
  icon,
  link,
  onClick,
}: ITradingInfoCardProps) => {
  const number = Number(value);
  const currentValue = Number.isNaN(number)
    ? value
    : number.toFixed(1).includes('.0')
    ? Math.floor(number)
    : number.toFixed(1);

  return (
    <TradingInfoCardWrapper onClick={onClick} link={link}>
      <TradingInfoCardContent value={currentValue} unit={unit} icon={icon} />
      <CardContent>
        <Typography css={{ fontSize: '12px' }}>{title}</Typography>
      </CardContent>
    </TradingInfoCardWrapper>
  );
};

const TradingInfoCard = (props: ITradingInfoCardProps) => {
  const { value, unit } = props;
  const number = Number(value);
  const isInteger = Number.isInteger(number);

  if (isInteger || Number.isNaN(number)) {
    return <TradingInfoCardView {...props} />;
  } else {
    return (
      <TradingInfoCardTooltip trigger={<TradingInfoCardView {...props} />}>
        {value} {unit}
      </TradingInfoCardTooltip>
    );
  }
};

export default TradingInfoCard;

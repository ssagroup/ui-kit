import React from 'react';
import { LegendItemProps } from '../types';
import { getRoundedNumber } from '../utils';

export const LegendItem = ({
  label,
  legendLabel,
  percentage,
  legendValue,
  legendValueRoundingDigits,
  legendPercentageRoundingDigits,
  showDimensions,
  showPercentage,
  otherLabel,
  currency,
}: LegendItemProps) => {
  const legendValueLocal = getRoundedNumber(
    legendValue,
    legendValueRoundingDigits as number,
  );
  const percentageLocal = getRoundedNumber(
    percentage,
    legendPercentageRoundingDigits as number,
  );
  const dimension = showDimensions
    ? label === otherLabel
      ? (legendLabel as string | undefined) || currency
      : (legendLabel as string | undefined) || label
    : '';
  return (
    <React.Fragment>
      {legendValueLocal} {showDimensions && dimension}
      {showPercentage && ` (${percentageLocal}%)`}
    </React.Fragment>
  );
};

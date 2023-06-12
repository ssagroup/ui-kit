import { TooltipContentBase } from './TooltipContentBase';
import { SimpleChartTooltipProps } from './types';
import { mapSizes } from './utils';

export const SimpleChartTooltip = ({
  point,
  size = 'small',
  renderValue,
}: SimpleChartTooltipProps) => {
  const { data } = point;
  const { xFormatted, yFormatted } = data;

  return (
    <TooltipContentBase css={mapSizes[size]}>
      {typeof renderValue === 'function'
        ? renderValue(data)
        : `${xFormatted} - ${yFormatted}`}
    </TooltipContentBase>
  );
};

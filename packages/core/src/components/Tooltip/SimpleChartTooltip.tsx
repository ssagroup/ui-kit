import { LineSeries } from '@nivo/line';
import { TooltipContentBase } from './TooltipContentBase';
import { SimpleChartTooltipProps } from './types';
import { mapSizes } from './utils';

export const SimpleChartTooltip = <Series extends LineSeries>({
  point,
  size = 'small',
  renderValue,
}: SimpleChartTooltipProps<Series>) => {
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

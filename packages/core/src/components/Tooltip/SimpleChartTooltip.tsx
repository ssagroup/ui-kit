import { LineSeries } from '@nivo/line';
import { TooltipContentBase } from './TooltipContentBase';
import { SimpleChartTooltipProps } from './types';
import { mapSizes } from './utils';
import { chartTooltipText } from './styles';

export const SimpleChartTooltip = <Series extends LineSeries>({
  point,
  size = 'small',
  renderValue,
}: SimpleChartTooltipProps<Series>) => {
  const { data } = point;
  const { xFormatted, yFormatted } = data;

  return (
    // The chart legend spec keeps `small` at 9.26px rather than the 8px of the
    // design's default content, so that one size is pinned; `medium`/`large`
    // still scale with the shared size tokens.
    <TooltipContentBase
      hasShadow={false}
      css={[mapSizes[size], size === 'small' && chartTooltipText]}>
      {typeof renderValue === 'function'
        ? renderValue(data)
        : `${xFormatted} - ${yFormatted}`}
    </TooltipContentBase>
  );
};

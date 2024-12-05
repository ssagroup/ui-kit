import { useTheme } from '@emotion/react';
import { MayHaveLabel, PieTooltipProps } from '@nivo/pie';
import Wrapper from '@components/Wrapper';
import { PieChartTooltipProps } from './types';

export const PieChartTooltip = ({
  point,
  outputType = 'value',
  dimension,
  isFullscreenMode,
}: {
  point: PieTooltipProps<
    MayHaveLabel & {
      percentage?: number;
      dimension?: string;
    }
  >;
  outputType: PieChartTooltipProps['outputType'];
  dimension?: string;
  isFullscreenMode?: boolean;
}) => {
  const theme = useTheme();
  return (
    <Wrapper
      css={{
        height: 30,
        padding: '4px 8px',
        borderRadius: 4,
        border: `1px solid ${theme.colors.grey20}`,
        background: theme.colors.white,
        gap: 6,
        whiteSpace: 'nowrap',
        fontSize: isFullscreenMode ? 16 : 14,
      }}>
      <div
        css={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: point.datum.color,
        }}
      />
      {point.datum.label}
      {[
        'value',
        'value+dimension',
        'value+percentage',
        'value+dimension+percentage',
      ].includes(outputType) && (
        <div>
          <b>{point.datum.value}</b>
          {outputType === 'value+dimension' && dimension}
          {outputType === 'value+percentage' &&
            ` (${point.datum.data.percentage}`}
          {outputType === 'value+dimension+percentage' &&
            ` ${dimension} (${point.datum.data.percentage})`}
        </div>
      )}
      {outputType === 'percentage' && ` ${point.datum.data.percentage}%`}
      {outputType === 'dimension' && ` ${dimension}%`}
    </Wrapper>
  );
};

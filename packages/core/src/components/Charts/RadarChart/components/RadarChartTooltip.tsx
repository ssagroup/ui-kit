import { useTheme } from '@emotion/react';
import { RadarSliceTooltipProps } from '@nivo/radar';

export interface RadarChartTooltipProps extends RadarSliceTooltipProps {
  symbolSize?: number;
}

export const RadarChartTooltip = ({
  data,
  symbolSize = 10,
}: RadarChartTooltipProps) => {
  const theme = useTheme();
  return (
    <div
      css={{
        background: theme.colors.white,
        border: `1px solid ${theme.colors.grey20}`,
        borderRadius: '4px',
        padding: '4px 8px',
        lineHeight: '15px',
        fontSize: '9.26px',
        fontWeight: '500',
      }}>
      {data.map(({ id, color, formattedValue }) => (
        <div
          key={id}
          css={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div
            css={{
              width: symbolSize,
              height: symbolSize,
              background: color,
              borderRadius: '50%',
            }}
          />
          <div css={{ color: theme.colors.greyDarker80 }}>{id}:</div>
          <div css={{ color: theme.colors.greyDarker, fontWeight: '600' }}>
            {' '}
            {formattedValue}
          </div>
        </div>
      ))}
    </div>
  );
};

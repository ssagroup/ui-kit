import { useTheme } from '@emotion/react';
import { MayHaveLabel, PieTooltipProps } from '@nivo/pie';
import Wrapper from '@components/Wrapper';

export const PieChartTooltip = ({
  point,
  showValue = true,
  showPercentage = false,
  dimension,
  isFullscreenMode,
}: {
  point: PieTooltipProps<
    MayHaveLabel & {
      percentage?: number;
      dimension?: string;
    }
  >;
  showPercentage?: boolean;
  showValue?: boolean;
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
      {showValue && (
        <div>
          {showValue && <b>{point.datum.value}</b>}
          {dimension !== undefined && dimension}
        </div>
      )}
      {showPercentage && ` (${point.datum.data.percentage}%)`}
    </Wrapper>
  );
};

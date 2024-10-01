import { useTheme } from '@emotion/react';
import { MayHaveLabel, PieTooltipProps } from '@nivo/pie';
import { pathOr } from '@ssa-ui-kit/utils';
import { BalanceDataForGraph } from '../types';
import { getRoundedNumber } from '../utils';

export const ChartTooltip = ({
  point,
  legendPercentageRoundingDigits,
}: {
  point: PieTooltipProps<MayHaveLabel>;
  legendPercentageRoundingDigits: number;
}) => {
  const theme = useTheme();
  const pointData = pathOr<typeof point, BalanceDataForGraph>({}, [
    'datum',
    'data',
  ])(point);
  const mainData = {
    value:
      typeof pointData.legendValue !== 'undefined'
        ? getRoundedNumber(
            pointData.legendValue,
            pointData.legendValueRoundingDigits,
          )
        : getRoundedNumber(
            pointData.value,
            pointData.legendValueRoundingDigits,
          ),
    label: pointData.legendLabel || pointData.label,
    percentage: getRoundedNumber(
      pointData.percentage,
      legendPercentageRoundingDigits,
    ),
  };
  const partData = {
    value:
      pointData.partLegendValue !== undefined
        ? getRoundedNumber(
            pointData.partLegendValue,
            pointData.legendValueRoundingDigits,
          )
        : getRoundedNumber(
            pointData.partValue,
            pointData.legendValueRoundingDigits,
          ),
    label: pointData.partLabel || pointData.legendLabel || pointData.label,
    percentage: getRoundedNumber(
      pointData.partPercentage,
      legendPercentageRoundingDigits,
    ),
  };
  return (
    <table
      css={{
        background: theme.colors.greyLighter,
        borderRadius: 8,
        padding: 5,
        fontSize: 12,
        fontWeight: 500,
        '& td': {
          whiteSpace: 'nowrap',
        },
      }}>
      <tr>
        <td css={{ fontWeight: 600, padding: '0 5px' }}>{pointData.label}</td>
        <td>
          {mainData.value} {mainData.label}
        </td>
        <td>({mainData.percentage}%)</td>
      </tr>
      {pointData.partLabel && (
        <tr>
          <td css={{ fontWeight: 600, padding: '0 5px' }}>
            {pointData.partLabel}
          </td>
          <td>
            {partData.value} {pointData.legendLabel || pointData.label}
          </td>
          <td>({partData.percentage}%)</td>
        </tr>
      )}
    </table>
  );
};

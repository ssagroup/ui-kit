import { css, useTheme } from '@emotion/react';

import Tooltip from '@components/Tooltip';
import TooltipContent from '@components/TooltipContent';
import TooltipTrigger from '@components/TooltipTrigger';
import Typography from '@components/Typography';

import { useSegmentedPieChartContext } from '../SegmentedPieChartContext';
import { getRoundedNumber } from '../utils';

export const ChartTitle = () => {
  const {
    totalAmount,
    totalDimension,
    titleTooltipOptions = [],
    legendPercentageRoundingDigits = 0,
    legendValueRoundingDigits = 0,
    tooltipConfig = {},
    showDimensions,
    showPercentage,
    renderTitleTooltipContent,
  } = useSegmentedPieChartContext();
  const theme = useTheme();
  const tooltipContent = renderTitleTooltipContent ? (
    renderTitleTooltipContent({ totalAmount, totalDimension })
  ) : (
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
      {titleTooltipOptions.map((item, index) => {
        const percentage = (Number(item.value) * 100) / totalAmount;
        const roundedValue = getRoundedNumber(
          item.value,
          item.legendValueRoundingDigits || legendValueRoundingDigits,
        );
        const roundedPercentage = getRoundedNumber(
          percentage,
          item.legendPercentageRoundingDigits || legendPercentageRoundingDigits,
        );
        return (
          <tr key={`chart-title-row-${index}`}>
            <td css={{ fontWeight: 600, padding: '0 5px' }}>{item.label}</td>
            <td>
              {roundedValue} {showDimensions && item.dimension}
            </td>
            {showPercentage && <td>({roundedPercentage}%)</td>}
          </tr>
        );
      })}
    </table>
  );
  return (
    <Tooltip
      enableHover={titleTooltipOptions?.length > 0}
      enableClick={false}
      {...tooltipConfig}>
      <TooltipTrigger>
        <Typography
          variant="body2"
          weight="bold"
          color={theme.colors.greyDarker}
          css={css`
            font-size: 20px;
            line-height: 25px;
            cursor: default;
          `}>
          {totalAmount} &nbsp;
          <Typography
            variant="body2"
            weight="regular"
            as="span"
            color={theme.colors.greyDarker80}
            css={css`
              font-size: 14px;
            `}>
            {totalDimension}
          </Typography>
        </Typography>
      </TooltipTrigger>
      <TooltipContent css={{ padding: '3px 0' }}>
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};

import { useTheme } from '@emotion/react';
import { Fragment } from 'react';
import { Typography } from '@ssa-ui-kit/core';

import { PieChartLegendMarker } from './PieChartLegendMarker';
import { PieChartLegendList } from './PieChartLegendList';
import { PieChartLegendProps } from './types';

export const PieChartLegend = ({
  data,
  colors,
  renderLabel,
  renderValue,
  markerStyles,
  labelListStyles,
  valueListStyles,
}: PieChartLegendProps) => {
  const theme = useTheme();
  return (
    <Fragment>
      <PieChartLegendList css={labelListStyles}>
        {data.map((item, index) => {
          const { id, label } = item;
          return (
            <li key={`tag-${id}`}>
              <PieChartLegendMarker
                color={colors[index] || 'purple'}
                as={'span'}
                css={markerStyles}
              />
              <Typography variant="h6">
                {typeof renderLabel === 'function' ? renderLabel(item) : label}
              </Typography>
            </li>
          );
        })}
      </PieChartLegendList>
      <PieChartLegendList css={valueListStyles}>
        {data.map((item) => (
          <li key={`subtitle-${item.id}`}>
            <Typography variant="subtitle" color={theme.colors.greyDarker60}>
              {typeof renderValue === 'function'
                ? renderValue(item)
                : item.value}
            </Typography>
          </li>
        ))}
      </PieChartLegendList>
    </Fragment>
  );
};

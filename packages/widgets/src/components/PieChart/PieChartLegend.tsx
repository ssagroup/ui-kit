import { useTheme } from '@emotion/react';
import { Fragment } from 'react';
import { Typography } from '@ssa-ui-kit/core';

import { PieChartLegendMarker } from './PieChartLegendMarker';
import { PieChartLegendList } from './PieChartLegendList';
import { PieChartLegendProps } from './types';

export const PieChartLegend = ({
  data,
  colors,
  renderValue,
  markerStyles,
  labelListStyles,
  valueListStyles,
}: PieChartLegendProps) => {
  const theme = useTheme();
  return (
    <Fragment>
      <PieChartLegendList css={labelListStyles}>
        {data.map(({ id, label }, index) => (
          <li key={`tag-${id}`}>
            <PieChartLegendMarker
              color={colors[index] || 'purple'}
              as={'span'}
              css={markerStyles}
            />
            <Typography variant="h6">{label}</Typography>
          </li>
        ))}
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

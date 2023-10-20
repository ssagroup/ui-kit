import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Fragment } from 'react';
import { Badge, Typography } from '@ssa-ui-kit/core';

import { PieChartLegendProps } from './types';

// TODO: move this out;
export const PieChartLegendMarker = styled(Badge)`
  display: inline-block;

  padding: 0;
  margin-right: 12px;

  width: 8px;
  height: 8px;
`;

// TODO: move this out;
export const PieChartLegendList = styled.ul`
  display: flex;
  flex-flow: column;
  justify-content: center;
  list-style: none;

  height: 100%;
  padding: 0;
  margin: 0;
  gap: 14px;

  li {
    display: flex;
    align-items: center;

    height: 20px;
  }
`;

// TODO: this should be configurable
export const PieChartLegend = ({ data, colors }: PieChartLegendProps) => {
  const theme = useTheme();
  return (
    <Fragment>
      <PieChartLegendList>
        {data.map(({ id, label }, index) => (
          <li key={`tag-${id}`}>
            <PieChartLegendMarker
              color={colors[index] || 'purple'}
              as={'span'}
            />
            <Typography variant="h6">{label}</Typography>
          </li>
        ))}
      </PieChartLegendList>
      <PieChartLegendList>
        {data.map(({ id, value }) => (
          <li key={`subtitle-${id}`}>
            <Typography variant="subtitle" color={theme.colors.greyDarker60}>
              {value} hrs
            </Typography>
          </li>
        ))}
      </PieChartLegendList>
    </Fragment>
  );
};

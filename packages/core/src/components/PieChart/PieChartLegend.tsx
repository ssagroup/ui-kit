import { useTheme } from '@emotion/react';
import { Fragment } from 'react';
import Typography from '@components/Typography';

import { PieChartLegendMarker } from './PieChartLegendMarker';
import { PieChartLegendList } from './PieChartLegendList';
import { PieChartLegendProps } from './types';

export const PieChartLegend = ({
  data,
  colors,
  backgroundColors,
  renderLabel,
  renderValue,
  markerStyles,
  currency,
  labelListStyles,
  valueListStyles,
  variant = 'valueList',
}: PieChartLegendProps) => {
  const theme = useTheme();
  const isValueList = variant === 'valueList';
  return (
    <Fragment>
      <PieChartLegendList css={labelListStyles}>
        {data.map((item, index) => {
          const { id, label, value, legendValue } = item;
          return (
            <li key={`tag-${id}`}>
              <PieChartLegendMarker
                color={
                  backgroundColors ? undefined : colors?.[index] || 'purple'
                }
                background={
                  backgroundColors ? backgroundColors[index] : undefined
                }
                as={'span'}
                css={markerStyles}
              />
              {isValueList ? (
                <Typography variant="h6">
                  {typeof renderLabel === 'function'
                    ? renderLabel(item)
                    : label}
                </Typography>
              ) : (
                <Typography
                  variant="subtitle"
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <span>
                    {legendValue as React.ReactNode} {label}
                  </span>
                  <span css={{ fontWeight: '400' }}>
                    {value} {currency}
                  </span>
                </Typography>
              )}
            </li>
          );
        })}
      </PieChartLegendList>
      {isValueList && (
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
      )}
    </Fragment>
  );
};

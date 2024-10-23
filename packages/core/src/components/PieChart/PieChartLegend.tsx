import { useTheme } from '@emotion/react';
import { Fragment } from 'react';
import Typography from '@components/Typography';

import { useFullscreenMode } from '@components/FullscreenModeContext';
import { PieChartLegendMarker } from './PieChartLegendMarker';
import { PieChartLegendList } from './PieChartLegendList';
import { PieChartLegendProps } from './types';
import { PieChartLegendListItem } from './PieChartLegendListItem';

export const PieChartLegend = ({
  data,
  colors,
  backgroundColors,
  markerStyles,
  currency,
  labelListStyles,
  valueListStyles,
  variant = 'valueList',
  renderLabel,
  renderValue,
}: PieChartLegendProps) => {
  const theme = useTheme();
  const isValueList = variant === 'valueList';
  const { isFullscreenMode } = useFullscreenMode();
  return (
    <Fragment>
      <PieChartLegendList css={labelListStyles}>
        {data.map((item, index) => {
          const { id, label, value, legendValue } = item;
          return (
            <PieChartLegendListItem
              key={`tag-${id}`}
              isFullscreenMode={isFullscreenMode}>
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
                <Typography
                  variant="h6"
                  css={{
                    alignSelf: 'start',
                  }}>
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
              {isValueList && isFullscreenMode && (
                <Typography
                  variant="subtitle"
                  color={theme.colors.greyDarker60}>
                  {typeof renderValue === 'function'
                    ? renderValue(item)
                    : item.value}
                </Typography>
              )}
            </PieChartLegendListItem>
          );
        })}
      </PieChartLegendList>
      {isValueList && !isFullscreenMode && (
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

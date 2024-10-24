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
      <PieChartLegendList
        css={labelListStyles}
        isFullscreenMode={isFullscreenMode}>
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
                isFullscreenMode={isFullscreenMode}
              />
              {isValueList ? (
                <Typography
                  variant="h6"
                  css={{
                    alignSelf: 'start',
                    marginRight: 5,
                    fontSize: 14,
                    height: isFullscreenMode ? 20 : 'auto',
                    lineHeight: isFullscreenMode ? '20px' : '1.375rem',
                    alignContent: isFullscreenMode ? 'center' : 'end',
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
                  color={theme.colors.greyDarker60}
                  css={{
                    fontSize: isFullscreenMode ? '12px' : '0.833rem',
                    alignContent: isFullscreenMode && 'center',
                  }}>
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
        <PieChartLegendList
          css={valueListStyles}
          isFullscreenMode={isFullscreenMode}>
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

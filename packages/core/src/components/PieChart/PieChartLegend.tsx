import { useTheme } from '@emotion/react';
import Typography from '@components/Typography';

import { useFullscreenMode } from '@components/FullscreenModeContext';
import { PieChartLegendMarker } from './PieChartLegendMarker';
import { PieChartLegendList } from './PieChartLegendList';
import { PieChartLegendProps } from './types';
import {
  PieChartLegendListItem,
  PieChartLegendListValueListItem,
} from './PieChartLegendListItem';
import Wrapper from '@components/Wrapper';

export const PieChartLegend = ({
  data,
  colors,
  backgroundColors,
  markerStyles,
  currency,
  labelListStyles,
  valueListStyles,
  variant = 'valueList',
  activeHighlight = false,
  renderLabel,
  renderValue,
}: PieChartLegendProps) => {
  const theme = useTheme();
  const isValueList = variant === 'valueList';
  const { isFullscreenMode, activeId, setActiveId } = useFullscreenMode();
  const handleActiveIdChange = (newActiveId: null | number | string) => {
    if (activeHighlight) {
      setActiveId(newActiveId);
    }
  };
  return (
    <Wrapper css={{ width: 'auto' }}>
      <PieChartLegendList
        css={labelListStyles}
        isFullscreenMode={isFullscreenMode}>
        {data.map((item, index) => {
          const { id, label, value, legendValue } = item;
          const isActive = id === activeId;
          return (
            <PieChartLegendListItem
              key={`tag-${id}`}
              isActive={isActive}
              isFullscreenMode={isFullscreenMode}
              onMouseEnter={() => {
                handleActiveIdChange(id);
              }}
              onMouseLeave={() => {
                handleActiveIdChange(null);
              }}>
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
                    height: 'auto',
                    lineHeight: '34px',
                    alignContent: 'center',
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
          {data.map((item) => {
            const { id } = item;
            const isActive = id === activeId;
            return (
              <PieChartLegendListValueListItem
                key={`subtitle-${id}`}
                isActive={isActive}
                css={{ paddingLeft: 20 }}
                onMouseEnter={() => {
                  handleActiveIdChange(id);
                }}
                onMouseLeave={() => {
                  handleActiveIdChange(null);
                }}>
                <Typography
                  variant="subtitle"
                  color={theme.colors.greyDarker60}>
                  {typeof renderValue === 'function'
                    ? renderValue(item)
                    : item.value}
                </Typography>
              </PieChartLegendListValueListItem>
            );
          })}
        </PieChartLegendList>
      )}
    </Wrapper>
  );
};

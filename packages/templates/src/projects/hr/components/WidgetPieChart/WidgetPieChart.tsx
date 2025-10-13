import { useEffect, useRef, useState } from 'react';

import { useDebounceCallback } from 'usehooks-ts';

import { css } from '@emotion/css';
import { css as cssReact, useTheme } from '@emotion/react';
import { categoricalColorSchemes } from '@nivo/colors';

import {
  PieChart,
  PieChartLegend,
  useTranslation,
  Wrapper,
} from '@ssa-ui-kit/core';

import { useMinLGMediaQuery, useXSMediaQuery } from '@ssa-ui-kit/hooks';

import { SMALL_PIE_CHART_SIZE } from './constants';
import * as S from './styles';
import { WidgetPieChartProps } from './types';

import { ComponentHint, useAppLayout } from '..';

export const WidgetPieChart = ({
  data,
  cardTitle,
  chartColors,
  colorSchemeId = 'nivo',
  gridArea,
  hintEnabled = false,
  pieChartHeight = '120px',
  pieChartWidth = '120px',
  wrapperClassname,
  headerClassname,
  features = ['header', 'activeItemAnimation', 'fullscreenMode'],
  labelListStyles: labelListStylesAdditional,
  valueListStyles: valueListStylesAdditional,
  handleFullscreenModeChange,
}: WidgetPieChartProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMinLGMediaQuery = useMinLGMediaQuery();
  const isMaxXSMediaQuery = useXSMediaQuery();
  const featuresForWidget = isMaxXSMediaQuery
    ? features.filter((feature) => feature !== 'fullscreenMode')
    : features;
  const isInteractive = featuresForWidget.includes('activeItemAnimation');
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const { setFullscreenMode: setFullscreenModeGlobal } = useAppLayout();
  const [lastSize, setLastSize] = useState({ width: '100%', height: '100%' });
  const dataForChart = data?.map(({ caption, count }, index) => ({
    id: index + 1,
    label: caption,
    value: count,
  }));
  const currentColors = chartColors || categoricalColorSchemes[colorSchemeId];
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const labelListStyles: any = S.labelListStyles(
    theme,
    isFullscreenMode,
    isMinLGMediaQuery,
  );
  currentColors.forEach((color, index) => {
    labelListStyles[`& > li&:nth-of-type(${index + 1}) > span`] = {
      background: color,
    };
  });

  const handleResize = () => {
    const pieChartWrapper = wrapperRef.current?.querySelector(
      'div.pie-chart-wrapper',
    );
    if (!document.body.classList.contains('is-fullscreen') && pieChartWrapper) {
      setLastSize({
        width: `${pieChartWrapper.clientWidth}`,
        height: `${pieChartWrapper.clientHeight}`,
      });
    }
  };

  const handleResizeDebounced = useDebounceCallback(handleResize, 50);

  const onFullscreenModeChange = (fullscreenMode: boolean) => {
    setFullscreenModeGlobal(() => fullscreenMode);
    setFullscreenMode(() => fullscreenMode);
    handleFullscreenModeChange?.(fullscreenMode);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeDebounced, false);
    return () => {
      window.removeEventListener('resize', handleResizeDebounced, false);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFullscreenMode ? 'hidden' : 'unset';
    document.body.classList.toggle('is-fullscreen', isFullscreenMode);

    const pieChartWrapper = wrapperRef.current?.querySelector(
      'div.pie-chart-wrapper > div',
    );
    if (isFullscreenMode) {
      pieChartWrapper?.setAttribute('style', `width: 100%; height: 100%`);
    }
    if (!isFullscreenMode && pieChartWrapper) {
      if (lastSize.width.includes('%')) {
        setLastSize({
          width: `${pieChartWrapper.clientWidth}`,
          height: `${pieChartWrapper.clientHeight}`,
        });
      } else {
        const newSize = Math.min(...[+lastSize.width, +lastSize.height]);
        pieChartWrapper?.setAttribute(
          'style',
          `width: ${newSize}px; height: ${newSize}px`,
        );
      }
    }
  }, [isFullscreenMode]);

  useEffect(() => {
    const pieChartWrapper = wrapperRef.current?.querySelector(
      'div.pie-chart-wrapper > div',
    );
    if (!Number.isNaN(+lastSize.width) && !Number.isNaN(+lastSize.height)) {
      const newSize = Math.min(...[+lastSize.width, +lastSize.height]);
      pieChartWrapper?.setAttribute(
        'style',
        `width: ${newSize}px; height: ${newSize}px`,
      );
    }
  }, [lastSize]);

  const pieChartWidthNotFullscreen = isMinLGMediaQuery
    ? pieChartWidth
    : SMALL_PIE_CHART_SIZE;

  const pieChartHeightNotFullscreen = isMinLGMediaQuery
    ? pieChartHeight
    : SMALL_PIE_CHART_SIZE;

  return (
    <Wrapper
      css={{
        gridArea: gridArea,
      }}
      ref={wrapperRef}
      className={isFullscreenMode ? 'is-fullscreen' : ''}>
      <PieChart
        data={dataForChart}
        onFullscreenModeChange={onFullscreenModeChange}
        colors={currentColors as unknown as string[]}
        activeHighlight={isInteractive}
        isInteractive={isInteractive}
        innerRadius={0}
        cornerRadius={0}
        padAngle={0}
        tooltipProps={{
          isEnabled: true,
          isFullscreenEnabled: true,
          outputType: 'value+percentage',
        }}
        css={{
          '& > .pie-chart-wrapper': {
            width: isFullscreenMode ? '100%' : pieChartWidthNotFullscreen,
            height: isFullscreenMode ? '100%' : pieChartHeightNotFullscreen,
            display: 'flex',
            justifyContent: 'center',
            '& + div': {
              maxWidth: isFullscreenMode
                ? 'unset'
                : `calc(100% - ${pieChartWidthNotFullscreen})`,
              width: isFullscreenMode
                ? 'auto'
                : `calc(100% - ${pieChartWidthNotFullscreen})`,
            },
          },
          '& svg': {
            boxShadow: isFullscreenMode
              ? 'none'
              : '0px 10px 40px 0px rgba(42, 48, 57, 0.08)',
            borderRadius: '50%',
          },
        }}
        activeInnerRadiusOffset={0}
        activeOuterRadiusOffset={isFullscreenMode ? 40 : 7}
        width="100%"
        features={Array.from(new Set(['header', ...featuresForWidget]))}
        cardProps={{
          title: t(cardTitle),
          headerClassName: [
            css`
              & h3 {
                font-size: ${isFullscreenMode ? '20px' : '16px'};
                ${theme.mediaQueries.lg} {
                  font-size: 20px;
                }
              }
            `,
            headerClassname,
          ].join(' '),
          contentClassName: isFullscreenMode
            ? ''
            : css`
                max-width: 300px !important;
                ${theme.mediaQueries.md} {
                  max-width: 406px;
                }
              `,
          className: [
            css`
              align-items: flex-start !important;
              & h3 {
                margin-bottom: 0;
              }
            `,
            wrapperClassname,
          ].join(' '),
        }}>
        <PieChartLegend
          colors={currentColors as unknown as string[]}
          activeHighlight={isInteractive}
          useChartData
          renderLabel={(item) => (
            <ComponentHint content={item.label} isEnabled={hintEnabled}>
              <span>{item.label}</span>
            </ComponentHint>
          )}
          labelListStyles={cssReact([
            labelListStyles,
            labelListStylesAdditional,
          ])}
          valueListStyles={cssReact([
            S.valueList(theme),
            valueListStylesAdditional,
          ])}
        />
      </PieChart>
    </Wrapper>
  );
};

import { useEffect, useRef, useState } from 'react';

import {
  BarLineComplexChart,
  BarLineComplexChartProps,
  Wrapper,
} from '@ssa-ui-kit/core';

import { useXSMediaQuery } from '@ssa-ui-kit/hooks';

import { useAppLayout } from '../AppLayout';

import { TWO_WEEKS_MS } from './constants';
import { WidgetBarLineChartProps } from './types';

export const WidgetBarLineChart = ({
  gridArea,
  data,
  timestamps,
  width = '100%',
  height = '100%',
  features = ['filtering', 'fullscreenMode'],
  systemModeBarButtons = [],
  handleFullscreenModeChange,
  ...rest
}: WidgetBarLineChartProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isXSMediaQuery = useXSMediaQuery();
  const chartExtraProps: Partial<BarLineComplexChartProps> = isXSMediaQuery
    ? {
        systemModeBarButtons: [],
        features: features.filter((feature) => feature !== 'fullscreenMode'),
      }
    : {};
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const { setFullscreenMode: setFullscreenModeGlobal } = useAppLayout();
  const dataForChart = data.map(({ values, color, ...rest }) => ({
    x: timestamps,
    y: values,
    marker: {
      color,
    },
    ...rest,
  }));

  const onFullscreenModeChange = (fullscreenMode: boolean) => {
    setFullscreenModeGlobal(() => fullscreenMode);
    setFullscreenMode(() => fullscreenMode);
    handleFullscreenModeChange?.(fullscreenMode);
  };

  useEffect(() => {
    document.body.style.overflow = isFullscreenMode ? 'hidden' : 'unset';
    document.body.classList.toggle('is-fullscreen', isFullscreenMode);
  }, [isFullscreenMode]);

  return (
    <Wrapper
      css={{
        gridArea,
        '&.is-fullscreen': {
          zIndex: 100,
        },
      }}
      ref={wrapperRef}
      className={`widget-${gridArea} ${
        isFullscreenMode ? 'is-fullscreen' : ''
      }`}>
      {
        <BarLineComplexChart
          data={dataForChart}
          width={width}
          height={height}
          features={features}
          systemModeBarButtons={systemModeBarButtons}
          onFullscreenModeChange={onFullscreenModeChange}
          layout={{
            xaxis: {
              fixedrange: true,
              range: [
                timestamps[0] - TWO_WEEKS_MS,
                timestamps[timestamps.length - 1] + TWO_WEEKS_MS,
              ],
            },
            yaxis: { fixedrange: true },
            yaxis2: { fixedrange: true },
          }}
          config={{
            displayModeBar: true,
          }}
          {...chartExtraProps}
          {...rest}
        />
      }
    </Wrapper>
  );
};

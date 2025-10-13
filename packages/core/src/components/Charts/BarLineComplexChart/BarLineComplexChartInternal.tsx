import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { useFullscreenMode } from '@components/FullscreenModeContext';

import { ChartBackground } from '../common';

import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';
import { BarLineComplexChartView } from './BarLineComplexChartView';
import { BarLineComplexInternalProps } from './types';
import { useChartInfo } from './useChartInfo';

export const BarLineComplexChartInternal = ({
  width = '670px',
  height = '220px',
  container = document.body,
  customModeBarButtons = {
    items: [],
    position: 'end',
  },
  onChange,
  ...rest
}: BarLineComplexInternalProps) => {
  const { features } = useBarLineComplexChartContext();
  const { isFullscreenMode } = useFullscreenMode();
  const { transformedChartData, tooltipContentRef, modeBarButtonsByKey } =
    useChartInfo();

  new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  const extraModeBarButtons: Array<Plotly.ModeBarButtonAny> = [];
  if (features?.includes('filtering')) {
    extraModeBarButtons.push(modeBarButtonsByKey['filtering']);
  }
  if (features?.includes('fullscreenMode')) {
    extraModeBarButtons.push(modeBarButtonsByKey['fullscreen']);
  }
  if (customModeBarButtons.items.length) {
    if (customModeBarButtons.position === 'start') {
      extraModeBarButtons.unshift(...customModeBarButtons.items);
    } else {
      extraModeBarButtons.push(...customModeBarButtons.items);
    }
  }

  if (isFullscreenMode) {
    return createPortal(
      <Fragment>
        <ChartBackground />
        <BarLineComplexChartView
          isFullscreenMode={isFullscreenMode}
          width={width}
          height={height}
          onChange={onChange}
          transformedChartData={transformedChartData}
          tooltipContentRef={tooltipContentRef}
          extraModeBarButtons={extraModeBarButtons}
          {...rest}
        />
      </Fragment>,
      container,
    );
  }

  return (
    <BarLineComplexChartView
      isFullscreenMode={isFullscreenMode}
      width={width}
      height={height}
      onChange={onChange}
      transformedChartData={transformedChartData}
      tooltipContentRef={tooltipContentRef}
      extraModeBarButtons={extraModeBarButtons}
      {...rest}
    />
  );
};

import { createPortal } from 'react-dom';
import { useFullscreenMode } from '@components/FullscreenModeContext';
import { BarLineComplexInternalProps } from './types';
import { useChartInfo } from './useChartInfo';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';
import { BarLineComplexChartView } from './BarLineComplexChartView';

export const BarLineComplexChartInternal = ({
  width = '670px',
  height = '220px',
  container = document.body,
  onChange,
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

  if (isFullscreenMode) {
    return createPortal(
      <BarLineComplexChartView
        isFullscreenMode={isFullscreenMode}
        width={width}
        height={height}
        onChange={onChange}
        transformedChartData={transformedChartData}
        tooltipContentRef={tooltipContentRef}
        extraModeBarButtons={extraModeBarButtons}
      />,
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
    />
  );
};

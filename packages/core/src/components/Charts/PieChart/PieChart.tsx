import { PieChartProps } from './types';
import {
  useFullscreenMode,
  WithFullscreenMode,
} from '@components/FullscreenModeContext';
import { createPortal } from 'react-dom';
import { PieChartInternal } from './PieChartInternal';

const PieChartComponent = (props: PieChartProps) => {
  const fullscreenModeProps = useFullscreenMode();

  if (fullscreenModeProps.isFullscreenMode) {
    return createPortal(
      <PieChartInternal {...props} {...fullscreenModeProps} />,
      props.container || document.body,
    );
  }

  return <PieChartInternal {...props} {...fullscreenModeProps} />;
};

export const PieChart = WithFullscreenMode(PieChartComponent);

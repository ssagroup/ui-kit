import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import {
  useFullscreenMode,
  WithFullscreenMode,
} from '@components/FullscreenModeContext';

import { ChartBackground } from '../common';

import { PieChartInternal } from './PieChartInternal';
import { PieChartProps } from './types';

export const PieChartComponent = (props: PieChartProps) => {
  const fullscreenModeProps = useFullscreenMode();

  if (fullscreenModeProps.isFullscreenMode) {
    return createPortal(
      <Fragment>
        <ChartBackground />
        <PieChartInternal {...props} {...fullscreenModeProps} />
      </Fragment>,
      props.container || document.body,
    );
  }

  return <PieChartInternal {...props} {...fullscreenModeProps} />;
};

export const PieChart = WithFullscreenMode(
  PieChartComponent,
) as typeof PieChartComponent;

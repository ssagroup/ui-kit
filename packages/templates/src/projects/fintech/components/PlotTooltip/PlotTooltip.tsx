import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { Card } from '@ssa-ui-kit/core';
import { PlotTooltipProps } from './types';
import { PlotTooltipContentWrapper, PlotTooltipWrapper } from './styles';

export const PlotTooltip = forwardRef<HTMLDivElement, PlotTooltipProps>(
  function PlotTooltipInner({ x, y, children, position }, ref) {
    const tooltipStyle: React.CSSProperties = {
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
    };

    switch (position) {
      case 'top':
        tooltipStyle.transform = 'translate(-50%, -100%)';
        tooltipStyle.marginTop = '-10px';
        break;
      case 'bottom':
        tooltipStyle.transform = 'translate(-50%, 0)';
        tooltipStyle.marginTop = '10px';
        break;
      case 'left':
        tooltipStyle.transform = 'translate(-100%, -50%)';
        tooltipStyle.marginLeft = '-10px';
        break;
      case 'right':
        tooltipStyle.transform = 'translate(0, -50%)';
        tooltipStyle.marginLeft = '10px';
        break;
      case 'center':
        tooltipStyle.transform = 'translate(-50%, -50%)';
        tooltipStyle.marginTop = '0';
        break;
      default:
        break;
    }

    return createPortal(
      <PlotTooltipWrapper ref={ref} style={tooltipStyle}>
        <Card
          css={{
            padding: '5px 7px 5px 7px',
            backgroundColor: '#EEF1F7',
          }}>
          <PlotTooltipContentWrapper>{children}</PlotTooltipContentWrapper>
        </Card>
      </PlotTooltipWrapper>,
      document.body,
    );
  },
);

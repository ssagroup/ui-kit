import { useCallback, useEffect, useRef, useState } from 'react';

import { PlotTooltipPosition, PlotTooltipState } from '../types';

export const usePlotTooltip = () => {
  const [tooltip, setTooltip] = useState<PlotTooltipState>({
    visible: false,
    x: 0,
    y: 0,
    position: 'center',
  });
  const [fixedState, setFixedState] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const showTooltip = (x: number, y: number) => {
    let position: PlotTooltipPosition = 'right';

    if (x < window.innerWidth / 2) {
      position = 'right';
    } else {
      position = 'left';
    }

    setFixedState(false);
    setTooltip({
      visible: true,
      x,
      y,
      position,
    });
  };

  const hideTooltip = useCallback(
    (fixed = false) => {
      if (!fixedState || fixed) {
        setTooltip((prevTooltip) => ({ ...prevTooltip, visible: false }));
      }
    },
    [fixedState],
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        hideTooltip(true);
      }
    },
    [hideTooltip],
  );

  const handleScroll = useCallback(() => {
    if (tooltip.visible) {
      hideTooltip(true);
    }
  }, [hideTooltip, tooltip.visible]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const handleHover = (event: Readonly<Plotly.PlotMouseEvent>) => {
    showTooltip(event.event.pageX, event.event.pageY);
  };

  const handleUnhover = () => {
    hideTooltip();
  };

  const handleClick = () => {
    setFixedState(true);
  };

  return {
    tooltipProps: tooltip,
    tooltipRef,
    containerRef,
    showTooltip,
    hideTooltip,
    pinTooltip: setFixedState,
    handlePlotHover: handleHover,
    handlePlotUnhover: handleUnhover,
    handlePlotClick: handleClick,
  };
};

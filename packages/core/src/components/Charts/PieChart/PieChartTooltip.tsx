import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@emotion/react';
import Wrapper from '@components/Wrapper';
import { PieChartTooltipViewProps } from './types';

export const PieChartTooltip = forwardRef<
  HTMLDivElement,
  PieChartTooltipViewProps
>(function PieChartTooltip(
  { point, outputType = 'value', dimension, isFullscreenMode, position },
  ref,
) {
  const theme = useTheme();
  return createPortal(
    <Wrapper
      ref={ref}
      css={{
        height: 30,
        width: 'auto',
        pointerEvents: 'none',
        padding: '4px 8px',
        borderRadius: 4,
        border: `1px solid ${theme.colors.grey20}`,
        background: theme.colors.white,
        gap: 6,
        whiteSpace: 'nowrap',
        fontSize: isFullscreenMode ? 16 : 14,
        position: 'absolute',
        top: position?.y,
        left: position?.x,
        transition: point ? 'all .3s ease-out' : 'none',
        visibility: point ? 'visible' : 'hidden',
      }}>
      {point && (
        <React.Fragment>
          <div
            css={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: point?.datum.color,
            }}
          />
          {point?.datum.label}
          {outputType !== 'dimension' ? ':' : ''}
          {[
            'value',
            'value+dimension',
            'value+percentage',
            'value+dimension+percentage',
          ].includes(outputType) && (
            <div>
              <b>{point?.datum.value}</b>
              {outputType === 'value+dimension' && dimension}
              {outputType === 'value+percentage' &&
                ` (${point?.datum.data.percentage}%)`}
              {outputType === 'value+dimension+percentage' &&
                `${dimension} (${point?.datum.data.percentage}%)`}
            </div>
          )}
          {outputType === 'percentage' && ` ${point?.datum.data.percentage}%`}
          {outputType === 'dimension' && ` (${dimension})`}
        </React.Fragment>
      )}
    </Wrapper>,
    document.body,
  );
});

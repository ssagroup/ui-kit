import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import IndicatorBase from './IndicatorBase';
import { ChildrenDataProps, IndicatorProps } from './types';

const Indicator = ({
  isVisible = true,
  position = 'left',
  background,
  text,
  children,
}: IndicatorProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [childrenData, setChildrenData] = useState<ChildrenDataProps | null>(
    {} || null,
  );

  const refValue = indicatorRef.current ? indicatorRef.current.offsetWidth : 0;

  useEffect(() => {
    if (indicatorRef.current && childrenRef.current) {
      const refData = {
        top: childrenRef.current.offsetTop,
        left: childrenRef.current.offsetLeft,
        width: childrenRef.current.offsetWidth,
        right: childrenRef.current.offsetWidth + childrenRef.current.offsetLeft,
      };
      setWidth(refValue);
      setChildrenData(refData);
    }
  }, [refValue, childrenRef.current]);

  return (
    <React.Fragment>
      {isVisible ? (
        <IndicatorBase
          data-testid={`indicator-${position}`}
          ref={indicatorRef}
          css={
            childrenData && [
              css`
                top: ${childrenData.top + 4}px;
                left: ${position === 'right' && '-8px'};
                transform: translate(${childrenData?.[position]}px, -50%);
              `,
              width > 8 &&
                css`
                  left: ${position === 'right' ? '4px' : '-4px'};
                  transform: ${position === 'right'
                    ? `translate(${childrenData?.[position] - width}px, -50%)`
                    : `translate(${childrenData?.[position]}px, -50%)`};
                `,
              width > 24 &&
                css`
                  border-radius: 3px;
                  aspect-ratio: 0;
                `,
            ]
          }
          background={background}>
          {text}
        </IndicatorBase>
      ) : null}
      <div ref={childrenRef} css={{ width: 'fit-content' }}>
        {children}
      </div>
    </React.Fragment>
  );
};

export default Indicator;

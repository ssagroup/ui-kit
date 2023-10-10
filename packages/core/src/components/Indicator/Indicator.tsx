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
  const isRight = position === 'right';

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
  }, [width, childrenRef.current]);

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
                left: ${isRight && '-8px'};
                transform: translate(${childrenData?.[position]}px, -50%);
              `,
              width > 8 &&
                css`
                  left: ${isRight ? '4px' : '-4px'};
                  transform: ${isRight
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
      {React.cloneElement(children, {
        ref: (ref: HTMLDivElement | null) => (childrenRef.current = ref),
      })}
    </React.Fragment>
  );
};

export default Indicator;

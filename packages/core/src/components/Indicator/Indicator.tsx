import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { css, useTheme } from '@emotion/react';

import { useWindowSize } from '@ssa-ui-kit/hooks';

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
  const [childrenData, setChildrenData] = useState<ChildrenDataProps>({});
  const { width: windowWidth } = useWindowSize();
  const theme = useTheme();

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
      if (refValue !== width) {
        setWidth(refValue);
      }
      if (
        childrenData.top !== refData.top ||
        childrenData.left !== refData.left ||
        childrenData.width !== refData.width ||
        childrenData.right !== refData.right
      ) {
        setChildrenData(refData);
      }
    }
  }, [width, childrenRef.current, windowWidth]);

  return (
    <React.Fragment>
      {isVisible ? (
        <IndicatorBase
          data-testid={`indicator-${position}`}
          ref={indicatorRef}
          css={
            Object.keys(childrenData).length > 0 && [
              css`
                top: ${childrenData.top + 2}px;
                left: ${isRight ? '-6px' : '1px'};
                transform: translate(${childrenData?.[position]}px, -50%);

                ${theme.mediaQueries.md} {
                  left: ${isRight ? '-10px' : '1px'};
                }
              `,
              width > 8 &&
                css`
                  left: ${isRight ? '4px' : '-4px'};
                  transform: ${isRight
                    ? `translate(${childrenData?.[position] - width}px, -50%)`
                    : `translate(${childrenData?.[position]}px, -50%)`};

                  ${theme.mediaQueries.md} {
                    left: ${isRight ? '4px' : '-4px'};
                  }
                `,
              width > 24 &&
                css`
                  border-radius: 10px;
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

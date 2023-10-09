import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import IndicatorBase from './IndicatorBase';
import { childrenDataProps, indicatorProps } from './types';
import React from 'react';

const Indicator = ({
  position = 'right',
  background,
  text,
  children,
}: indicatorProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [childrenData, setChildrenData] = useState<childrenDataProps | null>(
    {} || null,
  );

  useEffect(() => {
    if (indicatorRef.current && childrenRef.current) {
      const refData = {
        top: childrenRef.current.offsetTop,
        left: childrenRef.current.offsetLeft,
        width: childrenRef.current.offsetWidth,
        right: indicatorRef.current?.offsetLeft,
      };
      setWidth(indicatorRef.current.offsetWidth);
      setChildrenData(refData);
    }
  }, [childrenRef.current]);

  console.log(childrenData);

  return (
    <React.Fragment>
      <IndicatorBase
        data-testid={`indicator-${position}`}
        ref={indicatorRef}
        css={
          childrenData && [
            css`
              top: ${childrenData.top + 4}px;
              ${position}: 0;
              transform: translate(
                calc(${childrenData?.width}px - ${0}px),
                -50%
              );
            `,
            width > 24 &&
              css`
                top: ${childrenData.top}px;
                ${position}: 0;
                border-radius: 3px;
                aspect-ratio: 0;
                transform: ${position === 'right'
                  ? `translate(calc(8px - ${
                      childrenData?.right - childrenData?.left
                    }px), -50%)`
                  : `translate(${childrenData?.left - 4}px, -50%)`};
              `,
          ]
        }
        position={position}
        background={background}>
        {text}
      </IndicatorBase>
      <div ref={childrenRef} css={{ width: 'fit-content' }}>
        {children}
      </div>
    </React.Fragment>
  );
};

export default Indicator;

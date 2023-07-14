import React from 'react';
import { css } from '@emotion/react';

import { StepperContextType, StepperProps } from './types';
import { StepperContext } from '.';

const Stepper = ({
  activeStep = 0,
  orientation = 'horizontal',
  color = '#4178e1',
  inverted = false,
  children,
  sx,
}: StepperProps) => {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  if (inverted) {
    childrenArray.reverse();
  }

  const steps = (childrenArray as React.ReactElement[]).map((child, index) => {
    return React.cloneElement(child, {
      index: inverted ? childrenArray.length - index - 1 : index,
      ...child.props,
    });
  });

  const contextValue: StepperContextType = React.useMemo(
    () => ({ activeStep, orientation, color, inverted }),
    [activeStep, orientation, color, inverted],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        data-testid="stepper"
        css={css`
          display: flex;
          flex-direction: ${orientation === 'vertical' ? 'column' : 'row'};
          row-gap: 8px;
        `}
        style={{ ...sx }}>
        {steps}
      </div>
    </StepperContext.Provider>
  );
};

export default Stepper;

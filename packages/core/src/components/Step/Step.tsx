import { useMemo } from 'react';

import { css } from '@emotion/react';

import StepConnector from '@components/StepConnector';
import { useStepperContext } from '@components/Stepper';

import StepContext from './Step.context';

const Step = ({
  index = 0,
  children,
  Connector = StepConnector,
}: {
  index?: number;
  children?: React.ReactElement<React.PropsWithChildren>;
  Connector?: React.FC<{ completed: boolean; active: boolean }>;
}) => {
  const { activeStep, orientation, inverted } = useStepperContext();

  let [active, completed, disabled] = [false, false, false];

  if (activeStep === index) {
    active = activeStep === index;
  } else if (activeStep > index) {
    completed = true;
  } else if (activeStep < index) {
    disabled = true;
  }

  const contextValue = useMemo(
    () => ({ index, active, completed, disabled }),
    [index, active, completed, disabled],
  );

  return (
    <StepContext.Provider value={contextValue}>
      {!inverted && orientation === 'vertical' && index !== 0 ? (
        <Connector active={active} completed={completed} />
      ) : null}

      <div
        css={css`
          flex: 1 1 0%;
          position: relative;
        `}>
        {orientation === 'horizontal' && index !== 0 ? (
          <Connector active={active} completed={completed} />
        ) : null}
        {children}
      </div>
      {inverted && orientation === 'vertical' && index !== 0 && (
        <Connector active={active} completed={completed} />
      )}
    </StepContext.Provider>
  );
};

export default Step;

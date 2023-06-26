import * as React from 'react';

import { StepperContextType } from './types';

const StepperContext = React.createContext<StepperContextType>({
  activeStep: 0,
  orientation: 'horizontal',
  color: 'grey',
  inverted: false,
});

export function useStepperContext(): StepperContextType {
  return React.useContext(StepperContext);
}

export default StepperContext;

import * as React from 'react';

export interface StepContextType {
  index: number;
  active: boolean;
  completed: boolean;
  disabled: boolean;
}

const StepContext = React.createContext<StepContextType>({
  index: 0,
  active: false,
  completed: false,
  disabled: false,
});

export function useStepContext(): StepContextType {
  return React.useContext(StepContext);
}

export default StepContext;

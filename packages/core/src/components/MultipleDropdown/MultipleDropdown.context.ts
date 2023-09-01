import * as React from 'react';

import { DropdownContextType } from './types';

const MultipleDropdownContext = React.createContext<DropdownContextType>({
  allItems: {},
  onChange: () => {
    /* noop */
  },
});

export function useMultipleDropdownContext(): DropdownContextType {
  return React.useContext(MultipleDropdownContext);
}

export default MultipleDropdownContext;

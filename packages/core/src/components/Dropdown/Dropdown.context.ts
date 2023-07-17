import * as React from 'react';

import { DropdownContextType } from './types';

const DropdownContext = React.createContext<DropdownContextType>({
  activeItem: null,
  onChange: () => {
    /* noop */
  },
});

export function useDropdownContext(): DropdownContextType {
  return React.useContext(DropdownContext);
}

export default DropdownContext;

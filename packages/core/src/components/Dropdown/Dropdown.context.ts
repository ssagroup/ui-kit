import * as React from 'react';

import { DropdownContextType } from './types';

const DropdownContext = React.createContext<DropdownContextType>({
  activeItem: null,
  onChange: () => {
    /* noop */
  },
  maxHeight: 200,
  listRef: undefined,
  placement: 'bottom',
});

export function useDropdownContext(): DropdownContextType {
  return React.useContext(DropdownContext);
}

export default DropdownContext;

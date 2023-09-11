import * as React from 'react';

import { DropdownContextType } from './types';
import { IDropdownOption } from '@components/MultipleDropdownOptions';

const MultipleDropdownContext = React.createContext<
  DropdownContextType<IDropdownOption>
>({
  allItems: {},
  isMultiple: false,
  onChange: () => {
    /* noop */
  },
});

export function useMultipleDropdownContext(): DropdownContextType<IDropdownOption> {
  return React.useContext(MultipleDropdownContext);
}

export default MultipleDropdownContext;

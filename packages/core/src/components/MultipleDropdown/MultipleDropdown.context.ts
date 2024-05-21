import * as React from 'react';

import { DropdownContextType } from './types';
import { DropdownOptionType } from '@components/MultipleDropdownOptions';

const MultipleDropdownContext = React.createContext<
  DropdownContextType<DropdownOptionType>
>({
  allItems: {},
  isMultiple: false,
  onChange: () => {
    /* noop */
  },
});

export function useMultipleDropdownContext(): DropdownContextType<DropdownOptionType> {
  return React.useContext(MultipleDropdownContext);
}

export default MultipleDropdownContext;

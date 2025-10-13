import * as React from 'react';

import { DropdownOptionType } from '@components/MultipleDropdownOptions';

import { DropdownContextType } from './types';

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

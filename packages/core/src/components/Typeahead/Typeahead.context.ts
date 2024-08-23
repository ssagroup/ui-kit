import * as React from 'react';

import { TypeaheadContextType } from './types';

export const TypeaheadContext = React.createContext<TypeaheadContextType>({
  allItems: {},
  isMultiple: false,
  selectedItems: [],
  onChange: () => {
    /* no-op */
  },
  setSelectedItems: () => {
    /* no-op */
  },
});

export const useTypeaheadContext = (): TypeaheadContextType =>
  React.useContext(TypeaheadContext);

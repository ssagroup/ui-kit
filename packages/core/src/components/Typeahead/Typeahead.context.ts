import * as React from 'react';
import { UseTypeaheadResult } from './useTypeahead';

export const TypeaheadContext = React.createContext<UseTypeaheadResult>({
  optionsWithKey: {},
  isMultiple: false,
  selectedItems: [],
  typeaheadId: '',
  firstSuggestion: '',
  inputRef: { current: null },
  triggerRef: { current: null },
  isOpen: false,
  items: [],
  className: undefined,
  useFormResult: {} as any,
  handleChange: () => {
    /* no-op */
  },
  handleInputClick: () => {
    /* no-op */
  },
  handleInputKeyDown: () => {
    /* no-op */
  },
  handleOpenChange: () => {
    /* no-op */
  },
  handleRemoveSelectedClick: () => () => {
    /* no-op */
  },
  handleSelectedClick: () => {
    /* no-op */
  },
});

export const useTypeaheadContext = (): UseTypeaheadResult =>
  React.useContext(TypeaheadContext);

import * as React from 'react';
import { UseTypeaheadResult } from './useTypeahead';

// TODO: leave there only needed data!?
export const TypeaheadContext = React.createContext<UseTypeaheadResult>({
  optionsWithKey: {},
  isMultiple: false,
  selectedItems: [],
  typeaheadId: '',
  firstSuggestion: '',
  inputRef: { current: null },
  triggerRef: { current: null },
  isOpen: false,
  className: undefined,
  startIcon: null,
  endIcon: null,
  name: '',
  inputName: '',
  inputValue: '',
  validationSchema: {},
  status: 'basic',
  setValue: () => {
    /* no-op */
  },
  register: () => {
    return {} as any;
  },
  handleChange: () => {
    /* no-op */
  },
  handleInputClick: () => {
    /* no-op */
  },
  handleInputKeyDown: () => {
    /* no-op */
  },
  handleInputChange: () => {
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

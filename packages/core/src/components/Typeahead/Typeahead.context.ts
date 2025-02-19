import * as React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
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
  className: undefined,
  startIcon: null,
  endIcon: null,
  startIconClassName: undefined,
  endIconClassName: undefined,
  name: '',
  inputName: '',
  inputValue: '',
  validationSchema: {},
  status: 'basic',
  isDisabled: false,
  options: [],
  placeholder: '',
  useFormResult: {} as UseFormReturn<FieldValues>,
  setValue: () => {
    /* no-op */
  },
  register: () => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    return {} as any;
  },
  handleChange: () => {
    /* no-op */
  },
  handleClearAll: () => {
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

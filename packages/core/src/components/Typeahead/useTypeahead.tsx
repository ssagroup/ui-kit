import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useController, useForm, useFormContext } from 'react-hook-form';
import { OpenChangeReason } from '@floating-ui/react';
import { useElementSize, useUncontrolled } from '@ssa-ui-kit/hooks';
import {
  TypeaheadOptionProps,
  TypeaheadValue,
  UseTypeaheadProps,
} from './types';

type HandleChangeParams = {
  value?: string | number;
  shouldClose?: boolean;
  resetInput?: boolean;
};

const findExactMatch = (
  input: string,
  options: Record<string | number, TypeaheadOptionProps>,
) => {
  const normalizedInput = input.toLowerCase();
  return Object.values(options).find((opt) => {
    const labelText = (opt.label ?? opt.value).toString().toLowerCase();
    return labelText === normalizedInput;
  });
};

export const useTypeahead = ({
  name = 'typeahead-input',
  isOpen: isInitOpen,
  selectedItems: providedSelectedItems,
  defaultSelectedItems,
  isDisabled,
  isMultiple,
  children,
  className,
  startIcon,
  endIcon,
  startIconClassName,
  endIconClassName,
  validationSchema,
  error,
  success,
  placeholder,
  filterOptions = true,
  autoSelect = true,
  onChange,
  onClearAll,
  onRemoveSelectedClick,
  onEmptyChange,
  renderOption,
}: UseTypeaheadProps) => {
  const inputName = `${name}-text`;

  const defaultForm = useForm();
  const form = useFormContext() ?? defaultForm;
  const { register, setValue, watch } = form;

  const formFieldValue = watch(name) as number | number[] | undefined;
  const controlledValue: TypeaheadValue[] | undefined = (() => {
    if (providedSelectedItems) {
      return providedSelectedItems;
    }
    // controlledValue should be undefined if defaultSelectedItems is provided
    if (defaultSelectedItems) {
      return;
    }
    if (isMultiple) {
      return Array.isArray(formFieldValue) ? formFieldValue : [];
    }
    return ['number', 'string'].includes(typeof formFieldValue)
      ? ([formFieldValue] as TypeaheadValue[])
      : [];
  })();

  const [isOpen, _setIsOpen] = useUncontrolled({
    defaultValue: isInitOpen,
    finalValue: false,
  });
  const [selectedItems, setSelected] = useUncontrolled({
    value: controlledValue,
    defaultValue: defaultSelectedItems,
    finalValue: [],
  });
  const [rawInput, setRawInput] = useState<string | null>(null);
  const { ref: inputRef } = useElementSize<HTMLInputElement>();
  const triggerRef = useRef<HTMLDivElement>(null);

  useController({
    control: form.control,
    name,
    rules: validationSchema,
    defaultValue: isMultiple ? selectedItems : selectedItems[0],
  });

  const typeaheadId = useId();

  const optionsWithKey = useMemo(() => {
    const opts: Record<string | number, TypeaheadOptionProps> = {};
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<TypeaheadOptionProps>(child)) {
        opts[child.props.value] = child.props;
      }
    });
    return opts;
  }, [children]);

  useEffect(() => {
    const validSelected = selectedItems.filter((item) => optionsWithKey[item]);
    if (validSelected.length !== selectedItems.length) {
      setSelected(validSelected);
      const fieldValue = isMultiple ? validSelected : undefined;
      setValue?.(name, fieldValue);
      setRawInput(null);
      form.clearErrors(name);
      form.trigger(name);
      onEmptyChange?.(validSelected.length === 0);
    }
  }, [optionsWithKey, selectedItems]);

  const inputValue = useMemo(() => {
    if (isMultiple) return rawInput ?? '';
    if (rawInput != null) return rawInput;
    return selectedItems.length === 1
      ? optionsWithKey[selectedItems[0]]?.label?.toString() || ''
      : '';
  }, [isMultiple, rawInput, selectedItems, optionsWithKey]);

  const filteredChildren = useMemo(() => {
    // if filtering is disabled, or there's no input, show all
    if (!filterOptions || !inputValue) return React.Children.toArray(children);

    const needle = inputValue.toLowerCase();
    return React.Children.toArray(children).filter((child) => {
      if (!React.isValidElement(child)) return false;
      const { label, value } = child.props as TypeaheadOptionProps;
      const text = (label ?? value)?.toString().toLowerCase() || '';
      return text.includes(needle);
    });
  }, [children, inputValue]);

  const items = useMemo(() => {
    return filteredChildren.map((child, index) => {
      if (!React.isValidElement(child)) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const childElement = child as React.ReactElement<any>;
      const isActive = selectedItems.includes(childElement.props.value);
      const { value, label, id, isDisabled } = childElement.props;

      return React.cloneElement(childElement, {
        ...childElement.props,
        index,
        isActive,
        isDisabled,
        role: 'option',
        'aria-selected': isActive,
        'aria-labelledby': `typeahead-label-${name}`,
        onClick: (e: React.BaseSyntheticEvent) => {
          e.preventDefault();
          if (!isDisabled) {
            const shouldClose = !isMultiple;
            handleChange({ value, shouldClose });
          }
        },
        children:
          renderOption?.({ value: id || value, input: inputValue, label }) ??
          childElement.props.children ??
          label ??
          value,
      });
    });
  }, [children, selectedItems, inputValue]);

  const firstSuggestion = useMemo(() => {
    if (!inputValue) return '';
    const needle = inputValue.toLowerCase();
    for (const child of filteredChildren) {
      if (!React.isValidElement(child)) continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const childElement = child as React.ReactElement<any>;
      const labelText = (
        childElement.props.label ?? childElement.props.value
      ).toString();
      if (labelText.toLowerCase().startsWith(needle)) {
        return inputValue + labelText.slice(inputValue.length);
      }
    }
    return '';
  }, [inputValue, filteredChildren]);

  const setIsOpen = (open: boolean) => {
    if (!open) {
      form.trigger(name);
    }
    _setIsOpen(open);
  };

  const handleChange = ({
    value,
    shouldClose = true,
    resetInput = true,
  }: HandleChangeParams) => {
    if (isDisabled || value == null) return;

    const alreadySelected = selectedItems.includes(value);
    const updatedSelected = isMultiple
      ? alreadySelected
        ? selectedItems.filter((item) => item !== value)
        : [...selectedItems, value]
      : alreadySelected
        ? []
        : [value];

    const fieldValue = isMultiple ? updatedSelected : updatedSelected[0];
    setSelected(updatedSelected);
    setValue?.(name, fieldValue);
    form.clearErrors(name);

    if (resetInput) {
      const rawInputValue = isMultiple
        ? null
        : updatedSelected.length
          ? String(optionsWithKey[value]?.label)
          : null;
      setRawInput(rawInputValue);
    }

    if (shouldClose) {
      setIsOpen(false);
    }

    onChange?.(value, !alreadySelected);
    onEmptyChange?.(updatedSelected.length === 0);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    if (isDisabled) return;
    e.preventDefault();
    e.stopPropagation();
    setSelected([]);
    setRawInput(null);
    setIsOpen(false);
    setValue?.(name, undefined);
    form.trigger(name);
    inputRef.current?.focus();
    onClearAll?.();
    onEmptyChange?.(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setRawInput(input);
    if (!autoSelect || !filterOptions) return;
    const match = findExactMatch(input, optionsWithKey);
    if (match) {
      handleChange({ value: match.value, shouldClose: false });
      return;
    }
    // unset selected value if not fully matched
    if (!isMultiple && selectedItems.length > 0) {
      handleChange({
        value: selectedItems[0],
        shouldClose: false,
        resetInput: false,
      });
    }
  };

  const handleInputClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isDisabled) {
      inputRef.current?.focus();
      setIsOpen(true);
    }
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const isEnterOrTab = ['Enter', 'Tab'].includes(e.code);

    if (isEnterOrTab && firstSuggestion && firstSuggestion !== inputValue) {
      const match = findExactMatch(firstSuggestion, optionsWithKey);
      if (match) {
        handleChange({ value: match.value });
      }
      e.preventDefault();
      return;
    }

    if (
      isMultiple &&
      e.code === 'Backspace' &&
      selectedItems.length &&
      !inputValue
    ) {
      const lastSelected = selectedItems[selectedItems.length - 1];
      handleChange({ value: lastSelected, shouldClose: false });
      e.preventDefault();
      return;
    }

    if (!isOpen && firstSuggestion !== inputValue) {
      setIsOpen(true);
    }
  };

  const handleRemoveSelectedClick =
    (value: string | number) => (e: React.MouseEvent) => {
      e.stopPropagation();
      handleChange({ value });
      onRemoveSelectedClick?.(value);
      form.trigger(name);
    };

  const handleOpenChange = (
    open: boolean,
    event: Event,
    reason?: OpenChangeReason,
  ) => {
    if (isDisabled || reason === 'reference-press') {
      return;
    }
    setIsOpen(open);
    if (!isMultiple && selectedItems.length > 0) {
      const selectedValue = selectedItems[0];
      const label = optionsWithKey[selectedValue]?.label;
      setRawInput(label ? String(label) : null);
      return;
    }
    setRawInput(null);
  };

  const status: 'basic' | 'success' | 'error' = (() => {
    if (form.formState.errors[name]) return 'error';
    if (error) return 'error';
    if (success) return 'success';
    return 'basic';
  })();

  return {
    isOpen,
    isDisabled,
    optionsWithKey,
    selectedItems,
    inputRef,
    firstSuggestion,
    isMultiple,
    typeaheadId,
    triggerRef,
    className,
    startIcon,
    endIcon,
    startIconClassName,
    endIconClassName,
    name,
    inputName,
    inputValue,
    validationSchema,
    status,
    error: error ?? form.formState.errors[name],
    placeholder,
    options: items,
    useFormResult: form,
    register,
    setValue,
    onChange,
    handleClearAll,
    handleOpenChange,
    handleInputChange,
    handleInputClick,
    handleInputKeyDown,
    handleRemoveSelectedClick,
  };
};

export type UseTypeaheadResult = ReturnType<typeof useTypeahead>;

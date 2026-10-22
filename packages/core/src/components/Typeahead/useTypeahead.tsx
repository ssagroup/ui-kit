import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useController, useForm, useFormContext } from 'react-hook-form';
import { OpenChangeReason } from '@floating-ui/react';
import { useElementSize, useUncontrolled } from '@ssa-ui-kit/hooks';
import { isNill } from '@ssa-ui-kit/utils';
import { resolveDisabled } from '@utils/deprecation';
import {
  ContextMenuItem,
  getContextMenuOptionId,
  getNextActiveValue,
} from '@components/ContextMenu';
import {
  TypeaheadItemProps,
  TypeaheadOptionProps,
  TypeaheadValue,
  UseTypeaheadProps,
} from './types';
import * as S from './styles';

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

/**
 * Options in order, with fragments unwrapped: consumers commonly map their
 * options inside a `<>...</>`, which `React.Children` treats as one child.
 */
const toOptionArray = (children: React.ReactNode): React.ReactNode[] =>
  React.Children.toArray(children).flatMap((child) =>
    React.isValidElement<{ children?: React.ReactNode }>(child) &&
    child.type === React.Fragment
      ? toOptionArray(child.props.children)
      : [child],
  );

export const useTypeahead = ({
  name = 'typeahead-input',
  isOpen: isInitOpen,
  selectedItems: providedSelectedItems,
  defaultSelectedItems,
  isDisabled,
  isMultiple,
  singleLine = false,
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
  allowCustomValues = false,
  onChange,
  onClearAll,
  onRemoveSelectedClick,
  onEmptyChange,
  renderOption,
  label,
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
    toOptionArray(children).forEach((child) => {
      if (React.isValidElement<TypeaheadOptionProps>(child)) {
        opts[child.props.value] = child.props;
      }
    });
    return opts;
  }, [children]);

  useEffect(() => {
    // When allowCustomValues is false, remove selected items that are no longer in options.
    // When true, keep custom (non-option) values in selection.
    const validSelected = allowCustomValues
      ? selectedItems
      : selectedItems.filter((item) => optionsWithKey[item]);
    if (validSelected.length !== selectedItems.length) {
      setSelected(validSelected);
      const fieldValue = isMultiple ? validSelected : undefined;
      setValue?.(name, fieldValue);
      setRawInput(null);
      form.clearErrors(name);
      form.trigger(name);
      onEmptyChange?.(validSelected.length === 0);
    }
  }, [optionsWithKey, selectedItems, allowCustomValues]);

  const inputValue = useMemo(() => {
    if (isMultiple) return rawInput ?? '';
    if (!isNill(rawInput)) return rawInput;
    return selectedItems.length === 1
      ? (optionsWithKey[selectedItems[0]]?.label?.toString() ??
          String(selectedItems[0] ?? ''))
      : '';
  }, [isMultiple, rawInput, selectedItems, optionsWithKey]);

  const filteredChildren = useMemo(() => {
    // if filtering is disabled, or there's no input, show all
    if (!filterOptions || !inputValue) return toOptionArray(children);

    const needle = inputValue.toLowerCase();
    return toOptionArray(children).filter((child) => {
      if (!React.isValidElement(child)) return false;
      const { label, value } = child.props as TypeaheadOptionProps;
      const text = (label ?? value)?.toString().toLowerCase() || '';
      return text.includes(needle);
    });
  }, [children, inputValue]);

  const listId = `typeahead-popup-${typeaheadId}`;
  // Names the combobox; left out without a label, so it never points at a
  // missing element.
  const labelId = label ? `typeahead-label-${typeaheadId}` : undefined;

  const customOptionValue =
    allowCustomValues && inputValue.trim() ? inputValue.trim() : null;

  // Everything the list shows, in order: selected custom values, the value
  // being typed (when custom values are allowed), then the filtered options.
  // Built here rather than in the list so keyboard navigation in the input
  // walks exactly what is on screen.
  const menuItems = useMemo(() => {
    const customItem = (
      value: TypeaheadValue,
    ): ContextMenuItem<TypeaheadValue> => ({
      value,
      label: <S.CustomValueLabel>{value}</S.CustomValueLabel>,
      textValue: String(value),
    });

    const selectedCustom = selectedItems
      .filter((item) => !optionsWithKey[item])
      .map(customItem);
    const typedCustom =
      customOptionValue &&
      !selectedItems.includes(customOptionValue) &&
      !optionsWithKey[customOptionValue]
        ? [customItem(customOptionValue)]
        : [];

    const options = filteredChildren.flatMap(
      (child): ContextMenuItem<TypeaheadValue>[] => {
        if (!React.isValidElement<TypeaheadItemProps>(child)) return [];
        const { value, label, avatar, children: content } = child.props;
        const { id } = child.props as { id?: TypeaheadValue };
        if (isNill(value)) return [];
        const disabled = resolveDisabled(
          'TypeaheadOption',
          child.props.disabled,
          child.props.isDisabled,
        );
        return [
          {
            value,
            label:
              renderOption?.({
                value: id || value,
                input: inputValue as string,
                // Passed through as given, as before the ContextMenu move.
                label: label as string,
              }) ??
              content ??
              label ??
              value,
            textValue: String(label ?? value),
            avatar: avatar ? (
              <S.TypeaheadItemAvatar data-testid="typeahead-option-avatar">
                {avatar}
              </S.TypeaheadItemAvatar>
            ) : undefined,
            disabled,
          },
        ];
      },
    );

    return [...selectedCustom, ...typedCustom, ...options];
  }, [
    filteredChildren,
    selectedItems,
    optionsWithKey,
    customOptionValue,
    inputValue,
    renderOption,
  ]);

  // The highlighted option. Focus stays in the input, so the list is driven
  // from here and announced through aria-activedescendant.
  const [rawActiveValue, setActiveValue] = useState<TypeaheadValue | null>(
    null,
  );
  // Filtering can remove the highlighted option; it is then no longer active.
  const activeValue = menuItems.some((item) => item.value === rawActiveValue)
    ? rawActiveValue
    : null;

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
        const suggestion = inputValue + labelText.slice(inputValue.length);
        return suggestion !== inputValue ? suggestion : '';
      }
    }
    return '';
  }, [inputValue, filteredChildren]);

  const setIsOpen = (open: boolean) => {
    if (!open) {
      form.trigger(name);
      setActiveValue(null);
    }
    _setIsOpen(open);
  };

  const handleChange = ({
    value,
    shouldClose = true,
    resetInput = true,
  }: HandleChangeParams) => {
    if (isDisabled || isNill(value)) return;

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
          ? String(optionsWithKey[value]?.label ?? value)
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
    setActiveValue(null);
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
    // Arrows walk the list without leaving the input; Home / End stay with the
    // input's caret.
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (isDisabled) return;
      if (!isOpen) {
        setIsOpen(true);
        const selected = menuItems.find(
          (item) => !item.disabled && selectedItems.includes(item.value),
        );
        setActiveValue(
          selected?.value ?? getNextActiveValue(menuItems, null, e.key) ?? null,
        );
        return;
      }
      setActiveValue(getNextActiveValue(menuItems, activeValue, e.key) ?? null);
      return;
    }

    // Enter on a highlighted option chooses it, ahead of the custom value and
    // first-suggestion shortcuts below.
    if (e.key === 'Enter' && isOpen && activeValue !== null) {
      e.preventDefault();
      handleChange({ value: activeValue, shouldClose: !isMultiple });
      return;
    }

    const isEnterOrTab = ['Enter', 'Tab'].includes(e.code);

    // Enter: add custom value when it's the first option
    if (
      e.code === 'Enter' &&
      allowCustomValues &&
      customOptionValue &&
      !selectedItems.includes(customOptionValue)
    ) {
      handleChange({ value: customOptionValue });
      e.preventDefault();
      return;
    }

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

  /** An option chosen in the list, by click or Enter. */
  const handleOptionAction = (value: TypeaheadValue) => {
    handleChange({ value, shouldClose: !isMultiple });
  };

  const inputAriaProps = {
    'aria-controls': isOpen ? listId : undefined,
    'aria-activedescendant':
      isOpen && activeValue !== null
        ? getContextMenuOptionId(listId, activeValue)
        : undefined,
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
    singleLine: !!isMultiple && singleLine,
    typeaheadId,
    labelId,
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
    listId,
    menuItems,
    activeValue,
    setActiveValue,
    inputAriaProps,
    customOptionValue,
    handleOptionAction,
    handleChange,
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

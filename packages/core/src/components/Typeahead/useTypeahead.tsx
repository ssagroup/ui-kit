import React, {
  BaseSyntheticEvent,
  MouseEventHandler,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { propOr } from '@ssa-ui-kit/utils';
import { UseTypeaheadProps } from './types';

export const useTypeahead = ({
  name = 'typeahead-input',
  isOpen: isInitOpen,
  initialSelectedItems,
  isDisabled,
  isMultiple,
  children,
  className,
  startIcon,
  endIcon,
  startIconClassName,
  endIconClassName,
  validationSchema,
  errors,
  success,
  placeholder,
  register,
  setValue,
  onChange,
  renderOption,
}: UseTypeaheadProps) => {
  const inputName = `${name}-text`;
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [selected, setSelected] = useState<Array<string | number>>(
    initialSelectedItems || [],
  );
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, Record<string, string | number>>
  >({});
  const [items, setItems] = useState<Array<React.ReactElement> | undefined>();
  const [inputValue, setInputValue] = useState<string>('');
  const [status, setStatus] = useState<'basic' | 'success' | 'error'>('basic');

  const inputRef = useRef<HTMLInputElement>(null);
  const typeaheadId = useId();
  const triggerRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const [firstSuggestion, setFirstSuggestion] = useState('');

  useEffect(() => {
    if (!register) {
      console.warn('Typeahead component must be used within a Form component');
    }
  }, []);

  useEffect(() => {
    if (isMultiple) {
      setValue?.(name, selected);
      setInputValue('');
      setFirstSuggestion('');
    } else {
      setValue?.(name, selected.length ? selected[0] : undefined);
    }
  }, [selected]);

  useEffect(() => {
    if (isDisabled && isOpen) {
      setIsOpen(false);
    }
  }, [isDisabled]);

  useEffect(() => {
    const status = success ? 'success' : errors ? 'error' : 'basic';
    setStatus(status);
  }, [errors, success]);

  useEffect(() => {
    const keyedOptions: Record<
      number | string,
      Record<string, string | number>
    > = {};
    const childItems = (
      React.Children.toArray(children).filter(Boolean) as React.ReactElement[]
    ).map((child, index) => {
      keyedOptions[child.props.value] = {
        ...child.props,
      };

      return React.cloneElement(child, {
        index,
        ...child.props,
      });
    });
    setOptionsWithKey(keyedOptions);
    setItems(childItems);
  }, [initialSelectedItems, children]);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    const filteredOptions = [...childrenArray] as React.ReactElement[];
    const childItems = filteredOptions.map((child, index) => {
      const { id, label, isDisabled } = child.props;
      const isActive = selected.includes(child.props.value);
      return React.cloneElement(child, {
        index,
        ...child.props,
        isActive,
        isDisabled,
        id,
        'aria-selected': isActive,
        'aria-labelledby': `typeahead-label-${name}`,
        onClick: (event: BaseSyntheticEvent) => {
          event.preventDefault();
          if (!isDisabled) {
            handleChange(child.props.value);
          }
        },
        children: renderOption
          ? renderOption({ value: id, input: inputValue || '', label })
          : child.props.children || child.props.label || child.props.value,
      });
    });
    setItems(childItems);
  }, [inputValue, optionsWithKey, selected]);

  useEffect(() => {
    if (!isMultiple && Object.keys(optionsWithKey).length) {
      const foundItem = Object.values(optionsWithKey).find(
        (item) => item.label === inputValue,
      );
      if (!foundItem && selected.length) {
        setSelected([]);
      }
      if (foundItem && !selected.includes(foundItem?.value)) {
        setSelected([foundItem?.value]);
      }
    }
  }, [optionsWithKey, inputValue]);

  useEffect(() => {
    if (!isMultiple && selected.length && Object.keys(optionsWithKey).length) {
      const currentOption = optionsWithKey[selected[0]];
      const optionText =
        currentOption &&
        (currentOption.children || currentOption.label || currentOption.value);
      setInputValue(`${optionText}`);
    }
  }, [selected, optionsWithKey]);

  useEffect(() => {
    if (inputValue) {
      const newFirstSuggestion = Object.values(optionsWithKey)?.find((item) => {
        const label = propOr<Record<string, any>, string>(
          '',
          'label',
        )(item as Record<string, any>);
        return label.toLowerCase().startsWith(inputValue.toLowerCase());
      });
      const firstSuggestionLabel = propOr<Record<string, any>, string>(
        '',
        'label',
      )(newFirstSuggestion as unknown as Record<string, any>);
      const humanSuggestionLabel = inputValue.concat(
        firstSuggestionLabel.slice(inputValue.length),
      );
      setFirstSuggestion(humanSuggestionLabel);
    } else {
      setFirstSuggestion('');
      if (isMultiple) {
        setInputValue('');
      }
    }
  }, [inputValue, items, selected]);

  const handleOpenChange = (open: boolean) => {
    if (!isDisabled) {
      setIsOpen(open);
    }
  };

  const handleChange = (changingValue?: string | number) => {
    if (isDisabled || changingValue === undefined) {
      return;
    }
    const isNewSelected = true;
    const isChangingItemSelected = selected.includes(changingValue);
    if (isMultiple) {
      setSelected((currentSelected) =>
        isChangingItemSelected
          ? currentSelected.filter((current) => current !== changingValue)
          : [...currentSelected, changingValue],
      );
      setInputValue('');
    } else {
      setSelected([changingValue]);
    }
    setIsOpen(false);
    setFirstSuggestion('');
    inputRef.current?.focus();
    onChange && onChange(changingValue, isNewSelected);
  };

  const handleClearAll = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isDisabled) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    setSelected([]);
    setInputValue('');
    setIsOpen(false);
    setFirstSuggestion('');
    inputRef.current?.focus();
  };

  const handleInputClick: React.MouseEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!isDisabled) {
      inputRef.current?.focus();
      setIsOpen(true);
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.code === 'Tab' && firstSuggestion) {
      const foundItem = Object.values(optionsWithKey).find(
        (item) =>
          `${item.label}`.toLowerCase() === firstSuggestion.toLowerCase(),
      );
      handleChange(foundItem?.value);
      if (foundItem) {
        setInputValue(`${foundItem?.label}`);
      }
      event.preventDefault();
      return false;
    }
    if (
      isMultiple &&
      event.code === 'Backspace' &&
      selected.length > 0 &&
      !firstSuggestion
    ) {
      handleChange(selected[selected.length - 1]);
      event.preventDefault();
      return false;
    }
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setInputValue(event.target.value);
  };

  const handleSelectedClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    event.stopPropagation();
  };

  const handleRemoveSelectedClick =
    (selectedItem: number | string): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.stopPropagation();
      handleChange(selectedItem);
    };

  return {
    isOpen,
    isDisabled,
    optionsWithKey,
    selectedItems: selected,
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
    placeholder,
    options: items,
    register,
    setValue,
    handleChange,
    handleClearAll,
    handleOpenChange,
    handleInputChange,
    handleInputClick,
    handleInputKeyDown,
    handleSelectedClick,
    handleRemoveSelectedClick,
  };
};

export type UseTypeaheadResult = ReturnType<typeof useTypeahead>;

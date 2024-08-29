import React, {
  MouseEventHandler,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { pathOr } from '@ssa-ui-kit/utils';
import { TypeaheadProps } from './types';

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
  register,
  setValue,
  onChange,
  renderOption,
}: Pick<
  TypeaheadProps,
  | 'initialSelectedItems'
  | 'isDisabled'
  | 'children'
  | 'isMultiple'
  | 'onChange'
  | 'renderOption'
  | 'isOpen'
  | 'className'
  | 'startIcon'
  | 'endIcon'
  | 'name'
  | 'register'
  | 'setValue'
>) => {
  const { watch } = useForm<FieldValues>();

  const inputName = `${name}-text`;
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [selected, setSelected] = useState<Array<string | number>>(
    initialSelectedItems || [],
  );
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, Record<string, string | number>>
  >({});
  const [items, setItems] = useState<Array<React.ReactElement>>([]);
  const inputWatch = watch(inputName);

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
    setValue?.(name, selected);
  }, [selected]);

  useEffect(() => {
    if (isDisabled && isOpen) {
      setIsOpen(false);
    }
  }, [isDisabled]);

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
    const childrenArray = React.Children.toArray(children).filter((child) => {
      const label = pathOr<Record<string, any>, string>('', ['props', 'label'])(
        child as unknown as Record<string, any>,
      );
      return (
        child &&
        label.toLowerCase().includes(`${inputWatch || ''}`.toLowerCase())
      );
    });
    const childItems = (childrenArray as React.ReactElement[]).map(
      (child, index) => {
        const { id, label } = child.props;
        return React.cloneElement(child, {
          index,
          ...child.props,
          children: renderOption
            ? renderOption({ value: id, input: inputWatch || '', label })
            : child.props.children,
        });
      },
    );
    setItems(childItems);
  }, [inputWatch, optionsWithKey]);

  useEffect(() => {
    if (inputWatch) {
      const newFirstSuggestion = items.find((item) => {
        const label = pathOr<Record<string, any>, string>('', [
          'props',
          'label',
        ])(item as Record<string, any>);
        const value = pathOr<Record<string, any>, string>('', [
          'props',
          'value',
        ])(item as Record<string, any>);
        return (
          label.toLowerCase().startsWith(inputWatch.toLowerCase()) &&
          (isMultiple ? !selected.includes(value) : true)
        );
      });
      const firstSuggestionLabel = pathOr<Record<string, any>, string>('', [
        'props',
        'label',
      ])(newFirstSuggestion as unknown as Record<string, any>);
      const humanSuggestionLabel = inputWatch.concat(
        firstSuggestionLabel.slice(inputWatch.length),
      );
      setFirstSuggestion(humanSuggestionLabel);
    } else {
      setFirstSuggestion('');
      if (isMultiple) {
        setValue?.(inputName, '');
      }
    }
  }, [inputWatch, items, selected]);

  useEffect(() => {
    if (
      !isMultiple &&
      Object.keys(optionsWithKey).length &&
      selected.length &&
      inputWatch !== '' &&
      inputWatch !== undefined &&
      !selected.includes(inputWatch)
    ) {
      const foundItem = Object.values(optionsWithKey).find(
        (item) => item.label === inputWatch,
      );
      if (!foundItem || foundItem?.value !== selected[0]) {
        setSelected([]);
      }
    }
  }, [inputWatch, optionsWithKey, selected]);

  useEffect(() => {
    if (!isMultiple && selected.length && Object.keys(optionsWithKey).length) {
      const currentOption = optionsWithKey[selected[0]];
      const optionText =
        currentOption &&
        (currentOption.children || currentOption.label || currentOption.value);
      setValue?.(inputName, `${optionText}`);
    }
  }, [selected, optionsWithKey]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleChange = (changingValue: string | number) => {
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
      setValue?.(inputName, '');
    } else {
      setSelected([changingValue]);
    }
    setIsOpen(false);
    setFirstSuggestion('');
    inputRef.current?.focus();
    onChange && onChange(changingValue, isNewSelected);
  };

  const handleInputClick: React.MouseEventHandler<HTMLInputElement> = (
    event,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsOpen(true);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.code === 'Tab' && firstSuggestion) {
      const foundItem = items.find(
        (item) =>
          item.props?.label.toLowerCase() === firstSuggestion.toLowerCase(),
      );
      handleChange(foundItem?.props.value);
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
    optionsWithKey,
    selectedItems: selected,
    inputRef,
    firstSuggestion,
    items,
    isMultiple,
    typeaheadId,
    triggerRef,
    className,
    startIcon,
    endIcon,
    name,
    inputName,
    register,
    setValue,
    handleChange,
    handleOpenChange,
    handleInputClick,
    handleInputKeyDown,
    handleSelectedClick,
    handleRemoveSelectedClick,
  };
};

export type UseTypeaheadResult = ReturnType<typeof useTypeahead>;

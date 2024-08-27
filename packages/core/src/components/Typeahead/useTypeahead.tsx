import React, {
  MouseEventHandler,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { pathOr } from '@ssa-ui-kit/utils';
import { TypeaheadProps } from './types';

// TODO: use additional two hooks - useSingleTypeahead + useMultipleTypeahead
export const useTypeahead = ({
  isOpen: isInitOpen,
  initialSelectedItems,
  isDisabled,
  isMultiple,
  children,
  className,
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
>) => {
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [selected, setSelected] = useState<Array<string | number>>(
    initialSelectedItems || [],
  );
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, Record<string, string | number>>
  >({});
  const [items, setItems] = useState<Array<React.ReactElement>>([]);
  const useFormResult = useForm<FieldValues>();
  const { watch, setValue } = useFormResult;

  const inputRef = useRef<HTMLInputElement>(null);
  const typeaheadId = useId();
  const triggerRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const inputWatch = watch('typeahead-input');
  const [firstSuggestion, setFirstSuggestion] = useState('');

  useLayoutEffect(() => {
    setValue('typeahead-input', 'First');
  }, []);

  useEffect(() => {
    if (isDisabled && isOpen) {
      setIsOpen(false);
    }
  }, [isDisabled]);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    const keyedOptions: Record<
      number | string,
      Record<string, string | number>
    > = {};
    const childItems = (childrenArray as React.ReactElement[]).map(
      (child, index) => {
        keyedOptions[child.props.value] = {
          ...child.props,
        };

        return React.cloneElement(child, {
          index,
          ...child.props,
        });
      },
    );
    setOptionsWithKey(keyedOptions);
    setItems(childItems);
  }, [initialSelectedItems, children]);

  useEffect(() => {
    console.log('>>>inputWatch', inputWatch);
    const childrenArray = React.Children.toArray(children).filter((child) => {
      const label = pathOr<Record<string, any>, string>('', ['props', 'label'])(
        child as unknown as Record<string, any>,
      );
      return (
        child && label.toLowerCase().includes(`${inputWatch}`.toLowerCase())
      );
    });
    const childItems = (childrenArray as React.ReactElement[]).map(
      (child, index) => {
        const { id, label } = child.props;
        return React.cloneElement(child, {
          index,
          ...child.props,
          children: renderOption
            ? renderOption({ value: id, input: inputWatch, label })
            : child.props.children,
        });
      },
    );
    setItems(childItems);
  }, [inputWatch]);

  useEffect(() => {
    if (isMultiple) {
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
            !selected.includes(value)
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
        setValue('typeahead-input', '');
      }
    } else {
      if (!inputWatch && selected[0]) {
        // TODO: set human label, not id!
        // Probably, we need to use other input name for single mode,
        // using label instead of id? or, combine them!?
      }
      console.log('>>>single', selected);
    }
  }, [inputWatch, items, selected]);

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
    } else {
      setSelected(isChangingItemSelected ? [] : [changingValue]);
    }
    setIsOpen(false);
    setFirstSuggestion('');
    setValue('typeahead-input', '');
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
    if (event.code === 'Backspace' && selected.length > 0 && !firstSuggestion) {
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
    useFormResult,
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
    handleChange,
    handleOpenChange,
    handleInputClick,
    handleInputKeyDown,
    handleSelectedClick,
    handleRemoveSelectedClick,
  };
};

export type UseTypeaheadResult = ReturnType<typeof useTypeahead>;

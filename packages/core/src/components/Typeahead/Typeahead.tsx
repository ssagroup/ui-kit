import React, {
  useState,
  useEffect,
  useId,
  useRef,
  MouseEventHandler,
} from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { pathOr } from '@ssa-ui-kit/utils';
import Input from '@components/Input';
import { TypeaheadContextType, TypeaheadProps } from './types';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import * as S from './styles';
import { TypeaheadContext } from './Typeahead.context';
import { TypeaheadOptions } from './TypeaheadOptions';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';

// TODO: Let's check:
/**
 * The structure of the component:
 *
 * MultipleDropdown
 *   DropdownToggle
 *   MultipleDropdownOptions
 *     DropdownOption
 *
 * Aria attributes are set according to
 * https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 **/

// TODO: Let's use Popover!
// TODO: Let's divide by subcomponents!
export const Typeahead = ({
  selectedItems: initialSelectedItems = [],
  isDisabled,
  isOpen: isInitOpen,
  isMultiple = true,
  label,
  children,
  className,
  optionsClassname,
  onChange: handleChange,
  renderOption,
}: TypeaheadProps) => {
  const theme = useTheme();
  const dropdownBaseRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const triggerRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const typeaheadId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
  const [selected, setSelected] = useState<Array<string | number>>(
    initialSelectedItems || [],
  );
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, Record<string, string | number>>
  >({});
  const [items, setItems] = useState<Array<React.ReactElement>>([]);
  const { register, watch, setValue } = useForm<FieldValues>();

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWatch = watch('typeahead-input');
  const [firstSuggestion, setFirstSuggestion] = useState('');

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const onChange = (changingValue: string | number) => {
    console.log('>>>changingValue', changingValue);
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
    handleChange && handleChange(changingValue, isNewSelected);
  };

  // useClickOutside(dropdownBaseRef, () => isOpen && setIsOpen(false));

  useEffect(() => {
    if (isDisabled) {
      setColors([theme.colors.greyDarker60, theme.colors.grey20]);
    } else if (isOpen) {
      setColors([theme.colors.white, theme.colors.white60]);
    } else if (isFocused) {
      setColors([theme.colors.greyDarker, theme.colors.greyDarker60]);
    }
  }, [isOpen, isDisabled, isFocused]);

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
            : children,
        });
      },
    );
    setItems(childItems);
  }, [inputWatch]);

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
  }, [inputWatch, items, selected]);

  const contextValue: TypeaheadContextType = React.useMemo(
    () => ({
      allItems: optionsWithKey,
      isMultiple,
      selectedItems: selected,
      onChange,
      setSelectedItems: setSelected,
    }),
    [onChange, setSelected, optionsWithKey, isMultiple, selected],
  );

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
      onChange(foundItem?.props.value);
      event.preventDefault();
      return false;
    }
    if (event.code === 'Backspace' && selected.length > 0 && !firstSuggestion) {
      onChange(selected[selected.length - 1]);
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
      onChange(selectedItem);
    };
  return (
    <Popover
      floatingOptions={{
        onOpenChange,
        open: isOpen,
      }}>
      <S.TypeaheadTrigger
        as="div"
        onFocus={setIsFocused.bind(null, true)}
        ref={triggerRef}
        className={className}
        isOpen={isOpen}>
        {Object.values(optionsWithKey).length > 0 &&
          selected.map((selectedItem, index) => {
            const currentOption = optionsWithKey[selectedItem];
            const optionText = currentOption
              ? currentOption.children ||
                currentOption.label ||
                currentOption.value
              : '';

            return (
              <S.TypeaheadItem
                key={`typeahead-selected-selectedItem-${index}`}
                onClick={handleSelectedClick}>
                <S.TypeaheadItemLabel>{optionText}</S.TypeaheadItemLabel>
                <S.TypeaheadItemCross
                  endIcon={
                    <Icon
                      name="cross"
                      size={10}
                      color={theme.colors.greyDarker}
                    />
                  }
                  onClick={handleRemoveSelectedClick(selectedItem)}
                />
              </S.TypeaheadItem>
            );
          })}
        <Wrapper className={S.TypeaheadInputsGroupWrapper}>
          <Input
            name="typeahead-input"
            status={'custom'}
            inputProps={{
              onClick: handleInputClick,
              onKeyDown: handleInputKeyDown,
              autoComplete: 'off',
              className: ['typeahead-input', S.TypeaheadInput].join(' '),
            }}
            register={register}
            wrapperClassName={S.TypeaheadInputWrapper}
            ref={inputRef}
          />
          <input
            type="text"
            aria-hidden
            readOnly
            value={firstSuggestion}
            className={[
              'typeahead-input',
              S.TypeaheadInput,
              S.TypeaheadInputPlaceholder,
            ].join(' ')}
          />
        </Wrapper>
      </S.TypeaheadTrigger>
      <PopoverContent
        css={{ width: triggerRef.current?.clientWidth }}
        isFocusManagerDisabled>
        <PopoverDescription css={{ width: '100%' }}>
          <TypeaheadContext.Provider value={contextValue}>
            {/*
          ...dropdown options, filtered? server?
          ...click? add to "input", hide options + filter them
          ...check for the multiple feature
          ...fix single feature
          ...add possibility to styling the options +input...
          ...add tests
          ...add storybook
          ...add possibility to customize output
          ...add result highlighting
          */}
            <TypeaheadOptions className={optionsClassname}>
              {items}
            </TypeaheadOptions>
          </TypeaheadContext.Provider>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};

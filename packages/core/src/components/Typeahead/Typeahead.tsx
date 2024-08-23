import React, {
  useState,
  useEffect,
  useId,
  useRef,
  MouseEventHandler,
} from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';
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
  onChange: handleChange,
  className,
  optionsClassname,
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
  const { register } = useForm<FieldValues>();
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const onChange = (changingValue: string | number) => {
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
    handleChange && handleChange(changingValue, isNewSelected);
  };

  useClickOutside(dropdownBaseRef, () => isOpen && setIsOpen(false));

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
        keyedOptions[child.props.value] = { ...child.props };

        return React.cloneElement(child, {
          index,
          ...child.props,
        });
      },
    );
    setOptionsWithKey(keyedOptions);
    setItems(childItems);
  }, [initialSelectedItems, children]);

  const contextValue: TypeaheadContextType = React.useMemo(
    () => ({
      onChange,
      setSelectedItems: setSelected,
      allItems: optionsWithKey,
      isMultiple,
      selectedItems: selected,
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
        className={className}>
        {Object.values(optionsWithKey).length > 0 &&
          selected.map((selectedItem) => {
            const currentOption = optionsWithKey[selectedItem];
            const optionText = currentOption
              ? currentOption.children ||
                currentOption.label ||
                currentOption.value
              : '';
            return (
              <S.TypeaheadItem
                key={`typeahead-selected-selectedItem-${optionText}`}
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
        <Input
          name="typeahead-input"
          status={'custom'}
          inputProps={{
            onClick: handleInputClick,
            autoComplete: 'off',
            className: ['typeahead-input', S.TypeaheadInput].join(' '),
          }}
          register={register}
          wrapperClassName={S.TypeaheadInputWrapper}
        />
      </S.TypeaheadTrigger>
      <PopoverContent css={{ width: triggerRef.current?.clientWidth }}>
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

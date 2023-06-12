import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useState, useEffect, useRef, useId } from 'react';

import { useClickOutside } from '@ssa-ui-kit/hooks';

import { IDropdownItemProp, IDropdownProps } from './types';

import { DropdownItemList } from './DropdownItemList';
import { DropdownToggle } from './DropdownToggle';
import { DropdownArrow } from './DropdownArrow';

/**
 * The structure of the component:
 *
 * Dropdown
 *   DropdownToggle
 *     ItemTemplate
 *       DropdownArrow (Icon)
 *   DropdownItemList
 *     DropdownItem
 *       ItemTemplate
 *
 * Aria attributes are set according to
 * https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 **/
export const DropdownBase = styled.div<{ ref: React.Ref<HTMLDivElement> }>`
  position: relative;
`;

const Dropdown = <T extends IDropdownItemProp>({
  itemTemplate: ItemTemplate,
  items,
  selectedItem,
  onChange,
  isDisabled,
  placeholder = 'Choose a value',
}: IDropdownProps<T>) => {
  const dropdownId = useId();
  const theme = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
  const [placeholderItem, setPlaceholderItem] = useState({
    id: Number.NaN,
    val: placeholder,
  });
  const [activeItem, setActiveItem] = useState(selectedItem);
  const onItemChange = (item) => {
    setIsOpen(false);

    if (isDisabled || !item) {
      return;
    }

    if (item.id === activeItem?.id) {
      return;
    }

    setActiveItem(item);
    onChange(item);
  };
  useClickOutside(dropdownRef, () => isOpen && setIsOpen(false));

  useEffect(() => {
    setPlaceholderItem({ id: Number.NaN, val: placeholder });
  }, [placeholder]);

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

  return (
    <DropdownBase ref={dropdownRef} data-testid="dropdown">
      <DropdownToggle
        isOpen={isOpen}
        disabled={isDisabled}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => {
          setIsFocused(true);
        }}
        ariaLabelledby={`dropdown-label-${dropdownId}`}
        ariaControls={`dropdown-popup-${dropdownId}`}>
        <ItemTemplate
          id={`dropdown-label-${dropdownId}`}
          item={activeItem || (placeholderItem as T)}
          colors={colors}>
          <DropdownArrow isUp={isOpen} color={colors?.[0]} />
        </ItemTemplate>
      </DropdownToggle>
      {isOpen && (
        <DropdownItemList<T>
          id={`dropdown-popup-${dropdownId}`}
          ariaLabelledby={`dropdown-label-${dropdownId}`}
          items={items}
          activeItem={activeItem}
          itemTemplate={ItemTemplate}
          onChange={onItemChange}
        />
      )}
    </DropdownBase>
  );
};
export default Dropdown;

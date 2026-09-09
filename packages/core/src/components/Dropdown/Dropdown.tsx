import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useId,
  ReactNode,
} from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import { isNill } from '@ssa-ui-kit/utils';

import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import DropdownOptions from '@components/DropdownOptions';
import Avatar, { AvatarSizes } from '@components/Avatar';
import Icon from '@components/Icon';
import Label from '@components/Label';
import FormHelperText from '@components/FormHelperText';
import DropdownContext from '@components/Dropdown/Dropdown.context';
import { resolveDisabled } from '@utils/deprecation';
import { DropdownOptionProps } from '@components/DropdownOptions/types';

import { DropdownContextType, DropdownPositions, DropdownProps } from './types';

/*
 * Both levels are shrink-to-fit, and a shrink-to-fit box sizes to its
 * min-content when that exceeds the space available -- for a nowrap label that
 * is the entire string, so the dropdown would grow past its container instead
 * of ellipsising. `max-width: 100%` gives each level a definite width to
 * resolve against, which is what actually lets the label clip.
 */
const DropdownFieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
`;

const DropdownBase = styled.div`
  display: inline-block;
  position: relative;
  max-width: 100%;
`;

const SelectedContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

/**
 * Keeps the selected value on a single line and ellipsises it. Without this the
 * label wraps and, because the toggle is a fixed 44px, spills above and below
 * the border. `min-width: 0` is what lets the toggle shrink below the label's
 * intrinsic width at all — a nowrap flex item otherwise reports its full text
 * width as its minimum, so the dropdown would keep growing instead of clipping.
 */
const SelectedLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
`;

const LeadingElement = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;

/**
 * Dropdown - Select-like dropdown component for single selection
 *
 * A flexible dropdown component that allows users to select one option from
 * a list of choices. Uses a compound component pattern with DropdownOption
 * children. Provides keyboard navigation, accessibility features, click-outside
 * to close functionality, and automatic viewport-aware placement of the options list.
 *
 * On every open the component measures available space below the toggle button
 * and flips the list upward when there is not enough room, preventing the list
 * from being clipped by the viewport edge. This behavior can be overridden via
 * dropdownProps.dropdownPosition.
 *
 * Component structure:
 * - Dropdown (root container with context)
 *   - DropdownToggle (button that opens/closes dropdown)
 *   - DropdownOptions (menu container that appears when open)
 *     - DropdownOption (individual selectable items)
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: 1, value: 'Apple' },
 *   { id: 2, value: 'Banana' },
 *   { id: 3, value: 'Cherry' },
 * ];
 *
 * <Dropdown
 *   selectedItem={items[0]}
 *   onChange={(item) => handleSelection(item)}
 *   placeholder="Select a fruit"
 * >
 *   {items.map(item => (
 *     <DropdownOption key={item.id} value={item.id}>
 *       {item.value}
 *     </DropdownOption>
 *   ))}
 * </Dropdown>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled open state
 * const [isOpen, setIsOpen] = useState(false);
 * <Dropdown
 *   isOpen={isOpen}
 *   onChange={handleChange}
 *   selectedItem={selected}
 * >
 *   {options.map(opt => (
 *     <DropdownOption key={opt.id} value={opt.id}>
 *       {opt.label}
 *     </DropdownOption>
 *   ))}
 * </Dropdown>
 * ```
 *
 * @example
 * ```tsx
 * // With custom props for sub-components and forced upward placement
 * <Dropdown
 *   selectedItem={selected}
 *   onChange={handleChange}
 *   dropdownProps={{
 *     base: { id: 'my-dropdown' },
 *     toggleButton: { 'data-testid': 'dropdown-toggle' },
 *     toggleButtonArrow: { className: 'custom-arrow' },
 *     dropdownPosition: DropdownPositions.top,
 *   }}
 * >
 *   {options.map(opt => (
 *     <DropdownOption key={opt.id} value={opt.id}>
 *       {opt.label}
 *     </DropdownOption>
 *   ))}
 * </Dropdown>
 * ```
 *
 * @see {@link DropdownOption} - Child component for individual options
 * @see {@link DropdownToggle} - Toggle button component
 * @see {@link DropdownOptions} - Options menu container
 *
 * @accessibility
 * - ARIA attributes set according to WAI-ARIA combobox pattern
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Click outside to close
 * - Screen reader friendly
 * - Focus management
 *
 * @see https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 */
const Dropdown = <T extends DropdownOptionProps>({
  selectedItem,
  disabled,
  isDisabled,
  isOpen: isInitOpen,
  children,
  onChange: handleChange,
  className,
  placeholder = 'Select something',
  maxHeight = 200,
  avatarBorder = false,
  label,
  helperText,
  errors,
  success,
  icon,
  width,
  dropdownProps: componentProps,
}: DropdownProps<T>) => {
  const isDropdownDisabled = resolveDisabled('Dropdown', disabled, isDisabled);
  const status = success ? 'success' : errors ? 'error' : 'basic';
  const { dropdownPosition = DropdownPositions.auto } = componentProps ?? {};
  // `width` has no default: without it every level keeps shrink-wrapping, which
  // is the historical behaviour. When set, all three nested levels
  // (wrapper -> base -> toggle) have to be stretched — sizing only one is a
  // no-op, because the level above it is still sized to its content.
  //
  // Only the outermost level gets the requested value; the inner two get 100%.
  // Repeating the value would compound relative units: `width="60%"` would
  // otherwise render the base at 60% of the wrapper and the toggle at 60% of
  // that, i.e. 21.6% of the container.
  //
  // Spread rather than passed as `css={...}`: Emotion wraps an element whenever
  // `css` is present in its props, even when its value is undefined, and that
  // re-serializes any incoming `className` (e.g. from `styled(Dropdown)`).
  // Omitting the key keeps the no-width path identical to writing no `css` prop.
  const wrapperCssProps = width === undefined ? undefined : { css: { width } };
  const baseCssProps =
    width === undefined ? undefined : { css: { width: '100%' } };
  const toggleCssProps =
    width === undefined
      ? undefined
      : { css: [{ width: '100%' }, componentProps?.toggleButton?.css] };

  const theme = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const dropdownId = useId();
  const options: T[] = [];

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [colors, setColors] = useState<Array<string | undefined>>([]);
  const [activeItem, setActiveItem] = useState<T | undefined>(selectedItem);
  const [placement, setPlacement] = useState<'top' | 'bottom'>('bottom');

  const onChange: DropdownContextType['onChange'] = (item) => {
    const innerItem = options.filter((option) => option.value === item)[0];

    setIsOpen(false);

    if (isDropdownDisabled || !innerItem) {
      return;
    }

    if (innerItem.value === activeItem?.value) {
      return;
    }

    setActiveItem(innerItem);
    if (handleChange) {
      handleChange(innerItem);
    }
  };

  useClickOutside(dropdownRef, () => isOpen && setIsOpen(false));

  useEffect(() => {
    if (isDropdownDisabled) {
      setColors([theme.colors.greyDarker60, theme.colors.grey20]);
    } else if (isOpen) {
      setColors([theme.colors.white, theme.colors.white60]);
    } else if (isFocused) {
      setColors([theme.colors.greyDarker, theme.colors.greyDarker60]);
    }
  }, [isOpen, isDropdownDisabled, isFocused]);

  useEffect(() => {
    setActiveItem(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (isDropdownDisabled && isOpen) {
      setIsOpen(false);
    }
  }, [isDropdownDisabled]);

  useLayoutEffect(() => {
    if (!isOpen || !dropdownRef.current) return;

    if (dropdownPosition !== DropdownPositions.auto) {
      setPlacement(dropdownPosition);
      return;
    }

    const rect = dropdownRef.current.getBoundingClientRect();
    const listHeight = listRef.current?.offsetHeight || maxHeight;
    const spaceBelow = window.innerHeight - rect.bottom;
    setPlacement(spaceBelow < listHeight ? 'top' : 'bottom');
  }, [isOpen]);

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (childrenArray as React.ReactElement<any>[]).map(
    (child, index) => {
      options.push(child.props);

      return React.cloneElement(child, {
        index,
        onClick: onChange.bind(this),
        ...child.props,
      });
    },
  );

  const contextValue: DropdownContextType = React.useMemo(
    () => ({ onChange, activeItem, maxHeight, listRef, placement }),
    [onChange, activeItem, maxHeight, placement],
  );

  const value = (
    activeItem
      ? activeItem.label ||
        activeItem.children ||
        activeItem.value ||
        activeItem ||
        placeholder
      : placeholder
  ) as ReactNode;

  const rawAvatar =
    activeItem && (activeItem as Record<string, unknown>).avatar;

  const selectedAvatar = !isNill(rawAvatar) ? (
    typeof rawAvatar === 'string' ? (
      <Avatar
        size={AvatarSizes.small}
        image={rawAvatar}
        border={avatarBorder}
      />
    ) : React.isValidElement(rawAvatar) ? (
      (rawAvatar as ReactNode)
    ) : null
  ) : null;

  const leadingElement = !isNill(selectedAvatar) ? (
    (selectedAvatar as ReactNode)
  ) : icon ? (
    <Icon
      name={icon}
      size={16}
      color={isDropdownDisabled ? theme.colors.grey : theme.colors.greyDarker80}
    />
  ) : null;

  const toggleContent = !isNill(leadingElement) ? (
    <SelectedContent>
      <LeadingElement>{leadingElement}</LeadingElement>
      <SelectedLabel>{value}</SelectedLabel>
    </SelectedContent>
  ) : (
    <SelectedLabel>{value}</SelectedLabel>
  );

  return (
    <DropdownFieldWrapper {...wrapperCssProps}>
      {label ? <Label disabled={isDropdownDisabled}>{label}</Label> : null}
      <DropdownContext.Provider value={contextValue}>
        <DropdownBase
          {...componentProps?.base}
          {...baseCssProps}
          ref={dropdownRef}
          data-testid="dropdown">
          <DropdownToggle
            {...componentProps?.toggleButton}
            {...toggleCssProps}
            className={className}
            isOpen={isOpen}
            disabled={isDropdownDisabled}
            status={status}
            onClick={setIsOpen.bind(null, !isOpen)}
            onFocus={setIsFocused.bind(null, true)}
            colors={colors}
            aria-labelledby={`dropdown-label-${dropdownId}`}
            aria-controls={`dropdown-popup-${dropdownId}`}>
            {toggleContent}
            <DropdownArrow
              {...componentProps?.toggleButtonArrow}
              isUp={isOpen}
            />
          </DropdownToggle>

          {isOpen ? <DropdownOptions>{items}</DropdownOptions> : null}
        </DropdownBase>
      </DropdownContext.Provider>
      {helperText || errors ? (
        <FormHelperText
          role="status"
          status={status}
          disabled={isDropdownDisabled}>
          {errors?.message || helperText}
        </FormHelperText>
      ) : null}
    </DropdownFieldWrapper>
  );
};

export default Dropdown;

import React, {
  useState,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import { mapObjIndexed } from '@ssa-ui-kit/utils';
import { useMergeRefs } from '@floating-ui/react';

import DropdownBase from '@components/DropdownBase';
import DropdownToggle from '@components/DropdownToggle';
import DropdownArrow from '@components/DropdownArrow';
import Label from '@components/Label';
import FormHelperText from '@components/FormHelperText';
import MultipleDropdownOptions from '@components/MultipleDropdownOptions';
import {
  OptionValue,
  flattenDropdownOptions,
  toDropdownMenuItems,
} from '@components/DropdownOptions/utils';
import { useToggleListKeys } from '@components/DropdownOptions/useToggleListKeys';
import { getNextActiveValue } from '@components/ContextMenu';
import { flattenItems } from '@components/ContextMenu/utils';
import MultipleDropdownContext from '@components/MultipleDropdown/MultipleDropdown.context';
import { DropdownOptionProps } from '@components/DropdownOptions/types';
import { resolveDisabled } from '@utils/deprecation';

import { DropdownContextType, DropdownProps } from './types';
import {
  BADGE_SPACE,
  getActiveItems,
  getFitCount,
} from '@components/MultipleDropdown/utils';
import MultipleDropdownNotification from '@components/MultipleDropdownNotification';

/*
 * Mirrors Dropdown's field wrapper: label above, helper text below. Shrinks to
 * fit like the base it wraps, with max-width so the toggle can still clip.
 */
const DropdownFieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
`;

/*
 * Takes the free space so the +N badge sits next to the arrow, not halfway
 * across a wide toggle (the toggle spreads its children with space-between).
 */
const DropdownPlaceholderLabel = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
`;

const FirstValue = styled.span`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/*
 * The second and later values. Zero width and basis, so they never add to the
 * toggle's own size: a toggle sized to its content looks as it always has, and
 * the values only fill room an explicit width leaves free. Every value stays
 * laid out, clipped if need be, so its width can be measured.
 */
const ExtraValues = styled.span`
  display: flex;
  flex: 1 1 0;
  width: 0;
  min-width: 0;
  overflow: hidden;

  & > span {
    flex: none;
  }
`;

function MultipleDropdownInner<T extends DropdownOptionProps>(
  {
    selectedItems = [],
    disabled,
    isDisabled,
    isOpen: isInitOpen,
    isMultiple = true,
    placeholder = 'Select something',
    showPlaceholder = true,
    label,
    children,
    onChange: handleChange,
    className,
    maxHeight = 200,
    width,
    fieldLabel,
    labelBadge,
    helperText,
    errors,
    success,
  }: DropdownProps<T>,
  ref?: React.ForwardedRef<HTMLDivElement | null>,
) {
  const isDropdownDisabled = resolveDisabled(
    'MultipleDropdown',
    disabled,
    isDisabled,
  );
  const dropdownBaseRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const dropdownId = useId();
  const status = success ? 'success' : errors ? 'error' : 'basic';
  // Names the toggle; left out without a field label, so it never points at
  // a missing element.
  const labelId = fieldLabel ? `dropdown-label-${dropdownId}` : undefined;
  const badge =
    fieldLabel && labelBadge
      ? { ...labelBadge, id: `dropdown-badge-${dropdownId}` }
      : undefined;
  // `width` has no default — without it every level shrink-wraps, which is
  // the historical behaviour. When set it has to clear the base's `min-width`
  // and the multiple toggle's `max-width`, otherwise those caps silently win
  // over the explicit value.
  //
  // Only the outer wrapper gets the requested value; the base and the toggle
  // get 100%. Repeating the value would compound relative units:
  // `width="60%"` would otherwise render the toggle at 60% of an already-60%
  // base.
  //
  // Spread rather than passed as `css={...}`: Emotion wraps an element whenever
  // `css` is present in its props, even when its value is undefined, and that
  // re-serializes any incoming `className` (e.g. from
  // `styled(MultipleDropdown)`). Omitting the key keeps the no-width path
  // identical to writing no `css` prop.
  const wrapperCssProps = width === undefined ? undefined : { css: { width } };
  const baseCssProps =
    width === undefined ? undefined : { css: { width: '100%', minWidth: 0 } };
  const toggleCssProps =
    width === undefined
      ? undefined
      : { css: { width: '100%', maxWidth: 'none' } };
  const [isOpen, setIsOpen] = useState(isInitOpen || false);
  const [optionsWithKey, setOptionsWithKey] = useState<
    Record<number | string, T>
  >({});
  // Highlighted option. Focus stays on the toggle (the combobox), which
  // drives the list and points at the option with aria-activedescendant.
  const [activeValue, setActiveValue] = useState<OptionValue | null>(null);
  const listId = `dropdown-popup-${dropdownId}`;
  const [values, setValues] = useState<Array<unknown>>([]);
  const [valuesWithoutPlaceholder, setValuesWithoutPlaceholder] = useState<
    Array<unknown>
  >([]);

  const memoSelectedItems = React.useMemo(
    () => selectedItems,
    [JSON.stringify(selectedItems)],
  );

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const menuItems = toDropdownMenuItems(childrenArray);

  const close = () => {
    setIsOpen(false);
    setActiveValue(null);
  };

  /** Opens with the first selected option highlighted, else per the key pressed. */
  const open = (key = 'ArrowDown') => {
    setIsOpen(true);
    const selected = flattenItems(menuItems).find(
      (item) => !item.disabled && optionsWithKey[item.value]?.isSelected,
    );
    setActiveValue(
      selected?.value ?? getNextActiveValue(menuItems, null, key) ?? null,
    );
  };

  const onChange = (item: DropdownOptionProps) => {
    if (isDropdownDisabled || !item) {
      return;
    }
    if (!isMultiple && optionsWithKey[item.value].isSelected) {
      close();
      return;
    }
    let newOptionsWithKey = {};
    let isSelected = true;
    if (isMultiple) {
      isSelected = !optionsWithKey[item.value].isSelected;
      newOptionsWithKey = {
        ...optionsWithKey,
        [item.value]: {
          ...optionsWithKey[item.value],
          isSelected,
        },
      };
      setOptionsWithKey(newOptionsWithKey);
    } else {
      newOptionsWithKey = mapObjIndexed(
        (option) => ({
          ...option,
          isSelected: option.value === item.value,
        }),
        optionsWithKey,
      );
      setOptionsWithKey(newOptionsWithKey);
      close();
    }

    if (handleChange) {
      handleChange(item.value, isSelected);
    }
  };

  useClickOutside(dropdownBaseRef, () => isOpen && close());

  useEffect(() => {
    if (isDropdownDisabled && isOpen) {
      close();
    }
  }, [isDropdownDisabled]);

  useEffect(() => {
    const keyedOptions: Record<number | string, T> = {};
    (flattenDropdownOptions(childrenArray) as React.ReactElement<T>[]).forEach(
      (child) => {
        keyedOptions[child.props.value] = {
          ...child.props,
          isSelected: !!memoSelectedItems.find(
            (selectedItem) => selectedItem.value === child.props.value,
          ),
        };
      },
    );

    setOptionsWithKey(keyedOptions);
  }, [memoSelectedItems, children]);

  const toggleKeys = useToggleListKeys({
    listId,
    isOpen,
    disabled: isDropdownDisabled,
    menuItems,
    activeValue,
    setActiveValue,
    open,
    close,
    // Toggles the option; the list stays open in multi-select mode.
    onPick: (value) => onChange(optionsWithKey[value]),
  });

  const contextValue: DropdownContextType<DropdownOptionProps> = React.useMemo(
    () => ({
      onChange,
      allItems: optionsWithKey,
      isMultiple,
      maxHeight,
      activeValue,
      setActiveValue,
    }),
    [onChange, optionsWithKey, isMultiple, maxHeight, activeValue],
  );

  // How many of the values after the first fit next to it; the rest are
  // counted in the +N badge. The values are only rendered while the toggle
  // has spare room (an explicit `width`): a toggle sized to its content, or
  // one that is not laid out (jsdom), keeps the first value + badge and the
  // exact text content it had before auto-fit.
  // Only a `label` prefix is followed by a colon; without one the value
  // starts the toggle text.
  const separator = label ? ': ' : '';
  const extraValuesRef = useRef<HTMLSpanElement>(null);
  const [hasRoom, setHasRoom] = useState(false);
  const [fitCount, setFitCount] = useState(0);
  const extraValues = isMultiple && hasRoom ? values.slice(1) : [];
  const visibleCount = Math.min(fitCount, extraValues.length);
  const hiddenCount = (isMultiple ? values.length - 1 : 0) - visibleCount;

  useLayoutEffect(() => {
    const container = extraValuesRef.current;
    if (!container) {
      return;
    }
    const measure = () => {
      const room = container.getBoundingClientRect().width > 0;
      setHasRoom(room);
      if (!room) {
        setFitCount(0);
        return;
      }
      const widths = Array.from(container.children).map(
        (child) => child.getBoundingClientRect().width,
      );
      if (!widths.length || widths.every((width) => width === 0)) {
        return;
      }
      // The room the values have plus the badge's, while it is shown, so the
      // answer is the same with and without it on screen.
      const available =
        container.getBoundingClientRect().width +
        (hiddenCount > 0 ? BADGE_SPACE : 0);
      setFitCount(getFitCount(widths, available, BADGE_SPACE));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [values, hiddenCount, hasRoom]);

  useEffect(() => {
    const newValues = getActiveItems({ allItems: optionsWithKey, placeholder });
    const newValuesWithoutPlaceholder = newValues.filter(
      (item) => item !== placeholder,
    );
    setValues(newValues);
    setValuesWithoutPlaceholder(newValuesWithoutPlaceholder);
  }, [optionsWithKey]);

  return (
    <DropdownFieldWrapper {...wrapperCssProps}>
      {fieldLabel ? (
        <Label id={labelId} disabled={isDropdownDisabled} badge={badge}>
          {fieldLabel}
        </Label>
      ) : null}
      <MultipleDropdownContext.Provider value={contextValue}>
        <DropdownBase
          {...baseCssProps}
          ref={useMergeRefs([dropdownBaseRef, ref])}
          data-testid="dropdown">
          <DropdownToggle
            {...toggleCssProps}
            className={className}
            isOpen={isOpen}
            disabled={isDropdownDisabled}
            status={status}
            onClick={() => (isOpen ? close() : open())}
            {...toggleKeys}
            aria-controls={listId}
            aria-labelledby={labelId}
            {...(badge && { 'aria-describedby': badge.id })}
            isMultiple={isMultiple}
            selectedCount={valuesWithoutPlaceholder.length}>
            {isMultiple ? (
              <>
                <DropdownPlaceholderLabel>
                  <FirstValue>
                    {label}
                    {showPlaceholder
                      ? values.length > 0 && `${separator}${values[0]}`
                      : valuesWithoutPlaceholder.length > 0 &&
                        `${separator}${valuesWithoutPlaceholder[0]}`}
                  </FirstValue>
                  <ExtraValues ref={extraValuesRef}>
                    {extraValues.map((value, index) => (
                      <span
                        key={index}
                        {...(index >= visibleCount && {
                          'aria-hidden': true,
                          style: { visibility: 'hidden' },
                        })}>
                        , {value as React.ReactNode}
                      </span>
                    ))}
                  </ExtraValues>
                </DropdownPlaceholderLabel>
                {hiddenCount > 0 ? (
                  <MultipleDropdownNotification as={'div'}>
                    +{hiddenCount}
                  </MultipleDropdownNotification>
                ) : (
                  ''
                )}
              </>
            ) : (
              values.join('')
            )}
            <DropdownArrow isUp={isOpen} />
          </DropdownToggle>

          {isOpen ? (
            <MultipleDropdownOptions id={listId}>
              {childrenArray}
            </MultipleDropdownOptions>
          ) : null}
        </DropdownBase>
      </MultipleDropdownContext.Provider>
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
}

/**
 * MultipleDropdown - Dropdown component for multi-select and single-select
 *
 * A flexible dropdown that lets users select one or more options from a list.
 * In multi-select mode (`isMultiple=true`, default) each option toggles independently;
 * the toggle button shows the first selected value and a `+N` badge for overflow.
 * In single-select mode (`isMultiple=false`) selecting an option closes the menu.
 * Forwards its ref to the root container div.
 *
 * Component structure:
 * - Field wrapper: `fieldLabel` above, `helperText` / error message below
 * - MultipleDropdown base (positioning container with context)
 *   - DropdownToggle (button that opens/closes the menu)
 *   - MultipleDropdownOptions (menu container rendered when open)
 *     - DropdownOption / DropdownOptionGroup children, read as data into
 *       ContextMenu rows and groups
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * // Multi-select; keep the selection in state and write back
 * const [selected, setSelected] = useState<DropdownOptionProps[]>([
 *   { value: 'apple' },
 * ]);
 *
 * <MultipleDropdown
 *   label="Fruits"
 *   selectedItems={selected}
 *   onChange={(value, isSelected) =>
 *     setSelected((prev) =>
 *       isSelected
 *         ? [...prev, { value }]
 *         : prev.filter((item) => item.value !== value),
 *     )
 *   }
 * >
 *   <DropdownOption value="apple">Apple</DropdownOption>
 *   <DropdownOption value="banana">Banana</DropdownOption>
 *   <DropdownOption value="cherry">Cherry</DropdownOption>
 * </MultipleDropdown>
 * ```
 *
 * @example
 * ```tsx
 * // Single-select mode: closes on pick, shows the value without `label`
 * const [country, setCountry] = useState<string | number>('us');
 *
 * <MultipleDropdown
 *   isMultiple={false}
 *   selectedItems={[{ value: country }]}
 *   onChange={(value) => setCountry(value)}
 * >
 *   <DropdownOption value="us">United States</DropdownOption>
 *   <DropdownOption value="uk">United Kingdom</DropdownOption>
 * </MultipleDropdown>
 * ```
 *
 * @example
 * ```tsx
 * // Show only "Tags" (no placeholder) while nothing is selected
 * <MultipleDropdown label="Tags" showPlaceholder={false}>
 *   <DropdownOption value="new" label="New" />
 *   <DropdownOption value="urgent" label="Urgent" />
 * </MultipleDropdown>
 * ```
 *
 * @see {@link DropdownOption} - Child component for individual options
 * @see {@link DropdownToggle} - Toggle button component
 * @see {@link MultipleDropdownOptions} - Options menu container
 *
 * @accessibility
 * - ARIA attributes set according to WAI-ARIA combobox pattern
 * - Focus stays on the toggle, which points at the highlighted option with
 *   `aria-activedescendant`
 * - Arrow keys, Home and End move the highlight; Enter or Space toggles it
 *   (picks and closes in single-select mode); Escape and Tab close
 * - Click outside to close
 * - Screen reader friendly with aria-expanded and aria-controls
 * - `fieldLabel` names the toggle (aria-labelledby); `labelBadge` describes it
 *
 * @see https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html
 */
const MultipleDropdown = React.forwardRef<
  HTMLDivElement,
  DropdownProps<DropdownOptionProps>
>(MultipleDropdownInner);

export default MultipleDropdown;

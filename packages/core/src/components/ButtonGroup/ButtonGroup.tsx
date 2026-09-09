import { useMemo } from 'react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import { resolveDisabled, warnDeprecatedProp } from '@utils/deprecation';
import { ButtonGroupContext } from './ButtonGroupContext';
import { ButtonGroupButtonBase, hasLabel } from './ButtonGroupButtonBase';
import {
  ButtonGroupProps,
  ButtonGroupItem,
  ButtonGroupItemInput,
  ButtonGroupValue,
} from './types';

/**
 * `value` / `defaultValue` accept either an item or a bare id — selection is
 * compared on id either way, so both forms collapse to the same thing here.
 */
const toId = (value?: ButtonGroupValue) =>
  typeof value === 'object' && value !== null ? value.id : value;

/**
 * `items` lets `text` be omitted (that is the icon-only button), but `onClick`
 * promises a full item — so an icon-only entry reports its accessible name in
 * that slot. Items that already carry a label are handed back untouched, by
 * identity: consumers extend `ButtonGroupItem` with their own fields and read
 * them off this argument.
 *
 * `hasLabel` is the same test the button renders by, so `text: ''` — what a
 * `label || ''` expression yields — is icon-only in both places rather than an
 * icon-only button reporting an empty label.
 */
const toReportedItem = (item: ButtonGroupItemInput): ButtonGroupItem =>
  hasLabel(item.text)
    ? (item as ButtonGroupItem)
    : { ...item, text: item.ariaLabel ?? '' };

/**
 * ButtonGroup - A row of mutually exclusive buttons.
 *
 * Two ways to declare the buttons:
 * - **Composed** — `ButtonGroupButton` children. Use when a button needs
 *   custom markup.
 * - **Data-driven** — the `items` prop. Compact, and enough for a label, an
 *   icon, or both.
 *
 * A button shows whatever it is given: `text` alone, `icon` alone (square, and
 * labelled by `ariaLabel`), or the two together.
 *
 * Selection can be controlled (`value`) or left to the group (`defaultValue`).
 * Either accepts a bare `id` or a whole item.
 *
 * @category Form Controls
 * @subcategory Action
 *
 * @example
 * ```tsx
 * <ButtonGroup items={items} value={period} onClick={({ id }) => setPeriod(id)} />
 * ```
 *
 * @example
 * ```tsx
 * <ButtonGroup value={period} onClick={({ id }) => setPeriod(id)}>
 *   <ButtonGroupButton id="24h">24h</ButtonGroupButton>
 *   <ButtonGroupButton id="7d">7 days</ButtonGroupButton>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    children,
    // The default only ever kicks in for JS consumers, a bad cast, or children
    // mode — but it turns a crash into an empty group.
    items = [],
    buttonStyles,
    value,
    defaultValue,
    selectedItem,
    externalState,
    onClick,
  } = props;

  const hasLegacySelection =
    'externalState' in props || 'selectedItem' in props;

  if (externalState !== undefined || selectedItem !== undefined) {
    warnDeprecatedProp(
      'ButtonGroup',
      externalState !== undefined ? 'externalState' : 'selectedItem',
      'value',
    );
  }

  const isComposed = children !== undefined;

  // `value` is fully controlled — the parent owns the selection. The deprecated
  // `externalState` / `selectedItem` keep the semi-controlled path they shipped
  // with, where they are copied *into* internal state.
  const [selectedId, setSelectedId] = useControllableState<
    ButtonGroupItem['id'] | undefined
  >({
    controlled: 'value' in props,
    value: toId(value),
    defaultValue: toId(defaultValue),
    semiControlled: {
      active: hasLegacySelection,
      value: toId(externalState ?? selectedItem),
    },
  });

  // An uncontrolled data-driven group falls back to its first item. Derived at
  // render rather than seeded into state on mount, so a group whose `items`
  // arrive from a fetch still lands on the first one once they show up.
  // Composed mode has no list to read a first entry from, so it starts empty
  // unless given a `defaultValue`.
  const fallbackActiveId = isComposed ? undefined : items[0]?.id;
  const activeId = selectedId ?? fallbackActiveId;

  const handleSelect = (item: ButtonGroupItem) => {
    setSelectedId(item.id);
    onClick?.(item);
  };

  const contextValue = useMemo(
    () => ({ activeId, onSelect: handleSelect, buttonStyles }),
    [activeId, setSelectedId, onClick, buttonStyles],
  );

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      {isComposed
        ? children
        : items.map((item) => {
            const isItemDisabled = resolveDisabled(
              'ButtonGroup',
              item.disabled,
              item.isDisabled,
            );

            return (
              <ButtonGroupButtonBase
                key={item.id}
                isActive={
                  activeId !== undefined &&
                  activeId === item.id &&
                  !isItemDisabled
                }
                disabled={isItemDisabled}
                onClick={() => handleSelect(toReportedItem(item))}
                buttonStyles={buttonStyles}
                icon={item.icon}
                ariaLabel={item.ariaLabel}>
                {item.text}
              </ButtonGroupButtonBase>
            );
          })}
    </ButtonGroupContext.Provider>
  );
};

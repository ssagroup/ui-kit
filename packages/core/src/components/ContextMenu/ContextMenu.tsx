import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  Ref,
  useEffect,
  useId,
  useRef,
} from 'react';
import { useControllableState } from '@ssa-ui-kit/hooks';

import { ContextMenuOption } from './ContextMenuOption';
import {
  ContextMenuIncludeExcludeEntry,
  ContextMenuIncludeExcludeType,
  ContextMenuIndicator,
  ContextMenuItem,
  ContextMenuProps,
  ContextMenuValue,
} from './types';
import {
  escapeId,
  flattenItems,
  getContextMenuOptionId,
  getNextActiveValue,
  getSteppedIndex,
  getTextValue,
  isGroup,
  nextIncludeExcludeType,
} from './utils';
import * as S from './styles';

/** Keystrokes closer together than this extend the type-to-find query. */
const TYPE_AHEAD_TIMEOUT = 500;

const defaultIndicator = (
  mode: ContextMenuProps['selectionMode'],
): ContextMenuIndicator => {
  switch (mode) {
    case 'single':
      return 'check';
    case 'multiple':
      return 'checkbox';
    default:
      return 'none';
  }
};

const emptySelection = (mode: ContextMenuProps['selectionMode']) => {
  switch (mode) {
    case 'multiple':
    case 'includeExclude':
      return [];
    default:
      return null;
  }
};

const ContextMenuInner = <V extends ContextMenuValue>(
  props: ContextMenuProps<V>,
  ref: Ref<HTMLUListElement>,
) => {
  const {
    items,
    selectionMode = 'none',
    indicator: indicatorProp,
    value,
    defaultValue,
    onChange,
    onAction,
    activeValue: activeValueProp,
    defaultActiveValue,
    onActiveValueChange,
    renderItem,
    renderGroupLabel,
    emptyState = 'No items',
    maxHeight,
    id: idProp,
    style,
    onKeyDown,
    onFocus,
    onMouseLeave,
    ...rest
  } = props;

  const generatedId = useId();
  const listId = idProp ?? generatedId;
  const isMenu = selectionMode === 'none';
  const isIncludeExclude = selectionMode === 'includeExclude';
  const indicator = isIncludeExclude
    ? null
    : (indicatorProp ?? defaultIndicator(selectionMode));

  const [selection, setSelection] = useControllableState<unknown>({
    controlled: 'value' in props,
    value,
    defaultValue,
    finalValue: emptySelection(selectionMode),
  });

  const [activeValue, setActiveValue] = useControllableState<V | null>({
    controlled: 'activeValue' in props,
    value: activeValueProp,
    defaultValue: defaultActiveValue,
    finalValue: null,
    onChange: onActiveValueChange,
  });

  const options = flattenItems(items);
  const optionId = (value: V) => getContextMenuOptionId(listId, value);
  const indexOf = (value: V | null | undefined) =>
    value == null ? -1 : options.findIndex((item) => item.value === value);
  const activeIndex = indexOf(activeValue);

  const includeExcludeOf = (value: V) =>
    isIncludeExclude
      ? (selection as ContextMenuIncludeExcludeEntry<V>[]).find(
          (entry) => entry.value === value,
        )?.type
      : undefined;

  const isSelected = (value: V) => {
    switch (selectionMode) {
      case 'single':
        return selection === value;
      case 'multiple':
        return (selection as V[]).includes(value);
      case 'includeExclude':
        return includeExcludeOf(value) !== undefined;
      default:
        return false;
    }
  };

  const setIncludeExclude = (
    value: V,
    type: ContextMenuIncludeExcludeType | undefined,
  ) => {
    const others = (selection as ContextMenuIncludeExcludeEntry<V>[]).filter(
      (entry) => entry.value !== value,
    );
    const next = type ? [...others, { value, type }] : others;
    setSelection(next);
    (
      onChange as
        | ((v: ContextMenuIncludeExcludeEntry<V>[], changed: V) => void)
        | undefined
    )?.(next, value);
    onAction?.(value);
  };

  /** Click, Enter or Space on an option. */
  const activate = (item: ContextMenuItem<V>) => {
    if (item.disabled) return;
    const { value } = item;
    switch (selectionMode) {
      case 'single':
        if (selection !== value) {
          setSelection(value);
          (onChange as ((v: V) => void) | undefined)?.(value);
        }
        break;
      case 'multiple': {
        const current = selection as V[];
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        setSelection(next);
        (onChange as ((v: V[], toggled: V) => void) | undefined)?.(next, value);
        break;
      }
      case 'includeExclude':
        setIncludeExclude(
          value,
          nextIncludeExcludeType(includeExcludeOf(value), !!item.selectOnly),
        );
        return;
    }
    onAction?.(value);
  };

  /** A +, − or check-circle control: choosing the current type clears it. */
  const chooseIncludeExclude = (
    item: ContextMenuItem<V>,
    type: ContextMenuIncludeExcludeType,
  ) => {
    setIncludeExclude(
      item.value,
      includeExcludeOf(item.value) === type ? undefined : type,
    );
  };

  const typeAhead = useRef({ query: '', timer: 0 });

  // The option the pointer last highlighted, while that is still the
  // highlight. A pointer highlight is not scrolled to (the row under the
  // pointer is in view, and scrolling would pull a half-visible edge row away
  // from it) and is the only kind that leaving the list clears. Compared by
  // value rather than kept as a flag, so a controlled host that ignores the
  // hover cannot leave it stuck.
  const pointerValue = useRef<V | null>(null);

  // Runs for highlight changes from any source, including a host driving
  // activeValue from its own input.
  useEffect(() => {
    if (activeValue != null && activeValue === pointerValue.current) return;
    pointerValue.current = null;
    if (activeValue == null) return;
    // jsdom has no scrollIntoView.
    document.getElementById(optionId(activeValue))?.scrollIntoView?.({
      block: 'nearest',
    });
  }, [activeValue]);

  const moveTo = (index: number) => {
    if (index !== -1) setActiveValue(options[index].value);
  };

  const findByText = (key: string) => {
    const state = typeAhead.current;
    window.clearTimeout(state.timer);
    state.timer = window.setTimeout(() => {
      state.query = '';
    }, TYPE_AHEAD_TIMEOUT);
    state.query += key.toLowerCase();

    // A fresh single letter moves on from the current option, so pressing it
    // repeatedly cycles through the options starting with it.
    const start = state.query.length === 1 ? activeIndex + 1 : activeIndex;
    for (let i = 0; i < options.length; i++) {
      const index = (Math.max(start, 0) + i) % options.length;
      const item = options[index];
      if (
        !item.disabled &&
        getTextValue(item)?.toLowerCase().startsWith(state.query)
      ) {
        return index;
      }
    }
    return -1;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Home':
      case 'End': {
        const next = getNextActiveValue(items, activeValue, event.key);
        if (next != null) setActiveValue(next);
        break;
      }
      case 'Enter':
      case ' ':
        if (event.key === ' ' && typeAhead.current.query) {
          moveTo(findByText(' '));
          break;
        }
        if (activeIndex !== -1) activate(options[activeIndex]);
        break;
      default:
        if (
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          moveTo(findByText(event.key));
          break;
        }
        return;
    }
    event.preventDefault();
  };

  // Focusing the list highlights the selected option, else the first one, so
  // the first arrow press moves from somewhere visible.
  const handleFocus = (event: FocusEvent<HTMLUListElement>) => {
    onFocus?.(event);
    if (event.target !== event.currentTarget || activeIndex !== -1) return;
    const selected = options.findIndex(
      (item) => !item.disabled && isSelected(item.value),
    );
    const index =
      selected !== -1
        ? selected
        : getSteppedIndex(
            options.map((item) => !item.disabled),
            -1,
            1,
          );
    if (index !== -1) setActiveValue(options[index].value);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLUListElement>) => {
    onMouseLeave?.(event);
    // A highlight set from the keyboard stays: a host driving the list from
    // an input would otherwise lose it whenever the pointer drifts out.
    if (activeValue != null && activeValue === pointerValue.current) {
      setActiveValue(null);
    }
  };

  let flatIndex = 0;
  const renderOption = (item: ContextMenuItem<V>) => {
    const index = flatIndex++;
    return (
      <ContextMenuOption<V>
        key={String(item.value)}
        id={optionId(item.value)}
        item={item}
        role={isMenu ? 'menuitem' : 'option'}
        indicator={indicator}
        renderItem={renderItem}
        state={{
          selected: isSelected(item.value),
          active: index === activeIndex,
          disabled: !!item.disabled,
          includeExcludeType: includeExcludeOf(item.value),
        }}
        onActivate={() => activate(item)}
        onIncludeExclude={(type) => chooseIncludeExclude(item, type)}
        onHover={() => {
          if (index === activeIndex) return;
          pointerValue.current = item.value;
          setActiveValue(item.value);
        }}
      />
    );
  };

  // Keyboard and focus live on the list: options are reached through
  // aria-activedescendant, never focused themselves.
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ul
      ref={ref}
      id={listId}
      role={isMenu ? 'menu' : 'listbox'}
      aria-multiselectable={
        selectionMode === 'multiple' || isIncludeExclude || undefined
      }
      aria-activedescendant={
        activeIndex === -1 ? undefined : optionId(options[activeIndex].value)
      }
      tabIndex={0}
      css={S.menu}
      style={maxHeight === undefined ? style : { maxHeight, ...style }}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onMouseLeave={handleMouseLeave}
      {...rest}>
      {options.length === 0 ? (
        <li role="presentation" css={S.empty}>
          {emptyState}
        </li>
      ) : (
        items.map((entry) => {
          if (!isGroup(entry)) return renderOption(entry);
          const labelId = `${listId}-group-${escapeId(entry.id)}`;
          return (
            <li key={entry.id} role="presentation" css={S.group}>
              <div id={labelId} css={S.groupLabel}>
                {renderGroupLabel ? renderGroupLabel(entry) : entry.label}
              </div>
              <ul role="group" aria-labelledby={labelId} css={S.groupList}>
                {entry.items.map(renderOption)}
              </ul>
            </li>
          );
        })
      )}
    </ul>
  );
};

/**
 * ContextMenu - The list of options shown inside a dropdown, typeahead,
 * filter or action menu.
 *
 * It renders only the list: open state, the trigger and positioning belong to
 * the component hosting it, which places it inline or inside a `Popover`.
 *
 * ### Selection
 * `selectionMode` picks the behaviour and the shape of `value` / `onChange`:
 * - `none` (default): an action menu (`role="menu"`); rows only fire `onAction`
 * - `single`: one value; marked with a check by default
 * - `multiple`: an array of values; marked with checkboxes by default
 * - `includeExclude`: `{ value, type }` entries; every row has + / − controls,
 *   `selectOnly` rows a single check-circle. Clicking the active control clears
 *   it; Enter cycles none → include → exclude → none.
 *
 * `indicator` overrides how selected rows are marked. Use `startContent` /
 * `endContent` for anything the design does not cover.
 *
 * ### Rows
 * Each option can carry an avatar, a status dot, a right-hand description and
 * free start / end content. Text labels ellipsise and show the full text in a
 * tooltip after a hover. Pass a `ContextMenuGroup` among `items` for a titled
 * section; groups are separated by a divider.
 *
 * ### Keyboard
 * The list is a single tab stop. Arrow keys, Home and End move the highlight
 * (announced through `aria-activedescendant`), Enter or Space choose, and
 * typing jumps to the next option starting with the typed text. Escape is left
 * to the host. A host that keeps focus elsewhere (e.g. in an input) can drive
 * the highlight with `activeValue` / `onActiveValueChange`.
 *
 * @category Components
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState<string | null>(null);
 *
 * <ContextMenu
 *   selectionMode="single"
 *   value={value}
 *   onChange={setValue}
 *   items={[
 *     {
 *       id: 'project',
 *       label: 'Project Members',
 *       items: [
 *         { value: 'ann', label: 'Ann Lee', avatar: annPhotoUrl },
 *         { value: 'bob', label: 'Bob Stone', avatar: bobPhotoUrl },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Include / exclude filters
 * <ContextMenu
 *   selectionMode="includeExclude"
 *   value={filters}
 *   onChange={setFilters}
 *   items={[
 *     { value: 'remote', label: 'Remote' },
 *     { value: 'my-team', label: 'My team', selectOnly: true },
 *   ]}
 * />
 * ```
 */
export const ContextMenu = forwardRef(ContextMenuInner) as <
  V extends ContextMenuValue = ContextMenuValue,
>(
  props: ContextMenuProps<V> & { ref?: Ref<HTMLUListElement> },
) => ReactElement;

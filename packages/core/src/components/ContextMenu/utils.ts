import {
  ContextMenuEntry,
  ContextMenuGroup,
  ContextMenuIncludeExcludeType,
  ContextMenuItem,
  ContextMenuValue,
} from './types';

/**
 * Long enough that the label tooltip does not fire while the pointer is
 * travelling down the list, short enough to feel like a deliberate hover
 * (#669).
 */
export const LABEL_TOOLTIP_DELAY = 1000;

/** Keeps a long label from producing a tooltip as wide as the list itself. */
export const LABEL_TOOLTIP_MAX_WIDTH = 320;

/**
 * Only a primitive is safe to repeat inside a tooltip. Rendering the same
 * element twice mounts two independent copies of it, so labels made of
 * components get no tooltip.
 */
export const asText = (value: unknown): string | number | undefined =>
  typeof value === 'string' || typeof value === 'number' ? value : undefined;

export const isGroup = <V extends ContextMenuValue>(
  entry: ContextMenuEntry<V>,
): entry is ContextMenuGroup<V> => 'items' in entry;

/** Every option in display order, groups unwrapped. */
export const flattenItems = <V extends ContextMenuValue>(
  entries: ContextMenuEntry<V>[],
): ContextMenuItem<V>[] =>
  entries.flatMap((entry) => (isGroup(entry) ? entry.items : [entry]));

/** Text used for type-to-find and the label tooltip. */
export const getTextValue = <V extends ContextMenuValue>(
  item: ContextMenuItem<V>,
): string | undefined => {
  if (item.textValue !== undefined) return item.textValue;
  const text = asText(item.label);
  return text === undefined ? undefined : String(text);
};

/**
 * Where Enter moves an `includeExclude` row: none → include → exclude → none,
 * or none ⇄ selected for `selectOnly` rows. For driving that cycle from an
 * input that keeps focus while it highlights rows.
 *
 * @example
 * ```ts
 * nextIncludeExcludeType(undefined, false); // 'include'
 * nextIncludeExcludeType('include', false); // 'exclude'
 * nextIncludeExcludeType('exclude', false); // undefined
 * nextIncludeExcludeType(undefined, true); // 'selected'
 * ```
 */
export const nextIncludeExcludeType = (
  current: ContextMenuIncludeExcludeType | undefined,
  selectOnly: boolean,
): ContextMenuIncludeExcludeType | undefined => {
  if (selectOnly) return current ? undefined : 'selected';
  switch (current) {
    case undefined:
      return 'include';
    case 'include':
      return 'exclude';
    default:
      return undefined;
  }
};

/**
 * The enabled option `step` places away from `from`, wrapping around the
 * ends. With no `from`, ArrowDown lands on the first option and ArrowUp on
 * the last.
 */
export const getSteppedIndex = (
  enabled: boolean[],
  from: number,
  step: 1 | -1,
): number => {
  const count = enabled.length;
  if (!enabled.some(Boolean)) return -1;
  let index = from === -1 ? (step === 1 ? -1 : count) : from;
  for (let i = 0; i < count; i++) {
    index = (index + step + count) % count;
    if (enabled[index]) return index;
  }
  return -1;
};

/**
 * Makes any string safe inside an id and an IDREF list: characters other than
 * letters, digits and `-` become `_<hex>_`, so distinct inputs stay distinct.
 */
export const escapeId = (value: string) =>
  value.replace(
    /[^a-zA-Z0-9-]/g,
    (char) => `_${char.charCodeAt(0).toString(16)}_`,
  );

/**
 * DOM id of an option, for `aria-activedescendant` on an element outside the
 * list (e.g. a combobox input). `menuId` is the `id` given to the ContextMenu.
 * Characters not allowed in an id are escaped, so any value is safe.
 *
 * @example
 * ```tsx
 * <input
 *   aria-controls="people-menu"
 *   aria-activedescendant={
 *     active == null ? undefined : getContextMenuOptionId('people-menu', active)
 *   }
 * />
 * <ContextMenu id="people-menu" items={items} activeValue={active} />
 * ```
 */
export const getContextMenuOptionId = (
  menuId: string,
  value: ContextMenuValue,
) => `${menuId}-option-${escapeId(String(value))}`;

/**
 * Where a navigation key moves the highlight: ArrowDown / ArrowUp step over
 * disabled options and wrap, Home / End jump to the ends. Returns `undefined`
 * for any other key, so a host driving the list from its own input can tell
 * whether the key was a navigation key.
 *
 * @example
 * ```tsx
 * const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
 *   const next = getNextActiveValue(items, active, event.key);
 *   if (next === undefined) return; // not a navigation key
 *   event.preventDefault();
 *   setActive(next);
 * };
 * ```
 */
export const getNextActiveValue = <V extends ContextMenuValue>(
  entries: ContextMenuEntry<V>[],
  activeValue: V | null | undefined,
  key: string,
): V | null | undefined => {
  const options = flattenItems(entries);
  const enabled = options.map((item) => !item.disabled);
  const current =
    activeValue == null
      ? -1
      : options.findIndex((item) => item.value === activeValue);
  let index: number;
  switch (key) {
    case 'ArrowDown':
      index = getSteppedIndex(enabled, current, 1);
      break;
    case 'ArrowUp':
      index = getSteppedIndex(enabled, current, -1);
      break;
    case 'Home':
      index = getSteppedIndex(enabled, -1, 1);
      break;
    case 'End':
      index = getSteppedIndex(enabled, -1, -1);
      break;
    default:
      return undefined;
  }
  return index === -1 ? null : options[index].value;
};

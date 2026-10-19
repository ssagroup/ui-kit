import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useId,
  useRef,
} from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from '@emotion/react';
import { useMergeRefs } from '@floating-ui/react';
import { useControllableState } from '@ssa-ui-kit/hooks';

import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';

import {
  FloatingActionButtonIcon,
  FloatingActionButtonProps,
  FloatingActionButtonSize,
} from './types';
import * as S from './styles';

const renderIcon = (
  icon: FloatingActionButtonIcon,
  size: FloatingActionButtonSize,
  labelled: boolean,
) =>
  typeof icon === 'string' ? (
    <Icon
      name={icon as IconProps['name']}
      size={labelled ? S.SIZES[size].iconLabelled : S.SIZES[size].iconOnly}
      color="currentColor"
    />
  ) : (
    icon
  );

/**
 * FloatingActionButton - A button fixed to a corner of the viewport for the
 * page's primary action, optionally opening a speed-dial menu of related
 * actions.
 *
 * ### Look
 * Icon-only by default; pass `label` for the extended (icon + text) FAB.
 * `color` takes the design's `primary` / `secondary`, a theme color key or
 * any CSS color — for custom colors the icon and label color is chosen for
 * contrast. `shadow` and `shape` are independent of the color.
 *
 * ### Menu
 * Pass `actions` to turn the button into a menu trigger. The items stack
 * away from the corner as secondary FABs of the same size; the trigger
 * switches to `openIcon` while open. Choosing an item, Escape, a click
 * outside or tabbing away closes the menu. Control it with `open` +
 * `onOpenChange`, or leave it uncontrolled (`defaultOpen`).
 *
 * ### Icons
 * A kit icon name is sized for the FAB and painted with its foreground color.
 * Any other node is rendered as-is.
 *
 * @category Components
 * @subcategory Buttons
 *
 * @example
 * ```tsx
 * <FloatingActionButton aria-label="Add member" onClick={addMember} />
 * ```
 *
 * @example
 * ```tsx
 * // Extended, secondary, bottom-left
 * <FloatingActionButton label="New report" color="secondary" position="bottom-left" />
 * ```
 *
 * @example
 * ```tsx
 * // Speed-dial menu
 * <FloatingActionButton
 *   aria-label="Create"
 *   actions={[
 *     { id: 'task', icon: 'plus', label: 'Task', onClick: createTask },
 *     { id: 'note', icon: 'edit', label: 'Note', onClick: createNote },
 *   ]}
 * />
 * ```
 *
 * @accessibility
 * - Icon-only FABs need an `aria-label` (a dev warning fires without one)
 * - In menu mode the trigger has `aria-haspopup="menu"` and `aria-expanded`;
 *   the items are `menuitem`s
 * - Opening the menu from the keyboard focuses its first item; ↑/↓, Home and
 *   End move between items (and from the trigger into the menu while it is
 *   open); Escape closes it and returns focus to the trigger
 */
export const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>((props, ref) => {
  const {
    icon = 'plus',
    label,
    color = 'primary',
    shadow = true,
    shape = 'square',
    size = 'medium',
    disabled = false,
    onClick,
    actions,
    showActionLabels = true,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    openIcon = 'cross',
    position = 'bottom-right',
    offset = 24,
    className,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
  } = props;
  const theme = useTheme();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const mergedRef = useMergeRefs([ref, triggerRef]);

  const hasMenu = Boolean(actions?.length);
  const [rawOpen, setOpen] = useControllableState<boolean>({
    controlled: 'open' in props,
    value: openProp,
    defaultValue: defaultOpen,
    finalValue: false,
    onChange: onOpenChange,
  });
  const open = hasMenu && !disabled && Boolean(rawOpen);

  const unnamed = !label && !ariaLabel;
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && unnamed) {
      console.warn(
        'FloatingActionButton: an icon-only FAB needs an `aria-label`.',
      );
    }
  }, [unnamed]);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, setOpen]);

  const getMenuItems = () =>
    Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>(
        'button:not(:disabled)',
      ) ?? [],
    );

  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!hasMenu || event.defaultPrevented) return;
    if (open) {
      setOpen(false);
      return;
    }
    // Flushed so the menu is in the DOM below — or still absent when a
    // controlled parent turned the open down, leaving nothing to focus.
    flushSync(() => setOpen(true));
    // `detail === 0` — activated from the keyboard, not a pointer.
    if (event.detail === 0) getMenuItems()[0]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }
    const items = getMenuItems();
    if (!items.length) return;
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const last = items.length - 1;
    // From the trigger, step into the menu the way a menu button does.
    const targets: Record<string, number> =
      current === -1
        ? { ArrowDown: 0, Home: 0, ArrowUp: last, End: last }
        : {
            ArrowDown: current === last ? 0 : current + 1,
            ArrowUp: current === 0 ? last : current - 1,
            Home: 0,
            End: last,
          };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    items[next].focus();
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (
      open &&
      event.relatedTarget &&
      !rootRef.current?.contains(event.relatedTarget as Node)
    ) {
      setOpen(false);
    }
  };

  const { x, y } =
    typeof offset === 'number' ? { x: offset, y: offset } : offset;
  const round = shape === 'round';
  const triggerColors = S.resolveColors(theme, color);
  const itemColors = S.resolveColors(theme, 'secondary');

  return (
    <div ref={rootRef} className={className} css={S.container(position, x, y)}>
      <button
        ref={mergedRef}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-haspopup={hasMenu ? 'menu' : undefined}
        aria-expanded={hasMenu ? open : undefined}
        aria-controls={open ? menuId : undefined}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        css={S.button(theme, {
          size,
          colors: triggerColors,
          shadow,
          round,
          labelled: Boolean(label),
        })}>
        {renderIcon(open ? openIcon : icon, size, Boolean(label))}
        {label}
      </button>
      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label ?? ariaLabel}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          css={S.menu(position)}>
          {actions!.map((action) => (
            <li key={action.id} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={action.disabled}
                aria-label={showActionLabels ? undefined : action.label}
                onClick={() => {
                  action.onClick();
                  close(true);
                }}
                css={S.button(theme, {
                  size,
                  colors: itemColors,
                  shadow: false,
                  round,
                  labelled: showActionLabels,
                })}>
                {renderIcon(action.icon, size, showActionLabels)}
                {showActionLabels && action.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

FloatingActionButton.displayName = 'FloatingActionButton';

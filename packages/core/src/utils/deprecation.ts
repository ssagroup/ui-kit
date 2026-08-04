/**
 * Prop deprecation helpers.
 *
 * The library is converging on the DOM/MUI/Radix/Ant prop names (issue #656,
 * Phase 2). Renames land as *additive aliases first*: the new prop is added,
 * the old one keeps working, and a dev-only console warning points consumers at
 * the replacement. The old prop is removed at the next major.
 *
 * Warnings are emitted at most once per component/prop pair per process so a
 * component re-rendering in a list cannot flood the console.
 */

import { isDevEnvironment } from './environment';

const warnedProps = new Set<string>();

/**
 * Clears the once-per-pair warning cache.
 *
 * Only useful in tests, where several cases need to assert on the same warning.
 *
 * @internal
 */
export const resetDeprecationWarnings = (): void => {
  warnedProps.clear();
};

/**
 * Emits a deprecation notice for `component.deprecatedProp`, at most once.
 *
 * No-op in production builds.
 */
export const warnDeprecatedProp = (
  component: string,
  deprecatedProp: string,
  replacementProp: string,
): void => {
  if (!isDevEnvironment()) return;

  const key = `${component}.${deprecatedProp}`;
  if (warnedProps.has(key)) return;
  warnedProps.add(key);

  console.warn(
    `[ssa-ui-kit] \`${component}\` received the deprecated \`${deprecatedProp}\` prop. ` +
      `Use \`${replacementProp}\` instead — \`${deprecatedProp}\` is removed in the next major release.`,
  );
};

export interface ResolveDeprecatedPropOptions<T> {
  /** Component name, used in the warning message. */
  component: string;
  /** The supported prop name. */
  prop: string;
  /** Value of the supported prop. */
  value: T | undefined;
  /** The deprecated prop name. */
  deprecatedProp: string;
  /** Value of the deprecated prop. */
  deprecatedValue: T | undefined;
}

/**
 * Resolves a prop that is mid-rename: returns the new prop's value when it is
 * defined, otherwise falls back to the deprecated one and warns in dev.
 *
 * Passing both is not an error — the new prop wins — but it still warns, since
 * the deprecated prop was supplied.
 */
export const resolveDeprecatedProp = <T>({
  component,
  prop,
  value,
  deprecatedProp,
  deprecatedValue,
}: ResolveDeprecatedPropOptions<T>): T | undefined => {
  if (deprecatedValue !== undefined) {
    warnDeprecatedProp(component, deprecatedProp, prop);
  }

  return value ?? deprecatedValue;
};

/**
 * `aria-labelledby` → `ariaLabelledby`, `aria-label` → `ariaLabel`, and so on.
 */
const toCamelCaseAria = (ariaProp: string): string =>
  ariaProp.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

/**
 * Shorthand for the camelCase-ARIA → native-ARIA renames (issue #656, chunk 3
 * item 1).
 *
 * The library grew bespoke `ariaLabel` / `ariaLabelledby` / `ariaControls` props
 * in parallel with components that simply accept the native attributes. The
 * camelCase ones have to be forwarded by hand and are invisible to
 * `eslint-plugin-jsx-a11y` and the axe gate, so native wins and the camelCase
 * spelling becomes an alias.
 *
 * @example
 * ```tsx
 * const label = resolveAriaProp('Pagination', 'aria-label', ariaLabelNative, ariaLabel);
 * ```
 */
export const resolveAriaProp = (
  component: string,
  ariaProp: string,
  value: string | undefined,
  deprecatedValue: string | undefined,
): string | undefined =>
  resolveDeprecatedProp({
    component,
    prop: ariaProp,
    value,
    deprecatedProp: toCamelCaseAria(ariaProp),
    deprecatedValue,
  });

/**
 * The open-state prop family, in the spellings the kit is converging on.
 *
 * @see resolveOpenState
 */
export interface OpenStateProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * The deprecated spellings the kit grew before {@link OpenStateProps}. Each
 * component only ever used a subset; passing a key that a given component never
 * had is harmless.
 */
export interface DeprecatedOpenStateProps {
  /** @deprecated Use `open`. */
  opened?: boolean;
  /** @deprecated Use `open`, or `defaultOpen` where it was never controlled. */
  isOpen?: boolean;
  /** @deprecated Use `open`, or `defaultOpen` where it was never controlled. */
  isOpened?: boolean;
  /** @deprecated Use `defaultOpen`. */
  defaultOpened?: boolean;
  /** @deprecated Use `defaultOpen`. */
  initialOpen?: boolean;
  /** @deprecated Use `onOpenChange`. */
  onOpenedChange?: (open: boolean) => void;
}

export interface ResolvedOpenState {
  open: boolean | undefined;
  defaultOpen: boolean | undefined;
  onOpenChange: ((open: boolean) => void) | undefined;
  /** True when the *supported* or the *deprecated* controlled key was passed. */
  isControlled: boolean;
}

/**
 * Shorthand for the open-state renames (issue #656, chunk 3 item 2), which span
 * `Drawer`, `Popover`, `Tooltip`, `Accordion`, `Modal`, `ModalDialog` and
 * `FiltersMultiSelect` — six deprecated spellings between them.
 *
 * Resolves all three keys in one call and reports whether the component should
 * consider itself controlled. Controlled-ness is keyed on the *presence* of a
 * key rather than its value, for the reason `useControllableState` documents:
 * `open={undefined}` has to keep meaning "controlled, currently closed".
 *
 * Pass the deprecated spellings this component actually had via
 * `controlledAlias` / `defaultAlias` / `changeAlias` — anything omitted is not
 * looked for, so a component cannot accidentally accept a spelling it never
 * shipped.
 *
 * @example
 * ```tsx
 * const { open, defaultOpen, onOpenChange, isControlled } = resolveOpenState(
 *   'Drawer',
 *   props,
 *   { controlledAlias: 'opened', defaultAlias: 'defaultOpened' },
 * );
 * ```
 */
export const resolveOpenState = (
  component: string,
  props: OpenStateProps & DeprecatedOpenStateProps,
  aliases: {
    controlledAlias?: keyof DeprecatedOpenStateProps;
    defaultAlias?: keyof DeprecatedOpenStateProps;
    changeAlias?: keyof DeprecatedOpenStateProps;
  } = {},
): ResolvedOpenState => {
  const { controlledAlias, defaultAlias, changeAlias } = aliases;

  const open = controlledAlias
    ? (resolveDeprecatedProp({
        component,
        prop: 'open',
        value: props.open,
        deprecatedProp: controlledAlias,
        deprecatedValue: props[controlledAlias] as boolean | undefined,
      }) as boolean | undefined)
    : props.open;

  const defaultOpen = defaultAlias
    ? (resolveDeprecatedProp({
        component,
        prop: 'defaultOpen',
        value: props.defaultOpen,
        deprecatedProp: defaultAlias,
        deprecatedValue: props[defaultAlias] as boolean | undefined,
      }) as boolean | undefined)
    : props.defaultOpen;

  const onOpenChange = changeAlias
    ? (resolveDeprecatedProp({
        component,
        prop: 'onOpenChange',
        value: props.onOpenChange,
        deprecatedProp: changeAlias,
        deprecatedValue: props[changeAlias] as
          | ((open: boolean) => void)
          | undefined,
      }) as ((open: boolean) => void) | undefined)
    : props.onOpenChange;

  const isControlled =
    'open' in props ||
    (controlledAlias !== undefined && controlledAlias in props);

  return { open, defaultOpen, onOpenChange, isControlled };
};

/**
 * Shorthand for the `isDisabled` → `disabled` rename, which spans 15 components.
 *
 * @example
 * ```tsx
 * const isControlDisabled = resolveDisabled('Button', disabled, isDisabled);
 * ```
 */
export const resolveDisabled = (
  component: string,
  disabled: boolean | undefined,
  isDisabled: boolean | undefined,
): boolean | undefined =>
  resolveDeprecatedProp({
    component,
    prop: 'disabled',
    value: disabled,
    deprecatedProp: 'isDisabled',
    deprecatedValue: isDisabled,
  });

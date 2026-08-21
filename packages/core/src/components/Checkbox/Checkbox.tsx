import { useId, useEffect, useRef, forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import { CheckboxBase } from './CheckboxBase';
import Icon from '@components/Icon';
import {
  resolveDeprecatedProp,
  resolveDisabled,
  warnDeprecatedProp,
} from '@utils/deprecation';

import { CheckboxProps } from './types';

/**
 * Checkbox - Form control for selecting one or more options
 *
 * A flexible checkbox component that supports controlled and uncontrolled states,
 * indeterminate state, React Hook Form integration, and full accessibility.
 * The component automatically manages indeterminate state and provides visual
 * feedback through icons (checkmark or minus for indeterminate).
 *
 * Colors are driven by `theme.palette`:
 * - `primary` (default) — blue; uses `palette.primary.light/main/dark` for
 *   the resting border, checked fill, and hover fill.
 * - `success` — green; uses `palette.success.main/dark` for the border and fills.
 * - `custom` — unstyled; apply your own colors via `className` or the `css` prop.
 *
 * When disabled, an unchecked box goes flat `greyFocused40`; a checked or
 * indeterminate one keeps its fill colour, muted, so the state stays readable.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Basic usage (primary / blue by default)
 * <Checkbox
 *   id="accept-terms"
 *   text="Accept terms and conditions"
 *   onChange={(checked) => handleChange(checked)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Green (success) variant
 * <Checkbox
 *   id="success-checkbox"
 *   text="Task completed"
 *   color="success"
 *   onChange={handleChange}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With React Hook Form
 * const { register } = useForm();
 * <Checkbox
 *   name="newsletter"
 *   text="Subscribe to newsletter"
 *   register={register}
 *   isRequired
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled checkbox
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   text="Controlled checkbox"
 *   externalState={checked}
 *   onChange={setChecked}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Indeterminate state (e.g., "select all")
 * <Checkbox
 *   text="Select all items"
 *   isIndeterminate={someSelected && !allSelected}
 *   initialState={allSelected}
 *   onChange={handleSelectAll}
 * />
 * ```
 *
 * @see {@link Field} - Use Field.Root to wrap Checkbox for labels and validation
 * @see {@link FormCheckbox} - Alternative checkbox component with form integration
 *
 * @accessibility
 * - Fully keyboard accessible (Space to toggle)
 * - Supports ARIA attributes via HTML input element
 * - Proper label association via htmlFor/id
 * - Screen reader friendly with proper roles
 *
 * @requires React Hook Form when using `register` prop
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const {
      text,
      id,
      onChange,
      disabled,
      isDisabled,
      checked,
      externalState,
      defaultChecked,
      initialState,
      isIndeterminate,
      name = '',
      isRequired = false,
      register,
      ...rest
    } = props;

    const isCheckboxDisabled = resolveDisabled(
      'Checkbox',
      disabled,
      isDisabled,
    );

    if (externalState !== undefined) {
      warnDeprecatedProp('Checkbox', 'externalState', 'checked');
    }

    // `checked` is fully controlled — the parent owns the value and no internal
    // state is written. The deprecated `externalState` keeps the semi-controlled
    // path it shipped with, where it is copied *into* internal state, so existing
    // consumers whose checkbox toggles itself without an `onChange` round-trip
    // keep working.
    const [isCheckedValue, setIsChecked] = useControllableState<boolean>({
      controlled: 'checked' in props,
      value: checked,
      defaultValue: resolveDeprecatedProp({
        component: 'Checkbox',
        prop: 'defaultChecked',
        value: defaultChecked,
        deprecatedProp: 'initialState',
        deprecatedValue: initialState,
      }),
      finalValue: false,
      onChange,
      semiControlled: {
        active: 'externalState' in props,
        value: externalState,
      },
    });

    const isChecked = Boolean(isCheckedValue);

    const autoGenId = useId();
    const theme = useTheme();
    const checkboxInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      // istanbul ignore else
      if (checkboxInputRef.current) {
        // Browsers drop the "indeterminate" state after the "checked" state
        // changes. We keep the component in the "indeterminate" state until the
        // prop's value changes to false or is removed.
        checkboxInputRef.current.indeterminate = Boolean(isIndeterminate);
      }
    }, [isIndeterminate, isChecked]);

    const checkboxId = id || autoGenId;

    return (
      <CheckboxBase htmlFor={checkboxId} {...rest}>
        <input
          id={checkboxId}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          disabled={isCheckboxDisabled}
          ref={(node: HTMLInputElement | null) => {
            checkboxInputRef.current = node;
            // Support both callback and object refs — forwardRef may receive either.
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          name={name}
          required={isRequired}
          {...register}
        />
        <div>
          {isIndeterminate ? (
            <Icon name="minus" size={12} color={theme.colors.white} />
          ) : isChecked ? (
            <Icon name="check" size={12} color={theme.colors.white} />
          ) : null}
        </div>
        {['string', 'number'].includes(typeof text) ? (
          <span>{text}</span>
        ) : (
          text
        )}
      </CheckboxBase>
    );
  },
);

export default Checkbox;

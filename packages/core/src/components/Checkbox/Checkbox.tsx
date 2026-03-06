import { useState, useId, useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import { CheckboxBase } from './CheckboxBase';
import Icon from '@components/Icon';

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
 *   the resting border, checked fill, and hover fill. Disabled uses `greyFocused40`.
 * - `success` — green; uses `palette.success.main/dark` for the border and fills.
 *   Disabled uses `greyFocused40`.
 * - `custom` — unstyled; apply your own colors via `className` or the `css` prop.
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
const Checkbox = ({
  text,
  id,
  onChange,
  isDisabled,
  externalState,
  initialState,
  isIndeterminate,
  name = '',
  isRequired = false,
  ref,
  register,
  ...rest
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(Boolean(initialState));
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

  useEffect(() => {
    if (typeof externalState === 'boolean') {
      setIsChecked(Boolean(externalState));
    }
  }, [externalState]);

  const checkboxId = id || autoGenId;

  return (
    <CheckboxBase htmlFor={checkboxId} {...rest}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          const newIsChecked = !isChecked;
          setIsChecked(newIsChecked);
          onChange?.(newIsChecked);
        }}
        disabled={isDisabled}
        ref={(node: HTMLInputElement) => {
          checkboxInputRef.current = node;
          if (ref) {
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
      {['string', 'number'].includes(typeof text) ? <span>{text}</span> : text}
    </CheckboxBase>
  );
};

export default Checkbox;

import React from 'react';
import Label from '@components/Label';
import FormHelperText from '@components/FormHelperText';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import { TextFieldProps } from './types';

/**
 * TextField - Ready-to-use text input (single- or multi-line) with label and validation UI.
 *
 * Purpose: one component for text inputs with built-in label, helper text, validation
 * error/success display, and optional character counting. Renders as Input or Textarea
 * based on the `multirow` prop. Automatically manages status (basic, error, success)
 * from props. Use when you want a complete text field without composing Field primitives;
 * use Field when you need custom layout or non-text controls.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Single-line text field
 * const { register } = useForm();
 * <TextField
 *   name="username"
 *   label="Username"
 *   placeholder="Enter your username"
 *   register={register}
 *   helperText="Choose a unique username"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Multi-line text field with character count
 * <TextField
 *   name="description"
 *   label="Description"
 *   multirow
 *   rows={5}
 *   maxLength={500}
 *   register={register}
 *   helperText="Tell us about yourself"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Text field with validation errors
 * <TextField
 *   name="email"
 *   label="Email Address"
 *   register={register}
 *   errors={errors.email}
 *   helperText="We'll never share your email"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Success state
 * <TextField
 *   name="username"
 *   label="Username"
 *   register={register}
 *   success={isValid}
 *   helperText="Username is available!"
 * />
 * ```
 *
 * @see {@link Input} - For single-line input component
 * @see {@link Textarea} - For multi-line textarea component
 * @see {@link Field} - For more advanced field layout with Field.Root
 *
 * @note React Hook Form integration is optional. If `register` is not provided,
 * the component will still work but validation features will be unavailable.
 *
 * @accessibility
 * - Full keyboard navigation support
 * - Screen reader friendly with proper labels
 * - ARIA attributes via React Hook Form (when register is provided)
 * - Error messages announced to screen readers
 */
const TextField = ({
  multirow,
  name,
  label,
  errors,
  helperText,
  success,
  disabled,
  maxLength,
  ...props
}: TextFieldProps) => {
  const [countChar, setCountChar] = React.useState(0);

  const status = success ? 'success' : errors ? 'error' : 'basic';

  const handleCount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setCountChar(e.currentTarget.value.length);

  const handleInputKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setCountChar((e.currentTarget as HTMLInputElement).value.length);
    props.onKeyUp?.(e);
  };

  return (
    <>
      <Label htmlFor={`formElement-${name}`}>{label}</Label>

      {multirow ? (
        <Textarea
          name={name}
          status={status}
          disabled={disabled}
          maxLength={maxLength}
          setCountChar={handleCount}
          {...props}
        />
      ) : (
        <Input
          name={name}
          status={status}
          disabled={disabled}
          maxLength={maxLength}
          onKeyUp={handleInputKeyUp}
          {...props}
        />
      )}

      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <FormHelperText role="status" status={status} disabled={disabled}>
          {errors ? errors?.message : helperText}
        </FormHelperText>
        <FormHelperText role="meter">
          {maxLength ? `${countChar} / ${maxLength}` : null}
        </FormHelperText>
      </div>
    </>
  );
};

export default TextField;

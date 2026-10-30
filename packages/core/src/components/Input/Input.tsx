import React, { forwardRef, useEffect } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import FormHelperText from '@components/FormHelperText';
import { InputBase } from './InputBase';
import { InputGroup } from './InputGroup';
import { InputProps, InputStatusColors } from './types';
import { InputStatusError } from './InputStatusError';
import { InputStatusSuccess } from './InputStatusSuccess';
import * as S from './styles';

const mapColors: InputStatusColors = {
  basic: S.basic,
  error: S.error,
  success: S.success,
  custom: S.custom,
};

const InputInner = (
  {
    name,
    type = 'text',
    placeholder,
    validationSchema,
    status = 'basic',
    disabled = false,
    startElement,
    endElement,
    className,
    wrapperClassName,
    helperClassName,
    inputProps = {},
    errorTooltip,
    successTooltip,
    errors,
    maxLength,
    helperText,
    showHelperText = false,
    showStatusIcon = true,
    showBorders = true,
    register,
    onKeyUp,
  }: InputProps,
  inputRef?: React.ForwardedRef<HTMLInputElement | null>,
) => {
  useEffect(() => {
    if (!register) {
      console.warn(
        'Input component should be used with React Hook Form register for validation support',
      );
    }
  }, [register]);

  const [countChar, setCountChar] = React.useState(0);
  const showStatusIconByProps = !disabled && !endElement && showStatusIcon;
  const registerResult = register?.(name, validationSchema);

  const handleCount: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    setCountChar(e.currentTarget.value.length);
    onKeyUp?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    registerResult?.onBlur(e);
    inputProps.onBlur?.(e);
  };

  return (
    <>
      <InputGroup
        css={[mapColors[status]]}
        className={wrapperClassName}
        disabled={disabled}>
        {startElement ? <div css={S.startElement}>{startElement}</div> : null}
        <InputBase
          type={type}
          id={`formElement-${name}`}
          showBorders={showBorders}
          placeholder={placeholder}
          disabled={disabled}
          css={{
            paddingLeft: startElement && 40,
            paddingRight: endElement && 40,
          }}
          className={className}
          onKeyUp={handleCount}
          {...inputProps}
          {...registerResult}
          onBlur={handleBlur}
          ref={useMergeRefs([registerResult?.ref, inputRef])}
        />

        {status === 'error' && showStatusIconByProps ? (
          <InputStatusError errorTooltip={errorTooltip} />
        ) : null}
        {status === 'success' && showStatusIconByProps ? (
          <InputStatusSuccess successTooltip={successTooltip} />
        ) : null}

        {endElement ? <div css={S.endElement}>{endElement}</div> : null}
      </InputGroup>
      {showHelperText && (
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
          className={helperClassName}>
          <FormHelperText role="status" status={status} disabled={disabled}>
            {errors ? errors?.message : helperText}
          </FormHelperText>
          <FormHelperText role="meter">
            {maxLength ? `${countChar} / ${maxLength}` : null}
          </FormHelperText>
        </div>
      )}
    </>
  );
};

/**
 * Input - Text input component with validation and status indicators
 *
 * A comprehensive text input component with built-in React Hook Form integration,
 * validation states, icon support, helper text, and character counting. Provides
 * visual feedback through status colors and icons, and supports all standard HTML
 * input types.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Basic usage with React Hook Form
 * const { register } = useForm();
 * <Input
 *   name="email"
 *   type="email"
 *   placeholder="Enter your email"
 *   register={register}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with validation
 * <Input
 *   name="password"
 *   type="password"
 *   register={register}
 *   validationSchema={{
 *     required: 'Password is required',
 *     minLength: { value: 8, message: 'Must be at least 8 characters' }
 *   }}
 *   status={errors.password ? 'error' : 'basic'}
 *   errors={errors.password}
 *   showHelperText
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Without React Hook Form: value and onChange go through inputProps
 * <Input
 *   name="search"
 *   placeholder="Search products..."
 *   startElement={<Icon name="search" />}
 *   helperText="Type to search"
 *   showHelperText
 *   inputProps={{ value, onChange: (e) => setValue(e.target.value) }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with a character counter (display-only, does not limit typing)
 * <Input
 *   name="bio"
 *   placeholder="Tell us about yourself"
 *   register={register}
 *   maxLength={200}
 *   showHelperText
 *   helperText="Maximum 200 characters"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Using with Field component
 * <Field.Root status={errors.email ? 'error' : 'basic'}>
 *   <Field.Label htmlFor="formElement-email">Email</Field.Label>
 *   <Field.Control>
 *     <Input
 *       name="email"
 *       register={register}
 *       css={{ width: '100%', border: '0 !important' }}
 *     />
 *   </Field.Control>
 *   <Field.Error>{errors.email?.message}</Field.Error>
 * </Field.Root>
 * ```
 *
 * @see {@link Field} - Use Field.Root to wrap Input for labels and validation
 * @see {@link Textarea} - For multi-line text input
 * @see {@link TextField} - Alternative text input component
 *
 * @accessibility
 * - Input renders no label: label it with TextField, Field.Label
 *   (`htmlFor="formElement-{name}"`) or `inputProps['aria-label']`
 * - The helper row is `role="status"`; it is not linked to the input with
 *   `aria-describedby`, and `status="error"` does not set `aria-invalid`
 */
const Input = forwardRef<HTMLInputElement, InputProps>(InputInner);

export default Input;

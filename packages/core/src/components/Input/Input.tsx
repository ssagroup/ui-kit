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
 * // Input with icons and helper text
 * <Input
 *   name="search"
 *   placeholder="Search products..."
 *   startElement={<Icon name="search" />}
 *   endElement={<Icon name="clear" onClick={handleClear} />}
 *   helperText="Type to search"
 *   showHelperText
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with character count
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
 *   <Field.Label htmlFor="email">Email</Field.Label>
 *   <Field.Control>
 *     <Input
 *       id="email"
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
 * @requires React Hook Form - Must be used within FormProvider context
 *
 * @accessibility
 * - Full keyboard navigation support
 * - Screen reader friendly with proper labels
 * - ARIA attributes via React Hook Form
 * - Error messages announced to screen readers
 */
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
      console.warn('Input component must be used within a Form component');
    }
  }, []);

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

const Input = forwardRef<HTMLInputElement, InputProps>(InputInner);

export default Input;

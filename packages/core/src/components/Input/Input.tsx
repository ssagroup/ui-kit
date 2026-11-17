import React, { forwardRef, useEffect, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import FormHelperText from '@components/FormHelperText';
import { useFeatureFlag } from '@contexts/FeatureFlags';
import { InputBase } from './InputBase';
import { InputGroup } from './InputGroup';
import { InputProps, InputStatusColors } from './types';
import { InputStatusError } from './InputStatusError';
import { InputStatusSuccess } from './InputStatusSuccess';
import * as S from './styles';
import { useSlotPadding } from './useSlotPadding';

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
    onStartElementClick,
    onEndElementClick,
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

  const fieldGeometryV2 = useFeatureFlag('fieldGeometryV2');

  const startElementRef = useRef<HTMLDivElement>(null);
  const endElementRef = useRef<HTMLDivElement>(null);
  const paddingLeft = useSlotPadding(startElementRef, !!startElement);
  const paddingRight = useSlotPadding(endElementRef, !!endElement);

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
        {startElement ? (
          // Delegated click: keyboard access comes from the button passed in
          // as startElement, whose Enter/Space click bubbles up here. A key
          // handler on this wrapper would fire the callback twice.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            ref={startElementRef}
            css={S.startElement}
            onClick={disabled ? undefined : onStartElementClick}>
            {startElement}
          </div>
        ) : null}
        <InputBase
          fieldGeometryV2={fieldGeometryV2}
          type={type}
          id={`formElement-${name}`}
          showBorders={showBorders}
          placeholder={placeholder}
          disabled={disabled}
          css={{
            // Static rule; the measured widths arrive as CSS variables via
            // style, so a changing width never emits a new emotion class.
            paddingLeft: startElement ? 'var(--input-slot-start)' : undefined,
            paddingRight: endElement ? 'var(--input-slot-end)' : undefined,
          }}
          className={className}
          onKeyUp={handleCount}
          {...inputProps}
          {...registerResult}
          style={{
            ...inputProps.style,
            ...(paddingLeft && { '--input-slot-start': `${paddingLeft}px` }),
            ...(paddingRight && { '--input-slot-end': `${paddingRight}px` }),
          }}
          onBlur={handleBlur}
          ref={useMergeRefs([registerResult?.ref, inputRef])}
        />

        {status === 'error' && showStatusIconByProps ? (
          <InputStatusError errorTooltip={errorTooltip} />
        ) : null}
        {status === 'success' && showStatusIconByProps ? (
          <InputStatusSuccess successTooltip={successTooltip} />
        ) : null}

        {endElement ? (
          // Delegated click: keyboard access comes from the button passed in
          // as endElement, whose Enter/Space click bubbles up here. A key
          // handler on this wrapper would fire the callback twice.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            ref={endElementRef}
            css={S.endElement}
            onClick={disabled ? undefined : onEndElementClick}>
            {endElement}
          </div>
        ) : null}
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
 * // Input with icons and helper text (without React Hook Form)
 * <Input
 *   name="search"
 *   placeholder="Search products..."
 *   startElement={<Icon name="search" />}
 *   endElement={<Icon name="clear" onClick={handleClear} />}
 *   helperText="Type to search"
 *   showHelperText
 *   onChange={(e) => handleSearch(e.target.value)}
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
 * @accessibility
 * - Full keyboard navigation support
 * - Screen reader friendly with proper labels
 * - ARIA attributes via React Hook Form
 * - Error messages announced to screen readers
 */
const Input = forwardRef<HTMLInputElement, InputProps>(InputInner);

export default Input;

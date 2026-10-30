import React, { useEffect } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { callAll } from '@ssa-ui-kit/utils';
import { TextareaProps } from './types';
import { TextareaBase } from './TextareaBase';

/**
 * Textarea - Multi-line text input component
 *
 * A textarea component with React Hook Form integration, validation support,
 * character limits, and paste handling. Designed for longer text input such as
 * comments, descriptions, messages, or any multi-line content.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Basic textarea with React Hook Form
 * const { register } = useForm();
 * <Textarea
 *   name="message"
 *   placeholder="Enter your message"
 *   register={register}
 *   rows={5}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Textarea with validation and character limit
 * const { register } = useForm();
 * const [charCount, setCharCount] = useState(0);
 *
 * <Textarea
 *   name="description"
 *   placeholder="Describe your project..."
 *   register={register}
 *   validationSchema={{
 *     required: 'Description is required',
 *     maxLength: { value: 500, message: 'Maximum 500 characters' }
 *   }}
 *   maxLength={500}
 *   rows={8}
 *   setCountChar={(e) => setCharCount(e.target.value.length)}
 * />
 * <span>{charCount} / 500 characters</span>
 * ```
 *
 * @example
 * ```tsx
 * // Labelled with Field.Label (Textarea renders no label of its own)
 * <Field.Root>
 *   <Field.Label htmlFor="comments">Comments</Field.Label>
 *   <Textarea id="comments" name="comments" register={register} rows={6} />
 *   <Field.Description>Optional feedback or notes</Field.Description>
 * </Field.Root>
 * ```
 *
 *
 * @see {@link Field} - Use Field.Root to wrap Textarea for labels and validation
 * @see {@link Input} - For single-line text input
 *
 * @accessibility
 * - Renders no label: pair it with a `<label htmlFor>` / `Field.Label`
 *   matching `id` (default `formElement-{name}`)
 * - `status="error"` only colours the border; it does not set `aria-invalid`
 * - Respects disabled and readOnly states
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function TextareaInner(
    {
      name,
      placeholder,
      validationSchema,
      disabled = false,
      readOnly = false,
      rows = 10,
      maxLength,
      title,
      id: idProp,
      onPaste,
      register,
      setCountChar,
      status = 'basic',
      ...rest
    }: TextareaProps,
    ref?: React.ForwardedRef<HTMLTextAreaElement | null>,
  ) {
    useEffect(() => {
      if (!register) {
        console.warn(
          'Textarea component should be used with React Hook Form register for validation support',
        );
      }
    }, [register]);

    const registerResult = register?.(name, validationSchema);
    const onChange = registerResult?.onChange;

    return (
      <TextareaBase
        id={idProp ?? `formElement-${name}`}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength}
        onPaste={onPaste}
        title={title}
        status={status}
        {...rest}
        {...registerResult}
        onChange={callAll(setCountChar, onChange)}
        ref={useMergeRefs([registerResult?.ref, ref])}
      />
    );
  },
);

export default Textarea;

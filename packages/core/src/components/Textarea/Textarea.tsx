import React from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { callAll } from '@ssa-ui-kit/utils';
import { TextareaProps } from './types';
import { TextareaBase } from './TextareaBase';

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
      onPaste,
      register,
      setCountChar,
    }: TextareaProps,
    ref?: React.ForwardedRef<HTMLTextAreaElement | null>,
  ) {
    if (!register) {
      throw new Error('Input component must be used within a Form component');
    }

    const { onChange, ...options } = register(name, validationSchema);

    return (
      <TextareaBase
        id={`formElement-${name}`}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength}
        onChange={callAll(setCountChar, onChange)}
        onPaste={onPaste}
        title={title}
        {...options}
        ref={useMergeRefs([options.ref, ref])}
      />
    );
  },
);

export default Textarea;

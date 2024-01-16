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
      rows = 10,
      maxLength,
      title,
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
        rows={rows}
        maxLength={maxLength}
        onChange={callAll(setCountChar, onChange)}
        title={title}
        {...options}
        ref={useMergeRefs([options.ref, ref])}
      />
    );
  },
);

export default Textarea;

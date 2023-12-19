import { callAll } from '@ssa-ui-kit/utils';

import { TextareaProps } from './types';
import { TextareaBase } from './TextareaBase';

const Textarea = ({
  name,
  placeholder,
  register,
  validationSchema,
  disabled = false,
  rows = 10,
  setCountChar,
  maxLength,
  title,
}: TextareaProps) => {
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
    />
  );
};

export default Textarea;

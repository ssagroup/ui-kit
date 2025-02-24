import React from 'react';
import Label from '@components/Label';
import FormHelperText from '@components/FormHelperText';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import { TextFieldProps } from './types';

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

  const handleCount = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCountChar(e.currentTarget.value.length);

  return (
    <>
      <Label htmlFor={`formElement-${name}`}>{label}</Label>

      {multirow ? (
        <Textarea
          name={name}
          disabled={disabled}
          maxLength={maxLength}
          setCountChar={handleCount}
          {...props}
        />
      ) : (
        <Input name={name} status={status} disabled={disabled} {...props} />
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

import FormHelperText from '@components/FormHelperText';

import { useFieldContext } from './FieldProvider';

export interface FieldErrorProps {
  children: React.ReactNode;
}

export const FieldError = ({ children }: FieldErrorProps) => {
  const ctx = useFieldContext();

  if (ctx.status !== 'error') {
    return null;
  }

  return <FormHelperText status="error">{children}</FormHelperText>;
};

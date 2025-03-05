import FormHelperText from '@components/FormHelperText';

import { useFieldContext } from './FieldProvider';

export interface FieldSuccessProps {
  children: React.ReactNode;
}

export const FieldSuccess = ({ children }: FieldSuccessProps) => {
  const ctx = useFieldContext();

  if (ctx.status !== 'success') {
    return null;
  }

  return <FormHelperText status="success">{children}</FormHelperText>;
};

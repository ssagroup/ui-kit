import FormHelperText from '@components/FormHelperText';

import { useFieldContext } from './FieldProvider';

export interface FieldDescriptionProps {
  children: React.ReactNode;
}

export const FieldDescription = ({ children }: FieldDescriptionProps) => {
  const ctx = useFieldContext();

  if (ctx.status !== 'basic') {
    return null;
  }

  return <FormHelperText status="basic">{children}</FormHelperText>;
};

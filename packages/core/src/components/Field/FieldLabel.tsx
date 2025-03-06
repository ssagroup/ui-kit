import Label from '@components/Label';
import { LabelProps } from '@components/Label/types';

import { useFieldContext } from './FieldProvider';

export interface FieldLabelProps extends LabelProps {
  children: React.ReactNode;
}

export const FieldLabel = ({ children, ...props }: FieldLabelProps) => {
  const ctx = useFieldContext();
  return (
    <Label isDisabled={ctx.disabled} {...props}>
      {children}
    </Label>
  );
};

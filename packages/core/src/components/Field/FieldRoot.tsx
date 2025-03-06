import { type HTMLAttributes } from 'react';

import { FieldProvider, FieldContextValue } from './FieldProvider';

export interface FieldRootProps
  extends Partial<FieldContextValue>,
    HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FieldRoot = ({ children, ...props }: FieldRootProps) => {
  const {
    disabled = false,
    status = 'basic',
    forwardFocus = true,
    ...divProps
  } = props;

  return (
    <div {...divProps}>
      <FieldProvider value={{ disabled, status, forwardFocus }}>
        {children}
      </FieldProvider>
    </div>
  );
};

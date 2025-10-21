import { Fragment, type HTMLAttributes } from 'react';

import { FieldContextValue, FieldProvider } from './FieldProvider';

export interface FieldRootProps
  extends Partial<FieldContextValue>,
    HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const FieldRoot = ({ children, ...props }: FieldRootProps) => {
  const {
    disabled = false,
    status = 'basic',
    forwardFocus = true,
    asChild = false,
    ...divProps
  } = props;

  const Wrapper = asChild ? Fragment : 'div';
  const wrapperProps = asChild ? {} : divProps;

  return (
    <Wrapper {...wrapperProps}>
      <FieldProvider value={{ disabled, status, forwardFocus }}>
        {children}
      </FieldProvider>
    </Wrapper>
  );
};

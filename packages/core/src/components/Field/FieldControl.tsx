import React, {
  cloneElement,
  ForwardedRef,
  HTMLAttributes,
  isValidElement,
  useRef,
} from 'react';

import styled from '@emotion/styled';

import { FieldContextValue, useFieldContext } from './FieldProvider';

const FieldControlBase = styled.div<FieldContextValue>`
  display: flex;
  align-items: center;

  min-height: 44px;
  height: auto;

  border-radius: 16px;
  overflow: hidden;
  border: 1px solid
    ${({ status, theme }) => {
      if (status === 'error') return theme.colors.red;
      if (status === 'success') return theme.colors.greenLighter;
      return theme.colors.grey;
    }};

  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.greyLighter : theme.colors.white};
  & > * {
    background: transparent;
  }

  &:active,
  &:hover {
    background: ${({ disabled, theme }) =>
      disabled ? theme.colors.greyLighter : theme.colors.white};
    box-shadow: none;
  }

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }

  &:focus-within,
  &:active {
    border-color: ${({ status, disabled, theme }) => {
      if (disabled) return theme.colors.grey;
      if (status === 'error') return theme.colors.red;
      if (status === 'success') return theme.colors.greenLighter;
      return theme.colors.blueRoyal;
    }};
  }
`;

export interface FieldControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  controlRef?: React.RefObject<HTMLElement>;
  children: React.ReactNode | ((props: FieldContextValue) => React.ReactNode);
}

const isForwardRefComponent = (component: React.ReactElement): boolean => {
  if (
    typeof component.type === 'object' &&
    (component.type as { $$typeof?: symbol }).$$typeof?.toString() ===
      'Symbol(react.forward_ref)'
  ) {
    return true;
  }
  return false;
};

export const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
  function FieldControl({ children, controlRef, ...props }, ref) {
    const ctx = useFieldContext();
    const baseProps = { ...props, ...ctx };

    const internalRef = useRef<HTMLElement | null>(null);

    let _children = typeof children === 'function' ? children(ctx) : children;
    if (
      ctx.forwardFocus &&
      isValidElement(_children) &&
      isForwardRefComponent(_children)
    ) {
      const setRef =
        (defaultRef?: ForwardedRef<unknown>) =>
        (element: HTMLElement | null) => {
          internalRef.current = element;
          if (defaultRef) {
            if (typeof defaultRef === 'function') {
              defaultRef(element);
            } else {
              (defaultRef as React.MutableRefObject<unknown>).current = element;
            }
          }
        };

      _children = cloneElement(_children as React.ReactElement, {
        ref: setRef((children as { ref?: ForwardedRef<unknown> }).ref),
      });
    }

    return (
      <FieldControlBase
        {...baseProps}
        ref={ref}
        onClick={(event) => {
          baseProps.onClick?.(event);
          if (controlRef) {
            controlRef.current?.focus?.();
          } else if (internalRef.current) {
            internalRef.current?.focus?.();
          }
        }}>
        {_children}
      </FieldControlBase>
    );
  },
);

import React, {
  useRef,
  ForwardedRef,
  isValidElement,
  cloneElement,
  HTMLAttributes,
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
      if (status === 'error') return theme.palette.error.main;
      if (status === 'success') return theme.palette.success.light;
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
      if (status === 'error') return theme.palette.error.main;
      if (status === 'success') return theme.palette.success.light;
      return theme.palette.primary.main;
    }};
  }
`;

/**
 * Props for Field.Control component
 *
 * Wrapper component for form controls (inputs, textarea elements, selects, etc.).
 * Provides consistent styling, validation state borders, and optional focus forwarding.
 * Can accept children as React nodes or a render function that receives field context.
 */
export interface FieldControlProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /**
   * Optional ref to a specific element to focus when control is clicked
   * If not provided, will attempt to focus the first child input element
   */
  controlRef?: React.RefObject<HTMLElement | null>;

  /**
   * Form control element(s) to wrap
   * Can be a React node or a function that receives FieldContextValue and returns a node
   */
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

/**
 * Field.Control - Wrapper component for form controls
 *
 * Provides a styled container for form inputs with automatic focus forwarding,
 * validation state styling (error/success borders), and consistent layout.
 * Clicking anywhere in the control area will focus the contained input when
 * forwardFocus is enabled in Field.Root.
 *
 * @category Form Controls
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Field.Label htmlFor="username">Username</Field.Label>
 *   <Field.Control>
 *     <Input id="username" name="username" />
 *   </Field.Control>
 * </Field.Root>
 * ```
 *
 * @example
 * ```tsx
 * // With render function
 * <Field.Control>
 *   {(context) => (
 *     <Input
 *       name="email"
 *       disabled={context.disabled}
 *       css={{ borderColor: context.status === 'error' ? 'red' : 'blue' }}
 *     />
 *   )}
 * </Field.Control>
 * ```
 *
 * @example
 * ```tsx
 * // With custom control ref
 * const inputRef = useRef<HTMLInputElement>(null);
 * <Field.Control controlRef={inputRef}>
 *   <CustomInput ref={inputRef} />
 * </Field.Control>
 * ```
 *
 * @see {@link Field.Root} - Parent component that provides context
 */
export const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
  function FieldControl({ children, controlRef, ...props }, ref) {
    const ctx = useFieldContext();
    const baseProps = { ...props, ...ctx };

    const internalRef = useRef<HTMLElement>(null);

    let _children = typeof children === 'function' ? children(ctx) : children;
    if (
      ctx.forwardFocus &&
      isValidElement<{
        ref?: React.Ref<HTMLElement | null>;
      }>(_children) &&
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
              (defaultRef as React.RefObject<unknown>).current = element;
            }
          }
        };

      // In React 19, ref is a regular prop, not a special property
      // Access it from the element's props
      const existingRef = _children.props?.ref as
        | ForwardedRef<unknown>
        | undefined;
      _children = cloneElement(_children, {
        ref: setRef(existingRef),
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

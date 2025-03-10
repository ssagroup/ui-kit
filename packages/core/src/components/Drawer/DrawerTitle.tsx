import { forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledDrawerTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
`;

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({ children, ...props }, ref) {
    return (
      <StyledDrawerTitle ref={ref} {...props}>
        {children}
      </StyledDrawerTitle>
    );
  },
);

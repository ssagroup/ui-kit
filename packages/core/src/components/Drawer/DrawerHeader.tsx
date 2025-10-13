import { forwardRef } from 'react';

import styled from '@emotion/styled';

const StyledDrawerHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader({ children, ...props }, ref) {
    return (
      <StyledDrawerHeader ref={ref} {...props}>
        {children}
      </StyledDrawerHeader>
    );
  },
);

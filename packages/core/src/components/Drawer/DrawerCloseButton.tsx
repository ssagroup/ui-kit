import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Button from '@components/Button';
import { ButtonProps } from '@components/Button/types';
import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';

import { useDrawerContext } from './DrawerProvider';
import { Position } from './useDrawer';

const StyledDrawerCloseButton = styled(Button)`
  margin-inline-start: auto;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  background: ${({ theme }) => theme.colors.greyFocused};
`;

const notReachable = (_: never): never => _;
const getIconName = (position: Position): IconProps['name'] => {
  switch (position) {
    case 'top':
      return 'carrot-up';
    case 'bottom':
      return 'carrot-down';
    case 'left':
      return 'carrot-left';
    case 'right':
      return 'carrot-right';
    default:
      return notReachable(position);
  }
};

export interface DrawerCloseButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export const DrawerCloseButton = forwardRef<
  HTMLButtonElement,
  DrawerCloseButtonProps
>(function DrawerCloseButton({ children, ...props }, ref) {
  const theme = useTheme();
  const ctx = useDrawerContext();
  const iconName = getIconName(ctx.store.position);
  return (
    <StyledDrawerCloseButton
      data-testid="drawer-close-button"
      startIcon={
        <Icon name={iconName} size={18} color={theme.colors.greyDarker} />
      }
      ref={ref}
      onClick={() => ctx.store.toggle(false)}
      {...props}>
      {children}
    </StyledDrawerCloseButton>
  );
});

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
  flex-shrink: 0;
  height: 34px;
  width: 34px;
  border-radius: 12px;

  /* The design's "pressed" fill: this button only ever renders inside an open
     drawer, and the open state is the pressed one. The closed-state styling
     (white fill, grey stroke, dark glyph) belongs to whatever trigger the
     consumer renders, since Drawer.Root unmounts while shut. */
  background: ${({ theme }) => theme.colors.greyDropdownFocused};
  border: 1px solid ${({ theme }) => theme.colors.white};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

const notReachable = (_: never): never => _;
/**
 * The side drawers use the panel glyphs, which point at the edge the drawer is
 * anchored to — `panelLeft` mirrors `panelRight`, so the button reads as
 * "collapse towards this side" rather than as a generic arrow.
 *
 * `top`/`bottom` keep the carrots: the design only covers left and right, and
 * the icon set has no panel-up/panel-down equivalent.
 */
const getIconName = (position: Position): IconProps['name'] => {
  switch (position) {
    case 'top':
      return 'carrot-up';
    case 'bottom':
      return 'carrot-down';
    case 'left':
      return 'panelLeft';
    case 'right':
      return 'panelRight';
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
      startIcon={<Icon name={iconName} size={18} color={theme.colors.white} />}
      ref={ref}
      onClick={() => ctx.store.toggle(false)}
      {...props}>
      {children}
    </StyledDrawerCloseButton>
  );
});

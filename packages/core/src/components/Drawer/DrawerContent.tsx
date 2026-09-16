import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { useMergeRefs } from '@floating-ui/react';

import { Position } from './useDrawer';
import { PANEL_PADDING_TOP, PANEL_PADDING_X } from './constants';
import { useDrawerContext } from './DrawerProvider';
import { DrawerHeader } from './DrawerHeader';
import { DrawerTitle } from './DrawerTitle';
import { DrawerCloseButton } from './DrawerCloseButton';

const ContentWrapper = styled.div<{ position: Position }>`
  display: flex;
  justify-content: ${({ position }) =>
    position === 'left' ? 'flex-start' : 'flex-end'};
  align-items: ${({ position }) =>
    position === 'top' ? 'flex-start' : 'flex-end'};
  height: 100%;
`;

const getBorderStyle = (position: Position, color?: string) => {
  const borders = {
    left: `border-right: 1px solid ${color};`,
    right: `border-left: 1px solid ${color};`,
    top: `border-bottom: 1px solid ${color};`,
    bottom: `border-top: 1px solid ${color};`,
  };
  return borders[position];
};

const getTransform = (position: Position, open: boolean) => {
  const closedTransforms = {
    left: 'translateX(-100%)',
    right: 'translateX(100%)',
    top: 'translateY(-100%)',
    bottom: 'translateY(100%)',
  };
  return open ? 'translate(0)' : closedTransforms[position];
};

/**
 * `left`/`right` drawers take their width from the store; `top`/`bottom` span
 * the overlay as they always have, so `width` leaves them alone.
 */
const getSizing = (position: Position, width: number | string) => {
  if (position === 'top' || position === 'bottom') {
    return 'flex: 1;';
  }
  return `
    flex: 0 0 auto;
    width: ${typeof width === 'number' ? `${width}px` : width};
    max-width: 100%;
  `;
};

const StyledDrawerContent = styled.div<{
  duration: number;
  position: Position;
  drawerWidth: number | string;
}>`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  height: 100%;
  box-sizing: border-box;
  pointer-events: auto;
  transition: transform ${({ duration }) => duration}ms ease-in-out;

  /* Column flex so a Drawer.Footer can pin itself to the bottom with
     margin-top: auto. Deliberately no gap — it would space out every child a
     consumer passes; the design's 24px header-to-body distance lives on
     DrawerHeader instead. */
  display: flex;
  flex-direction: column;

  /* The panel is the scroll container. Without this the body simply overflows
     the fixed-height panel: in a portalled drawer the spill is unreachable
     because the overlay does not scroll, and in a contained one there is no
     scrolling ancestor at all. It is also what makes the sticky positioning on
     DrawerHeader and DrawerFooter do anything — sticky needs a scrollport, and
     until now neither had one. */
  overflow-y: auto;

  /* Design: 24px above the header, 32px gutters. The footer is full-bleed and
     cancels the side padding itself. */
  padding: ${PANEL_PADDING_TOP}px ${PANEL_PADDING_X}px 0;

  ${({ position, drawerWidth }) => getSizing(position, drawerWidth)}

  ${({ position, theme }) => getBorderStyle(position, theme.colors.greyFocused)}

  transform: ${({ position }) => getTransform(position, false)};

  &[data-transition='open'] {
    transform: ${({ position }) => getTransform(position, true)};
  }
`;

export const DrawerContent = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>
>(function DrawerContent({ children, ...props }, ref) {
  const ctx = useDrawerContext();
  const {
    title,
    withCloseButton,
    position,
    duration,
    width,
    transition,
    interactions,
    setFloating,
  } = ctx.store;
  const mergedRef = useMergeRefs([setFloating, ref]);
  const hasHeader = !!title || withCloseButton;

  return (
    <ContentWrapper position={position}>
      <StyledDrawerContent
        ref={mergedRef}
        data-transition={transition.status}
        data-position={position}
        position={position}
        duration={duration}
        drawerWidth={width}
        {...interactions.getFloatingProps(props)}>
        {hasHeader && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {withCloseButton && <DrawerCloseButton />}
          </DrawerHeader>
        )}
        {children}
      </StyledDrawerContent>
    </ContentWrapper>
  );
});

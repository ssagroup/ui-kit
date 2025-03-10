import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { useMergeRefs } from '@floating-ui/react';

import { Position } from './useDrawer';
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

const StyledDrawerContent = styled.div<{
  duration: number;
  position: Position;
}>`
  flex: 1;
  background-color: #f4f5f9;
  height: 100%;
  pointer-events: auto;
  transition: transform ${({ duration }) => duration}ms ease-in-out;

  ${({ position, theme }) => getBorderStyle(position, theme.colors.greyFocused)}

  transform: ${({ position }) => getTransform(position, false)};

  &[data-transition='open'] {
    transform: ${({ position }) => getTransform(position, true)};
  }
`;

export const DrawerContent = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(function DrawerContent({ children, ...props }, ref) {
  const ctx = useDrawerContext();
  const {
    title,
    withCloseButton,
    position,
    duration,
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

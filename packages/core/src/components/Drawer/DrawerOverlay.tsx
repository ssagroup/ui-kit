import styled from '@emotion/styled';
import {
  FloatingOverlay,
  FloatingOverlayProps,
  useTransitionStatus,
} from '@floating-ui/react';

import { useDrawerContext } from './DrawerProvider';

const StyledFloatingOverlay = styled(FloatingOverlay, {
  shouldForwardProp: (propName) => !propName.startsWith('$'),
})<{
  $inPortal: boolean;
  $duration: number;
  $dismissable: boolean;
  $transitionStatus: ReturnType<typeof useTransitionStatus>['status'];
}>`
  transition-property: opacity;
  transition-duration: ${({ $duration }) => $duration}ms;
  transition-timing-function: ease;
  opacity: ${({ $transitionStatus }) =>
    $transitionStatus === 'close' ? 0 : 1};

  ${({ $inPortal }) =>
    !$inPortal &&
    `
    overflow: hidden !important;
    position: absolute !important;
  `}

  pointer-events: ${({ $dismissable }) => ($dismissable ? 'auto' : 'none')};
`;

export const DrawerOverlay = ({
  children,
  ...props
}: { children?: React.ReactNode } & FloatingOverlayProps) => {
  const ctx = useDrawerContext();
  const { duration, dismissable, transition, portalNode } = ctx.store;

  const inPortal = portalNode !== null;

  return (
    <StyledFloatingOverlay
      $inPortal={inPortal}
      $duration={duration}
      $dismissable={dismissable}
      $transitionStatus={transition.status}
      {...props}>
      {children}
    </StyledFloatingOverlay>
  );
};

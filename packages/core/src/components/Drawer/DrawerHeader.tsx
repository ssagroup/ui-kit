import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { HEADER_GAP, PANEL_PADDING_TOP, PANEL_PADDING_X } from './constants';

const StyledDrawerHeader = styled.header`
  position: sticky;

  /* Negative, not 0: a sticky inset resolves against the scrollport's content
     edge, which the panel's own top padding pushes down. At 0 the header would
     stick 24px low and leave a transparent strip above itself for content to
     scroll through. */
  top: -${PANEL_PADDING_TOP}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  /* Opaque and above the body, so content scrolling under the header does not
     show through it. Being the first child, the header would otherwise be
     painted over by every sibling that follows it, background or no. */
  background: ${({ theme }) => theme.palette.secondary.light};
  z-index: 1;

  /* Cancel the panel's padding and re-apply it here, so the bar spans the full
     width of the panel and covers the strip above itself — content scrolls
     through those gutters too. */
  margin: -${PANEL_PADDING_TOP}px -${PANEL_PADDING_X}px 0;

  /* The gap to the body is padding rather than a margin on purpose. A margin
     sits outside the border box, so it stays transparent while the header is
     stuck and the first field scrolls right up under the buttons. As padding it
     is part of the painted background, and the body stops 24px clear. The
     resting layout is identical either way. */
  padding: ${PANEL_PADDING_TOP}px ${PANEL_PADDING_X}px ${HEADER_GAP}px;
`;

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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

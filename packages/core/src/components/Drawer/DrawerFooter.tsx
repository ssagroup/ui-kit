import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { PANEL_PADDING_X } from './constants';

const StyledDrawerFooter = styled.footer`
  /* Pinned to the bottom of the panel by Drawer.Content's column flex, and
     sticky so it stays put once the body scrolls past it. */
  margin-top: auto;
  position: sticky;
  bottom: 0;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  /* The divider runs the full width of the panel, so the footer cancels
     Drawer.Content's 32px gutters and re-applies them to its own contents. */
  margin-inline: -${PANEL_PADDING_X}px;
  padding: 16px ${PANEL_PADDING_X}px;
  border-top: 1px solid ${({ theme }) => theme.colors.greyFocused};

  /* Opaque, so scrolling content passes underneath rather than through. */
  background: ${({ theme }) => theme.palette.secondary.light};
`;

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Drawer.Footer - A sticky action bar across the bottom of the panel.
 *
 * Holds the drawer's closing actions — cancel and confirm, clear and apply —
 * above a full-width divider. It stays at the bottom whether the body is short
 * or scrolling, and it only handles layout: the buttons are ordinary `Button`s,
 * so their labels, variants and disabled states are yours to set.
 *
 * Place it as the last child of `Drawer.Content`. Children are laid out in a
 * row, 20px apart, aligned to the trailing edge.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <Drawer.Content>
 *   <Drawer.Header>
 *     <Drawer.Title>Filters</Drawer.Title>
 *     <Drawer.CloseButton />
 *   </Drawer.Header>
 *   {fields}
 *   <Drawer.Footer>
 *     <Button variant="custom" text="Clear" onClick={handleClear} />
 *     <Button variant="primary" text="View leads" onClick={handleSubmit} />
 *   </Drawer.Footer>
 * </Drawer.Content>
 * ```
 */
export const DrawerFooter = forwardRef<HTMLElement, DrawerFooterProps>(
  ({ children, ...props }, ref) => (
    <StyledDrawerFooter ref={ref} {...props}>
      {children}
    </StyledDrawerFooter>
  ),
);

DrawerFooter.displayName = 'DrawerFooter';

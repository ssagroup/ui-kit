import { forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledDrawerActions = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 20px;
`;

export interface DrawerActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Drawer.Actions - The header's right-hand control group.
 *
 * A row for whatever the drawer's header needs next to its title — a save
 * button, a search field — ending with `Drawer.CloseButton`. It only lays the
 * controls out (20px apart, vertically centred); the controls themselves are
 * ordinary kit components, so their text, variant, disabled and loading states
 * stay yours.
 *
 * Put it inside `Drawer.Header`, and give the header a `Drawer.Title` as its
 * first child so the group is pushed to the far edge.
 *
 * ### Compose the header yourself, or let the store build it — not both
 * Passing `title`/`withCloseButton` to `useDrawer` makes `Drawer.Content`
 * render its own header. Writing your own means leaving both unset, or the
 * drawer draws two.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <Drawer.Header>
 *   <Drawer.Title>Filters</Drawer.Title>
 *   <Drawer.Actions>
 *     <Button variant="primary" text="Save" onClick={handleSave} />
 *     <Drawer.CloseButton />
 *   </Drawer.Actions>
 * </Drawer.Header>
 * ```
 *
 * @example
 * ```tsx
 * // A search field in place of the button
 * <Drawer.Actions>
 *   <Input name="search" placeholder="Search" onChange={handleSearch} />
 *   <Drawer.CloseButton />
 * </Drawer.Actions>
 * ```
 */
export const DrawerActions = forwardRef<HTMLDivElement, DrawerActionsProps>(
  ({ children, ...props }, ref) => (
    <StyledDrawerActions ref={ref} {...props}>
      {children}
    </StyledDrawerActions>
  ),
);

DrawerActions.displayName = 'DrawerActions';

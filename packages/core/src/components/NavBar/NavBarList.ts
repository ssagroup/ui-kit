import styled from '@emotion/styled';

/**
 * Also used as the styling base for `CollapsibleNavBarList`, which resets the
 * column layout below — keep the two in sync when changing direction, gap or
 * wrapping here.
 */
const NavBarList = styled.ul`
  display: flex;
  flex-direction: column;

  list-style: none;

  /* The design lays the rail out as auto-layout with a fixed 42px gap, so the
     column sizes to its item count instead of a hardcoded height. */
  gap: 42px;

  align-items: center;
  align-self: center;

  /* Without this the column collapses to the 24px glyph width and takes the
     rows' click targets down with it. */
  width: 100%;

  margin: 0;

  /* The wrapper is only a flex container at lg, so below it align-self does
     nothing and the column sits flush against the panel's rounded top edge.
     Padding rather than margin — a top margin here would collapse through
     the wrapper and move the whole panel instead. */
  padding: 16px 0 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    /* Centred by align-self at this breakpoint; padding would bias it down. */
    padding: 0;
  }
`;

export default NavBarList;

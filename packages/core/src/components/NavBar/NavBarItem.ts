import styled from '@emotion/styled';

const NavBarItem = styled.li`
  display: flex;

  align-items: center;
  justify-content: center;

  /* Full-width rows keep the click target spanning the rail even though the
     glyph itself is only 24px wide. Height comes from the icon, so the 42px
     gap on the list produces the design's 66px row pitch. */
  width: 100%;
`;

export default NavBarItem;

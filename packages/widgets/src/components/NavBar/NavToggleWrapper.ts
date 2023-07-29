import styled from '@emotion/styled';

const NavToggleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 25px;
  background: transparent;

  height: 36px;
  width: 36px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

export default NavToggleWrapper;

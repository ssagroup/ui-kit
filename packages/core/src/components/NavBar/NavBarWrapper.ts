import styled from '@emotion/styled';

const NavBarWrapper = styled.div`
  position: absolute;

  top: 60px;
  left: 0;

  width: 56px;

  border-radius: 12px 12px 0 0;
  background: linear-gradient(
    108.3deg,
    ${({ theme }) => theme.colors.greyDarker} -0.36%,
    ${({ theme }) => theme.colors.greyDarker} 100%
  );

  transform: translateY(-200vh);
  transition: height 475ms ease, transform 450ms ease, border-radius 450ms ease;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 64px;
  }

  ${({ theme }) => theme.mediaQueries.xlg} {
    display: flex;
    position: fixed;

    top: 0;

    width: 94px;
    height: 100vh;

    border-radius: 0;

    transform: translateY(0);
  }
`;

export default NavBarWrapper;

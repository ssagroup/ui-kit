import styled from '@emotion/styled';

import NavToggleWrapper from '@components/NavBar/NavToggleWrapper';

export const CollapsibleNavToggleWrapper = styled(NavToggleWrapper)`
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.greyLighter};

  height: 40px;
  width: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

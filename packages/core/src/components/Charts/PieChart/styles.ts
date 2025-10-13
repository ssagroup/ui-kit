import styled from '@emotion/styled';

import Button from '@components/Button';

export const PieChartButton = styled(Button)`
  height: auto;
  padding: 0;
  background: none;
  box-shadow: none;

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    &:before {
      display: none;
    }
  }

  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.greyDarker};
    }
  }
`;

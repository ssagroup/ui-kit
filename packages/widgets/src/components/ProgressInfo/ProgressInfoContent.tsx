import styled from '@emotion/styled';
import { CardContent } from '@ssa-ui-kit/core';

const ProgressInfoContent = styled(CardContent)`
  width: 100%;
  height: 100%;

  max-width: 380px;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 30px;
  }

  div:nth-of-type(1) {
    width: 120px;
    height: 120px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    div:nth-of-type(1) {
      width: 160px;
      height: 160px;
    }
  }
`;

export default ProgressInfoContent;

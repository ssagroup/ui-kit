import styled from '@emotion/styled';
import { Wrapper } from '@ssa-ui-kit/core';

export const TopMenuWrapper = styled(Wrapper)`
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: stretch;
  gap: 12px;

  & > div:first-of-type {
    flex: 1;
    p {
      font-size: 10px;
    }

    div[role='button'] {
      padding: 4px 10px 2px;
    }

    h5,
    h6 {
      line-height: 1;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & > div:first-of-type {
      p {
        font-size: 12px;
      }

      div[role='button'] {
        padding: 4px 10px;
      }

      h5 {
        line-height: 1.5rem;
      }
      h6 {
        line-height: 1.375rem;
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    gap: 32px;
  }
`;

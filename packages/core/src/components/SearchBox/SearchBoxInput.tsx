import styled from '@emotion/styled';
import { Input } from '@components';

export const SearchBoxInput = styled(Input)`
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.greyLighter};
  border: 1px solid #dee0e8;
  color: ${({ theme }) => theme.colors.greyDarker};
  padding-right: 20px;
  &::placeholder {
    color: #55575a;
    font-weight: 500;
  }
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors.greyDropdownFocused}`};
  }
  & + div {
    right: 11px;
    & svg {
      width: 12px;
      height: 12px;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    height: 36px;
    font-size: 14px;
    padding-right: 40px;
    & + div {
      right: 23px;
      & svg {
        width: 15px;
        height: 15px;
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 40px;
  }
`;

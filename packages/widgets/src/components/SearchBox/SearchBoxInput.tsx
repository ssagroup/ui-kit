import styled from '@emotion/styled';
import { Input } from '@ssa-ui-kit/core';

export const SearchBoxInput = styled(Input)`
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.greyLighter};
  border: 1px solid #dee0e8;
  color: ${({ theme }) => theme.colors.greyDarker};
  &::placeholder {
    color: #55575a;
    font-weight: 500;
  }
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors.greyDropdownFocused}`};
  }
  & + div {
    right: 23px;
  }
`;

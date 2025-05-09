import styled from '@emotion/styled';
import Dropdown from '@components/Dropdown';

export const ColorDropdown = styled(Dropdown)`
  color: ${({ theme }) => theme.colors.greyDarker};
  background: ${({ theme }) => theme.colors.white};

  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey};
  border-radius: 8px;

  &:focus {
    color: ${({ theme }) => theme.colors.greyDarker};
    background: ${({ theme }) => theme.colors.white};
  }

  &:focus::before {
    content: none;
  }
`;

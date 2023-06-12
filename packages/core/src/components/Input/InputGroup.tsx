import styled from '@emotion/styled';

export const InputGroup = styled.div<{ disabled?: boolean }>`
  position: relative;

  width: 100%;

  * {
    color: ${({ theme, disabled }) =>
      disabled ? `${theme.colors.grey} !important` : 'inherit'};
  }
`;

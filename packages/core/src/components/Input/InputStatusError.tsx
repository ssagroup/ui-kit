import styled from '@emotion/styled';

import Icon from '@components/Icon';

import { inputStatus } from './styles';

export const InputError = styled.div`
  background: ${({ theme }) =>
    `linear-gradient(117.5deg, ${theme.colors.red}, ${theme.colors.redLighter});`};

  svg {
    transform: rotateX(180deg);
  }
`;

export const InputStatusError = () => (
  <InputError css={inputStatus}>
    <Icon name="union" size={10} color="#fff" />
  </InputError>
);

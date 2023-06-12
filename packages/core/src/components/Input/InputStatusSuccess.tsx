import styled from '@emotion/styled';

import Icon from '@components/Icon';

import { inputStatus } from './styles';

export const InputSuccess = styled.div`
  background: ${({ theme }) =>
    `linear-gradient(68.38deg, ${theme.colors.greenLighter}, ${theme.colors.green});`}
  }
`;

export const InputStatusSuccess = () => (
  <InputSuccess css={inputStatus}>
    <Icon name="check" size={10} color="#fff" />
  </InputSuccess>
);

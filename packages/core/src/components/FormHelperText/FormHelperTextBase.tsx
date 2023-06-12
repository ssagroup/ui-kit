import styled from '@emotion/styled';

import { InputColors } from '@components/Input/Input.types';

const statusColor: Record<string, InputColors> = {
  error: 'red',
  success: 'greenLighter',
  basic: 'greyDarker60',
};

export const FormHelperTextBase = styled.span<{
  status?: string;
}>`
  display: block;

  font-weight: 400;
  font-size: 0.688rem;

  margin: 6px 0px 0px 4px;

  color: ${({ theme, status = 'basic' }) => theme.colors[statusColor[status]]};
`;

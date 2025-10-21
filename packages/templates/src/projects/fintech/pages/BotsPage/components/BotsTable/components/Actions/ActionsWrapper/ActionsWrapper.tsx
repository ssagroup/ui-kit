import { Wrapper } from '@ssa-ui-kit/core';

import * as S from './styles';

export const ActionsWrapper = ({
  children,
  ...rest
}: Parameters<typeof Wrapper>[0]) => (
  <Wrapper
    direction="column"
    alignItems="flex-start"
    css={S.WrapperStyle}
    {...rest}>
    {children}
  </Wrapper>
);

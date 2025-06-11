import { Wrapper } from '@ssa-ui-kit/core';

export type PanelProps = {
  children: React.ReactNode;
};

export const BasePanel = ({ children }: PanelProps) => (
  <Wrapper
    alignItems="center"
    direction="column"
    css={{ height: '100%', overflow: 'hidden' }}>
    {children}
  </Wrapper>
);

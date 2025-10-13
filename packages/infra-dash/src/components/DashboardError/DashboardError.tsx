import { ErrorIcon } from '@shared/icons';

import { Wrapper } from '@ssa-ui-kit/core';

export type DashboardErrorProps = {
  children?: React.ReactNode;
};

export const DashboardError = ({ children }: DashboardErrorProps) => (
  <Wrapper
    direction="column"
    css={{ justifyContent: 'center', height: '100%' }}>
    <ErrorIcon />
    <div css={{ marginTop: '12px', textAlign: 'center' }}>
      {children ?? 'An error occurred while loading the dashboard'}
    </div>
  </Wrapper>
);

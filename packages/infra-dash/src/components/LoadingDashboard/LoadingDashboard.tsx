import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

import { ProgressCircle, Theme, Wrapper } from '@ssa-ui-kit/core';

export type LoadingDashboardProps = {
  children?: React.ReactNode;
};

export const LoadingDashboard = ({ children }: LoadingDashboardProps) => {
  const theme = useTheme() as Theme;
  return (
    <Wrapper
      direction="column"
      css={{ justifyContent: 'center', height: '100%' }}>
      <ProgressCircle
        classnames={{
          inner: css(`
            background: none !important;
          `),
          outer: css(`
            background: none !important;
            border: 12px solid ${theme.colors.greyLighter};
          `),
        }}
        currentValue={3}
        max={10}
        size={120}
        color="blue"
        mode="infinite"
      />
      {children && (
        <div css={{ marginTop: '12px', textAlign: 'center' }}>{children}</div>
      )}
    </Wrapper>
  );
};

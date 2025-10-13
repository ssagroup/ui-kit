import { css } from '@emotion/css';

import { ProgressCircle, WidgetCard } from '@ssa-ui-kit/core';

export type LoadingPanelProps = {
  title?: string;
  children?: React.ReactNode;
};

export const LoadingPanel = ({ title, children }: LoadingPanelProps) => {
  return (
    <WidgetCard
      title={title}
      contentClassName={css`
        align-items: center !important;
        justify-content: center !important;
      `}>
      <ProgressCircle
        currentValue={3}
        max={10}
        size={64}
        color="blue"
        mode="infinite"
      />
      {children && (
        <div css={{ marginTop: '12px', textAlign: 'center' }}>{children}</div>
      )}
    </WidgetCard>
  );
};

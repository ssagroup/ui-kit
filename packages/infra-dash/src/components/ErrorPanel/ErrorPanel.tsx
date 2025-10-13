import { css } from '@emotion/css';
import { ErrorIcon } from '@shared/icons';

import { WidgetCard } from '@ssa-ui-kit/core';

export type ErrorPanelProps = {
  title?: string;
  children?: React.ReactNode;
};

export const ErrorPanel = ({ title, children }: ErrorPanelProps) => {
  return (
    <WidgetCard
      title={title}
      contentClassName={css`
        align-items: center !important;
        justify-content: center !important;
      `}>
      <ErrorIcon />
      <div css={{ marginTop: '12px', textAlign: 'center' }}>
        {children ?? 'An error occurred while loading the panel'}
      </div>
    </WidgetCard>
  );
};

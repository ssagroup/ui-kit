import React from 'react';

import { useTheme } from '@emotion/react';

import {
  Tooltip,
  TooltipContent,
  TooltipProps,
  TooltipTrigger,
} from '@ssa-ui-kit/core';

interface ViewProps {
  content: React.ReactNode | null;
  children: React.ReactNode;
  className?: string;
  isEnabled?: boolean;
  placement?: Parameters<typeof Tooltip>[0]['placement'];
  tooltipProps?: Omit<TooltipProps, 'children'>;
}

export const ComponentHint = React.forwardRef<HTMLDivElement, ViewProps>(
  function ComponentHintInner(
    {
      content,
      children,
      isEnabled = true,
      placement = 'bottom-start',
      className,
      tooltipProps,
    }: ViewProps,
    ref?: React.ForwardedRef<HTMLDivElement | null>,
  ) {
    const theme = useTheme();
    return (
      <Tooltip
        enableClick={isEnabled}
        enableHover={isEnabled}
        size="medium"
        offsetOptions={0}
        placement={placement}
        hasArrow={false}
        {...tooltipProps}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          ref={ref}
          css={{
            borderRadius: 3,
            background: theme.colors.greyGraphite,
            boxShadow: '0px 10px 40px 0px rgba(93, 102, 112, 0.24)',
            fontWeight: 600,
            fontSize: 12,
            color: theme.colors.white,
            padding: 0,
            zIndex: 10,
          }}
          className={className}>
          {content}
        </TooltipContent>
      </Tooltip>
    );
  },
);

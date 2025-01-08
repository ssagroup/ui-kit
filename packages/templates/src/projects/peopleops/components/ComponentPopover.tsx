import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Popover, PopoverContent, PopoverTrigger } from '@ssa-ui-kit/core';

export interface ComponentPopoverProps {
  content: React.ReactNode | null;
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  isDisabled?: boolean;
  placement?: Parameters<typeof Popover>[0]['placement'];
  popoverProps?: Omit<Parameters<typeof Popover>[0], 'children'>;
  popoverTriggerProps?: Omit<Parameters<typeof PopoverTrigger>[0], 'children'>;
  popoverContentProps?: Omit<Parameters<typeof PopoverContent>[0], 'children'>;
}

export const ComponentPopover = React.forwardRef<
  HTMLDivElement,
  ComponentPopoverProps
>(function ComponentPopoverInner(
  {
    content,
    children,
    asChild = false,
    isDisabled = false,
    placement = 'bottom-start',
    className,
    popoverProps,
    popoverTriggerProps,
    popoverContentProps,
  }: ComponentPopoverProps,
  ref?: React.ForwardedRef<HTMLDivElement | null>,
) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { floatingOptions = {}, ...restPopoverProps } = popoverProps || {};
  return (
    <Popover
      floatingOptions={{
        onOpenChange: setOpen,
        open,
        placement,
        ...floatingOptions,
      }}
      placement="top-start"
      {...restPopoverProps}>
      <PopoverTrigger
        variant="custom"
        dataTestId="component-popover-button"
        isDisabled={isDisabled}
        asChild={asChild}
        css={{
          marginLeft: 10,
          padding: '0 10px',
          cursor: 'pointer',
          backgroundColor: 'unset',
          '& > span': {
            height: '100%',
            alignItems: 'center',
          },
        }}
        className={className}
        {...popoverTriggerProps}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        ref={ref}
        css={{
          borderRadius: 3,
          boxShadow: '0px 10px 40px 0px rgba(93, 102, 112, 0.24)',
          fontWeight: 600,
          fontSize: 12,
          color: theme.colors.white,
          padding: 0,
          zIndex: 10,
        }}
        {...popoverContentProps}>
        {content}
      </PopoverContent>
    </Popover>
  );
});

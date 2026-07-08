'use client';

import { Tooltip, TooltipTrigger, TooltipContent, Button } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function TooltipDemo() {
  return (
    <PreviewRoot>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Tooltip placement="top">
          <TooltipTrigger>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Shown on hover</TooltipContent>
        </Tooltip>

        <Tooltip enableClick enableHover={false} placement="bottom">
          <TooltipTrigger>
            <Button variant="secondary">Click me</Button>
          </TooltipTrigger>
          <TooltipContent>Shown on click</TooltipContent>
        </Tooltip>
      </div>
    </PreviewRoot>
  );
}

'use client';

import { Button } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function ButtonDemo() {
  return (
    <PreviewRoot>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="error">Error</Button>
        <Button>Custom</Button>
      </div>
    </PreviewRoot>
  );
}

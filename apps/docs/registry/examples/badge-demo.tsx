'use client';

import { Badge } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function BadgeDemo() {
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
        <Badge color="purple">Purple</Badge>
        <Badge color="blue">Blue</Badge>
        <Badge color="green">Green</Badge>
        <Badge color="pink">Pink</Badge>
        <Badge color="turquoise" size="small">
          Small
        </Badge>
        <Badge color="yellowWarm" size="large">
          Large
        </Badge>
      </div>
    </PreviewRoot>
  );
}

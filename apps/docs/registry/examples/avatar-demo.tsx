'use client';

import { Avatar, AvatarSizes } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function AvatarDemo() {
  return (
    <PreviewRoot>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar color="purple" text="J" size={AvatarSizes.small} />
        <Avatar color="blue" text="AB" />
        <Avatar color="green" text="K" size={AvatarSizes.large} />
        <Avatar />
      </div>
    </PreviewRoot>
  );
}

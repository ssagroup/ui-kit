'use client';

import { IconButton } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function IconButtonDemo() {
  return (
    <PreviewRoot>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <IconButton icon="edit" onClick={() => {}} aria-label="Edit" />
        <IconButton
          icon="bin"
          onClick={() => {}}
          title="Delete"
          transparent
        />
        <IconButton
          icon="search"
          onClick={() => {}}
          aria-label="Search"
          disabled
        />
      </div>
    </PreviewRoot>
  );
}

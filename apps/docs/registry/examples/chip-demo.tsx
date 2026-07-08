'use client';

import { useState } from 'react';
import { Chip } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function ChipDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript']);

  return (
    <PreviewRoot>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          alignItems: 'center',
        }}
      >
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            color="primary"
            onDelete={() => setTags((prev) => prev.filter((t) => t !== tag))}
          />
        ))}
        <Chip
          label="Active filter"
          icon="filter"
          variant="outlined"
          color="secondary"
        />
        <Chip label="Success" color="success" />
      </div>
    </PreviewRoot>
  );
}

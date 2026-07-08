'use client';

import { useState } from 'react';
import { Checkbox } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <PreviewRoot>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          id="checkbox-demo-controlled"
          text="Controlled checkbox"
          externalState={checked}
          onChange={setChecked}
        />
        <Checkbox
          id="checkbox-demo-success"
          text="Success variant"
          color="success"
          initialState
        />
        <Checkbox
          id="checkbox-demo-indeterminate"
          text="Indeterminate"
          isIndeterminate
        />
        <Checkbox
          id="checkbox-demo-disabled"
          text="Disabled"
          isDisabled
          initialState
        />
      </div>
    </PreviewRoot>
  );
}

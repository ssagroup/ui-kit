'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function RadioGroupDemo() {
  const [selected, setSelected] = useState('apple');

  return (
    <PreviewRoot>
      <RadioGroup
        name="radio-group-demo-fruit"
        value={selected}
        onChange={(value) => setSelected(String(value))}
      >
        <Radio id="radio-group-demo-apple" value="apple" text="Apple" />
        <Radio id="radio-group-demo-orange" value="orange" text="Orange" />
        <Radio
          id="radio-group-demo-banana"
          value="banana"
          text="Banana"
          disabled
        />
      </RadioGroup>
    </PreviewRoot>
  );
}

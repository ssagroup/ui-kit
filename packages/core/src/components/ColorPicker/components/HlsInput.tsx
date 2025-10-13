import { useEffect, useState } from 'react';

import { Color } from '@rc-component/color-picker';

import Wrapper from '@components/Wrapper';

import { BaseInput } from './BaseInput';

export interface HlsInputProps {
  color?: Color | string;
  onChange: (color: string) => void;
}

const hslComponents = ['h', 's', 'l', 'a'] as const;

type HSL = {
  [K in (typeof hslComponents)[number]]: number;
};

export const HlsInput = ({ color, onChange }: HlsInputProps) => {
  const parsedColor = new Color(color || '');
  const hsl = parsedColor.isValid ? parsedColor.toHsl() : null;

  const [rawHsl, setRawHsl] = useState({ h: 0, s: 0, l: 0, a: 0 });
  const [editing, setEditing] = useState(false);

  const toRawHsl = (hsl: HSL) => {
    return {
      h: Math.round(hsl.h),
      s: Math.round(hsl.s * 100),
      l: Math.round(hsl.l * 100),
      a: Number(hsl.a.toFixed(1)),
    };
  };

  useEffect(() => {
    if (editing) {
      return;
    }
    setRawHsl(hsl ? { ...toRawHsl(hsl) } : { h: 0, s: 0, l: 0, a: 0 });
  }, [parsedColor?.toString()]);

  const handleChange = (value: string, component: 'h' | 's' | 'l' | 'a') => {
    const hewHsl = { ...rawHsl, [component]: value };
    setRawHsl(hewHsl);

    const hslStr = `hsl(${hewHsl.h}, ${hewHsl.s}, ${hewHsl.l}, ${hewHsl.a})`;
    onChange(hslStr);
  };

  return (
    <Wrapper css={{ height: '100%' }}>
      {hslComponents.map((component) => (
        <BaseInput
          type="number"
          key={component}
          value={rawHsl[component]}
          onBlur={() => setEditing(false)}
          onFocus={() => setEditing(true)}
          onChange={(e) => handleChange(e.target.value, component)}
        />
      ))}
    </Wrapper>
  );
};

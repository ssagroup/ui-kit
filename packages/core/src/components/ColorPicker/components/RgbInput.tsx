import { useEffect, useState } from 'react';

import { Color } from '@rc-component/color-picker';

import Wrapper from '@components/Wrapper';

import { BaseInput } from './BaseInput';

export interface RgbInputProps {
  color?: Color | string;
  onChange: (color: string) => void;
}

const rgbComponents = ['r', 'g', 'b', 'a'] as const;

type RGB = {
  [K in (typeof rgbComponents)[number]]: number;
};

export const RgbInput = ({ color, onChange }: RgbInputProps) => {
  const parsedColor = new Color(color || '');
  const rgb = parsedColor.isValid ? parsedColor : null;

  const [rawRgb, setRawRgb] = useState({ r: 0, g: 0, b: 0, a: 0 });
  const [editing, setEditing] = useState(false);

  const toRawRgb = (rgb: RGB) => {
    return {
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      a: Number(rgb.a.toFixed(1)),
    };
  };

  useEffect(() => {
    if (editing) {
      return;
    }
    setRawRgb(rgb ? { ...toRawRgb(rgb) } : { r: 0, g: 0, b: 0, a: 0 });
  }, [parsedColor?.toString()]);

  const handleChange = (value: string, component: 'r' | 'g' | 'b' | 'a') => {
    const hewRgb = { ...rawRgb, [component]: value };
    setRawRgb(hewRgb);

    const rgbStr = `rgb(${hewRgb.r}, ${hewRgb.g}, ${hewRgb.b}, ${hewRgb.a})`;
    onChange(rgbStr);
  };

  return (
    <Wrapper css={{ height: '100%' }}>
      {rgbComponents.map((component) => (
        <BaseInput
          type="number"
          key={component}
          value={rawRgb[component]}
          onBlur={() => setEditing(false)}
          onFocus={() => setEditing(true)}
          onChange={(e) => handleChange(e.target.value, component)}
        />
      ))}
    </Wrapper>
  );
};

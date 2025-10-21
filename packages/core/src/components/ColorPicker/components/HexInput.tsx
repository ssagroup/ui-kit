import { useEffect, useState } from 'react';

import { Color } from '@rc-component/color-picker';

import { BaseInput } from './BaseInput';

export interface HexInputProps {
  color?: Color | string;
  onChange: (color: string) => void;
}

export const HexInput = ({ color, onChange }: HexInputProps) => {
  const parsedColor = new Color(color || '');

  const [rawHex, setRawHex] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (editing) {
      return;
    }
    setRawHex(parsedColor.toHexString());
  }, [parsedColor?.toString()]);

  const handleChange = (value: string) => {
    setRawHex(value);
    onChange(value);
  };

  return (
    <BaseInput
      value={rawHex}
      onBlur={() => setEditing(false)}
      onFocus={() => setEditing(true)}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

import { useState } from 'react';

import { ColorPickerProps, ColorsList } from './types';
import { mapColors } from './constants';
import { ColorMarker } from './styles';

const ColorPicker = ({ onChange, initColor }: ColorPickerProps) => {
  const [activeColor, setActiveColor] = useState(initColor || '');

  const handleColorChange = (color: ColorsList) => {
    onChange(color);
    setActiveColor(color);
  };

  return (
    <ul css={{ display: 'flex', gap: 10, listStyle: 'none', padding: 0 }}>
      {(Object.keys(mapColors) as ColorsList[]).map((color) => (
        <li key={color}>
          <ColorMarker
            active={color === activeColor}
            onClick={() => handleColorChange(color)}
            css={[mapColors[color]]}
          />
        </li>
      ))}
    </ul>
  );
};
export default ColorPicker;

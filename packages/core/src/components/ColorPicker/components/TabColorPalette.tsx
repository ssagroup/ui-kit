import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';
import { COLORS_PALETTE } from '../constants';
import { useColorPickerContext } from '../ColorPickerContext';

const TabColorPaletteItem = styled(Wrapper)`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.greySelectedMenuItem};
`;

export const TabColorPalette = () => {
  const { setRawColor } = useColorPickerContext();
  const handleColorSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const selectedColor = target.getAttribute('data-color');
    if (selectedColor) {
      setRawColor(selectedColor);
    }
  };
  return (
    <Wrapper
      css={{
        gap: 16,
        width: 248,
        height: 240,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
      }}>
      {COLORS_PALETTE.map((color) => (
        <TabColorPaletteItem
          key={color}
          data-color={color}
          css={{
            backgroundColor: color,
          }}
          onClick={handleColorSelect}
        />
      ))}
    </Wrapper>
  );
};

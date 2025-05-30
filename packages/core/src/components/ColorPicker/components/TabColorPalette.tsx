import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';
import { useColorPickerContext } from '../ColorPickerContext';

const TabColorPaletteItem = styled(Wrapper)`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.greySelectedMenuItem};
`;

export const TabColorPalette = () => {
  const { setRawColor, colorsPalette } = useColorPickerContext();
  const handleColorSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement;
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
      {colorsPalette?.map((color) => (
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

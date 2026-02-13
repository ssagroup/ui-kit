import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { useTheme } from '@emotion/react';

type ColorPaletteProps = Record<string, never>;

const meta = {
  title: 'Design System/Color Palette',
  component: () => {
    const theme = useTheme();
    const colors = theme.colors as Record<string, string>;

    // Group colors by category
    const colorGroups: Record<string, string[]> = {
      Black: [],
      White: [],
      Grey: [],
      Red: [],
      Green: [],
      Pink: [],
      Yellow: [],
      Turquoise: [],
      Purple: [],
      Blue: [],
      Cyan: [],
      Danger: [],
      Success: [],
      Other: [],
    };

    // Sort colors into groups
    Object.keys(colors).forEach((colorName) => {
      const lowerName = colorName.toLowerCase();
      if (lowerName.startsWith('black')) {
        colorGroups.Black.push(colorName);
      } else if (lowerName.startsWith('white')) {
        colorGroups.White.push(colorName);
      } else if (lowerName.startsWith('grey') || lowerName.startsWith('gray')) {
        colorGroups.Grey.push(colorName);
      } else if (lowerName.startsWith('red')) {
        colorGroups.Red.push(colorName);
      } else if (lowerName.startsWith('green')) {
        colorGroups.Green.push(colorName);
      } else if (lowerName.startsWith('pink')) {
        colorGroups.Pink.push(colorName);
      } else if (lowerName.startsWith('yellow')) {
        colorGroups.Yellow.push(colorName);
      } else if (lowerName.startsWith('turquoise')) {
        colorGroups.Turquoise.push(colorName);
      } else if (lowerName.startsWith('purple')) {
        colorGroups.Purple.push(colorName);
      } else if (lowerName.startsWith('blue')) {
        colorGroups.Blue.push(colorName);
      } else if (lowerName.startsWith('cyan')) {
        colorGroups.Cyan.push(colorName);
      } else if (lowerName.startsWith('danger')) {
        colorGroups.Danger.push(colorName);
      } else if (lowerName.startsWith('success')) {
        colorGroups.Success.push(colorName);
      } else {
        colorGroups.Other.push(colorName);
      }
    });

    return (
      <div
        css={{
          padding: '24px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
        <h1
          css={{
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '8px',
            color: theme.colors.greyDarker,
          }}>
          Color Palette
        </h1>
        <p
          css={{
            fontSize: '16px',
            color: theme.colors.greyDarker80,
            marginBottom: '32px',
          }}>
          All available colors in the design system
        </p>

        {Object.entries(colorGroups).map(([groupName, colorNames]) => {
          if (colorNames.length === 0) return null;

          return (
            <div
              key={groupName}
              css={{
                marginBottom: '48px',
              }}>
              <h2
                css={{
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '16px',
                  color: theme.colors.greyDarker,
                  textTransform: 'capitalize',
                }}>
                {groupName}
              </h2>
              <div
                css={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                }}>
                {colorNames.map((colorName) => {
                  const colorValue = colors[colorName];

                  return (
                    <div
                      key={colorName}
                      css={{
                        border: `1px solid ${theme.colors.greyOutline}`,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: theme.colors.white,
                      }}>
                      <div
                        css={{
                          width: '100%',
                          height: '100px',
                          backgroundColor: colorValue,
                          borderBottom: `1px solid ${theme.colors.greyOutline}`,
                        }}
                      />
                      <div
                        css={{
                          padding: '12px',
                        }}>
                        <div
                          css={{
                            fontSize: '14px',
                            fontWeight: 600,
                            marginBottom: '4px',
                            color: theme.colors.greyDarker,
                          }}>
                          {colorName}
                        </div>
                        <div
                          css={{
                            fontSize: '12px',
                            color: theme.colors.greyDarker80,
                            fontFamily: 'monospace',
                            wordBreak: 'break-all',
                          }}>
                          {colorValue}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
  tags: ['autodocs'],
} satisfies Meta<ColorPaletteProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { ThemeProvider, useTheme, Theme } from '@emotion/react';
import { useState } from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Chip } from '@components/Chip';
import Badge from '@components/Badge';
import Tag from '@components/Tag';
import ProgressCircle from '@components/ProgressCircle';
import ProgressBar from '@components/ProgressBar';
import mainTheme from '@themes/main';

type ThemeCustomizationProps = Record<string, never>;

const meta = {
  title: 'Design System/Theme Customization',
  component: () => {
    const [customBlue, setCustomBlue] = useState('#0066FF');
    const [customGreen, setCustomGreen] = useState('#00CC66');

    // Create custom theme by extending mainTheme and overriding specific colors
    const blueRgb = hexToRgb(customBlue);
    const greenRgb = hexToRgb(customGreen);

    const customTheme: Theme = {
      ...mainTheme,
      colors: {
        ...mainTheme.colors,
        blue: blueRgb,
        blue20: addOpacity(blueRgb, 0.2),
        blueLighter: lightenColor(customBlue, 20),
        blueLight: lightenColor(customBlue, 40),
        green: greenRgb,
        green20: addOpacity(greenRgb, 0.2),
        greenLighter: lightenColor(customGreen, 20),
      },
    };

    return (
      <ThemeProvider theme={customTheme}>
        <ThemeCustomizationContent
          customBlue={customBlue}
          setCustomBlue={setCustomBlue}
          customGreen={customGreen}
          setCustomGreen={setCustomGreen}
        />
      </ThemeProvider>
    );
  },
  tags: ['autodocs'],
} satisfies Meta<ThemeCustomizationProps>;

// Helper function to convert hex to rgb string
function hexToRgb(hex: string): `rgb${string}` {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return `rgb(${r}, ${g}, ${b})` as `rgb${string}`;
}

// Helper function to lighten a hex color and return rgb
function lightenColor(hex: string, percent: number): `rgb${string}` {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + percent * 2.55);
  const g = Math.min(255, ((num >> 8) & 0xff) + percent * 2.55);
  const b = Math.min(255, (num & 0xff) + percent * 2.55);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})` as `rgb${string}`;
}

// Helper function to add opacity to rgb color
function addOpacity(rgb: string, opacity: number): `rgb${string}` {
  return rgb
    .replace('rgb(', `rgba(`)
    .replace(')', `, ${opacity})`) as `rgb${string}`;
}

function ThemeCustomizationContent({
  customBlue,
  setCustomBlue,
  customGreen,
  setCustomGreen,
}: {
  customBlue: string;
  setCustomBlue: (color: string) => void;
  customGreen: string;
  setCustomGreen: (color: string) => void;
}) {
  const theme = useTheme();

  return (
    <div
      css={{
        padding: '24px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
      <Typography variant="h1" gutter>
        Theme Customization
      </Typography>
      <Typography variant="h3" color={theme.colors.greyDarker80}>
        How to override theme colors in your project
      </Typography>

      {/* Introduction */}
      <div
        css={{
          marginTop: '32px',
          padding: '24px',
          backgroundColor: theme.colors.greyLighter,
          borderRadius: '8px',
          border: `1px solid ${theme.colors.greyOutline}`,
        }}>
        <Typography variant="h3" gutter>
          Overview
        </Typography>
        <Typography variant="body1" color={theme.colors.greyDarker80} gutter>
          You can override any theme color by creating a custom theme that
          extends the default <code>mainTheme</code>. All components using the
          overridden color will automatically use your custom color.
        </Typography>
        <Typography variant="body1" color={theme.colors.greyDarker80}>
          <strong>Note:</strong> Overriding a color affects all components using
          that color globally. For example, overriding <code>blue</code> will
          affect Button <code>info</code> variant, Chip <code>primary</code>{' '}
          color, and any other component using <code>theme.colors.blue</code>.
        </Typography>
      </div>

      {/* Code Example */}
      <div
        css={{
          marginTop: '48px',
        }}>
        <Typography variant="h2" gutter>
          Implementation
        </Typography>
        <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
          Method 1: Override Specific Colors (Recommended)
        </Typography>
        <div
          css={{
            marginTop: '16px',
            padding: '24px',
            backgroundColor: theme.colors.greyLighter,
            border: `1px solid ${theme.colors.greyOutline}`,
            borderRadius: '8px',
            overflow: 'auto',
          }}>
          <pre
            css={{
              margin: 0,
              padding: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily:
                'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
              fontSize: '13px',
              lineHeight: '1.5',
              color: theme.colors.greyDarker,
              backgroundColor: 'transparent',
            }}>
            {`import { ThemeProvider } from '@emotion/react';
import { mainTheme, Theme } from '@ssa-ui-kit/core';

// Create your custom theme by spreading mainTheme
// and overriding specific colors
const customTheme: Theme = {
  ...mainTheme,
  colors: {
    ...mainTheme.colors,
    blue: '#0066FF', // Your custom blue color
    blue20: 'rgba(0, 102, 255, 0.2)', // Override opacity variants
    blueLighter: '#3385FF',
    // Override any other colors you need
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* All components using theme.colors.blue
          will now use your custom color */}
      <YourComponents />
    </ThemeProvider>
  );
}`}
          </pre>
        </div>
      </div>

      {/* Interactive Example */}
      <div
        css={{
          marginTop: '48px',
        }}>
        <Typography variant="h2" gutter>
          Interactive Example
        </Typography>
        <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
          Try changing the colors below to see how components update
          automatically
        </Typography>

        {/* Color Pickers */}
        <div
          css={{
            marginTop: '24px',
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
            <Typography variant="subtitle" color={theme.colors.greyDarker80}>
              Custom Blue Color
            </Typography>
            <input
              type="color"
              value={customBlue}
              onChange={(e) => setCustomBlue(e.target.value)}
              css={{
                width: '100px',
                height: '40px',
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            <Typography variant="caption" color={theme.colors.greyDarker80}>
              {customBlue}
            </Typography>
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
            <Typography variant="subtitle" color={theme.colors.greyDarker80}>
              Custom Green Color
            </Typography>
            <input
              type="color"
              value={customGreen}
              onChange={(e) => setCustomGreen(e.target.value)}
              css={{
                width: '100px',
                height: '40px',
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            <Typography variant="caption" color={theme.colors.greyDarker80}>
              {customGreen}
            </Typography>
          </div>
        </div>

        {/* Components Using Custom Colors */}
        <div
          css={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: theme.colors.white,
            border: `1px solid ${theme.colors.greyOutline}`,
            borderRadius: '8px',
          }}>
          <Typography variant="h3" gutter>
            Components Using Custom Blue
          </Typography>
          <div
            css={{
              marginTop: '16px',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Button variant="info" size="medium">
              Button (info variant)
            </Button>
            <Chip label="Primary Chip" color="primary" variant="filled" />
            <Chip label="Primary Chip" color="primary" variant="outlined" />
            <Badge color="blue" size="medium">
              Blue Badge
            </Badge>
            <Tag color="blue" size="medium">
              Blue Tag
            </Tag>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}>
              <ProgressCircle
                max={100}
                currentValue={75}
                size={60}
                color="blue"
              />
              <Typography variant="caption" color={theme.colors.greyDarker80}>
                ProgressCircle
              </Typography>
            </div>
            <div
              css={{
                width: '200px',
              }}>
              <ProgressBar percentage={75} color="blue" />
            </div>
          </div>
        </div>

        <div
          css={{
            marginTop: '24px',
            padding: '24px',
            backgroundColor: theme.colors.white,
            border: `1px solid ${theme.colors.greyOutline}`,
            borderRadius: '8px',
          }}>
          <Typography variant="h3" gutter>
            Components Using Custom Green
          </Typography>
          <div
            css={{
              marginTop: '16px',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Chip label="Success Chip" color="success" variant="filled" />
            <Chip label="Success Chip" color="success" variant="outlined" />
            <Badge color="green" size="medium">
              Green Badge
            </Badge>
            <Tag color="green" size="medium">
              Green Tag
            </Tag>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}>
              <ProgressCircle
                max={100}
                currentValue={75}
                size={60}
                color="green"
              />
              <Typography variant="caption" color={theme.colors.greyDarker80}>
                ProgressCircle
              </Typography>
            </div>
            <div
              css={{
                width: '200px',
              }}>
              <ProgressBar percentage={75} color="green" />
            </div>
          </div>
        </div>
      </div>

      {/* TypeScript Setup */}
      <div
        css={{
          marginTop: '48px',
        }}>
        <Typography variant="h2" gutter>
          TypeScript Setup
        </Typography>
        <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
          For TypeScript projects, add type augmentation to enable theme
          autocomplete
        </Typography>
        <div
          css={{
            marginTop: '16px',
            padding: '24px',
            backgroundColor: theme.colors.greyLighter,
            border: `1px solid ${theme.colors.greyOutline}`,
            borderRadius: '8px',
            overflow: 'auto',
          }}>
          <pre
            css={{
              margin: 0,
              padding: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily:
                'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
              fontSize: '13px',
              lineHeight: '1.5',
              color: theme.colors.greyDarker,
              backgroundColor: 'transparent',
            }}>
            {`// In your types/emotion.d.ts or main entry file
import '@emotion/react';
import { Theme as T } from '@ssa-ui-kit/core';

declare module '@emotion/react' {
  export interface Theme extends T {}
}`}
          </pre>
        </div>
      </div>

      {/* Best Practices */}
      <div
        css={{
          marginTop: '48px',
        }}>
        <Typography variant="h2" gutter>
          Best Practices
        </Typography>
        <div
          css={{
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
          <div
            css={{
              padding: '16px',
              backgroundColor: theme.colors.white,
              border: `1px solid ${theme.colors.greyOutline}`,
              borderRadius: '8px',
            }}>
            <Typography variant="h4" gutter>
              1. Override Opacity Variants
            </Typography>
            <Typography variant="body1" color={theme.colors.greyDarker80}>
              When overriding a color, also override its opacity variants (e.g.,{' '}
              <code>blue20</code>, <code>blue40</code>) to maintain visual
              consistency across components.
            </Typography>
          </div>
          <div
            css={{
              padding: '16px',
              backgroundColor: theme.colors.white,
              border: `1px solid ${theme.colors.greyOutline}`,
              borderRadius: '8px',
            }}>
            <Typography variant="h4" gutter>
              2. Use Spread Operator
            </Typography>
            <Typography variant="body1" color={theme.colors.greyDarker80}>
              Always spread <code>mainTheme</code> first to preserve all default
              colors, then override only what you need. This ensures you
              don&#39;t miss any required color tokens.
            </Typography>
          </div>
          <div
            css={{
              padding: '16px',
              backgroundColor: theme.colors.white,
              border: `1px solid ${theme.colors.greyOutline}`,
              borderRadius: '8px',
            }}>
            <Typography variant="h4" gutter>
              3. Global Impact
            </Typography>
            <Typography variant="body1" color={theme.colors.greyDarker80}>
              Remember that color overrides are global. If you override{' '}
              <code>blue</code>, it will affect all components using that color
              throughout your application.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

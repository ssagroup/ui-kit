import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { ThemeProvider, useTheme, Theme } from '@emotion/react';
import { useState } from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { Chip } from '@components/Chip';
import Badge from '@components/Badge';
import Tag from '@components/Tag';
import mainTheme from '@themes/main';
import Icon from '@components/Icon';

type ThemeCustomizationProps = Record<string, never>;

const meta = {
  title: 'Design System/Theme Customization',
  component: () => {
    const [customPrimary, setCustomPrimary] = useState('#0066FF');
    const [customSuccess, setCustomSuccess] = useState('#00CC66');

    // Create custom theme with palette override for Button variants
    const primaryRgb = hexToRgb(customPrimary);
    const successRgb = hexToRgb(customSuccess);

    const customTheme: Theme = {
      ...mainTheme,
      palette: {
        ...mainTheme.palette,
        primary: {
          main: primaryRgb,
          light: lightenColor(customPrimary, 15),
          dark: lightenColor(customPrimary, -20),
        },
        success: {
          main: successRgb,
          light: lightenColor(customSuccess, 15),
          dark: lightenColor(customSuccess, -20),
        },
      },
    };

    return (
      <ThemeProvider theme={customTheme}>
        <ThemeCustomizationContent
          customPrimary={customPrimary}
          setCustomPrimary={setCustomPrimary}
          customSuccess={customSuccess}
          setCustomSuccess={setCustomSuccess}
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

function ThemeCustomizationContent({
  customPrimary,
  setCustomPrimary,
  customSuccess,
  setCustomSuccess,
}: {
  customPrimary: string;
  setCustomPrimary: (color: string) => void;
  customSuccess: string;
  setCustomSuccess: (color: string) => void;
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
          You can override theme colors in two ways:
        </Typography>
        <div css={{ marginLeft: '24px', color: theme.colors.greyDarker80 }}>
          <div css={{ marginBottom: '8px' }}>
            <strong>Palette Override:</strong> Override Button variant colors
            independently using <code>theme.palette</code>. This only affects
            Button components.
          </div>
          <div>
            <strong>Theme Colors Override:</strong> Override specific theme
            colors using <code>theme.colors</code>. This affects all components
            using those colors globally.
          </div>
        </div>
        <Typography variant="body1" color={theme.colors.greyDarker80}>
          <strong>Recommendation:</strong> Use palette override for Button
          variants to avoid affecting other components. Use theme colors
          override when you want to change a color across the entire design
          system.
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

        {/* Method 1: Palette Override */}
        <div css={{ marginTop: '32px' }}>
          <Typography variant="h3" gutter>
            Method 1: Override Palette Colors (Recommended for Button Variants)
          </Typography>
          <Typography variant="body2" color={theme.colors.greyDarker80} gutter>
            Override Button variant colors independently using the palette
            system. This only affects Button components, not other components
            using theme colors.
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

// Override Button variant colors using palette
// This only affects Button components, not other components
const customTheme: Theme = {
  ...mainTheme,
  palette: {
    ...mainTheme.palette,
    primary: {
      main: 'rgb(0, 102, 255)',   // default background
      dark: 'rgb(0, 51, 204)',    // hover + active background
      light: 'rgb(51, 133, 255)', // focus background
    },
    // Override other variants as needed:
    // secondary, tertiary, error, warning, success
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Button variant="primary" will use your custom primary color */}
      <Button variant="primary">Custom Primary</Button>
      {/* Other components using theme.colors.blue are unaffected */}
    </ThemeProvider>
  );
}`}
            </pre>
          </div>
        </div>

        {/* Method 2: Theme Colors Override */}
        <div css={{ marginTop: '32px' }}>
          <Typography variant="h3" gutter>
            Method 2: Override Theme Colors (Affects All Components)
          </Typography>
          <Typography variant="body2" color={theme.colors.greyDarker80} gutter>
            Override specific theme colors. This affects all components using
            those colors globally. Use this when you want to change a color
            across the entire design system.
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

// Override theme colors - affects ALL components using these colors
const customTheme: Theme = {
  ...mainTheme,
  colors: {
    ...mainTheme.colors,
    blue: 'rgb(0, 102, 255)', // Custom blue color
    blue20: 'rgba(0, 102, 255, 0.2)', // Override opacity variants
    blueLighter: 'rgb(51, 133, 255)',
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
          Try changing the palette colors below to see how Button variants
          update automatically
        </Typography>
        <Typography variant="body2" color={theme.colors.greyDarker80} gutter>
          Note: Palette overrides only affect Button components. Other
          components using theme.colors remain unchanged.
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
              Custom Primary Color
            </Typography>
            <input
              type="color"
              value={customPrimary}
              onChange={(e) => setCustomPrimary(e.target.value)}
              css={{
                width: '100px',
                height: '40px',
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            <Typography variant="caption" color={theme.colors.greyDarker80}>
              {customPrimary}
            </Typography>
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
            <Typography variant="subtitle" color={theme.colors.greyDarker80}>
              Custom Success Color
            </Typography>
            <input
              type="color"
              value={customSuccess}
              onChange={(e) => setCustomSuccess(e.target.value)}
              css={{
                width: '100px',
                height: '40px',
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            <Typography variant="caption" color={theme.colors.greyDarker80}>
              {customSuccess}
            </Typography>
          </div>
        </div>

        {/* Components Using Custom Palette Colors */}
        <div
          css={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: theme.colors.white,
            border: `1px solid ${theme.colors.greyOutline}`,
            borderRadius: '8px',
          }}>
          <Typography variant="h3" gutter>
            Button Components Using Custom Palette Colors
          </Typography>
          <Typography variant="body2" color={theme.colors.greyDarker80} gutter>
            These buttons use palette colors - only Button components are
            affected by palette overrides.
          </Typography>
          <div
            css={{
              marginTop: '16px',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Button
              variant="tertiary"
              css={{
                height: 'auto',
                padding: 0,
              }}
              startIcon={
                <Icon
                  name="check"
                  size={10}
                  css={{ marginLeft: 'auto', minWidth: 10 }}
                />
              }
            />
            <Button variant="primary" size="medium">
              Primary Button
            </Button>
            <Button variant="secondary" size="medium">
              Secondary Button
            </Button>
            <Button variant="tertiary" size="medium">
              Tertiary Button
            </Button>
            <Button variant="success" size="medium">
              Success Button
            </Button>
            <Button variant="warning" size="medium">
              Warning Button
            </Button>
            <Button variant="error" size="medium">
              Error Button
            </Button>
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
            Other Components (Unaffected by Palette)
          </Typography>
          <Typography variant="body2" color={theme.colors.greyDarker80} gutter>
            These components use theme.colors directly - they are not affected
            by palette overrides.
          </Typography>
          <div
            css={{
              marginTop: '16px',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Chip label="Primary Chip" color="primary" variant="filled" />
            <Chip label="Secondary Chip" color="secondary" variant="filled" />
            <Badge color="blue" size="medium">
              Blue Badge
            </Badge>
            <Tag color="blue" size="medium">
              Blue Tag
            </Tag>
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
              1. Use Palette for Button Variants
            </Typography>
            <Typography variant="body1" color={theme.colors.greyDarker80}>
              Override Button variant colors using <code>theme.palette</code> to
              avoid affecting other components. This is the recommended approach
              for customizing Button primary, secondary, tertiary, error,
              warning, and success variants.
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
              colors and palette, then override only what you need. This ensures
              you don't miss any required tokens.
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
              3. Understand Global Impact
            </Typography>
            <Typography variant="body1" color={theme.colors.greyDarker80}>
              Palette overrides only affect Button components. Theme color
              overrides affect all components using those colors globally.
              Choose the appropriate method based on your needs.
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

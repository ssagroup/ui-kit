import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import Typography from '@components/Typography';
import Button from './index';
import { Chip } from '@components/Chip';
import Badge from '@components/Badge';
import Tag from '@components/Tag';
import ProgressCircle from '@components/ProgressCircle';
import ProgressBar from '@components/ProgressBar';
import Checkbox from '@components/Checkbox';
import Radio from '@components/Radio';
import Wrapper from '@components/Wrapper';

type ComponentVariantsPaletteProps = Record<string, never>;

const buttonVariants = [
  'primary',
  'secondary',
  'tertiary',
  'error',
  'warning',
  'success',
] as const;

const chipColors = [
  'default',
  'primary',
  'success',
  'error',
  'info',
  'warning',
] as const;

const chipVariants = ['filled', 'outlined'] as const;

const mainColors = [
  'pink',
  'yellow',
  'yellowWarm',
  'green',
  'turquoise',
  'purple',
  'blueLight',
  'blue',
] as const;

const meta = {
  title: 'Design System/Component Variants Palette',
  component: () => {
    const theme = useTheme();
    const [checkboxStates, setCheckboxStates] = useState({
      green: false,
      blue: false,
      custom: false,
    });
    const [radioValue, setRadioValue] = useState('default');

    return (
      <div
        css={{
          padding: '24px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
        <Typography variant="h1" gutter>
          Component Variants Palette
        </Typography>
        <Typography variant="h3" color={theme.colors.greyDarker80}>
          Color and variant patterns used across components in the design system
        </Typography>
        <Typography
          variant="h6"
          color={theme.colors.greyDarker80}
          css={{ marginTop: '8px' }}>
          <strong>Note:</strong> Currently, there&#39;s no Button-specific way
          to override just the Button primary color without affecting other
          components. The Button uses shared theme colors (greyDarker, greyDark,
          etc.), so any override via ThemeProvider would be global and affect
          all components using those colors.
        </Typography>

        {/* Pattern 1: Button Action Variants */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Pattern 1: Action Variants (Primary/Secondary/Tertiary)
          </Typography>
          <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
            Button component uses semantic action variants for different
            emphasis levels
          </Typography>
          <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
            Button component supports multiple variants for different use cases
            and visual hierarchy
          </Typography>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginTop: '24px',
            }}>
            {buttonVariants.map((variant) => (
              <div
                key={variant}
                css={{
                  border: `1px solid ${theme.colors.greyOutline}`,
                  borderRadius: '8px',
                  padding: '24px',
                  backgroundColor: theme.colors.white,
                }}>
                <div
                  css={{
                    marginBottom: '16px',
                  }}>
                  <Typography
                    variant="subtitle"
                    color={theme.colors.greyDarker80}>
                    {`variant="${variant}"`}
                  </Typography>
                </div>
                <div
                  css={{
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}>
                  <Button variant={variant} size="small">
                    Small {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                  <Button variant={variant} size="medium">
                    Medium {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                  <Button variant={variant} size="large">
                    Large {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                  <Button variant={variant} size="medium" isDisabled>
                    Disabled
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern 2: Chip Semantic Colors */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Pattern 2: Semantic Color System (Chip)
          </Typography>
          <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
            Chip component uses semantic colors with meaning: primary, success,
            error, info, warning
          </Typography>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginTop: '24px',
            }}>
            {chipVariants.map((variant) => (
              <div
                key={variant}
                css={{
                  border: `1px solid ${theme.colors.greyOutline}`,
                  borderRadius: '8px',
                  padding: '24px',
                  backgroundColor: theme.colors.white,
                }}>
                <div
                  css={{
                    marginBottom: '16px',
                  }}>
                  <Typography
                    variant="subtitle"
                    color={theme.colors.greyDarker80}>
                    {`variant="${variant}"`}
                  </Typography>
                </div>
                <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
                  {chipColors.map((color) => (
                    <Chip
                      key={`${variant}-${color}`}
                      label={color}
                      variant={variant}
                      color={color}
                    />
                  ))}
                </Wrapper>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern 3: Named Color Palette */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Pattern 3: Named Color Palette (MainColors)
          </Typography>
          <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
            Badge, Tag, ProgressCircle, and ProgressBar use named colors from
            the MainColors palette
          </Typography>

          {/* Badge */}
          <div
            css={{
              marginTop: '24px',
            }}>
            <Typography variant="h3" gutter>
              Badge
            </Typography>
            <div
              css={{
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '8px',
                padding: '24px',
                backgroundColor: theme.colors.white,
                marginTop: '16px',
              }}>
              <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
                {mainColors.map((color) => (
                  <Badge key={color} color={color} size="medium">
                    {color}
                  </Badge>
                ))}
              </Wrapper>
            </div>
          </div>

          {/* Tag */}
          <div
            css={{
              marginTop: '24px',
            }}>
            <Typography variant="h3" gutter>
              Tag
            </Typography>
            <div
              css={{
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '8px',
                padding: '24px',
                backgroundColor: theme.colors.white,
                marginTop: '16px',
              }}>
              <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
                {mainColors.map((color) => (
                  <Tag key={color} color={color} size="medium">
                    {color}
                  </Tag>
                ))}
              </Wrapper>
            </div>
          </div>

          {/* ProgressCircle */}
          <div
            css={{
              marginTop: '24px',
            }}>
            <Typography variant="h3" gutter>
              ProgressCircle
            </Typography>
            <div
              css={{
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '8px',
                padding: '24px',
                backgroundColor: theme.colors.white,
                marginTop: '16px',
              }}>
              <Wrapper
                css={{
                  gap: '24px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}>
                {mainColors.map((color) => (
                  <div
                    key={color}
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
                      color={color}
                    />
                    <Typography
                      variant="caption"
                      color={theme.colors.greyDarker80}>
                      {color}
                    </Typography>
                  </div>
                ))}
              </Wrapper>
            </div>
          </div>

          {/* ProgressBar */}
          <div
            css={{
              marginTop: '24px',
            }}>
            <Typography variant="h3" gutter>
              ProgressBar
            </Typography>
            <div
              css={{
                border: `1px solid ${theme.colors.greyOutline}`,
                borderRadius: '8px',
                padding: '24px',
                backgroundColor: theme.colors.white,
                marginTop: '16px',
              }}>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                {mainColors.map((color) => (
                  <div key={color}>
                    <Typography
                      variant="caption"
                      color={theme.colors.greyDarker80}
                      gutter>
                      {color}
                    </Typography>
                    <ProgressBar percentage={75} color={color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pattern 4: Simple Color Options */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Pattern 4: Simple Color Options (Checkbox)
          </Typography>
          <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
            Checkbox component supports limited color options: green, blue,
            custom
          </Typography>
          <div
            css={{
              border: `1px solid ${theme.colors.greyOutline}`,
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: theme.colors.white,
              marginTop: '24px',
            }}>
            <Wrapper css={{ gap: '24px', flexDirection: 'column' }}>
              <div
                css={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                <Checkbox
                  text="Green (default)"
                  color="green"
                  externalState={checkboxStates.green}
                  onChange={(checked) =>
                    setCheckboxStates({ ...checkboxStates, green: checked })
                  }
                />
              </div>
              <div
                css={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                <Checkbox
                  text="Blue"
                  color="blue"
                  externalState={checkboxStates.blue}
                  onChange={(checked) =>
                    setCheckboxStates({ ...checkboxStates, blue: checked })
                  }
                />
              </div>
              <div
                css={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                <Checkbox
                  text="Custom"
                  color="custom"
                  externalState={checkboxStates.custom}
                  onChange={(checked) =>
                    setCheckboxStates({ ...checkboxStates, custom: checked })
                  }
                />
              </div>
            </Wrapper>
          </div>
        </div>

        {/* Pattern 5: Custom Color String */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Pattern 5: Custom Color String
          </Typography>
          <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
            Typography, Stepper, and ColorPicker accept any CSS color string
          </Typography>
          <div
            css={{
              border: `1px solid ${theme.colors.greyOutline}`,
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: theme.colors.white,
              marginTop: '24px',
            }}>
            <Typography variant="h3" gutter>
              Typography Examples
            </Typography>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '16px',
              }}>
              <Typography variant="h3" color="#FF6B6B">
                Red text (#FF6B6B)
              </Typography>
              <Typography variant="h3" color="#4ECDC4">
                Teal text (#4ECDC4)
              </Typography>
              <Typography variant="h3" color="#FFE66D">
                Yellow text (#FFE66D)
              </Typography>
              <Typography variant="h3" color="#95E1D3">
                Mint text (#95E1D3)
              </Typography>
            </div>
          </div>
        </div>

        {/* Pattern 6: Color Object */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Pattern 6: Color Object (Radio)
          </Typography>
          <Typography variant="h6" color={theme.colors.greyDarker80} gutter>
            Radio component accepts a colors object with multiple color
            properties
          </Typography>
          <div
            css={{
              border: `1px solid ${theme.colors.greyOutline}`,
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: theme.colors.white,
              marginTop: '24px',
            }}>
            <Wrapper css={{ gap: '24px', flexDirection: 'column' }}>
              <Radio
                name="radio-example"
                value="default"
                text="Default colors"
                isChecked={radioValue === 'default'}
                onChange={(value) => setRadioValue(value)}
              />
              <Radio
                name="radio-example"
                value="custom"
                text="Custom colors"
                isChecked={radioValue === 'custom'}
                onChange={(value) => setRadioValue(value)}
                colors={{
                  default: '#4ECDC4',
                  hovered: '#45B8B0',
                  disabled: '#CCCCCC',
                  focusShadow: '#4ECDC4',
                }}
              />
            </Wrapper>
          </div>
        </div>

        {/* Pattern Summary */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Pattern Summary
          </Typography>
          <div
            css={{
              border: `1px solid ${theme.colors.greyOutline}`,
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: theme.colors.white,
              marginTop: '24px',
            }}>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
              <div>
                <Typography variant="h3" gutter>
                  Pattern 1: Action Variants
                </Typography>
                <Typography variant="h6" color={theme.colors.greyDarker80}>
                  <strong>Button</strong> - Uses variant prop: primary,
                  secondary, tertiary, error, warning, success
                </Typography>
              </div>
              <div>
                <Typography variant="h3" gutter>
                  Pattern 2: Semantic Colors
                </Typography>
                <Typography variant="h6" color={theme.colors.greyDarker80}>
                  <strong>Chip</strong> - Uses color prop: default, primary,
                  success, error, info, warning
                </Typography>
              </div>
              <div>
                <Typography variant="h3" gutter>
                  Pattern 3: Named Color Palette
                </Typography>
                <Typography variant="h6" color={theme.colors.greyDarker80}>
                  <strong>Badge, Tag, ProgressCircle, ProgressBar</strong> - Use
                  color prop with MainColors: pink, yellow, yellowWarm, green,
                  turquoise, purple, blueLight, blue
                </Typography>
              </div>
              <div>
                <Typography variant="h3" gutter>
                  Pattern 4: Simple Color Options
                </Typography>
                <Typography variant="h6" color={theme.colors.greyDarker80}>
                  <strong>Checkbox</strong> - Uses color prop: green, blue,
                  custom
                </Typography>
              </div>
              <div>
                <Typography variant="h3" gutter>
                  Pattern 5: Custom Color String
                </Typography>
                <Typography variant="h6" color={theme.colors.greyDarker80}>
                  <strong>Typography, Stepper, ColorPicker</strong> - Accept any
                  CSS color string
                </Typography>
              </div>
              <div>
                <Typography variant="h3" gutter>
                  Pattern 6: Color Object
                </Typography>
                <Typography variant="h6" color={theme.colors.greyDarker80}>
                  <strong>Radio</strong> - Uses colors object with default,
                  hovered, disabled, focusShadow properties
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  tags: ['autodocs'],
} satisfies Meta<ComponentVariantsPaletteProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

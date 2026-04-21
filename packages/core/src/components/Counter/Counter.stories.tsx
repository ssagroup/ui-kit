import type { Meta, StoryObj } from '@storybook/react-webpack5';
import styled from '@emotion/styled';

import { Counter } from './Counter';
import { CounterVariants } from './types';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  argTypes: {
    variant: {
      options: Object.values(CounterVariants),
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
    },
    count: {
      control: { type: 'number' },
    },
    color: {
      control: { type: 'text' },
    },
  },
  args: {
    count: 1,
    variant: CounterVariants.primary,
    size: 'medium',
  },
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default counter with `size="medium"` and `variant="primary"`. Use the controls to explore all props.',
      },
    },
  },
};

// ─── AllStates ────────────────────────────────────────────────────────────────

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Label = styled.span`
  font-family: Manrope, sans-serif;
  font-size: 12px;
  color: #888;
  width: 72px;
  flex-shrink: 0;
`;

const SIZES = ['small', 'medium', 'large'] as const;
const VARIANTS = Object.values(CounterVariants);

export const WithoutCount = {
  parameters: {
    docs: {
      description: {
        story:
          'When `count` is omitted the counter collapses to a dot (`dot` size) regardless of the `size` prop. Useful as a presence or notification indicator with no number.',
      },
    },
  },
  argTypes: {
    variant: { control: false },
    size: { control: false },
    count: { control: false },
    color: { control: false },
  },
  render: () => (
    <Grid>
      {SIZES.map((size) => (
        <Row key={size}>
          <Label>{size}</Label>
          {VARIANTS.map((variant) => (
            <Counter key={variant} size={size} variant={variant} />
          ))}
        </Row>
      ))}
    </Grid>
  ),
};

export const AllVariants = () => (
  <Grid>
    {SIZES.map((size) => (
      <Row key={size}>
        <Label>{size}</Label>
        {VARIANTS.map((variant) => (
          <Counter key={variant} count={1} size={size} variant={variant} />
        ))}
      </Row>
    ))}

    {SIZES.map((size) => (
      <Row key={`overflow-${size}`}>
        <Label>{`${size}`}</Label>
        {VARIANTS.map((variant) => (
          <Counter key={variant} count={100} size={size} variant={variant} />
        ))}
      </Row>
    ))}
  </Grid>
);

AllVariants.parameters = {
  docs: {
    description: {
      story:
        'All five semantic variants across all three sizes, shown with a single-digit count and with an overflow count (`"99+"`).',
    },
  },
};
AllVariants.argTypes = {
  variant: { control: false },
  size: { control: false },
  count: { control: false },
  color: { control: false },
};

// ─── PaletteColors ────────────────────────────────────────────────────────────

const PALETTE_COLORS = [
  'purple',
  'blue',
  'blueLight',
  'turquoise',
  'cyanTeal',
  'yellow',
  'orange',
  'red',
] as const;

export const PaletteColors = () => (
  <Grid>
    {SIZES.map((size) => (
      <Row key={size}>
        <Label>{size}</Label>
        {PALETTE_COLORS.map((color) => (
          <Counter key={color} count={1} size={size} color={color} />
        ))}
      </Row>
    ))}

    {SIZES.map((size) => (
      <Row key={size}>
        <Label>{size}</Label>
        {PALETTE_COLORS.map((color) => (
          <Counter key={color} count={101} size={size} color={color} />
        ))}
      </Row>
    ))}
  </Grid>
);

PaletteColors.parameters = {
  docs: {
    description: {
      story:
        'Color override using `theme.colors` key names (`purple`, `blue`, `blueLight`, `turquoise`, `cyan`, `yellow`, `orange`, `red`, etc). Token keys resolve to the exact design system value; unrecognized strings fall back to raw CSS.',
    },
  },
};
PaletteColors.argTypes = {
  variant: { control: false },
  size: { control: false },
  count: { control: false },
  color: { control: false },
};

// ─── CustomColors ─────────────────────────────────────────────────────────────

const CUSTOM_COLORS = [
  '#e63946',
  '#f4a261',
  '#2a9d8f',
  '#457b9d',
  '#6a4c93',
  '#f72585',
  '#3a86ff',
  '#06d6a0',
] as const;

export const CustomColors = () => (
  <Grid>
    {SIZES.map((size) => (
      <Row key={size}>
        <Label>{size}</Label>
        {CUSTOM_COLORS.map((color) => (
          <Counter key={color} count={1} size={size} color={color} />
        ))}
      </Row>
    ))}

    {SIZES.map((size) => (
      <Row key={size}>
        <Label>{size}</Label>
        {CUSTOM_COLORS.map((color) => (
          <Counter key={color} count={111} size={size} color={color} />
        ))}
      </Row>
    ))}
  </Grid>
);

CustomColors.parameters = {
  docs: {
    description: {
      story:
        'Arbitrary hex colors passed as raw CSS strings via the `color` prop. These bypass `theme.colors` and are applied directly as the background.',
    },
  },
};
CustomColors.argTypes = {
  variant: { control: false },
  size: { control: false },
  count: { control: false },
  color: { control: false },
};

// ─── WithCustomCss ────────────────────────────────────────────────────────────

export const WithCustomCss: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The `css` prop is applied last in the style cascade (after size, variant, and color), so it can override any internal style. Here it overrides the background color, adjusts the border radius, and adds a box shadow.',
      },
    },
  },
  args: {
    count: 42,
    size: 'large',
    variant: CounterVariants.secondary,
    css: {
      borderRadius: 12,
      letterSpacing: 2,
      boxShadow: '0 4px 14px rgba(26, 26, 46, 0.5)',
      padding: '4px 24px',
      background: '#1a1a2e',
    },
  },
};

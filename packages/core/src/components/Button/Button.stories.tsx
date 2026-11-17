import type { Meta } from '@storybook/react-webpack5';

import Icon from '@components/Icon';

import Button from './index';
import {
  GridWrapper,
  HeaderTitle,
  InheritColors,
  sizes,
  variants,
} from './helpers.stories-extra';
import React from 'react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: ['small', 'medium', 'large'],
      control: {
        type: 'inline-radio',
      },
    },
    startIcon: {
      description: 'Icon to be displayed before the text.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      control: {
        disable: true,
      },
    },
    endIcon: {
      description: 'Icon to be displayed after the text.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      control: {
        disable: true,
      },
    },
    variant: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'custom',
        'error',
        'warning',
        'success',
      ],
      control: {
        type: 'inline-radio',
      },
    },
    ref: {
      control: {
        disable: true,
      },
    },
    key: {
      control: {
        disable: true,
      },
    },
  },
  args: {
    text: 'Button',
    size: 'small',
    variant: 'custom',
    type: 'button',
  },
} as Meta<typeof Button>;

export const Default = {};

export const AllStates = () => (
  <GridWrapper>
    <HeaderTitle>Variant</HeaderTitle>
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {variants.map((variant) => (
      <React.Fragment key={variant}>
        <HeaderTitle css={{ width: 80 }}>{variant}</HeaderTitle>
        {sizes.map((size) => (
          <Button variant={variant} size={size} key={variant + size}>
            Button
          </Button>
        ))}
      </React.Fragment>
    ))}
  </GridWrapper>
);

AllStates.args = {
  name: 'All States',
};
AllStates.parameters = {
  docs: {
    description: {
      story:
        'Use **custom** for new code; **tertiary** is legacy (same appearance, kept for compatibility).',
    },
  },
};

export const StartIcon = {
  args: {
    variant: 'primary',
    startIcon: <Icon name={'notification'} size={16} color="#D0D2DC" />,
  },
};

export const EndIcon = {
  args: {
    variant: 'primary',
    endIcon: <Icon name={'notification'} size={16} color="#D0D2DC" />,
  },
};

export const Focused = {
  args: { variant: 'primary' },
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};

export const Disabled = () => (
  <GridWrapper>
    <HeaderTitle>Variant</HeaderTitle>
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {variants.map((variant) => (
      <React.Fragment key={variant}>
        <HeaderTitle css={{ width: 80 }}>{variant}</HeaderTitle>
        {sizes.map((size) => (
          <Button variant={variant} size={size} key={variant + size} disabled>
            Button
          </Button>
        ))}
      </React.Fragment>
    ))}
  </GridWrapper>
);

Disabled.parameters = {
  docs: {
    description: {
      story:
        'Use **custom** for new code; **tertiary** is legacy (same appearance, kept for compatibility).',
    },
  },
};

const currentColorIcon = <Icon name="plus" size={14} color="currentColor" />;

export const DisabledWithIcons = () => (
  <InheritColors>
    <GridWrapper
      css={{ gridTemplate: "'a a a'", '& button': { whiteSpace: 'nowrap' } }}>
      <HeaderTitle>Variant</HeaderTitle>
      <HeaderTitle>Enabled</HeaderTitle>
      <HeaderTitle>Disabled</HeaderTitle>
      {variants.map((variant) => (
        <React.Fragment key={variant}>
          <HeaderTitle css={{ width: 80 }}>{variant}</HeaderTitle>
          {[false, true].map((disabled) => (
            <Button
              key={String(disabled)}
              variant={variant}
              disabled={disabled}
              startIcon={currentColorIcon}>
              Add item
            </Button>
          ))}
        </React.Fragment>
      ))}
    </GridWrapper>
  </InheritColors>
);

DisabledWithIcons.parameters = {
  featureFlags: { buttonV2: true },
  docs: {
    description: {
      story:
        'With the `buttonV2` flag, a disabled button greys everything that paints in `currentColor` (icons, `children`, the loading spinner), not only a `text` label, and shows a not-allowed cursor. The label here is `children`, so this also shows the 6px icon gap that `buttonV2` adds next to `children`. Use the flag toolbar to compare with the flag off.',
    },
  },
};

export const Loading = () => (
  <GridWrapper>
    <HeaderTitle>Variant</HeaderTitle>
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {variants.map((variant) => (
      <React.Fragment key={variant}>
        <HeaderTitle css={{ width: 80 }}>{variant}</HeaderTitle>
        {sizes.map((size) => (
          <Button variant={variant} size={size} key={variant + size} loading>
            Button
          </Button>
        ))}
      </React.Fragment>
    ))}
  </GridWrapper>
);

Loading.parameters = {
  docs: {
    description: {
      story:
        'While `loading`, the button is disabled, reports `aria-busy` and shows a spinner in place of its label. The label stays in the layout, so the button keeps its resting width and a row of buttons does not reflow.',
    },
  },
};

export const WithCustomStyles = () => (
  <div css={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <HeaderTitle css={{ textAlign: 'left', marginBottom: 12 }}>
        Outlined — override tertiary with border
      </HeaderTitle>
      <div css={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {sizes.map((size) => (
          <Button
            key={size}
            size={size}
            css={{
              border: '2px solid #4178E1',
              color: '#4178E1',
              borderRadius: 8,
              '&:hover': { background: 'rgba(65, 120, 225, 0.08)' },
            }}>
            Button
          </Button>
        ))}
      </div>
    </div>
    <div>
      <HeaderTitle css={{ textAlign: 'left', marginBottom: 12 }}>
        Override primary — custom brand color
      </HeaderTitle>
      <div css={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {sizes.map((size) => (
          <Button
            key={size}
            variant="primary"
            size={size}
            css={{
              background: '#7B47EB',
              '&:hover': { background: '#6A3AD8' },
              '&:focus': { background: '#9061F0' },
            }}>
            Button
          </Button>
        ))}
      </div>
    </div>
  </div>
);

WithCustomStyles.storyName = 'With Custom Styles (css prop)';

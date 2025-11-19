import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

import Chip from './Chip';
import Icon from '@components/Icon';
import Avatar from '@components/Avatar';
import Wrapper from '@components/Wrapper';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    label: {
      control: 'text',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    variant: {
      control: 'inline-radio',
      options: ['filled', 'outlined'],
      table: {
        type: { summary: 'filled | outlined' },
        defaultValue: { summary: 'filled' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'error', 'info', 'warning'],
      table: {
        type: {
          summary: 'default | primary | success | error | info | warning',
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        type: { summary: 'function' },
      },
    },
    onDelete: {
      action: 'deleted',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  args: {
    label: 'Chip',
    variant: 'filled',
    color: 'default',
    size: 'medium',
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants = () => (
  <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
    <Chip label="Chip Filled" variant="filled" />
    <Chip label="Chip Outlined" variant="outlined" />
  </Wrapper>
);

export const Colors = () => {
  const variants: Array<'filled' | 'outlined'> = ['filled', 'outlined'];
  const colors: Array<
    'default' | 'primary' | 'success' | 'error' | 'info' | 'warning'
  > = ['default', 'primary', 'success', 'error', 'info', 'warning'];

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {variants.map((variant) => (
        <div key={variant}>
          <h3 css={{ marginBottom: '12px', textTransform: 'capitalize' }}>
            {variant}
          </h3>
          <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
            {colors.map((color) => (
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
  );
};

export const Sizes = () => (
  <Wrapper css={{ gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
    <Chip label="Small" size="small" />
    <Chip label="Medium" size="medium" />
    <Chip label="Large" size="large" />
    <Chip label="Small Outlined" size="small" variant="outlined" />
    <Chip label="Medium Outlined" size="medium" variant="outlined" />
    <Chip label="Large Outlined" size="large" variant="outlined" />
  </Wrapper>
);

export const WithIcon = () => {
  return (
    <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
      <Chip
        label="With Icon"
        icon={<Icon name="plus" size={10} color="currentColor" />}
      />
      <Chip
        label="With Icon"
        variant="outlined"
        icon={<Icon name="plus" size={12} color="currentColor" />}
      />
      <Chip
        label="Primary with Icon"
        color="primary"
        icon={<Icon name="plus" size={16} color="currentColor" />}
      />
      <Chip
        label="Success with Icon"
        color="success"
        variant="outlined"
        icon={<Icon name="plus" size={20} color="currentColor" />}
      />
    </Wrapper>
  );
};

export const WithAvatar = () => {
  return (
    <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
      <Chip
        label="Avatar"
        avatar={<Avatar size={20} image="https://i.pravatar.cc/150?img=1" />}
      />
      <Chip
        label="Avatar"
        variant="outlined"
        avatar={<Avatar size={20} image="https://i.pravatar.cc/150?img=2" />}
      />
      <Chip
        label="Name Surname"
        size="large"
        avatar={<Avatar size={25} image="https://i.pravatar.cc/150?img=3" />}
        onDelete={() => {}}
      />
    </Wrapper>
  );
};

export const Deletable = () => (
  <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
    <Chip label="Deletable" onDelete={() => {}} />
    <Chip label="Deletable" variant="outlined" onDelete={() => {}} />
    <Chip label="Primary Deletable" color="primary" onDelete={() => {}} />
    <Chip
      label="Success Deletable"
      color="success"
      variant="outlined"
      onDelete={() => {}}
    />
  </Wrapper>
);

export const WithIconAndDelete = () => {
  return (
    <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
      <Chip
        label="Icon + Delete"
        icon={<Icon name="plus" size={16} color="currentColor" />}
        onDelete={() => {}}
      />
      <Chip
        label="Icon + Delete"
        variant="outlined"
        icon={<Icon name="plus" size={16} color="currentColor" />}
        onDelete={() => {}}
      />
      <Chip
        label="Primary Icon + Delete"
        color="primary"
        icon={<Icon name="plus" size={16} color="currentColor" />}
        onDelete={() => {}}
      />
      <Chip
        label="Success Icon + Delete"
        color="success"
        variant="outlined"
        icon={<Icon name="plus" size={16} color="currentColor" />}
        onDelete={() => {}}
      />
      <Chip
        label="Clickable Icon + Delete"
        icon={<Icon name="plus" size={16} color="currentColor" />}
        onDelete={() => {}}
        onClick={() => alert('Clicked!')}
      />
      <Chip
        label="Small Icon + Delete"
        size="small"
        icon={<Icon name="plus" size={14} color="currentColor" />}
        onDelete={() => {}}
      />
      <Chip
        label="Large Icon + Delete"
        size="large"
        icon={<Icon name="plus" size={18} color="currentColor" />}
        onDelete={() => {}}
      />
    </Wrapper>
  );
};

export const Clickable = () => (
  <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
    <Chip label="Clickable" onClick={() => alert('Clicked!')} />
    <Chip
      label="Clickable"
      variant="outlined"
      onClick={() => alert('Clicked!')}
    />
    <Chip
      label="Clickable Deletable"
      onClick={() => alert('Clicked!')}
      onDelete={() => {}}
    />
    <Chip
      label="Clickable Deletable"
      variant="outlined"
      onClick={() => alert('Clicked!')}
      onDelete={() => {}}
    />
  </Wrapper>
);

export const CustomDeleteIcon = () => {
  return (
    <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
      <Chip
        label="Custom delete icon"
        onDelete={() => {}}
        deleteIcon={<Icon name="cross" size={14} color="currentColor" />}
      />
      <Chip
        label="Custom delete icon"
        variant="outlined"
        onDelete={() => {}}
        deleteIcon={<Icon name="cross" size={14} color="currentColor" />}
      />
    </Wrapper>
  );
};

export const Disabled = () => (
  <div css={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h3 css={{ marginBottom: '12px' }}>Filled</h3>
      <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
        <Chip label="Disabled" disabled />
        <Chip label="Disabled" color="primary" disabled />
        <Chip label="Disabled" color="success" disabled />
        <Chip label="Disabled" color="error" disabled />
        <Chip label="Disabled" color="info" disabled />
        <Chip label="Disabled" color="warning" disabled />
      </Wrapper>
    </div>
    <div>
      <h3 css={{ marginBottom: '12px' }}>Outlined</h3>
      <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
        <Chip label="Disabled" variant="outlined" disabled />
        <Chip label="Disabled" variant="outlined" color="primary" disabled />
        <Chip label="Disabled" variant="outlined" color="success" disabled />
        <Chip label="Disabled" variant="outlined" color="error" disabled />
        <Chip label="Disabled" variant="outlined" color="info" disabled />
        <Chip label="Disabled" variant="outlined" color="warning" disabled />
      </Wrapper>
    </div>
    <div>
      <h3 css={{ marginBottom: '12px' }}>With Delete Icon</h3>
      <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
        <Chip label="Disabled Deletable" disabled onDelete={() => {}} />
        <Chip
          label="Disabled Deletable"
          variant="outlined"
          disabled
          onDelete={() => {}}
        />
      </Wrapper>
    </div>
  </div>
);

export const ChipArray = () => {
  const [chips, setChips] = useState([
    'Angular',
    'jQuery',
    'Polymer',
    'React',
    'Vue.js',
  ]);

  const handleDelete = (chipToDelete: string) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Wrapper css={{ gap: '8px', flexWrap: 'wrap' }}>
      {chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onDelete={() => handleDelete(chip)}
          variant="outlined"
        />
      ))}
    </Wrapper>
  );
};

export const CustomStyles = () => {
  const theme = useTheme();
  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 css={{ marginBottom: '12px' }}>Using css prop</h3>
        <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
          <Chip
            label="Custom Styled"
            css={css`
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            `}
          />
          <Chip
            label="Custom Styled"
            variant="outlined"
            css={css`
              border: 2px dashed ${theme.colors.purple};
              color: ${theme.colors.purple};
              background: ${theme.colors.purpleLighter20};
            `}
          />
        </Wrapper>
      </div>
      <div>
        <h3 css={{ marginBottom: '12px' }}>Custom Hover Styles</h3>
        <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
          <Chip
            label="Hover Me"
            onClick={() => {}}
            css={css`
              background-color: #ff6b6b;
              color: white;
              border: none;
              transition: all 0.3s ease;

              &:hover {
                background-color: #ee5a5a;
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
              }

              &:active {
                background-color: #dd4a4a;
                transform: scale(0.98);
              }
            `}
          />
          <Chip
            label="Hover Me"
            variant="outlined"
            onClick={() => {}}
            css={css`
              border: 2px solid #52c587;
              color: #52c587;
              background: transparent;
              transition: all 0.3s ease;

              &:hover {
                background-color: #52c587;
                color: white;
                border-color: #42b577;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(82, 197, 135, 0.3);
              }
            `}
          />
        </Wrapper>
      </div>
      <div>
        <h3 css={{ marginBottom: '12px' }}>Custom Disabled Styles</h3>
        <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
          <Chip
            label="Custom Disabled"
            disabled
            css={css`
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;

              &[aria-disabled='true'] {
                opacity: 0.4;
                filter: grayscale(100%);
                cursor: not-allowed;
              }
            `}
          />
          <Chip
            label="Custom Disabled"
            variant="outlined"
            disabled
            css={css`
              border: 2px solid #ff6b6b;
              color: #ff6b6b;
              background: transparent;

              &[aria-disabled='true'] {
                opacity: 0.5;
                border-color: #ccc;
                color: #999;
                filter: grayscale(80%);
              }
            `}
          />
          <Chip
            label="Custom Disabled with Hover"
            disabled
            onClick={() => {}}
            css={css`
              background-color: #4ecdc4;
              color: white;
              border: none;

              &[aria-disabled='true'] {
                opacity: 0.5;
                filter: grayscale(100%);
                cursor: not-allowed;
              }

              /* Hover won't trigger when disabled, but shows the pattern */
              &:hover:not([aria-disabled='true']) {
                background-color: #3db8b0;
              }
            `}
          />
        </Wrapper>
      </div>
    </div>
  );
};

export const AllStates = () => {
  const variants: Array<'filled' | 'outlined'> = ['filled', 'outlined'];
  const colors: Array<
    'default' | 'primary' | 'success' | 'error' | 'info' | 'warning'
  > = ['default', 'primary', 'success', 'error', 'info', 'warning'];
  const sizes: Array<'small' | 'medium' | 'large'> = [
    'small',
    'medium',
    'large',
  ];

  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {variants.map((variant) => (
        <div key={variant}>
          <h2 css={{ marginBottom: '16px', textTransform: 'capitalize' }}>
            {variant}
          </h2>
          {colors.map((color) => (
            <div key={color} css={{ marginBottom: '16px' }}>
              <h3 css={{ marginBottom: '12px', textTransform: 'capitalize' }}>
                {color}
              </h3>
              <Wrapper
                css={{ gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                {sizes.map((size) => (
                  <React.Fragment key={size}>
                    <Chip
                      label={`Chip ${size}`}
                      variant={variant}
                      color={color}
                      size={size}
                    />
                    <Chip
                      label={`Chip ${size}`}
                      variant={variant}
                      color={color}
                      size={size}
                      disabled
                    />
                  </React.Fragment>
                ))}
              </Wrapper>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

AllStates.argTypes = {
  variant: { control: false },
  color: { control: false },
  size: { control: false },
  disabled: { control: false },
  label: { control: false },
};

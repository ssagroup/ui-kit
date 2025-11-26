import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Chip } from './Chip';
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
      <Chip label="Icon + Delete" icon="plus" onDelete={() => {}} />
      <Chip
        label="Icon + Delete"
        variant="outlined"
        icon="plus"
        onDelete={() => {}}
      />
      <Chip
        label="Primary Icon + Delete"
        color="primary"
        icon="plus"
        onDelete={() => {}}
      />
      <Chip
        label="Success Icon + Delete"
        color="success"
        variant="outlined"
        icon="plus"
        onDelete={() => {}}
      />
      <Chip
        label="Clickable Icon + Delete"
        icon="plus"
        onDelete={() => {}}
        onClick={() => alert('Clicked!')}
      />
      <Chip
        label="Small Icon + Delete"
        size="small"
        icon="plus"
        onDelete={() => {}}
      />
      <Chip
        label="Large Icon + Delete"
        size="large"
        icon="plus"
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

export const Disabled = () => (
  <div css={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h3 css={{ marginBottom: '12px' }}>Filled</h3>
      <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
        <Chip label="Disabled" disabled icon="plus" onDelete={() => {}} />
        <Chip
          label="Disabled"
          color="primary"
          disabled
          icon="plus"
          onDelete={() => {}}
        />
      </Wrapper>
    </div>
    <div>
      <h3 css={{ marginBottom: '12px' }}>Outlined</h3>
      <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
        <Chip
          label="Disabled"
          variant="outlined"
          disabled
          icon="plus"
          onDelete={() => {}}
        />
        <Chip
          label="Disabled"
          variant="outlined"
          color="primary"
          disabled
          icon="plus"
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

// temporary hidden
// export const FullyCustomized = () => {
//   return (
//     <div css={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//       <div>
//         <h3 css={{ marginBottom: '12px' }}>
//           Custom Background, Border, Text, Icon, and Delete Icon Colors
//         </h3>
//         <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
//           <Chip
//             label="Fully Customized"
//             color="success"
//             icon="calendar"
//             onDelete={() => {}}
//             css={css`
//               background-color: #667eea;
//               border: 2px solid #5568d3;
//
//               button[aria-label='Delete'] svg path {
//                 stroke: #ff6b6b;
//               }
//             `}
//           />
//           <Chip
//             label="Gradient Background"
//             variant="outlined"
//             icon="check"
//             onDelete={() => {}}
//             css={css`
//               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//               border: 2px solid #764ba2;
//               color: #e8e0ff;
//               button[aria-label='Delete'] svg path {
//                 stroke: #ff6b6b;
//               }
//             `}
//           />
//           <Chip
//             label="Dark Theme Style"
//             icon="plus"
//             onDelete={() => {}}
//             css={css`
//               background-color: #2d3748;
//               border: 1px solid #4a5568;
//               color: #cbd5e0;
//
//               button[aria-label='Delete'] svg path {
//                 stroke: #fc8181;
//               }
//             `}
//           />
//           <Chip
//             label="Pastel Colors"
//             variant="outlined"
//             icon="attention"
//             onDelete={() => {}}
//             css={css`
//               background-color: #fef5e7;
//               border: 2px solid #f4d03f;
//               color: #5a4a08;
//
//               button[aria-label='Delete'] svg path {
//                 stroke: #c0392b;
//               }
//             `}
//           />
//         </Wrapper>
//       </div>
//       <div>
//         <h3 css={{ marginBottom: '12px' }}>
//           Different Sizes with Custom Colors
//         </h3>
//         <Wrapper css={{ gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
//           <Chip
//             label="Small"
//             size="small"
//             icon="plus"
//             onDelete={() => {}}
//             css={css`
//               background-color: #48bb78;
//               border: 1px solid #38a169;
//               color: #fff;
//               button[aria-label='Delete'] svg path {
//                 stroke: #ff6b6b;
//               }
//             `}
//           />
//           <Chip
//             label="Medium"
//             size="medium"
//             icon="plus"
//             onDelete={() => {}}
//             css={css`
//               background-color: #48bb78;
//               border: 1px solid #38a169;
//               color: #fff;
//             `}
//           />
//           <Chip
//             label="Large"
//             size="large"
//             icon="plus"
//             onDelete={() => {}}
//             css={css`
//               background-color: #48bb78;
//               border: 1px solid #38a169;
//               color: #fff;
//             `}
//           />
//         </Wrapper>
//       </div>
//       <div>
//         <h3 css={{ marginBottom: '12px' }}>With Hover Effects</h3>
//         <Wrapper css={{ gap: '12px', flexWrap: 'wrap' }}>
//           <Chip
//             label="Hover Me"
//             icon="check"
//             onDelete={() => {}}
//             onClick={() => {}}
//             css={css`
//               background-color: #ed8936;
//               border: 2px solid #dd6b20;
//               color: #fff;
//               transition: all 0.3s ease;
//
//               button[aria-label='Delete'] svg path {
//                 stroke: #ff6b6b;
//                 transition: stroke 0.3s ease;
//               }
//
//               &:hover {
//                 background-color: #dd6b20;
//                 border-color: #c05621;
//                 transform: translateY(-2px);
//                 box-shadow: 0 4px 12px rgba(237, 137, 54, 0.4);
//
//                 button[aria-label='Delete'] svg path {
//                   stroke: #ff5252;
//                 }
//               }
//
//               &:active {
//                 transform: translateY(0);
//               }
//             `}
//           />
//         </Wrapper>
//       </div>
//     </div>
//   );
// };

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { css } from '@emotion/react';
import { PersonInfo } from '@components';
import Badge from '@components/Badge';
import Wrapper from '@components/Wrapper';

export default {
  title: 'Components/PersonInfo',
  component: PersonInfo,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
  argTypes: {
    title: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    badges: {
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    avatar: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    counterTooltip: {
      control: false,
      table: {
        type: {
          summary:
            '{ users: { name: string; avatar: string; link: string; openLinkInNewTab?: boolean }[] }',
        },
      },
    },
    attributes: {
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    description: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    link: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    openLinkInNewTab: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    title: 'Title',
  },
} as Meta<typeof PersonInfo>;

type Story = StoryObj<typeof PersonInfo>;

export const Default: Story = {
  args: {
    title: 'Title',
    value: 'Attribute',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Title',
    icon: 'employee',
    value: 'Attribute',
  },
};

export const WithBadgesArrayString: Story = {
  args: {
    title: 'Title',
    badges: ['badge 1', 'badge 2', 'badge 3'],
  },
};

export const WithBadgeReactNode: Story = {
  args: {
    title: 'Title',
    badges: <Badge size="small">badge</Badge>,
  },
};

export const WithMultipleBadgesReactNodes: Story = {
  args: {
    title: 'Title',
    badges: [
      <Badge key="1" color="#FF6B35" size="small">
        Custom
      </Badge>,
      <Badge key="2" color="purple" size="small">
        badge 2
      </Badge>,
      <Badge key="3" color="green" size="small">
        badge 3
      </Badge>,
    ],
  },
};

export const WithMixedBadges: Story = {
  args: {
    title: 'Title',
    badges: [
      'Auto Badge 1',
      <Badge key="custom" color="#FF6B35" size="small">
        React Node
      </Badge>,
    ],
  },
};

export const WithAvatar: Story = {
  args: {
    title: 'Title',
    avatar: 'https://i.pravatar.cc/150?img=12',
    value: 'John Doe',
  },
};

export const WithAvatarAndCounter: Story = {
  args: {
    title: 'Title',
    avatar: 'https://i.pravatar.cc/150?img=12',
    value: 'John Doe',
    counterTooltip: {
      users: [
        {
          id: 'avatar-counter-1',
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=20',
          link: 'https://uikit.ssa.group/managers/john',
        },
        {
          id: 'avatar-counter-2',
          name: 'Jane Smith',
          avatar: 'https://i.pravatar.cc/150?img=21',
          link: 'https://uikit.ssa.group/managers/jane',
        },
      ],
    },
  },
};

export const WithCounterTooltip: Story = {
  args: {
    title: 'Project Manager',
    avatar: 'https://i.pravatar.cc/150?img=19',
    value: 'Sarah Parker',
    link: 'https://uikit.ssa.group',
    openLinkInNewTab: true,
    counterTooltip: {
      users: [
        {
          id: 'manager-1',
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=20',
          link: 'https://uikit.ssa.group/managers/john',
        },
        {
          id: 'manager-2',
          name: 'Jane Smith',
          avatar: 'https://i.pravatar.cc/150?img=21',
          link: 'https://uikit.ssa.group/managers/jane',
        },
        {
          id: 'manager-3',
          name: 'Bob Johnson',
          avatar: 'https://i.pravatar.cc/150?img=22',
          link: 'https://uikit.ssa.group/managers/bob',
        },
      ],
    },
  },
};

export const WithMultipleAttributes: Story = {
  args: {
    title: 'Title',
    attributes: ['Attribute', 'Attribute'],
  },
};
export const WithMixedAttributes: Story = {
  args: {
    title: 'Title',
    attributes: [
      'String Attribute 1',
      <span key="custom" style={{ color: '#FF6B35', fontWeight: 600 }}>
        React Node
      </span>,
    ],
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Title',
    description:
      'This is a sample description text that provides additional information about the person or item. It can contain multiple sentences and details that help users understand the context better.',
  },
};

// export const WithCustomStyles: Story = {
//   args: {
//     title: 'Custom Title',
//     value: 'John Doe',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     counter: '+5',
//     attributes: ['Attribute 1', 'Attribute 2'],
//     badges: (
//       <Badge color="#FF6B35" size="small">
//         badge
//       </Badge>
//     ),
//     styles: {
//       title: css`
//         color: #ff6b35;
//         font-size: 18px;
//         font-weight: 700;
//       `,
//       avatarName: css`
//         color: #2196f3;
//         font-size: 16px;
//         font-weight: 600;
//       `,
//       counter: css`
//         color: #4caf50;
//         font-size: 16px;
//         font-weight: 600;
//       `,
//       attributes: css`
//         color: #9c27b0;
//         font-size: 13px;
//         font-style: italic;
//       `,
//       badge: css`
//         background-color: #fff3e0;
//         padding: 4px 8px;
//         border-radius: 8px;
//       `,
//       badgeItem: css`
//         color: #e65100;
//       `,
//       value: css`
//         color: #ff9800;
//         font-weight: 500;
//       `,
//     },
//   },
// };
//
// export const WithCustomStylesAdvanced: Story = {
//   args: {
//     title: 'Advanced Custom Title',
//     value: 'John Doe',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     counter: '+5',
//     attributes: ['Custom Attribute 1', 'Custom Attribute 2'],
//     description: 'This is a custom description with advanced styling',
//     badges: (
//       <Badge color="purple" size="small">
//         badge
//       </Badge>
//     ),
//     styles: {
//       title: css`
//         color: #e91e63;
//         font-size: 20px;
//         font-weight: 700;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         text-shadow: 2px 2px 4px rgba(233, 30, 99, 0.3);
//       `,
//       avatarName: css`
//         color: #00bcd4;
//         font-size: 16px;
//         font-weight: 600;
//         text-decoration: underline;
//         text-decoration-color: #00bcd4;
//       `,
//       counter: css`
//         color: #ff9800;
//         font-size: 14px;
//         font-weight: 600;
//         background: linear-gradient(135deg, #ff9800, #f57c00);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         background-clip: text;
//       `,
//       attributes: css`
//         color: #673ab7;
//         font-size: 12px;
//         font-style: italic;
//         border-left: 3px solid #673ab7;
//         padding-left: 8px;
//         margin-left: 4px;
//       `,
//       badge: css`
//         background: linear-gradient(135deg, #f3e5f5, #e1bee7);
//         padding: 6px 12px;
//         border-radius: 12px;
//         box-shadow: 0 2px 4px rgba(123, 31, 162, 0.2);
//         transition: transform 0.2s ease;
//
//         &:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(123, 31, 162, 0.3);
//         }
//       `,
//       badgeItem: css`
//         color: #7b1fa2;
//       `,
//       value: css`
//         color: #009688;
//         font-weight: 600;
//         font-size: 15px;
//       `,
//       description: css`
//         color: #607d8b;
//         font-size: 13px;
//         line-height: 1.6;
//         font-style: italic;
//       `,
//     },
//   },
// };
//
// export const WithBadgeBackgroundAndTextColor: Story = {
//   args: {
//     title: 'Title',
//     badges: ['badge 1', 'badge 2'],
//     styles: {
//       badgeItem: css`
//         color: #e65100;
//         font-weight: 500;
//       `,
//     },
//   },
// };

export const MultiplePersonInfo: Story = {
  render: () => (
    <Wrapper
      css={css`
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 20px;
      `}>
      <Wrapper
        css={css`
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: flex-start;
        `}>
        <PersonInfo
          title="Title 1"
          icon="employee"
          value="John Doe"
          avatar="https://i.pravatar.cc/150?img=12"
          counterTooltip={{
            users: [
              {
                id: 'title-1-1',
                name: 'Olivia Taylor',
                avatar: 'https://i.pravatar.cc/150?img=30',
                link: 'https://uikit.ssa.group/managers/olivia',
              },
              {
                id: 'title-1-2',
                name: 'Noah Brown',
                avatar: 'https://i.pravatar.cc/150?img=31',
                link: 'https://uikit.ssa.group/managers/noah',
              },
            ],
          }}
        />
        <PersonInfo
          title="Title 2"
          icon="employee"
          value="Jane Smith"
          avatar="https://i.pravatar.cc/150?img=13"
          badges={['badge 1', 'badge 2']}
        />
      </Wrapper>

      <Wrapper
        css={css`
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: flex-start;
        `}>
        <PersonInfo
          title="Title 3"
          icon="employee"
          value="Bob Johnson"
          avatar="https://i.pravatar.cc/150?img=14"
        />
        <PersonInfo
          title="Title 4"
          icon="employee"
          value="Alice Williams"
          avatar="https://i.pravatar.cc/150?img=15"
          counterTooltip={{
            users: [
              {
                id: 'alice-1',
                name: 'Emma Davis',
                avatar: 'https://i.pravatar.cc/150?img=23',
                link: 'https://uikit.ssa.group/managers/emma',
              },
              {
                id: 'alice-2',
                name: 'Liam Wilson',
                avatar: 'https://i.pravatar.cc/150?img=24',
                link: 'https://uikit.ssa.group/managers/liam',
              },
              {
                id: 'alice-3',
                name: 'Olivia Taylor',
                avatar: 'https://i.pravatar.cc/150?img=25',
                link: 'https://uikit.ssa.group/managers/olivia',
              },
              {
                id: 'alice-4',
                name: 'Noah Brown',
                avatar: 'https://i.pravatar.cc/150?img=26',
                link: 'https://uikit.ssa.group/managers/noah',
              },
            ],
          }}
        />
        <PersonInfo
          title="Title 5"
          icon="employee"
          value="Charlie Brown"
          avatar="https://i.pravatar.cc/150?img=16"
          attributes={['Attribute 1', 'Attribute 2']}
        />
      </Wrapper>

      <Wrapper
        css={css`
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: flex-start;
        `}>
        <PersonInfo
          title="Title 6"
          icon="employee"
          value="Diana Prince"
          avatar="https://i.pravatar.cc/150?img=17"
          badges={['badge']}
        />
        <PersonInfo
          title="Title 7"
          icon="employee"
          value="Edward Norton"
          avatar="https://i.pravatar.cc/150?img=18"
          counterTooltip={{
            users: [
              {
                id: 'title-7-1',
                name: 'Sophia Miller',
                avatar: 'https://i.pravatar.cc/150?img=32',
                link: 'https://uikit.ssa.group/managers/sophia',
              },
              {
                id: 'title-7-2',
                name: 'Logan Anderson',
                avatar: 'https://i.pravatar.cc/150?img=33',
                link: 'https://uikit.ssa.group/managers/logan',
              },
              {
                id: 'title-7-3',
                name: 'Mia Thompson',
                avatar: 'https://i.pravatar.cc/150?img=34',
                link: 'https://uikit.ssa.group/managers/mia',
              },
            ],
          }}
          attributes={['Attribute']}
        />
      </Wrapper>
    </Wrapper>
  ),
};

MultiplePersonInfo.argTypes = {
  title: { control: false },
  icon: { control: false },
  value: { control: false },
  badges: { control: false },
  avatar: { control: false },
  attributes: { control: false },
  description: { control: false },
};

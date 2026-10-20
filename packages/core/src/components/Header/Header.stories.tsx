import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';

import Avatar from '@components/Avatar';
import { AvatarSizes } from '@components/Avatar/types';
import Icon from '@components/Icon';
import { UserProfile } from '@components/UserProfile';

import { Header } from './Header';
import { HeaderTheme, HeaderNavItem, HeaderSize } from './types';

const items: HeaderNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  {
    id: 'people',
    label: 'People',
    children: [
      { id: 'employees', label: 'Employees', path: '/people/employees' },
      {
        id: 'teams',
        label: 'Teams',
        children: [
          { id: 'frontend', label: 'Frontend', path: '/people/teams/frontend' },
          { id: 'backend', label: 'Backend', path: '/people/teams/backend' },
          { id: 'design', label: 'Design', path: '/people/teams/design' },
        ],
      },
      { id: 'vacancies', label: 'Vacancies', path: '/people/vacancies' },
      { id: 'archive', label: 'Archive', disabled: true },
    ],
  },
  {
    id: 'self-service',
    label: 'Self Service',
    children: [
      { id: 'time', label: 'Time Tracker', path: '/self/time' },
      { id: 'leave', label: 'Leave Tracker', path: '/self/leave' },
      { id: 'hours', label: 'Hours History', path: '/self/hours' },
    ],
  },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'reports', label: 'Reports', path: '/reports' },
  { id: 'settings', label: 'Settings', path: '/settings', disabled: true },
];

/** Same list with icons — they show in the mobile menu and on desktop. */
const itemsWithIcons: HeaderNavItem[] = items.map((item, index) => ({
  ...item,
  icon: (['home', 'user', 'clock', 'list', 'stats', 'settings'] as const)[
    index
  ],
}));

const routerDecorator: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/people/teams/frontend']}>
    <Routes>
      <Route path="/*" element={<Story />} />
    </Routes>
  </MemoryRouter>
);

const Logo = ({ headerTheme = 'light' }: { headerTheme?: HeaderTheme }) => {
  const theme = useTheme();
  return (
    <span
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 20,
        fontWeight: 700,
        color:
          headerTheme === 'dark' ? theme.colors.white : theme.colors.greyDarker,
      }}>
      <Icon name="stats" size={28} color={theme.palette.primary.main} />
      Acme
    </span>
  );
};

/**
 * What the design shows on the right: the user menu and a bell. The bell is
 * a stand-in — wire it to `NotificationMenu` or a page of your own.
 */
const RightSide = ({
  headerTheme = 'light',
  size = 'small',
}: {
  headerTheme?: HeaderTheme;
  size?: HeaderSize;
}) => {
  const theme = useTheme();
  const iconColor =
    headerTheme === 'dark' ? theme.colors.white : theme.colors.greyDarker80;
  return (
    <>
      <UserProfile
        name="Alex Doe"
        email="alex.doe@example.com"
        trigger={
          <Avatar
            text="A"
            color={theme.palette.primary.dark}
            size={size === 'small' ? AvatarSizes.medium : AvatarSizes.large}
          />
        }
        onClick={() => {}}
      />
      <button
        type="button"
        aria-label="Notifications"
        css={{
          display: 'inline-flex',
          padding: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}>
        <Icon name="notification" size={24} color={iconColor} />
      </button>
    </>
  );
};

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
  decorators: [
    routerDecorator,
    (Story) => (
      <div style={{ minHeight: 320, background: '#eef1f7' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['theme', 'size', 'navLabel', 'menuButtonLabel'],
    },
  },
  args: {
    theme: 'light',
    size: 'small',
  },
  argTypes: {
    theme: { control: 'inline-radio', options: ['light', 'dark'] },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => (
    <Header
      {...args}
      logo={<Logo headerTheme={args.theme} />}
      items={items}
      rightSide={<RightSide headerTheme={args.theme} size={args.size} />}
    />
  ),
};

export const Dark: Story = {
  ...Default,
  args: { theme: 'dark' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Header
          key={size}
          {...args}
          size={size}
          logo={<Logo headerTheme={args.theme} />}
          items={items}
          rightSide={<RightSide headerTheme={args.theme} size={size} />}
        />
      ))}
    </div>
  ),
};

/** Without a logo the box stays empty, so nothing else moves. */
export const WithoutLogo: Story = {
  render: (args) => (
    <Header
      {...args}
      items={items}
      rightSide={<RightSide headerTheme={args.theme} size={args.size} />}
    />
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Header
      {...args}
      logo={<Logo headerTheme={args.theme} />}
      items={itemsWithIcons}
      rightSide={<RightSide headerTheme={args.theme} size={args.size} />}
    />
  ),
};

/** Narrow the window: the menu scrolls sideways instead of wrapping. */
export const ManyItems: Story = {
  render: (args) => (
    <Header
      {...args}
      logo={<Logo headerTheme={args.theme} />}
      items={[
        ...items,
        ...items.map((item) => ({ ...item, id: `${item.id}-copy` })),
      ]}
      rightSide={<RightSide headerTheme={args.theme} size={args.size} />}
    />
  ),
};

/**
 * Below 900px of header width the menu moves into a drawer behind the
 * burger. The frame stands in for a phone: the Header follows its own width,
 * so this works in the docs page and the composed Storybook alike, where the
 * viewport toolbar does not reach.
 */
export const Mobile: Story = {
  render: (args) => (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <Header
        {...args}
        logo={<Logo headerTheme={args.theme} />}
        items={itemsWithIcons}
        rightSide={<RightSide headerTheme={args.theme} size={args.size} />}
      />
    </div>
  ),
};

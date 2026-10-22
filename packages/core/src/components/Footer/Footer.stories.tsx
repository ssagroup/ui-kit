import { MemoryRouter } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';

import Icon from '@components/Icon';

import { Footer } from './Footer';
import { FooterColumn, FooterLink, FooterTheme } from './types';

const copyright = 'Company Name © 2000-2026. All rights reserved.';

const links: FooterLink[] = [
  { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
  { id: 'terms', label: 'Terms & Conditions', path: '/terms' },
];

const columns: FooterColumn[] = [
  {
    id: 'product',
    title: 'Product',
    links: [
      { id: 'overview', label: 'Overview', path: '/product' },
      { id: 'features', label: 'Features', path: '/product/features' },
      { id: 'pricing', label: 'Pricing', path: '/pricing' },
      { id: 'releases', label: 'Releases', path: '/releases' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', label: 'About us', path: '/about' },
      { id: 'careers', label: 'Careers', path: '/careers' },
      { id: 'blog', label: 'Blog', href: 'https://example.com/blog' },
      { id: 'press', label: 'Press', path: '/press' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [
      { id: 'help', label: 'Help center', path: '/help' },
      { id: 'contact', label: 'Contact', href: 'mailto:hello@example.com' },
      { id: 'status', label: 'Status', href: 'https://example.com/status' },
      { id: 'docs', label: 'Docs', path: '/docs' },
    ],
  },
];

const routerDecorator: Decorator = (Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const Logo = ({ footerTheme = 'light' }: { footerTheme?: FooterTheme }) => {
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
          footerTheme === 'dark' ? theme.colors.white : theme.colors.greyDarker,
      }}>
      <Icon name="stats" size={28} color={theme.palette.primary.main} />
      Acme
    </span>
  );
};

const meta: Meta<typeof Footer> = {
  title: 'Widgets/Footer',
  component: Footer,
  decorators: [
    routerDecorator,
    (Story) => (
      <div
        style={{
          minHeight: 320,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#eef1f7',
        }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: [
        'copyright',
        'links',
        'logo',
        'description',
        'columns',
        'theme',
        'size',
        'linksLabel',
      ],
    },
  },
  args: {
    theme: 'light',
    size: 'small',
    copyright,
    links,
  },
  argTypes: {
    // A ReactNode — set per story, not editable as a control.
    logo: { control: false },
    theme: { control: 'inline-radio', options: ['light', 'dark'] },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: (args) => <Footer {...args} />,
};

export const Dark: Story = {
  ...Default,
  args: { theme: 'dark' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Footer key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

/**
 * A logo, a description or columns make the footer extended. It is always
 * medium, so the size control has no effect here.
 */
export const Extended: Story = {
  args: {
    description: 'Software for growing teams',
    columns,
  },
  render: (args) => (
    <Footer {...args} logo={<Logo footerTheme={args.theme} />} />
  ),
};

export const ExtendedDark: Story = {
  ...Extended,
  args: { ...Extended.args, theme: 'dark' },
};

/** Below 900px of footer width everything stacks; columns go two per row. */
export const Mobile: Story = {
  args: Extended.args,
  render: (args) => (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <Footer {...args} logo={<Logo footerTheme={args.theme} />} />
    </div>
  ),
};

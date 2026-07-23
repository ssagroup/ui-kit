import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MemoryRouter, RouteObject } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';
import { useBreadcrumbs } from './useBreadcrumbs';
import { BreadcrumbItem } from './types';

const items: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'People', to: '/people' },
  { label: 'Jane Doe' },
];

const longItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'People', to: '/people' },
  { label: 'Engineering', to: '/people/engineering' },
  { label: 'Frontend', to: '/people/engineering/frontend' },
  { label: 'Jane Doe' },
];

const itemsWithSiblings: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'People',
    to: '/people',
    siblings: [
      { label: 'Projects', to: '/projects' },
      { label: 'Reports', to: '/reports' },
      { label: 'Settings', to: '/settings' },
    ],
  },
  { label: 'Jane Doe' },
];

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/people/engineering/frontend']}>
        <div style={{ padding: '16px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: { items },
};

export const Truncated: Story = {
  args: { items: longItems, maxItems: 3 },
};

export const WithSiblingMenu: Story = {
  args: { items: itemsWithSiblings },
};

/**
 * The `css` prop accepts Emotion styles applied to the wrapping `nav`, for
 * one-off visual tweaks (e.g. spacing) without forking the component.
 */
export const CustomStyles: Story = {
  args: {
    items,
    css: {
      padding: '12px 16px',
      backgroundColor: '#F5F7FA',
      borderRadius: '8px',
    },
  },
};

/**
 * Route-aware mode: `useBreadcrumbs` reads the current location, matches it
 * against the route tree, and produces the items automatically — labels from
 * each route's `handle.crumb`, sibling routes for the hover menu.
 */
const routeAwareRoutes: RouteObject[] = [
  {
    path: '/',
    handle: { crumb: 'Home' },
    children: [
      {
        path: 'people',
        handle: { crumb: 'People' },
        children: [
          {
            path: ':id',
            handle: {
              crumb: (ctx: { params: { id?: string } }) =>
                `User ${ctx.params.id}`,
            },
          },
        ],
      },
      { path: 'projects', handle: { crumb: 'Projects' } },
      { path: 'settings', handle: { crumb: 'Settings' } },
    ],
  },
];

const RouteAwareExample = () => {
  // `pathname` is overridden here so the demo resolves a deep route without a
  // second router (the story decorator already provides one).
  const items = useBreadcrumbs({
    routes: routeAwareRoutes,
    pathname: '/people/42',
  });
  return <Breadcrumbs items={items} />;
};

export const RouteAware: Story = {
  render: () => <RouteAwareExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Hover the **People** crumb to jump to a sibling route (Projects, Settings).',
      },
    },
  },
};

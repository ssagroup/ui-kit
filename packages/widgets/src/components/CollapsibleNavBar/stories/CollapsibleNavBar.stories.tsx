import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { Title, Description, Source } from '@storybook/addon-docs';

import { DecoratorFunction } from '@storybook/types';
import { CollapsibleNavBar } from '../CollapsibleNavBar';
import { ITEMS } from './consts';
import { Logo } from './Logo';

type Args = Parameters<typeof CollapsibleNavBar>[0];

const reactRouterDecorator: DecoratorFunction<
  {
    component: typeof CollapsibleNavBar;
    storyResult: React.ReactElement;
    canvasElement: unknown;
  },
  Args
> = (Story) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

export default {
  title: 'Widgets/CollapsibleNavBar',
  component: CollapsibleNavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <Fragment>
          <Title />
          <Description />
          <Source code={`<CollapsibleNavBar />`} />
        </Fragment>
      ),
    },
  },
  decorators: [
    reactRouterDecorator,
    (Story) => (
      <div style={{ height: '100vh', position: 'relative' }}>{Story()}</div>
    ),
  ],
  args: {
    items: ITEMS,
    renderLogo: <Logo />,
  },
} as Meta<typeof CollapsibleNavBar>;

export const Default = {};

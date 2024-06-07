import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { Title, Description, Source } from '@storybook/addon-docs';

import { DecoratorFunction } from '@storybook/types';
import { CollapsibleNavBar } from '../CollapsibleNavBar';
import { ITEMS } from './consts';
import { Logo } from './Logo';
import { Layout } from './Layout';
import { CustomIcon } from './CustomIcon';

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
  decorators: [reactRouterDecorator, (Story) => <Layout>{Story()}</Layout>],
  args: {
    items: ITEMS,
    renderLogo: <Logo />,
    onChange: (isChecked) => {
      console.log('>>>onChange', isChecked);
    },
  },
} as Meta<typeof CollapsibleNavBar>;

export const Default = {};

export const WithCustomIcon = {
  title: 'With Custom Icon',
  component: CollapsibleNavBar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    items: [
      ...ITEMS,
      {
        path: 'custom',
        CustomIcon,
        title: 'Item with custom icon',
      },
    ],
    renderLogo: <Logo />,
    onChange: (isChecked) => {
      console.log('>>>onChange', isChecked);
    },
  },
} as Meta<typeof CollapsibleNavBar>;

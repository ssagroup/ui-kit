import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { Title, Description, Subtitle, Stories } from '@storybook/addon-docs';

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
      source: {
        type: 'code',
      },
      page: () => (
        <Fragment>
          <Title />
          <Subtitle />
          <Description />
          <div css={{ height: 300 }}>
            <Stories />
          </div>
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

export const Default: StoryObj<typeof CollapsibleNavBar> = () => {
  return (
    <CollapsibleNavBar
      items={ITEMS}
      renderLogo={<Logo />}
      onChange={(isChecked) => {
        console.log('>>>onChange', isChecked);
      }}
    />
  );
};

Default.args = {};

export const LightTheme: StoryObj<typeof CollapsibleNavBar> = () => {
  return (
    <CollapsibleNavBar
      items={ITEMS}
      renderLogo={<Logo />}
      theme={'light'}
      onChange={(isChecked) => {
        console.log('>>>onChange', isChecked);
      }}
    />
  );
};

LightTheme.args = {};

export const WithCustomIcon: Meta<typeof CollapsibleNavBar> = () => {
  return (
    <CollapsibleNavBar
      items={[
        ...ITEMS,
        {
          path: 'custom',
          CustomIcon,
          title: 'Item with custom icon',
          iconSize: 22,
          iconName: 'archive',
        },
      ]}
      renderLogo={<Logo />}
      onChange={(isChecked) => {
        console.log('>>>onChange', isChecked);
      }}
    />
  );
};

WithCustomIcon.title = 'With Custom Icon';
WithCustomIcon.parameters = {
  layout: 'fullscreen',
};

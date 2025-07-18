import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj, type Decorator } from '@storybook/react-webpack5';
import { Title, Description, Subtitle, Stories } from '@storybook/addon-docs';
import { CollapsibleNavBar } from '../CollapsibleNavBar';
import { ITEMS } from './consts';
import { DarkLogo, Logo } from './Logo';
import { Layout } from './Layout';
import { CustomIcon, CustomIconWithOwnLogic } from './CustomIcon';

const reactRouterDecorator: Decorator = (Story) => {
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

export const WithDefaultIconTooltip: StoryObj<
  typeof CollapsibleNavBar
> = () => {
  return (
    <CollapsibleNavBar
      items={ITEMS}
      renderLogo={<Logo />}
      showIconTooltip
      onChange={(isChecked) => {
        console.log('>>>onChange', isChecked);
      }}
    />
  );
};

WithDefaultIconTooltip.args = {};

export const LightTheme: StoryObj<typeof CollapsibleNavBar> = () => {
  return (
    <CollapsibleNavBar
      items={ITEMS}
      renderLogo={<DarkLogo />}
      theme={'light'}
      subMenuMaxWidth={220}
      onChange={(isChecked) => {
        console.log('>>>onChange', isChecked);
      }}
    />
  );
};

LightTheme.args = {};

export const WithCustomIcons: Meta<typeof CollapsibleNavBar> = () => {
  return (
    <CollapsibleNavBar
      items={[
        ...ITEMS,
        {
          path: 'custom',
          CustomIcon,
          title: 'Custom icon',
          iconSize: 22,
          iconName: 'archive',
        },
        {
          path: 'custom-2',
          CustomIcon: CustomIconWithOwnLogic,
          title: 'Custom icon (own logic)',
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

WithCustomIcons.title = 'With Custom Icons';
WithCustomIcons.parameters = {
  layout: 'fullscreen',
};

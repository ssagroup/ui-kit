import { Fragment } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj, type Decorator } from '@storybook/react-webpack5';
import {
  Title,
  Description,
  Subtitle,
  Stories,
} from '@storybook/addon-docs/blocks';
import { Avatar, AvatarSizes, CollapsibleNavBar } from '@components';
import { ITEMS } from './consts';
import { DarkLogo, Logo } from './Logo';
import { Layout } from './Layout';
import { CustomIcon, CustomIconWithOwnLogic } from './CustomIcon';

/** Stand-in portrait for the header stories. */
const PERSON_IMAGE =
  'https://images.pexels.com/photos/832998/pexels-photo-832998.jpeg?auto=compress&cs=tinysrgb&w=480';

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

/**
 * Headline only — the simplest header variant. The block replaces the logo in
 * the expanded panel and is hidden in the collapsed rail.
 */
export const WithHeadline: StoryObj<typeof CollapsibleNavBar> = () => (
  <CollapsibleNavBar
    items={ITEMS}
    theme="light"
    defaultExpanded
    header={{ title: 'Headline Text' }}
  />
);

WithHeadline.args = {};

/**
 * Headline with a small avatar inline beside the name — pass any element, so
 * the kit's `Avatar` drops straight in.
 */
export const WithAvatarAndName: StoryObj<typeof CollapsibleNavBar> = () => (
  <CollapsibleNavBar
    items={ITEMS}
    theme="light"
    defaultExpanded
    header={{
      title: 'Headline Text',
      name: 'Name Surname',
      avatar: <Avatar size={AvatarSizes.small} />,
    }}
  />
);

WithAvatarAndName.args = {};

/**
 * Headline with a full picture above the name. The picture is square with a
 * 12px radius and covers its box, per the design.
 */
export const WithFullImage: StoryObj<typeof CollapsibleNavBar> = () => (
  <CollapsibleNavBar
    items={ITEMS}
    theme="light"
    defaultExpanded
    header={{
      title: 'Headline Text',
      name: 'Name Surname',
      image: <img src={PERSON_IMAGE} alt="" />,
    }}
  />
);

WithFullImage.args = {};

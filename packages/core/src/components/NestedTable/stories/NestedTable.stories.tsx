import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
} from '@storybook/addon-docs';
import Table from '@components/Table';
import { NestedTableStory } from './NestedTableStory';

export default {
  title: 'Components/NestedTable',
  component: Table,
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <Fragment>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
        </Fragment>
      ),
    },
  },
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = () => <NestedTableStory />;

Default.args = {};

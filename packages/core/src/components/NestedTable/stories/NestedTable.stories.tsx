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
import { NestedTableDefaultStory, NestedTableStory } from './NestedTableStory';

export default {
  title: 'Components/NestedTable',
  component: Table,
  parameters: {
    controls: { disable: true },
    backgrounds: {
      default: 'main',
      values: [
        {
          name: 'main',
          value: '#D0D1D6',
        },
      ],
    },
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

export const Default: StoryObj<typeof Table> = () => (
  <NestedTableDefaultStory />
);
Default.args = {};

export const Custom: StoryObj<typeof Table> = () => <NestedTableStory />;
Custom.args = {};

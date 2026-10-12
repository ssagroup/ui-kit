import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
} from '@storybook/addon-docs/blocks';
import Table from '@components/Table';
import {
  NestedTableCollapsedStory,
  NestedTableDefaultStory,
  NestedTableStory,
} from './NestedTableStory';
import {
  NestedTableFrozenResizableStory,
  NestedTableFrozenStory,
  NestedTableResizableStory,
} from './NestedTableColumnsStory';

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

export const CollapsedByDefault: StoryObj<typeof Table> = () => (
  <NestedTableCollapsedStory />
);
CollapsedByDefault.args = {};

export const ResizableColumns: StoryObj<typeof Table> = () => (
  <NestedTableResizableStory />
);
ResizableColumns.args = {};

export const FrozenColumns: StoryObj<typeof Table> = () => (
  <NestedTableFrozenStory />
);
FrozenColumns.args = {};

export const FrozenResizableColumns: StoryObj<typeof Table> = () => (
  <NestedTableFrozenResizableStory />
);
FrozenResizableColumns.args = {};

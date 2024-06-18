import type { Meta, StoryObj } from '@storybook/react';

import { SearchBox } from '..';
import { StoryComponent } from './StoryComponent';

type SearchBoxType = typeof SearchBox;

export default {
  title: 'Widgets/SearchBox',
  component: SearchBox,
  argTypes: {},
} as Meta<SearchBoxType>;

export const Default: StoryObj<SearchBoxType> = () => <StoryComponent />;

Default.args = {};

import { FieldValues, useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchBox } from '../SearchBox';

type SearchBoxType = typeof SearchBox;

export default {
  title: 'Widgets/SearchBox',
  component: SearchBox,
  argTypes: {},
} as Meta<SearchBoxType>;

export const Default: StoryObj<SearchBoxType> = () => {
  const { register } = useForm<FieldValues>();

  return <SearchBox register={register} name={'search'} />;
};

Default.args = {};

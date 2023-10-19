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
  const { register, control, resetField } = useForm<FieldValues>();

  const handleCallback = (searchTerm: string) => {
    console.log('>>>searching for the term...', searchTerm);
  };

  return (
    <SearchBox
      register={register}
      control={control}
      resetField={resetField}
      callback={handleCallback}
      name={'search'}
    />
  );
};

Default.args = {};

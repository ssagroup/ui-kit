import { FieldValues, useForm } from 'react-hook-form';

import { SearchBox } from '..';

export const StoryComponent = () => {
  const { register, control, resetField } = useForm<FieldValues>();

  const handleCallback = (searchTerm: string) => {
    console.log('Searching for the term...', searchTerm);
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

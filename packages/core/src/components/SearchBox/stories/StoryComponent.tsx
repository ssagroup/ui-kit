import { FieldValues, useForm } from 'react-hook-form';

import { SearchBox } from '..';

export const StoryComponent = ({
  handleCallback,
}: {
  handleCallback?: (searchTerm: string) => void;
}) => {
  const { register, control, resetField } = useForm<FieldValues>();

  const onCallback = (searchTerm: string) => {
    console.log('Searching for the term...', searchTerm);
  };

  return (
    <SearchBox
      register={register}
      control={control}
      resetField={resetField}
      callback={handleCallback || onCallback}
      name={'search'}
    />
  );
};

import { Icon, Input } from '@ssa-ui-kit/core';
import { InputProps } from '@ssa-ui-kit/core/dist/components/Input/types';

export const SearchBox = ({ register }: InputProps) => {
  return (
    <Input
      name="searchbox"
      endElement={<Icon name="search" />}
      register={register}
    />
  );
};

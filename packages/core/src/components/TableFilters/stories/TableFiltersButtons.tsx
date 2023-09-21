import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { TableFiltersCancelButton } from './TableFilterCancelButton';
import { TableFiltersClearButton } from './TableFilterClearButton';
import { baseButtonStyle } from '../styles';
import { FieldValues, UseFormReset } from 'react-hook-form';

export const TableFiltersButtons = ({
  onReset,
}: {
  onReset: UseFormReset<FieldValues>;
}) => {
  const onClear = () => {
    onReset();
  };
  return (
    <Wrapper css={{ gap: '10px', width: 'auto', alignSelf: 'end' }}>
      <TableFiltersCancelButton>Cancel</TableFiltersCancelButton>
      <TableFiltersClearButton onClick={onClear}>Clear</TableFiltersClearButton>
      <Button css={baseButtonStyle} variant="info" type="submit">
        Apply
      </Button>
    </Wrapper>
  );
};

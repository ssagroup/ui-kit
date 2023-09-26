import { Button, Wrapper } from '@ssa-ui-kit/core';
import { TableFiltersCancelButton } from './TableFilterCancelButton';
import { TableFiltersClearButton } from './TableFilterClearButton';
import { baseButtonStyle } from './styles';

export const TableFiltersButtons = ({ onReset }: { onReset: () => void }) => {
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

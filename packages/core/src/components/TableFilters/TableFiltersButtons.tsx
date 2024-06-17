import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { TableFiltersCancelButton } from './TableFilterCancelButton';
import { TableFiltersClearButton } from './TableFilterClearButton';
import { baseButtonStyle } from './styles';

export const TableFiltersButtons = ({
  onClear,
  onCancel,
}: {
  onClear?: () => void;
  onCancel?: () => void;
}) => {
  const handleOnClear = () => {
    onClear?.();
  };
  const handleOnCancel = () => {
    onCancel?.();
  };
  return (
    <Wrapper css={{ gap: '10px', width: 'auto', alignSelf: 'end' }}>
      <TableFiltersCancelButton onClick={handleOnCancel}>
        Cancel
      </TableFiltersCancelButton>
      <TableFiltersClearButton onClick={handleOnClear}>
        Clear
      </TableFiltersClearButton>
      <Button css={baseButtonStyle} variant="info" type="submit">
        Apply
      </Button>
    </Wrapper>
  );
};

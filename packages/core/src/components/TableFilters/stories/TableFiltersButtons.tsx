import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { css } from '@emotion/react';
import { TableFiltersCancelButton } from './TableFilterCancelButton';
import { TableFiltersClearButton } from './TableFilterClearButton';

export const baseButtonStyle = css`
  padding: 0 14px;
  height: 38px;
  border-radius: 5px;
`;

export const TableFiltersButtons = () => {
  const onClear = () => {
    console.log('>>>clearing...');
  };
  const onApply = () => {
    console.log('>>>applying...');
  };
  return (
    <Wrapper css={{ gap: '10px', width: 'auto', alignSelf: 'end' }}>
      <TableFiltersCancelButton>Cancel</TableFiltersCancelButton>
      <TableFiltersClearButton onClick={onClear}>Clear</TableFiltersClearButton>
      <Button css={baseButtonStyle} variant="info" onClick={onApply}>
        Apply
      </Button>
    </Wrapper>
  );
};

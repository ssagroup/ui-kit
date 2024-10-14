import { ConfirmEmailLoading as Loading } from '@trading/styles';

export const TableLoader = ({ isLoading }: { isLoading: boolean | null }) => (
  <div
    data-testid="table-loader"
    css={[
      Loading,
      {
        position: 'fixed',
        width: 40,
        height: 40,
        left: '49%',
        top: 'calc(50% - 20px)',
        display: isLoading ? 'flex' : 'none',
      },
    ]}
  />
);

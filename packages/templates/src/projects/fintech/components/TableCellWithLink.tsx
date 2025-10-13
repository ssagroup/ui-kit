import { Link } from 'react-router-dom';

import { useTableRow } from '@fintech/contexts';

import { TableCell } from '@ssa-ui-kit/core';

interface TableCellWithLinkProps
  extends React.PropsWithChildren<Parameters<typeof TableCell>[0]> {
  includeLink?: boolean;
  href?: string;
}

export const TableCellWithLink = ({
  children,
  includeLink = true,
  href,
  ...rest
}: TableCellWithLinkProps) => (
  <TableCell
    css={{
      padding: includeLink ? 0 : '0 16px',
      whiteSpace: 'nowrap',
      height: 44,
      '&:first-of-type a': {
        paddingLeft: 16,
      },
      '& a': {
        display: 'flex',
        alignItems: 'center',
        height: 44,
        padding: '0 18px',
      },
    }}
    {...rest}>
    {includeLink ? (
      <Link
        to={href || ''}
        css={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          padding: '0 16px',
        }}>
        {children}
      </Link>
    ) : (
      children
    )}
  </TableCell>
);

export const InformationLinkCell = ({
  children,
  ...rest
}: React.PropsWithChildren<Parameters<typeof TableCell>[0]> & {
  includeLink?: boolean;
}) => {
  const { row } = useTableRow();
  return (
    <TableCellWithLink {...rest} href={`${row.id}/information`}>
      {children}
    </TableCellWithLink>
  );
};

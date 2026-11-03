import { ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import Card from '@components/Card';
import Tag from '@components/Tag';
import Typography from '@components/Typography';
import Wrapper from '@components/Wrapper';
import { DataTableColumn, DataTableColumnState } from '../types';

interface ColumnStateSummaryProps<Row> {
  columnState: Partial<DataTableColumnState>;
  columns: DataTableColumn<Row>[];
}

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <Wrapper css={{ gap: 16, alignItems: 'baseline' }}>
    <Typography
      variant="body2"
      weight="bold"
      css={{ width: 96, flexShrink: 0 }}>
      {label}
    </Typography>
    <Wrapper css={{ gap: 6, flexWrap: 'wrap' }}>{children}</Wrapper>
  </Wrapper>
);

const Muted = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <Typography variant="body2" color={theme.colors.greyDarker60}>
      {children}
    </Typography>
  );
};

/** Story-only readout of a column state, in place of raw JSON. */
export const ColumnStateSummary = <Row,>({
  columnState,
  columns,
}: ColumnStateSummaryProps<Row>) => {
  const labelOf = (id: string) => {
    const header = columns.find((column) => column.id === id)?.header;
    return typeof header === 'string' && header ? header : id;
  };
  const tags = (ids: string[] | undefined, empty: string) =>
    ids?.length ? (
      ids.map((id) => (
        <Tag key={id} size="medium">
          {labelOf(id)}
        </Tag>
      ))
    ) : (
      <Muted>{empty}</Muted>
    );
  const widths = Object.entries(columnState.widths ?? {});

  return (
    <Card
      noShadow
      css={{
        gap: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        textAlign: 'left',
      }}>
      <Typography variant="subtitle" weight="bold">
        Column state
      </Typography>
      <Row label="Frozen left">{tags(columnState.frozen?.start, 'None')}</Row>
      <Row label="Frozen right">{tags(columnState.frozen?.end, 'None')}</Row>
      <Row label="Order">{tags(columnState.order, 'As defined')}</Row>
      <Row label="Hidden">{tags(columnState.hidden, 'None')}</Row>
      <Row label="Widths">
        {widths.length ? (
          widths.map(([id, width]) => (
            <Tag key={id} size="medium">
              {labelOf(id)}: {Math.round(width)}px
            </Tag>
          ))
        ) : (
          <Muted>Not resized yet</Muted>
        )}
      </Row>
    </Card>
  );
};

/**
 * Shared layout for story files: a grey canvas, white captioned cards, card
 * grids and a two-axis matrix. Story-only code: it lives outside src/, so it
 * never ships in the package. Import it as '@storybook-layout'.
 *
 * Usage rules are in .claude/skills/organize-stories/SKILL.md.
 */
import { CSSProperties, Fragment, ReactNode } from 'react';
import type { Decorator } from '@storybook/react-webpack5';

/** Canvas behind the cards: the kit's page background. */
export const CANVAS_BACKGROUND = '#eef1f7';
/** Space between cards, and the canvas padding. */
export const LAYOUT_GAP = 24;

const captionStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '16px',
  color: 'rgba(43, 45, 49, 0.6)',
  textTransform: 'uppercase',
  letterSpacing: 0.4,
};

/**
 * Story decorator that paints the grey canvas behind the cards.
 *
 * @example
 * ```tsx
 * const meta: Meta<typeof Divider> = { decorators: [storyCanvas] };
 * ```
 */
export const storyCanvas: Decorator = (Story) => (
  <div style={{ background: CANVAS_BACKGROUND, padding: LAYOUT_GAP }}>
    <Story />
  </div>
);

/** Small uppercase label: card titles, matrix headers, value names. */
export const Caption = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => <p style={{ ...captionStyle, ...style }}>{children}</p>;

export interface PanelProps {
  /** Caption above the content, usually the prop value the card shows. */
  title?: ReactNode;
  /** Card width. Defaults to the width its parent gives it. */
  width?: CSSProperties['width'];
  /** Adds a modal-like shadow, for cards that stand for a dialog. */
  elevated?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

/** White rounded card, one per prop value or use case. */
export const Panel = ({
  title,
  width,
  elevated = false,
  children,
  style,
}: PanelProps) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 20,
      padding: LAYOUT_GAP,
      boxSizing: 'border-box',
      minWidth: 0,
      width,
      boxShadow: elevated ? '0 12px 40px rgba(43, 45, 49, 0.16)' : undefined,
      ...style,
    }}>
    {title && <Caption style={{ marginBottom: 12 }}>{title}</Caption>}
    {children}
  </div>
);

/**
 * Cards in equal columns that wrap: use when every card shows the same thing
 * for a different value (colours, sizes, themes).
 */
export const PanelGrid = ({
  minWidth = 320,
  children,
}: {
  /** Narrowest a column may get before the grid wraps. */
  minWidth?: number;
  children: ReactNode;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(min(${minWidth}px, 100%), 1fr))`,
      gap: LAYOUT_GAP,
    }}>
    {children}
  </div>
);

/**
 * Cards of their own widths, wrapping and top-aligned: use for mixed content
 * (use cases, customisation examples).
 */
export const PanelRow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: LAYOUT_GAP,
      alignItems: 'flex-start',
    }}>
    {children}
  </div>
);

/** Cards or sections one under another. */
export const PanelStack = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: LAYOUT_GAP }}>
    {children}
  </div>
);

export interface StackProps {
  /** `column` (default) or `row`. */
  direction?: 'row' | 'column';
  /** Space between items, in px. Defaults to 0 (the component's own). */
  gap?: number;
  /** Cross-axis alignment. */
  align?: CSSProperties['alignItems'];
  /** Fixed height, e.g. for a row of vertical components. */
  height?: CSSProperties['height'];
  wrap?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

/** Plain flex container for items inside a card. */
export const Stack = ({
  direction = 'column',
  gap = 0,
  align,
  height,
  wrap = false,
  children,
  style,
}: StackProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap ? 'wrap' : undefined,
      gap,
      alignItems: align,
      height,
      ...style,
    }}>
    {children}
  </div>
);

export interface MatrixProps<Row extends string, Column extends string> {
  /** Row values, e.g. variants. Shown as captions down the left. */
  rows: readonly Row[];
  /** Column values, e.g. sizes. Shown as captions along the top. */
  columns: readonly Column[];
  /** Renders the component for one row/column pair. */
  renderCell: (row: Row, column: Column) => ReactNode;
  /** Width of the row-caption column. Defaults to 96px. */
  rowLabelWidth?: number;
  /** Narrowest a cell column may get. Defaults to 120px. */
  minColumnWidth?: number;
  /** Cross-axis alignment of the cells. Defaults to `center`. */
  align?: CSSProperties['alignItems'];
  /** Space between rows, in px. Defaults to 0 (the component's own). */
  rowGap?: number;
}

/** Two-axis grid (e.g. variant × size) with captions on both edges. */
export const Matrix = <Row extends string, Column extends string>({
  rows,
  columns,
  renderCell,
  rowLabelWidth = 96,
  minColumnWidth = 120,
  align = 'center',
  rowGap = 0,
}: MatrixProps<Row, Column>) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `${rowLabelWidth}px repeat(${columns.length}, minmax(${minColumnWidth}px, 1fr))`,
      alignItems: align,
      columnGap: LAYOUT_GAP,
      rowGap,
    }}>
    <span />
    {columns.map((column) => (
      <Caption key={column} style={{ marginBottom: 8 }}>
        {column}
      </Caption>
    ))}
    {rows.map((row) => (
      <Fragment key={row}>
        <Caption>{row}</Caption>
        {columns.map((column) => (
          <div key={column} style={{ minWidth: 0 }}>
            {renderCell(row, column)}
          </div>
        ))}
      </Fragment>
    ))}
  </div>
);

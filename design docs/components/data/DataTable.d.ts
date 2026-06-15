import * as React from 'react';

export interface DataTableColumn {
  /** Row-object key for this column. */
  key: string;
  /** Header label. */
  header: React.ReactNode;
  /** Text alignment; 'right' implies numeric styling. */
  align?: 'left' | 'right';
  /** Render as right-aligned tabular mono (money/amounts). */
  numeric?: boolean;
  /** Emphasize cell text (e.g. row label column). */
  strong?: boolean;
  /** Custom cell renderer; receives the full row. */
  render?: (row: Record<string, any>) => React.ReactNode;
  /** Optional fixed column width, e.g. '40%'. */
  width?: string;
}

/**
 * Financial table with tabular figures, right-aligned numeric columns,
 * optional zebra striping, row hover, and a bold totals footer.
 *
 * @startingPoint section="Data" subtitle="Financial data table with totals" viewport="700x300"
 */
export interface DataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  columns: DataTableColumn[];
  rows: Array<Record<string, any>>;
  /** Footer totals keyed by column key; omit for no footer. */
  totals?: Record<string, React.ReactNode> | null;
  /** Label shown in the first footer cell when not otherwise set. @default 'Total' */
  totalsLabel?: React.ReactNode;
  /** Zebra-stripe rows. @default false */
  zebra?: boolean;
  /** Row hover highlight. @default true */
  hover?: boolean;
  /** Wrap in a bordered, rounded container. @default true */
  wrap?: boolean;
}

export function DataTable(props: DataTableProps): JSX.Element;

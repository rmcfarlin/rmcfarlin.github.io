import * as React from 'react';

/**
 * Headline KPI / metric block: eyebrow label, large tabular value,
 * optional period-over-period delta, and caption. The workhorse of
 * dashboards, board decks, and one-pagers.
 *
 * @startingPoint section="Data" subtitle="KPI metric card with delta" viewport="700x200"
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Eyebrow label, e.g. "Net Revenue". */
  label: React.ReactNode;
  /** Pre-formatted headline value, e.g. "$4.82M". */
  value: React.ReactNode;
  /** Period-over-period change; omit to hide the delta row. */
  delta?: number | null;
  /** Props forwarded to the inner DeltaIndicator (invert, format, decimals). */
  deltaProps?: Record<string, unknown>;
  /** Comparison caption, e.g. "vs. prior quarter". */
  caption?: React.ReactNode;
  /** @default 'surface' */
  tone?: 'surface' | 'forest';
  /** Brass top accent rule. @default false */
  accent?: boolean;
  /** Text alignment. @default 'left' */
  align?: 'left' | 'center';
}

export function StatCard(props: StatCardProps): JSX.Element;

import * as React from 'react';

export interface BarChartDatum {
  label: React.ReactNode;
  value: number;
  /** Override the bar color for this datum (e.g. a viz token). */
  tone?: string;
}

/**
 * Lightweight, dependency-free CSS column chart for period trends
 * (revenue by quarter, spend by category). One vertical series, uses
 * the data-viz palette.
 *
 * @startingPoint section="Data" subtitle="CSS bar / column chart" viewport="700x260"
 */
export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarChartDatum[];
  /** Pixel height of the plot area. @default 180 */
  height?: number;
  /** Value formatter for labels/tooltips. */
  format?: (v: number) => React.ReactNode;
  /** Render formatted values above bars. @default false */
  showValues?: boolean;
  /** Default bar color (CSS value or token). @default 'var(--forest)' */
  color?: string;
  /** Tint the final bar brass (current period). @default false */
  highlightLast?: boolean;
  /** Value floor for scaling. @default 0 */
  baseline?: number;
}

export function BarChart(props: BarChartProps): JSX.Element;

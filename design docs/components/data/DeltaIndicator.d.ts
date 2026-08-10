import * as React from 'react';

/**
 * Signed change value with directional arrow and semantic color —
 * the atomic unit of financial reporting. Up is green, down is red;
 * set `invert` for metrics where a decrease is favorable (e.g. costs, churn).
 *
 * @startingPoint section="Data" subtitle="Delta / change indicator" viewport="700x110"
 */
export interface DeltaIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The change value, e.g. 12.4 or -3.1. */
  value: number;
  /** @default 'percent' */
  format?: 'percent' | 'currency' | 'plain';
  /** Currency symbol when format='currency'. @default '$' */
  currency?: string;
  /** Decimal places. @default 1 */
  decimals?: number;
  /** Treat a decrease as positive (costs, churn). @default false */
  invert?: boolean;
  /** Show the ▲/▼ arrow. @default true */
  showArrow?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Magnitude below which the value reads as neutral. @default 0 */
  neutralThreshold?: number;
}

export function DeltaIndicator(props: DeltaIndicatorProps): JSX.Element;

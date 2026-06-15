import * as React from 'react';

/**
 * Horizontal meter for budget-vs-actual, goal attainment, and
 * allocation. Turns red automatically when value exceeds `overAt`
 * (e.g. budget overrun).
 *
 * @startingPoint section="Data" subtitle="Budget / attainment meter" viewport="700x120"
 */
export interface ProgressMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current amount. @default 0 */
  value?: number;
  /** Reference amount that equals 100%. @default 100 */
  target?: number;
  /** Left-side label. */
  label?: React.ReactNode;
  /** Fill color when not in overrun. @default 'forest' */
  tone?: 'forest' | 'positive' | 'caution' | 'negative' | 'brass';
  /** Override the right-side caption (else shows percent). */
  valueText?: React.ReactNode;
  /** Show the right-side percent/caption. @default true */
  showTrackLabel?: boolean;
  /** Track height in px. @default 8 */
  height?: number;
  /** Ratio above which the meter turns red. @default 1.0 */
  overAt?: number;
}

export function ProgressMeter(props: ProgressMeterProps): JSX.Element;

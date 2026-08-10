import * as React from 'react';

/**
 * Small status pill. Semantic tones map to financial states
 * (positive = gain/on-track, negative = loss/over-budget, caution = watch).
 *
 * @startingPoint section="Core" subtitle="Status badges — semantic tones & variants" viewport="700x130"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  tone?: 'neutral' | 'positive' | 'negative' | 'caution' | 'info' | 'forest' | 'brass';
  /** @default 'soft' */
  variant?: 'soft' | 'solid' | 'outline';
  /** Show a leading status dot. @default false */
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;

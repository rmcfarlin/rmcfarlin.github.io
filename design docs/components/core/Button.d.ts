import * as React from 'react';

/**
 * Primary action control. Forest-green primary, neutral secondary,
 * quiet ghost, and a sparing brass accent.
 *
 * @startingPoint section="Core" subtitle="Buttons — primary, secondary, ghost, brass" viewport="700x120"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'brass';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Full-width button. @default false */
  block?: boolean;
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  /** Render as a different element, e.g. 'a'. @default 'button' */
  as?: 'button' | 'a';
}

export function Button(props: ButtonProps): JSX.Element;

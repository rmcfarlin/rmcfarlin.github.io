import * as React from 'react';

/**
 * Robert McFarlin brand lockup: geometric emblem + wordmark.
 *
 * @startingPoint section="Brand" subtitle="Brand logo lockup" viewport="420x120"
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** What to render. @default 'full' */
  variant?: 'full' | 'wordmark' | 'mark';
  /** Color tone for the surface it sits on. @default 'dark' */
  tone?: 'dark' | 'light';
  /** Path to the emblem SVG, relative to the host page. @default 'assets/mark.svg' */
  markSrc?: string;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Show the "Fractional CFO" eyebrow under the name. @default true */
  showEyebrow?: boolean;
}

export function Logo(props: LogoProps): JSX.Element;

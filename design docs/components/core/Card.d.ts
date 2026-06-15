import * as React from 'react';

/**
 * Surface container with hairline border and soft warm shadow.
 * The system's default grouping unit for content and metrics.
 *
 * @startingPoint section="Core" subtitle="Card surface — surface, sunken, forest tones" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Element to render. @default 'div' */
  as?: keyof JSX.IntrinsicElements;
  /** Inner padding. @default 'md' */
  pad?: 'none' | 'sm' | 'md' | 'lg';
  /** Shadow depth (ignored for forest tone). @default 'sm' */
  elevation?: 'flat' | 'xs' | 'sm' | 'md';
  /** Surface treatment. @default 'surface' */
  tone?: 'surface' | 'sunken' | 'forest';
}

export function Card(props: CardProps): JSX.Element;

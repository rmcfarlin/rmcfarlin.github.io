import * as React from 'react';

/**
 * Quiet metadata chip for categories, sectors, and filters. Lower
 * emphasis than Badge — sentence case, neutral by default, fills
 * forest when `active`.
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show a removable "×" button. @default false */
  removable?: boolean;
  /** Click handler for the remove button. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Selected/active state (forest fill). @default false */
  active?: boolean;
  /** Leading icon node. */
  iconLeft?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;

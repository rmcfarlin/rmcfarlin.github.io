import * as React from 'react';

/**
 * Text / number field. Pass `label`/`hint`/`error` to render the full
 * field group, or omit them for a bare input. Use `prefix`/`suffix` for
 * currency and unit affixes and `numeric` for right-aligned tabular figures.
 *
 * @startingPoint section="Core" subtitle="Input field with label, affix, error" viewport="700x180"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input. */
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message; sets aria-invalid and red styling. */
  error?: React.ReactNode;
  /** Leading affix, e.g. "$". */
  prefix?: React.ReactNode;
  /** Trailing affix, e.g. "%". */
  suffix?: React.ReactNode;
  /** Right-align with tabular figures (for money/amounts). @default false */
  numeric?: boolean;
}

export function Input(props: InputProps): JSX.Element;

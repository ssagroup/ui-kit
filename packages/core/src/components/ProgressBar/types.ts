export interface ProgressBarProps {
  percentage: number;
  color?: keyof MainColors;
  vertical?: boolean;
  bgColor?: string;
  size?: number;
  /**
   * Accessible name for the progress bar.
   *
   * A `role="progressbar"` node must have an accessible name, otherwise screen
   * readers announce only "progress bar" with no indication of what is
   * progressing. Provide either this or `aria-labelledby`.
   */
  'aria-label'?: string;
  /**
   * Id of the element that labels this progress bar — use instead of
   * `aria-label` when a visible label already exists.
   */
  'aria-labelledby'?: string;
  /**
   * Human-readable form of the current value, for when a bare percentage would
   * be unhelpful (e.g. "3 of 8 steps"). Maps to `aria-valuetext`.
   */
  valueText?: string;
}

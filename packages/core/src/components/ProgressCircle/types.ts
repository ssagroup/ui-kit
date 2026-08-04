export interface ProgressCircleProps {
  max: number;
  currentValue: number;
  /**
   * Accessible name for the progress circle.
   *
   * A `role="progressbar"` node must have an accessible name, otherwise screen
   * readers announce only "progress bar". Provide this or `aria-labelledby`.
   * `infoContent` is not used as the name — it is often purely decorative.
   */
  'aria-label'?: string;
  /** Id of an existing visible label, as an alternative to `aria-label`. */
  'aria-labelledby'?: string;
  size?: number;
  color?: keyof MainColors;
  infoContent?: React.ReactNode | string;
  mode?: 'default' | 'infinite';
  classnames?: {
    root?: string;
    outer?: string;
    inner?: string;
    svg?: string;
    svgCircle?: string;
  };
}

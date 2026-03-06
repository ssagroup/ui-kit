import { Interpolation, Theme } from '@emotion/react';

import { MainSizes } from '../../types/global';

export type SliderSize = keyof MainSizes;

export type ValueLabelDisplay = 'auto' | 'on' | 'off';

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  /** Optional label shown above the slider */
  label?: string;
  /** Minimum value of the range */
  min?: number;
  /** Maximum value of the range */
  max?: number;
  /** Granularity of each step */
  step?: number;
  /** Controlled [min, max] value pair */
  value?: [number, number];
  /** Uncontrolled initial [min, max] value pair */
  defaultValue?: [number, number];
  /** Called whenever either thumb changes */
  onChange?: (value: [number, number]) => void;
  /** Track / thumb size */
  size?: SliderSize;
  /**
   * Render two number inputs above the slider instead of floating value labels.
   */
  withInputs?: boolean;
  /**
   * Control visibility of the floating value labels above the thumbs.
   * - `'auto'` (default) — show on hover/focus
   * - `'on'`  — always visible
   * - `'off'` — never shown
   * Ignored when `withInputs` is `true`.
   */
  valueLabelDisplay?: ValueLabelDisplay;
  /**
   * Prevent the two thumbs from crossing each other — the moving thumb
   * stops when it would reach the other thumb (or `minDistance` away from it).
   * Default is `false` (thumbs can cross; values swap automatically).
   */
  disableSwap?: boolean;
  /**
   * Minimum gap enforced between the two thumb values.
   * Only takes effect when `disableSwap` is `true`.
   * @example `minDistance={10}` — thumbs can get no closer than 10 units apart.
   */
  minDistance?: number;
  /**
   * Tick marks rendered below the track — like a speedometer scale.
   * Each mark has a required `value` (must be within `min`–`max`) and an
   * optional `label` string shown beneath the tick.
   *
   * @example
   * ```tsx
   * marks={[
   *   { value: 0,   label: '0' },
   *   { value: 50,  label: '50' },
   *   { value: 100, label: '100' },
   * ]}
   * ```
   */
  marks?: SliderMark[];
  disabled?: boolean;
  className?: string;
  /** Emotion `css` override — applied to the outermost wrapper element. */
  css?: Interpolation<Theme>;
}

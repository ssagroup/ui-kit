import { CSSProperties, ReactNode } from 'react';

/**
 * Skeleton animation.
 *
 * - `wave` — a soft band sweeps left to right across each piece, then rests.
 * - `pulse` — each piece slowly fades between a darker and a lighter grey.
 * - `none` — a static grey block.
 *
 * Both animations loop every 1.6s. Users who ask the system for reduced
 * motion always get the static block.
 */
export type SkeletonAnimation = 'wave' | 'pulse' | 'none';

/**
 * Corner style of the skeleton pieces: `squared` (2–4px corners) or `rounded`
 * (12px corners, so thin bars become pills).
 */
export type SkeletonCorners = 'squared' | 'rounded';

/** Shape of a single Skeleton piece. */
export type SkeletonShape = 'rect' | 'circle';

/** Length of a skeleton side: a number is pixels, a string any CSS length. */
export type SkeletonLength = number | string;

/**
 * Settings shared by every skeleton component. Set them once on a
 * `SkeletonGroup` and every piece inside follows; a value set on a piece wins
 * over the group's.
 */
export interface SkeletonAppearance {
  /** Animation of the pieces. Defaults to `wave`. */
  animation?: SkeletonAnimation;
  /** Corner style of the pieces. Defaults to `rounded`. */
  corners?: SkeletonCorners;
}

/**
 * Props of `Skeleton`, the single grey placeholder block every skeleton
 * layout is built from.
 */
export interface SkeletonProps extends SkeletonAppearance {
  /** `rect` (default) or `circle`, e.g. for an avatar. */
  shape?: SkeletonShape;
  /**
   * Width. Defaults to `100%` so the piece fills its container; a circle
   * defaults to 48px.
   */
  width?: SkeletonLength;
  /**
   * Height. Defaults to 16px; a circle defaults to its width.
   */
  height?: SkeletonLength;
  /**
   * Corner radius. Overrides the radius `corners` would give; ignored for a
   * circle.
   */
  radius?: SkeletonLength;
  className?: string;
  style?: CSSProperties;
}

/**
 * Props of `SkeletonGroup`, the wrapper that marks a region as loading.
 */
export interface SkeletonGroupProps extends SkeletonAppearance {
  /**
   * Text screen readers announce for the region. Defaults to `Loading…`.
   */
  label?: string;
  /** The skeleton pieces and layouts. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Props shared by the ready-made skeleton layouts. */
export interface SkeletonPresetProps extends SkeletonAppearance {
  /**
   * Text screen readers announce while loading. Only used when the layout is
   * not already inside a `SkeletonGroup`.
   */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/** Props of `SkeletonText`: a paragraph of lines. */
export interface SkeletonTextProps extends SkeletonPresetProps {
  /** Number of lines. Defaults to 3. */
  lines?: number;
  /** Height of each line. Defaults to 12px. */
  lineHeight?: SkeletonLength;
  /** Space between lines. Defaults to 8px. */
  gap?: SkeletonLength;
  /**
   * Width of the last line, so the block reads as a paragraph. Defaults to
   * `60%`; ignored when there is a single line.
   */
  lastLineWidth?: SkeletonLength;
}

/**
 * Props of `SkeletonListItem`: an avatar beside a title, lines of text and
 * chips — a person, a notification, a comment.
 */
export interface SkeletonListItemProps extends SkeletonPresetProps {
  /** Number of items stacked one under another. Defaults to 1. */
  count?: number;
  /** Space between items. Defaults to 24px. */
  gap?: SkeletonLength;
  /** Whether to show the round avatar. Defaults to `true`. */
  avatar?: boolean;
  /** Avatar diameter. Defaults to 48px. */
  avatarSize?: SkeletonLength;
  /** Number of text lines under the title. Defaults to 2. */
  lines?: number;
  /** Number of chips under the text. Defaults to 1. */
  chips?: number;
  /**
   * Whether to show a badge and an icon at the right end of the title row.
   * Defaults to `false`.
   */
  trailing?: boolean;
}

/**
 * Props of `SkeletonMediaCard`: a title bar over a large block — an image, a
 * chart, a video.
 */
export interface SkeletonMediaCardProps extends SkeletonPresetProps {
  /** Number of cards stacked one under another. Defaults to 1. */
  count?: number;
  /** Space between cards. Defaults to 24px. */
  gap?: SkeletonLength;
  /** Whether to show the title bar. Defaults to `true`. */
  title?: boolean;
  /** Height of the media block. Defaults to 120px. */
  mediaHeight?: SkeletonLength;
}

/**
 * Props of `SkeletonTable`: a kit `Table` with a placeholder bar in every
 * cell, so it has the same row heights and padding as the real table.
 */
export interface SkeletonTableProps extends SkeletonPresetProps {
  /** Number of body rows. Defaults to 5. */
  rows?: number;
  /** Number of columns. Defaults to 4. */
  columns?: number;
  /** Whether to render a header row. Defaults to `true`. */
  header?: boolean;
}

/**
 * Props of `SkeletonForm`: labelled fields at the kit's field height, plus an
 * optional submit button.
 */
export interface SkeletonFormProps extends SkeletonPresetProps {
  /** Number of fields. Defaults to 3. */
  fields?: number;
  /** Number of fields per row. Defaults to 1. */
  columns?: number;
  /** Whether to show a button under the fields. Defaults to `true`. */
  actions?: boolean;
}

/**
 * Props of `SkeletonWidgetCard`: a kit `Card` with a title bar, for
 * dashboard widgets.
 */
export interface SkeletonWidgetCardProps extends SkeletonPresetProps {
  /** Whether to show the title bar. Defaults to `true`. */
  title?: boolean;
  /**
   * The card body. Defaults to a `SkeletonText`; pass any skeleton, e.g. a
   * `Skeleton` with a fixed height for a chart.
   */
  children?: ReactNode;
  /** Card width. Defaults to `100%`. */
  width?: SkeletonLength;
  /** Card height. Defaults to the height of its content. */
  height?: SkeletonLength;
}

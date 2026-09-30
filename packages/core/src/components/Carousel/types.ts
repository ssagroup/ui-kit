import { CSSProperties, ReactNode } from 'react';

/**
 * A single slide of a {@link Carousel}.
 */
export type CarouselItem = {
  /**
   * Image shown in the slide. When omitted (or when it fails to load) the
   * slide renders the grey picture placeholder from the design.
   */
  src?: string;
  /**
   * Alternative text for the image. Also used in the accessible labels of
   * the thumbnail and dot that select this slide.
   */
  alt?: string;
  /**
   * Smaller image for the thumbnail strip. Falls back to `src`.
   */
  thumbnailSrc?: string;
  /**
   * Full-size image opened in a new tab when `allowOpenFull` is set.
   * Falls back to `src`.
   */
  fullSrc?: string;
};

/**
 * Where the thumbnail strip sits relative to the slide, or `false` for none.
 */
export type CarouselThumbnailsPosition = 'left' | 'right' | 'bottom' | false;

/**
 * Where the dots and arrows sit: over the bottom of the slide, or in their
 * own row under it.
 */
export type CarouselControlsPosition = 'overlay' | 'below';

/**
 * How an image fills the slide frame. Mirrors CSS `object-fit`.
 */
export type CarouselFit = 'contain' | 'cover';

/**
 * Props of the {@link Carousel} component.
 */
export type CarouselProps = {
  /**
   * Slides to show, in order.
   */
  items: CarouselItem[];
  /**
   * Position of the thumbnail strip. `left`/`right` render a vertical strip
   * as tall as the slide; `bottom` renders a horizontal strip as wide as it.
   * The strip scrolls when it holds more thumbnails than fit.
   * @default false
   */
  thumbnails?: CarouselThumbnailsPosition;
  /**
   * Show the dot indicators (see `controlsPosition`).
   * @default true
   */
  showDots?: boolean;
  /**
   * Show the previous/next buttons (see `controlsPosition`).
   * @default true
   */
  showArrows?: boolean;
  /**
   * Where the dots and arrows sit. `overlay` draws them over the bottom of
   * the slide; `below` puts them in a 32px row 12px under it, aligned with
   * the slide (not with a side thumbnail strip). The open-full-size button
   * always stays on the slide.
   * @default 'overlay'
   */
  controlsPosition?: CarouselControlsPosition;
  /**
   * Show a button that opens the current image (`fullSrc ?? src`) in a new
   * tab. It appears when the slide is hovered or focused.
   * @default false
   */
  allowOpenFull?: boolean;
  /**
   * Width-to-height ratio of the slide. The slide always fills the
   * container's width; this sets its height. Ignored when `height` is set.
   * @default 1
   */
  aspectRatio?: number;
  /**
   * Fixed slide height (number = px). Overrides `aspectRatio`.
   */
  height?: CSSProperties['height'];
  /**
   * How images fill the slide frame.
   * @default 'contain'
   */
  fit?: CarouselFit;
  /**
   * Index of the current slide (controlled).
   */
  index?: number;
  /**
   * Index of the slide shown first (uncontrolled).
   * @default 0
   */
  defaultIndex?: number;
  /**
   * Called whenever the current slide changes.
   */
  onIndexChange?: (index: number) => void;
  /**
   * Wrap from the last slide to the first and back. Always on while
   * `autoPlay` is enabled.
   * @default false
   */
  loop?: boolean;
  /**
   * Advance slides automatically. Pauses while the carousel is hovered or
   * focused, while the tab is hidden, and when the user prefers reduced motion.
   * @default false
   */
  autoPlay?: boolean;
  /**
   * How long each slide stays on screen during `autoPlay`, in ms.
   * @default 5000
   */
  autoPlayInterval?: number;
  /**
   * Duration of the slide animation, in ms. `0` switches instantly.
   * @default 300
   */
  transitionDuration?: number;
  /**
   * Replaces the default image of a slide with custom content.
   */
  renderItem?: (item: CarouselItem, index: number) => ReactNode;
  /**
   * Accessible name of the carousel region.
   * @default 'Image carousel'
   */
  'aria-label'?: string;
  /**
   * Custom CSS class name applied to the root element.
   */
  className?: string;
};

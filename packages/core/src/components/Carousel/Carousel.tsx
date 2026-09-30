import { forwardRef, useEffect, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { useTheme } from '@emotion/react';
import { useCallbackRef, useControllableState } from '@ssa-ui-kit/hooks';

import Icon from '@components/Icon';

import { CarouselItem, CarouselProps } from './types';
import * as S from './styles';

const DEFAULT_AUTO_PLAY_INTERVAL = 5000;
const DEFAULT_TRANSITION_DURATION = 300;

const subscribeMedia = (
  query: string,
  onChange: (matches: boolean) => void,
) => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return () => {};
  }
  const list = window.matchMedia(query);
  onChange(list.matches);
  const handler = (event: MediaQueryListEvent) => onChange(event.matches);
  list.addEventListener('change', handler);
  return () => list.removeEventListener('change', handler);
};

/** `true` while the user asks the OS for reduced motion. */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(
    () => subscribeMedia('(prefers-reduced-motion: reduce)', setReduced),
    [],
  );
  return reduced;
};

/** `false` while the browser tab is in the background. */
const usePageVisible = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const update = () => setVisible(document.visibilityState !== 'hidden');
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return visible;
};

const describe = (item: CarouselItem | undefined, index: number) =>
  item?.alt ? `${index + 1}: ${item.alt}` : `${index + 1}`;

/**
 * Carousel - Shows a set of images one at a time, with optional thumbnails,
 * dot indicators, previous/next buttons and autoplay.
 *
 * ### Sizing
 * The carousel always fills its container's width. The slide's height comes
 * from `aspectRatio` (square by default, as in the design) or from a fixed
 * `height`, never from the images — so the layout does not jump between
 * slides or while images load. Images are letterboxed inside the frame
 * (`fit="contain"`) or cropped to fill it (`fit="cover"`).
 *
 * Thumbnails are a fixed 52px. A `left`/`right` strip is exactly as tall as
 * the slide and a `bottom` strip exactly as wide; extra thumbnails scroll and
 * the active one is kept in view.
 *
 * ### Controls
 * Dots and arrows sit over the bottom of the slide (`controlsPosition="overlay"`)
 * or in their own row under it (`controlsPosition="below"`).
 *
 * ### Navigation
 * Arrows, dots, thumbnails and the ←/→/Home/End keys (while focus is
 * anywhere inside the carousel) all move between slides. Without `loop` the arrows stop at both
 * ends. `autoPlay` always loops and pauses on hover, focus, a hidden tab and
 * `prefers-reduced-motion`.
 *
 * ### State
 * Pass `index` + `onIndexChange` to control the current slide, or
 * `defaultIndex` to let the carousel own it.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <Carousel
 *   items={[
 *     { src: '/front.jpg', alt: 'Front view' },
 *     { src: '/side.jpg', alt: 'Side view' },
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Vertical thumbnails, 4:3 slide, open full size in a new tab
 * <Carousel items={items} thumbnails="left" aspectRatio={4 / 3} allowOpenFull />
 * ```
 *
 * @example
 * ```tsx
 * // Autoplay: 3s per slide, 600ms slide animation
 * <Carousel items={items} autoPlay autoPlayInterval={3000} transitionDuration={600} />
 * ```
 *
 * @accessibility
 * - Root is a `region` with `aria-roledescription="carousel"`
 * - Each slide is a labelled group ("N of M"); hidden slides are `inert`
 * - Slide changes are announced politely unless autoplay is running
 * - Dots and thumbnails expose `aria-current` for the active slide
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (props, ref) => {
    const {
      items,
      thumbnails = false,
      showDots = true,
      showArrows = true,
      controlsPosition = 'overlay',
      allowOpenFull = false,
      aspectRatio = 1,
      height,
      fit = 'contain',
      index,
      defaultIndex,
      onIndexChange,
      loop = false,
      autoPlay = false,
      autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL,
      transitionDuration = DEFAULT_TRANSITION_DURATION,
      renderItem,
      'aria-label': ariaLabel = 'Image carousel',
      className,
    } = props;

    const theme = useTheme();
    const count = items.length;
    const canLoop = loop || autoPlay;

    const [rawIndex, setIndex] = useControllableState<number>({
      controlled: 'index' in props,
      value: index,
      defaultValue: defaultIndex,
      finalValue: 0,
      onChange: onIndexChange,
    });
    const current = Math.min(
      Math.max(rawIndex ?? 0, 0),
      Math.max(count - 1, 0),
    );

    const goTo = (next: number) => {
      if (count === 0) return;
      setIndex(
        canLoop
          ? ((next % count) + count) % count
          : Math.min(Math.max(next, 0), count - 1),
      );
    };

    const hasPrev = canLoop ? count > 1 : current > 0;
    const hasNext = canLoop ? count > 1 : current < count - 1;

    // Autoplay: one timeout per slide, so any manual move restarts the clock.
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const pageVisible = usePageVisible();
    const reducedMotion = usePrefersReducedMotion();
    const isPlaying =
      autoPlay &&
      count > 1 &&
      !hovered &&
      !focused &&
      pageVisible &&
      !reducedMotion;

    useEffect(() => {
      if (!isPlaying) return;
      const id = window.setTimeout(
        () => setIndex((current + 1) % count),
        autoPlayInterval,
      );
      return () => window.clearTimeout(id);
    }, [isPlaying, current, count, autoPlayInterval, setIndex]);

    // Keep the active thumbnail inside the strip's scroll area. Scrolling the
    // strip directly (not `scrollIntoView`) so the page itself never moves.
    const stripRef = useRef<HTMLDivElement>(null);
    const vertical = thumbnails === 'left' || thumbnails === 'right';
    useEffect(() => {
      const strip = stripRef.current;
      const el = strip?.children[current] as HTMLElement | undefined;
      if (!strip || !el) return;
      const [pos, size, scroll, client] = vertical
        ? (['offsetTop', 'offsetHeight', 'scrollTop', 'clientHeight'] as const)
        : (['offsetLeft', 'offsetWidth', 'scrollLeft', 'clientWidth'] as const);
      // Smallest scroll that shows the whole thumbnail: unchanged when it is
      // already visible, else aligned to whichever edge it overflows.
      strip[scroll] = Math.min(
        Math.max(strip[scroll], el[pos] + el[size] - strip[client]),
        el[pos],
      );
    }, [current, vertical]);

    // Keyed by URL so a broken thumbnail does not blank a working slide.
    const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
    const markFailed = (src: string) =>
      setFailed((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

    const onKeyDown = useCallbackRef((event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.defaultPrevented ||
        target.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      ) {
        return;
      }
      const moves: Record<string, number> = {
        ArrowLeft: current - 1,
        ArrowRight: current + 1,
        Home: 0,
        End: count - 1,
      };
      if (!(event.key in moves)) return;
      event.preventDefault();
      goTo(moves[event.key]);
    });

    // Hover, focus and keys are handled on the whole carousel, so ←/→ work
    // from any of its controls. Native listeners keep the region itself a
    // plain landmark rather than a made-up interactive element.
    const rootRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs([ref, rootRef]);
    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const enter = () => setHovered(true);
      const leave = () => setHovered(false);
      const focusIn = () => setFocused(true);
      const focusOut = (event: FocusEvent) => {
        if (!root.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      };
      root.addEventListener('mouseenter', enter);
      root.addEventListener('mouseleave', leave);
      root.addEventListener('focusin', focusIn);
      root.addEventListener('focusout', focusOut);
      root.addEventListener('keydown', onKeyDown);
      return () => {
        root.removeEventListener('mouseenter', enter);
        root.removeEventListener('mouseleave', leave);
        root.removeEventListener('focusin', focusIn);
        root.removeEventListener('focusout', focusOut);
        root.removeEventListener('keydown', onKeyDown);
      };
    }, [onKeyDown]);

    const placeholder = (size: number) => (
      <span css={S.placeholder} data-testid="carousel-placeholder">
        <Icon name="picture" size={size} color={theme.colors.white} />
      </span>
    );

    const currentItem = items[current];
    const fullHref = currentItem?.fullSrc ?? currentItem?.src;

    const controls = count > 1 && (showDots || showArrows) && (
      <div css={S.controls(controlsPosition, thumbnails)}>
        {showDots && (
          <div css={S.dots}>
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                css={(t) => S.dot(t, i === current)}
                aria-label={`Go to slide ${describe(item, i)}`}
                aria-current={i === current ? 'true' : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
        {showArrows && (
          <div css={S.arrows}>
            <button
              type="button"
              css={S.squareButton}
              aria-label="Previous slide"
              disabled={!hasPrev}
              onClick={() => goTo(current - 1)}>
              <Icon
                name="carrot-left"
                size={16}
                color={theme.colors.greyDarker80}
              />
            </button>
            <button
              type="button"
              css={S.squareButton}
              aria-label="Next slide"
              disabled={!hasNext}
              onClick={() => goTo(current + 1)}>
              <Icon
                name="carrot-right"
                size={16}
                color={theme.colors.greyDarker80}
              />
            </button>
          </div>
        )}
      </div>
    );

    const thumbStrip = thumbnails && count > 0 && (
      <div css={S.thumbStripWrapper(vertical)}>
        <div
          ref={stripRef}
          css={S.thumbStrip(vertical)}
          aria-label="Slide thumbnails">
          {items.map((item, i) => {
            const src = item.thumbnailSrc ?? item.src;
            return (
              <button
                key={i}
                type="button"
                css={(t) => S.thumb(t, i === current)}
                aria-label={`Show slide ${describe(item, i)}`}
                aria-current={i === current ? 'true' : undefined}
                onClick={() => goTo(i)}>
                {src && !failed.has(src) ? (
                  <img
                    src={src}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    onError={() => markFailed(src)}
                  />
                ) : (
                  placeholder(16)
                )}
              </button>
            );
          })}
        </div>
      </div>
    );

    return (
      <div
        ref={mergedRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={className}
        css={S.root}>
        <div css={S.stage(thumbnails)}>
          <div
            css={S.viewport}
            style={
              height !== undefined ? { height } : { aspectRatio: aspectRatio }
            }>
            <div
              css={S.track}
              aria-live={isPlaying ? 'off' : 'polite'}
              style={{
                transform: `translateX(-${current * 100}%)`,
                transitionDuration: `${transitionDuration}ms`,
              }}>
              {items.map((item, i) => {
                const active = i === current;
                return (
                  <div
                    key={i}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    aria-hidden={!active}
                    inert={!active}
                    css={S.slide}>
                    {renderItem ? (
                      renderItem(item, i)
                    ) : item.src && !failed.has(item.src) ? (
                      <img
                        src={item.src}
                        alt={item.alt ?? ''}
                        css={S.image(fit)}
                        draggable={false}
                        loading={Math.abs(i - current) <= 1 ? 'eager' : 'lazy'}
                        onError={() => markFailed(item.src!)}
                      />
                    ) : (
                      placeholder(24)
                    )}
                  </div>
                );
              })}
            </div>

            {allowOpenFull && fullHref && (
              <a
                href={fullHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open full size image in a new tab"
                className="carousel-open-full"
                css={[S.squareButton, S.openFull]}>
                <Icon
                  name="follow-link"
                  size={16}
                  color={theme.colors.greyDarker80}
                />
              </a>
            )}

            {controlsPosition === 'overlay' && controls}
          </div>

          {vertical && thumbStrip}
        </div>

        {controlsPosition === 'below' && controls}

        {thumbnails === 'bottom' && thumbStrip}
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';

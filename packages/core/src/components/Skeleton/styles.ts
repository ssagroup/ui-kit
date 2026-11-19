import { css, keyframes, Theme } from '@emotion/react';

import { SkeletonCorners, SkeletonLength } from './types';

/**
 * One loop of either animation, measured from the design's recording: the
 * wave crosses in half of it and rests for the other half; the pulse fades
 * one way in half of it and back in the other.
 */
export const CYCLE_MS = 1600;

/** Corner radius per corner style; thin lines get the smaller squared one. */
export const RADIUS: Record<SkeletonCorners, { block: number; line: number }> =
  {
    squared: { block: 4, line: 2 },
    rounded: { block: 12, line: 12 },
  };

export const toCss = (value: SkeletonLength | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

/*
 * The band is half the piece wide and starts fully left of it. Moving it by
 * transform keeps the animation on the compositor, and the keyframes are
 * static, so no new CSS rule is created per piece.
 */
const sweep = keyframes`
  0% { transform: translateX(-100%); }
  50%, 100% { transform: translateX(200%); }
`;

const fade = keyframes`
  from { opacity: 1; }
  to { opacity: 0.5; }
`;

const base = css`
  display: block;
  position: relative;
  overflow: hidden;
  max-width: 100%;
`;

export const wave = (theme: Theme) => css`
  ${base};
  background-color: ${theme.colors.greyShadow};

  &::after {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 50%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${theme.colors.greyShadow} 48%,
      transparent 100%
    );
  }

  @media (prefers-reduced-motion: no-preference) {
    &::after {
      animation: ${sweep} ${CYCLE_MS}ms ease-in-out infinite;
    }
  }
`;

export const pulse = (theme: Theme) => css`
  ${base};
  background-color: ${theme.colors.greyDarker14};

  @media (prefers-reduced-motion: no-preference) {
    animation: ${fade} ${CYCLE_MS / 2}ms ease-in-out infinite alternate;
  }
`;

export const still = (theme: Theme) => css`
  ${base};
  background-color: ${theme.colors.greyShadow};
`;

export const visuallyHidden = css({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const column = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

export const row = css`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
`;

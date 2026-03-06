import styled from '@emotion/styled';

import { SliderSize } from './types';
import { SLIDER_THUMB_SIZES, trackSizeStyles } from './consts';

// ---------------------------------------------------------------------------
// Root / label
// ---------------------------------------------------------------------------

export const SliderRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const SliderLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.greyDarker};
`;

// ---------------------------------------------------------------------------
// Number inputs (withInputs variant)
// ---------------------------------------------------------------------------

export const SliderInputsRow = styled.div`
  display: flex;
  gap: 16px;
`;

export const SliderNumberInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 48px;
  border: 1.5px solid ${({ theme }) => theme.colors.greyFocused};
  border-radius: 12px;
  padding: 0 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.greyDarker};
  background: transparent;
  outline: none;
  transition: border-color 0.15s;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.greyDarker};
  }

  &:focus:not(:disabled) {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.greyFocused};
    cursor: not-allowed;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

// ---------------------------------------------------------------------------
// Track container + value labels
// ---------------------------------------------------------------------------

export const SliderTrackWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SliderValueLabelsContainer = styled.div`
  position: relative;
  height: 30px;
  pointer-events: none;
`;

/**
 * `leftCalc` is a CSS `calc()` string that aligns the label center precisely
 * over the thumb, accounting for the thumb half-size offset at track edges.
 */
export const SliderValueLabel = styled.div<{
  leftCalc: string;
  isVisible: boolean;
}>`
  position: absolute;
  transform: translateX(-50%);
  left: ${({ leftCalc }) => leftCalc};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.greyDarker};
  white-space: nowrap;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.15s;
  pointer-events: none;
  user-select: none;
`;

// ---------------------------------------------------------------------------
// Track row — background bar, fill, and two overlapping range inputs
// ---------------------------------------------------------------------------

export const SliderTrackRow = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
`;

export const SliderTrackBg = styled.div<{ size: SliderSize }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.greyFocused};
  ${({ size }) => trackSizeStyles[size]}
`;

export const SliderTrackFill = styled.div<{
  left: number;
  width: number;
  isDisabled: boolean;
  size: SliderSize;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 100px;
  left: ${({ left }) => left}%;
  width: ${({ width }) => width}%;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.greyFocused40 : theme.palette.primary.main};
  pointer-events: none;
  ${({ size }) => trackSizeStyles[size]}
`;

// ---------------------------------------------------------------------------
// Range inputs — two overlapping, only thumbs get pointer events
// ---------------------------------------------------------------------------

/**
 * `sliderSize` is used instead of `size` because `<input size>` is a built-in
 * HTML attribute typed as `number`, which would conflict with our `SliderSize`
 * string union and collapse the whole props intersection to `never`.
 * `shouldForwardProp` prevents both custom props from reaching the DOM.
 */
export const SliderRangeInput = styled('input', {
  shouldForwardProp: (prop) => prop !== 'sliderSize' && prop !== 'zIndex',
})<{
  sliderSize: SliderSize;
  zIndex?: number;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: ${({ sliderSize }) => SLIDER_THUMB_SIZES[sliderSize]}px;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
  z-index: ${({ zIndex }) => zIndex ?? 2};

  &::-webkit-slider-runnable-track {
    background: transparent;
    border-radius: 100px;
  }

  &::-moz-range-track {
    background: transparent;
    border: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: ${({ sliderSize }) => SLIDER_THUMB_SIZES[sliderSize]}px;
    height: ${({ sliderSize }) => SLIDER_THUMB_SIZES[sliderSize]}px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    transition:
      background 0.15s,
      transform 0.1s;
  }

  &:not(:disabled)::-webkit-slider-thumb:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }

  &:not(:disabled)::-webkit-slider-thumb:active {
    transform: scale(1.12);
  }

  &:disabled::-webkit-slider-thumb {
    background: ${({ theme }) => theme.colors.greyFocused};
    cursor: not-allowed;
    box-shadow: none;
  }

  &::-moz-range-thumb {
    pointer-events: all;
    width: ${({ sliderSize }) => SLIDER_THUMB_SIZES[sliderSize]}px;
    height: ${({ sliderSize }) => SLIDER_THUMB_SIZES[sliderSize]}px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    transition: background 0.15s;
  }

  &:not(:disabled)::-moz-range-thumb:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }

  &:disabled::-moz-range-thumb {
    background: ${({ theme }) => theme.colors.greyFocused};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// ---------------------------------------------------------------------------
// Marks row — tick scale below the track (like a speedometer)
// ---------------------------------------------------------------------------

export const SliderMarksRow = styled.div`
  position: relative;
  height: 28px;
  margin-top: 4px;
`;

/**
 * `leftCalc` uses the same calc() formula as `SliderValueLabel` so ticks are
 * pixel-perfect under each thumb position.
 */
export const SliderMarkItem = styled.div<{ leftCalc: string }>`
  position: absolute;
  transform: translateX(-50%);
  left: ${({ leftCalc }) => leftCalc};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

export const SliderMarkTick = styled.div`
  width: 1px;
  height: 6px;
  background: ${({ theme }) => theme.colors.greyFocused};
`;

export const SliderMarkLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.greyFocused};
  white-space: nowrap;
  user-select: none;
`;

import { useState, useCallback, useId, ChangeEvent, FocusEvent } from 'react';

import { SliderProps, SliderMark } from './types';
import { SLIDER_THUMB_SIZES } from './consts';
import {
  SliderRoot,
  SliderLabel,
  SliderInputsRow,
  SliderNumberInput,
  SliderTrackWrapper,
  SliderValueLabelsContainer,
  SliderValueLabel,
  SliderTrackRow,
  SliderTrackBg,
  SliderTrackFill,
  SliderRangeInput,
  SliderMarksRow,
  SliderMarkItem,
  SliderMarkTick,
  SliderMarkLabel,
} from './styles';

/**
 * Slider — a dual-thumb range slider component.
 *
 * ## Variants
 * - **Default** — floating value labels appear above each thumb
 *   (`valueLabelDisplay`).
 * - **With inputs** (`withInputs`) — two editable number fields above the
 *   track; floating labels are hidden.
 *
 * ## Thumb-crossing behavior
 * - **Default** (`disableSwap` omitted) — thumbs cross freely; values are
 *   re-sorted automatically so the fill always sits between them.
 * - **`disableSwap`** — the active thumb stops at the other thumb (or
 *   `minDistance` away). Use with `minDistance` to enforce a minimum gap.
 *
 * ## Customization
 * All inner styled sub-elements are exported from `@ssa-ui-kit/core` as
 * `Slider*` components. Pass them as selectors inside the `css` prop or
 * target them by their generated class names via `className`.
 *
 * ```tsx
 * import { css } from '@emotion/react';
 * import { Slider, SliderTrackFill, SliderRangeInput } from '@ssa-ui-kit/core';
 *
 * // Override fill color via the css prop
 * <Slider
 *   css={css`
 *     ${SliderTrackFill} { background: #52c587; }
 *     ${SliderRangeInput}::-webkit-slider-thumb { background: #52c587; }
 *   `}
 *   defaultValue={[20, 80]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Basic range slider (thumbs swap when they cross)
 * <Slider label="Price" min={0} max={1000} defaultValue={[200, 800]} />
 * ```
 *
 * @example
 * ```tsx
 * // Prevent crossing + enforce a gap of at least 50
 * <Slider
 *   label="Budget"
 *   min={0} max={1000}
 *   disableSwap minDistance={50}
 *   defaultValue={[100, 900]}
 * />
 * ```
 */
export const Slider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue,
  onChange,
  size = 'medium',
  withInputs = false,
  valueLabelDisplay = 'auto',
  disableSwap = false,
  minDistance,
  marks,
  disabled = false,
  className,
  css: customCss,
}: SliderProps) => {
  const labelId = useId();

  const isControlled = valueProp !== undefined;
  const resolvedDefault: [number, number] = defaultValue ?? [min, max];

  const [internalValue, setInternalValue] =
    useState<[number, number]>(resolvedDefault);
  const currentValue: [number, number] = isControlled
    ? valueProp!
    : internalValue;

  const [minHovered, setMinHovered] = useState(false);
  const [maxHovered, setMaxHovered] = useState(false);
  const [minFocused, setMinFocused] = useState(false);
  const [maxFocused, setMaxFocused] = useState(false);

  const [minInputDraft, setMinInputDraft] = useState<string>(
    String(currentValue[0]),
  );
  const [maxInputDraft, setMaxInputDraft] = useState<string>(
    String(currentValue[1]),
  );

  const clamp = useCallback(
    (v: number) => Math.min(max, Math.max(min, v)),
    [min, max],
  );

  // Always emit sorted [smaller, larger] so the fill region is always correct
  const updateValue = useCallback(
    (a: number, b: number) => {
      const sorted: [number, number] = a <= b ? [a, b] : [b, a];
      if (!isControlled) setInternalValue(sorted);
      onChange?.(sorted);
      return sorted;
    },
    [isControlled, onChange],
  );

  // ---------------------------------------------------------------------------
  // Range input handlers
  // ---------------------------------------------------------------------------

  const handleMinChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      const [, v1] = currentValue;
      const next = disableSwap
        ? updateValue(Math.min(raw, v1 - (minDistance ?? 0)), v1)
        : updateValue(raw, v1);
      setMinInputDraft(String(next[0]));
      setMaxInputDraft(String(next[1]));
    },
    [currentValue, disableSwap, minDistance, updateValue],
  );

  const handleMaxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      const [v0] = currentValue;
      const next = disableSwap
        ? updateValue(v0, Math.max(raw, v0 + (minDistance ?? 0)))
        : updateValue(v0, raw);
      setMinInputDraft(String(next[0]));
      setMaxInputDraft(String(next[1]));
    },
    [currentValue, disableSwap, minDistance, updateValue],
  );

  // ---------------------------------------------------------------------------
  // Number input handlers (withInputs variant)
  // ---------------------------------------------------------------------------

  const commitMinInput = useCallback(() => {
    const parsed = parseFloat(minInputDraft);
    if (!isNaN(parsed)) {
      const clamped = clamp(parsed);
      const [, v1] = currentValue;
      const next = disableSwap
        ? updateValue(Math.min(clamped, v1 - (minDistance ?? 0)), v1)
        : updateValue(clamped, v1);
      setMinInputDraft(String(next[0]));
      setMaxInputDraft(String(next[1]));
    } else {
      setMinInputDraft(String(currentValue[0]));
    }
  }, [
    minInputDraft,
    clamp,
    disableSwap,
    minDistance,
    currentValue,
    updateValue,
  ]);

  const commitMaxInput = useCallback(() => {
    const parsed = parseFloat(maxInputDraft);
    if (!isNaN(parsed)) {
      const clamped = clamp(parsed);
      const [v0] = currentValue;
      const next = disableSwap
        ? updateValue(v0, Math.max(clamped, v0 + (minDistance ?? 0)))
        : updateValue(v0, clamped);
      setMinInputDraft(String(next[0]));
      setMaxInputDraft(String(next[1]));
    } else {
      setMaxInputDraft(String(currentValue[1]));
    }
  }, [
    maxInputDraft,
    clamp,
    disableSwap,
    minDistance,
    currentValue,
    updateValue,
  ]);

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------

  const range = max - min;
  const minPct = range === 0 ? 0 : ((currentValue[0] - min) / range) * 100;
  const maxPct = range === 0 ? 100 : ((currentValue[1] - min) / range) * 100;

  // When thumbs converge, bring the min input forward so both stay draggable
  const minZIndex = minPct >= maxPct ? 3 : 2;
  const maxZIndex = minPct >= maxPct ? 2 : 3;

  // calc() string that maps a 0–100 pct to the thumb-center position,
  // accounting for the thumb half-width offset at both track edges.
  const thumbHalf = SLIDER_THUMB_SIZES[size] / 2;
  const computeLeft = (pct: number): string => {
    const clamped = Math.min(98, Math.max(2, pct));
    return `calc(${thumbHalf}px + ${clamped / 100} * (100% - ${2 * thumbHalf}px))`;
  };

  // ---------------------------------------------------------------------------
  // Value label visibility
  // ---------------------------------------------------------------------------

  const showMinLabel =
    !withInputs &&
    valueLabelDisplay !== 'off' &&
    (valueLabelDisplay === 'on' || minHovered || minFocused);

  const showMaxLabel =
    !withInputs &&
    valueLabelDisplay !== 'off' &&
    (valueLabelDisplay === 'on' || maxHovered || maxFocused);

  const showLabelsContainer = !withInputs && valueLabelDisplay !== 'off';

  return (
    <SliderRoot css={customCss} className={className} aria-label={label}>
      {label && <SliderLabel id={labelId}>{label}</SliderLabel>}

      {withInputs && (
        <SliderInputsRow>
          <SliderNumberInput
            type="number"
            aria-label="Minimum value"
            value={minInputDraft}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(e) => setMinInputDraft(e.target.value)}
            onBlur={commitMinInput}
            onKeyDown={(e) => e.key === 'Enter' && commitMinInput()}
          />
          <SliderNumberInput
            type="number"
            aria-label="Maximum value"
            value={maxInputDraft}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(e) => setMaxInputDraft(e.target.value)}
            onBlur={commitMaxInput}
            onKeyDown={(e) => e.key === 'Enter' && commitMaxInput()}
          />
        </SliderInputsRow>
      )}

      <SliderTrackWrapper>
        {showLabelsContainer && (
          <SliderValueLabelsContainer>
            <SliderValueLabel
              leftCalc={computeLeft(minPct)}
              isVisible={showMinLabel}>
              {currentValue[0]}
            </SliderValueLabel>
            <SliderValueLabel
              leftCalc={computeLeft(maxPct)}
              isVisible={showMaxLabel}>
              {currentValue[1]}
            </SliderValueLabel>
          </SliderValueLabelsContainer>
        )}

        <SliderTrackRow>
          <SliderTrackBg size={size} />

          <SliderTrackFill
            left={minPct}
            width={maxPct - minPct}
            isDisabled={disabled}
            size={size}
          />

          <SliderRangeInput
            type="range"
            aria-label="Minimum value"
            aria-labelledby={label ? labelId : undefined}
            min={min}
            max={max}
            step={step}
            value={currentValue[0]}
            disabled={disabled}
            sliderSize={size}
            zIndex={minZIndex}
            onChange={handleMinChange}
            onMouseEnter={() => setMinHovered(true)}
            onMouseLeave={() => setMinHovered(false)}
            onFocus={(e: FocusEvent<HTMLInputElement>) => {
              setMinFocused(true);
              e.target.style.outline = 'none';
            }}
            onBlur={() => setMinFocused(false)}
          />

          <SliderRangeInput
            type="range"
            aria-label="Maximum value"
            aria-labelledby={label ? labelId : undefined}
            min={min}
            max={max}
            step={step}
            value={currentValue[1]}
            disabled={disabled}
            sliderSize={size}
            zIndex={maxZIndex}
            onChange={handleMaxChange}
            onMouseEnter={() => setMaxHovered(true)}
            onMouseLeave={() => setMaxHovered(false)}
            onFocus={(e: FocusEvent<HTMLInputElement>) => {
              setMaxFocused(true);
              e.target.style.outline = 'none';
            }}
            onBlur={() => setMaxFocused(false)}
          />
        </SliderTrackRow>

        {marks && marks.length > 0 && (
          <SliderMarksRow>
            {marks.map((mark: SliderMark) => {
              const markPct =
                range === 0 ? 0 : ((mark.value - min) / range) * 100;
              return (
                <SliderMarkItem
                  key={mark.value}
                  leftCalc={computeLeft(markPct)}>
                  <SliderMarkTick />
                  {mark.label !== undefined && (
                    <SliderMarkLabel>{mark.label}</SliderMarkLabel>
                  )}
                </SliderMarkItem>
              );
            })}
          </SliderMarksRow>
        )}
      </SliderTrackWrapper>
    </SliderRoot>
  );
};

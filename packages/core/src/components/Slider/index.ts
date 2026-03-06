// Main component
export { Slider } from './Slider';

// Sub-elements — exported so consumers can reference them as CSS-in-JS
// selectors inside the `css` prop or target them via className overrides.
export {
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

export { SLIDER_THUMB_SIZES } from './consts';

export type {
  SliderProps,
  SliderMark,
  SliderSize,
  ValueLabelDisplay,
} from './types';

import { DateTime } from 'luxon';
import * as S from '../styles';
import { resolvePresetRange } from '../utils';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

/**
 * Shortcut ranges listed beside the calendar. Applying one leaves the popover
 * open, so the calendar stays available for fine-tuning the range afterwards.
 *
 * Ranges are resolved on every render rather than memoized: a relative preset
 * (**Today**, **Current week**) has to reflect the current date, and the same
 * resolved value drives both the highlight and the click so the two can never
 * disagree.
 */
export const Presets = () => {
  const { presets, dateTime, applyDateRange, classNames } =
    useDateRangePickerContext();

  if (!presets?.length) {
    return null;
  }

  const isSelected = (from: Date, to: Date) => {
    const [selectedFrom, selectedTo] = dateTime;
    if (!selectedFrom || !selectedTo) {
      return false;
    }
    return (
      selectedFrom.startOf('day').toMillis() ===
        DateTime.fromJSDate(from).startOf('day').toMillis() &&
      selectedTo.startOf('day').toMillis() ===
        DateTime.fromJSDate(to).startOf('day').toMillis()
    );
  };

  return (
    <S.PresetsPanel
      role="group"
      aria-label="Predefined date ranges"
      data-testid="daterangepicker-presets"
      className={classNames?.presets?.root}>
      {presets.map((preset, index) => {
        const [from, to] = resolvePresetRange(preset);
        const isActive = isSelected(from, to);

        return (
          <S.PresetButton
            // Labels are the natural identity here, but nothing stops a
            // consumer from repeating one, so the index keeps keys unique.
            key={`${preset.label}-${index}`}
            type="button"
            isActive={isActive}
            aria-pressed={isActive}
            className={classNames?.presets?.item}
            data-testid={`daterangepicker-preset-${index}`}
            onClick={() => applyDateRange(from, to)}>
            {preset.label}
          </S.PresetButton>
        );
      })}
    </S.PresetsPanel>
  );
};

import { DateTime, DurationObjectUnits } from 'luxon';
import { TranslationContextContent } from '@contexts';

export const transformBotTooltipDate = (
  timestamp: string | null,
  t: TranslationContextContent['t'],
) => {
  let date = '';

  if (!timestamp) {
    return null;
  }
  const startDate = DateTime.fromISO(timestamp);
  const currentDate = DateTime.now();

  const duration: DurationObjectUnits = currentDate
    .diff(startDate)
    .shiftTo('years', 'days', 'hours', 'minutes', 'seconds')
    .toObject();

  Object.entries(duration).forEach((item) => {
    const timeName = item[0];
    const timeValue = item[1];
    if (timeValue > 0) {
      const plural =
        timeValue === 1
          ? `periods.singular.${timeName}`
          : `periods.plural.${timeName}`;
      date += `${timeValue.toFixed(0)} ${t(plural)} `;
    }
  });

  return date.trim();
};

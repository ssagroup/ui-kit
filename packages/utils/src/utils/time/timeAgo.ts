const periodValues: Record<string, number> = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  min: 60,
};

export const getTimeAgo = (timeValue: string | number) => {
  const date = new Date(timeValue);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  let interval;
  for (const key in periodValues) {
    interval = Math.floor(diff / periodValues[key]);
    if (interval >= 1) {
      const pluralValue = interval > 1 ? 's' : '';
      return `${interval} ${key}${pluralValue} ago`;
    }
  }

  return 'Just Now';
};

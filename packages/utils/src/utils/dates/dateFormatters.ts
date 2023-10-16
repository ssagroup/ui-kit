const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const periodValues: Record<string, number> = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  min: 60,
};

export const formatTime = (timestampMs: number) =>
  new Date(timestampMs).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatDayOfWeek = (timestampMs: number) =>
  dayOfWeekNames[new Date(timestampMs).getDay()];

export const formatDate = (timestampMs: number) =>
  new Date(timestampMs).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });

export const printDayOfTheWeek = (day: number) => {
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
  }
};

export const getTimeAgo = (timeValue: string | number) => {
  const date = new Date(timeValue).getTime();
  if (Number.isNaN(date)) {
    throw new Error('Invalid date');
  }
  const diff = Math.floor((Date.now() - date) / 1000);
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

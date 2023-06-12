const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

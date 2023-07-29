export const getTime = (date: Date, options?: Intl.DateTimeFormatOptions) =>
  date.toLocaleTimeString(
    'en-US',
    options || {
      hour: '2-digit',
      minute: '2-digit',
    },
  );

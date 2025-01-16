import { DateTime } from 'luxon';

export const CreationTime = ({ date }: { date: string }) => {
  const outputDate = DateTime.fromISO(date).toFormat('dd.LL.yy HH:mm');
  return <span css={{ whiteSpace: 'nowrap' }}>{outputDate}</span>;
};

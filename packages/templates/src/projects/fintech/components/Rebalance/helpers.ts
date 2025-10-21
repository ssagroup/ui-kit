import { DateTime } from 'luxon';

import { GraphsListItem, RebalancingItem } from '@fintech/types';

export const getDateTime = (date: string) => {
  let dateTime = DateTime.fromFormat(`${date}`, 'yyyy-MM-dd hh:mm');
  if (!dateTime.isValid) {
    dateTime = DateTime.fromFormat(`${date}`, 'yyyy-MM-dd');
  }
  return dateTime;
};

export const getRebalancingInfo = (
  onHoverDate: string | null | undefined,
  dataOriginal: GraphsListItem[],
) => {
  if (typeof onHoverDate === 'string') {
    const fullTimeDate = getDateTime(onHoverDate).toUTC(0).toISO({
      suppressMilliseconds: true,
    });
    const foundItem = dataOriginal.find(
      (item) => item.timestamp === fullTimeDate,
    );
    const rebalancingInfo: RebalancingItem =
      foundItem?.rebalancing || ({} as RebalancingItem);

    return rebalancingInfo;
  } else {
    return {} as RebalancingItem;
  }
};

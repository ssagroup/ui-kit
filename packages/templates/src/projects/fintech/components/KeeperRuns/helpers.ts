import { GraphsListItem, KeeperRunsItem } from '@fintech/types';

import { getDateTime } from '../Rebalance/helpers';

export const getKeeperRuns = (
  dataOriginal: GraphsListItem[],
  propertyName: keyof Pick<KeeperRunsItem, 'failures' | 'serviceOperations'>,
): number[] => {
  if (!dataOriginal) {
    return [];
  }
  const keeperRunsData: number[] = [];
  dataOriginal.forEach((item) => {
    keeperRunsData.push(item.keeperRuns[propertyName]);
  });

  return keeperRunsData;
};

export const getKeeperRunsInfo = (
  onHoverDate: string | null | undefined,
  dataOriginal: GraphsListItem[],
): KeeperRunsItem => {
  if (typeof onHoverDate === 'string') {
    const fullTimeDate = getDateTime(onHoverDate).toUTC(0).toISO({
      suppressMilliseconds: true,
    });
    const foundItem = dataOriginal.find(
      (item) => item.timestamp === fullTimeDate,
    );
    const keeperRunsInfo: KeeperRunsItem =
      foundItem?.keeperRuns || ({} as KeeperRunsItem);

    return keeperRunsInfo;
  } else {
    return {} as KeeperRunsItem;
  }
};

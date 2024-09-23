import { useEffect, useState } from 'react';

const getRangeValue = ({
  first,
  second,
  coefFirst,
  coefSecond,
  value,
}: {
  first: number;
  second: number;
  coefFirst: number;
  coefSecond: number;
  value: number;
}) =>
  coefFirst - ((coefFirst - coefSecond) / (second - first)) * (value - first);

const getGroupGapByLength = (length: number) => {
  if (length === 0) {
    return 1;
  } else if (length <= 6) {
    return getRangeValue({
      first: 0,
      second: 6,
      coefFirst: 1,
      coefSecond: 0.8,
      value: length,
    });
  } else if (length > 6 && length <= 12) {
    return getRangeValue({
      first: 7,
      second: 12,
      coefFirst: 0.8,
      coefSecond: 0.6,
      value: length,
    });
  } else if (length > 12 && length <= 24) {
    return getRangeValue({
      first: 13,
      second: 24,
      coefFirst: 0.6,
      coefSecond: 0.3,
      value: length,
    });
  } else if (length > 24 && length <= 48) {
    return getRangeValue({
      first: 25,
      second: 48,
      coefFirst: 0.3,
      coefSecond: 0,
      value: length,
    });
  } else {
    // length > 48
    return 0;
  }
};

export const useBarGroupGap = (data: Array<unknown>) => {
  const [barGroupGap, setBarGroupGap] = useState(0);

  useEffect(() => {
    const newGroupGap = getGroupGapByLength(data.length);
    setBarGroupGap(newGroupGap);
  }, [data]);

  return barGroupGap;
};

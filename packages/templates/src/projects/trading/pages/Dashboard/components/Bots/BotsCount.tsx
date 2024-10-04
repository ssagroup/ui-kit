import { useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ProgressCircle } from '@ssa-ui-kit/core';
import { BotsCountProps } from './types';

const SM_SIZE = 100;
const MD_SIZE = 78;
const LG_SIZE = 120;

type ProgressSize = typeof SM_SIZE | typeof MD_SIZE | typeof LG_SIZE;

export const BotsCount = (props: BotsCountProps) => {
  const [size, setSize] = useState<ProgressSize>(SM_SIZE);
  const isMD = useMediaQuery('(min-width: 900px)');
  const isLG = useMediaQuery('(min-width: 1440px)');

  useEffect(() => {
    if (isLG) {
      setSize(LG_SIZE);
    } else if (isMD) {
      setSize(MD_SIZE);
    } else {
      setSize(SM_SIZE);
    }
  }, [isMD, isLG]);

  return <ProgressCircle color="green" size={size} {...props} />;
};

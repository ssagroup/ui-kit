import { useMediaQuery } from 'usehooks-ts';

export const useDeviceType = () => {
  const isMD = useMediaQuery('(min-width: 900px)');
  const isLG = useMediaQuery('(min-width: 1440px)');
  const isXLG = useMediaQuery('(min-width: 1920px)');
  if (isXLG) {
    return 'xlg';
  }
  if (isLG) {
    return 'lg';
  }
  if (isMD) {
    return 'md';
  }
  return 'mobile';
};

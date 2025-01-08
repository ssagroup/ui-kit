import { useMediaQuery } from 'usehooks-ts';

export const useXSMediaQuery = () => {
  return useMediaQuery('(max-width: 389.99px)');
};

export const useSMMediaQuery = () => {
  return useMediaQuery('(min-width: 390px)');
};

export const useUpToMDMediaQuery = () => {
  return useMediaQuery('(max-width: 899.99px)');
};

export const useMinMDMediaQuery = () => {
  return useMediaQuery('(min-width: 900px)');
};

export const useMinLGMediaQuery = () => {
  return useMediaQuery('(min-width: 1440px)');
};

export const useMinXLGMediaQuery = () => {
  return useMediaQuery('(min-width: 1920px)');
};

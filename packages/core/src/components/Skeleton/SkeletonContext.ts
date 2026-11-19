import { createContext, useContext } from 'react';

import { SkeletonAppearance } from './types';

interface SkeletonContextValue extends Required<SkeletonAppearance> {
  /** True inside a SkeletonGroup, so nested groups do not announce twice. */
  inGroup: boolean;
}

export const SkeletonContext = createContext<SkeletonContextValue>({
  animation: 'wave',
  corners: 'rounded',
  inGroup: false,
});

export const useSkeletonContext = () => useContext(SkeletonContext);

/** The piece's own setting wins; otherwise the nearest group's. */
export const useSkeletonAppearance = ({
  animation,
  corners,
}: SkeletonAppearance) => {
  const context = useSkeletonContext();
  return {
    animation: animation ?? context.animation,
    corners: corners ?? context.corners,
  };
};

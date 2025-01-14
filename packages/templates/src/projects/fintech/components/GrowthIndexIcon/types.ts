import { IconProps } from '@ssa-ui-kit/core';

export type GrowthIndexIconProps = {
  isIncreasing?: boolean | null;
} & Pick<IconProps, 'size'>;

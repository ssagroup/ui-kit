import { PlatformProps, PlatformType } from '@fintech/types';

export interface PlatformViewProps extends PlatformProps {
  exchangeType: PlatformType;
}

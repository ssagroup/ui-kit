import { PlatformProps, PlatformType } from '@trading/types';

export interface PlatformViewProps extends PlatformProps {
  exchangeType: PlatformType;
}

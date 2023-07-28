import { IMapIcons } from '@ssa-ui-kit/core';

export interface INavBarProps {
  items: Array<{ path: string; iconName: keyof IMapIcons }>;
}

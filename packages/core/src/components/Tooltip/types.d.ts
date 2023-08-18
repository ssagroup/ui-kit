import {
  useFloating,
  useInteractions,
  FloatingArrow,
  Placement,
} from '@floating-ui/react';
import { PointTooltipProps, Point } from '@nivo/line';
import { IMapIcons } from '@components/Icon/Icons.types';
import { types } from '@components/ProgressBar';

export interface ITooltipProps {
  children: React.ReactNode;
  placement?: Placement;
  enableHover?: boolean;
  enableClick?: boolean;
  offsetPx?: number;
  // TooltipContent-related props
  size?: 'small' | 'medium' | 'large';
  hasArrow?: boolean;
  arrowProps?: ITooltipArrowProps;
  isOpen?: boolean;
}

export type UseTooltipArgs = Omit<ITooltipProps, 'children'>;

export type TooltipContextType =
  | (ReturnType<typeof useFloating> &
      ReturnType<typeof useInteractions> & {
        isOpen: boolean;
        arrowRef: React.Ref<HTMLSVGElement>;
      } & Pick<ITooltipProps, 'size' | 'hasArrow' | 'arrowProps'>)
  | null;

export type TooltipArrowProps = Omit<
  React.ComponentProps<typeof FloatingArrow>,
  'context'
>;

export interface ITooltipContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ITooltipContentSizes {
  small: SerializedStyles;
  medium: SerializedStyles;
  large: SerializedStyles;
}

export interface ITooltipTriggerProps {
  children: React.ReactNode;
}

export type SimpleChartTooltipProps =
  | PointTooltipProps &
      Pick<ITooltipProps, 'size'> & {
        renderValue?: (data: Point['data']) => React.ReactNode;
      };

export interface IProgressChartTooltipProps {
  caption: string;
  value: number;
  valueFormatted: string;
  iconName?: keyof IMapIcons;
  barProps?: Partial<Omit<types.ProgressBarProps, 'currentValue'>>;
}

import {
  useInteractions,
  FloatingArrow,
  Placement,
  UseFloatingReturn,
} from '@floating-ui/react';
import { PointTooltipProps, Point } from '@nivo/line';
import { IMapIcons } from '@components/Icon/types';
import { ProgressBarProps } from '@components/ProgressBar/types';
import { SerializedStyles } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';

export type TooltipSize = 'small' | 'medium' | 'large';

export interface ITooltipProps extends CommonProps {
  children: React.ReactNode;
  placement?: Placement;
  enableHover?: boolean;
  enableClick?: boolean;
  offsetPx?: number;
  // TooltipContent-related props
  size?: TooltipSize;
  hasArrow?: boolean;
  arrowProps?: TooltipArrowProps;
  isOpen?: boolean;
}

export type UseTooltipArgs = Omit<ITooltipProps, 'children'>;

type UseInteractions = ReturnType<typeof useInteractions>;

interface MutableRefObject<T> {
  current: T;
}

export type UseTooltip = (props: UseTooltipArgs) => Pick<
  ITooltipProps,
  'size' | 'hasArrow' | 'arrowProps'
> & {
  arrowRef: MutableRefObject<null>;
  isOpen: boolean;
} & UseFloatingReturn &
  UseInteractions;

export type TooltipContextType =
  | (UseFloatingReturn &
      ReturnType<typeof useInteractions> & {
        isOpen: boolean;
        arrowRef: React.Ref<SVGSVGElement>;
      } & Pick<ITooltipProps, 'size' | 'hasArrow' | 'arrowProps'>)
  | null;

export type TooltipArrowProps = Omit<
  React.ComponentProps<typeof FloatingArrow>,
  'context'
>;

export interface ITooltipContentProps {
  children: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  allowTags?: boolean;
  allowedTags?: string[];
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
  barProps?: Partial<Omit<ProgressBarProps, 'currentValue'>>;
}

export type UseTooltipContext = () => NonNullable<TooltipContextType>;

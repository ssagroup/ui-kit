import {
  useInteractions,
  FloatingArrow,
  Placement,
  UseFloatingReturn,
} from '@floating-ui/react';
import { PointTooltipProps, Point } from '@nivo/line';
import { MapIconsType } from '@components/Icon/types';
import { ProgressBarProps } from '@components/ProgressBar/types';
import { SerializedStyles } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';

export type TooltipSize = 'small' | 'medium' | 'large';

export interface TooltipProps extends CommonProps {
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

export type UseTooltipArgs = Omit<TooltipProps, 'children'>;

type UseInteractions = ReturnType<typeof useInteractions>;

interface MutableRefObject<T> {
  current: T;
}

export type UseTooltip = (props: UseTooltipArgs) => Pick<
  TooltipProps,
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
      } & Pick<TooltipProps, 'size' | 'hasArrow' | 'arrowProps'>)
  | null;

export type TooltipArrowProps = Omit<
  React.ComponentProps<typeof FloatingArrow>,
  'context'
>;

export interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TooltipContentSizes {
  small: SerializedStyles;
  medium: SerializedStyles;
  large: SerializedStyles;
}

export interface TooltipTriggerProps {
  children: React.ReactNode;
}

export type SimpleChartTooltipProps = PointTooltipProps &
  Pick<TooltipProps, 'size'> & {
    renderValue?: (data: Point['data']) => React.ReactNode;
  };

export interface ProgressChartTooltipProps {
  caption: string;
  value: number;
  valueFormatted: string;
  iconName?: keyof MapIconsType;
  barProps?: Partial<Omit<ProgressBarProps, 'currentValue'>>;
}

export type UseTooltipContext = () => NonNullable<TooltipContextType>;

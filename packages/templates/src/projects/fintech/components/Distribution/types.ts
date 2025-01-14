import { WidgetCardProps } from '../WidgetCard';

export type DistributionCardProps = {
  title: string;
} & Pick<WidgetCardProps, 'className' | 'link' | 'onClick' | 'children'>;

export type DistributionContentProps = {
  leftPercent: number;
  leftText: string;
  rightPercent: number;
  rightText: string;
  isAdditionalRightBar?: boolean;
};

export type DistributionProps = Omit<DistributionCardProps, 'children'> &
  DistributionContentProps;

export type DistributionMultilineProps = Omit<
  DistributionCardProps,
  'children'
> & {
  rows: Array<DistributionContentProps>;
  isAdditionalRightBar?: boolean;
};

export type InfoBlockProps = {
  percent: number;
  text: string;
  color?: string;
  className?: string;
  right?: boolean;
};

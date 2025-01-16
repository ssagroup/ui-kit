import { Interpolation, Theme } from '@emotion/react';
import { WidgetCardProps } from '../WidgetCard';

export type DistributionCardProps = {
  title: string;
} & Pick<WidgetCardProps, 'className' | 'link' | 'onClick' | 'children'>;

export type DistributionContentSingle = {
  label: string;
  value: number;
  valueOutput: string | number;
  backgroundCSS?: string;
};

export type DistributionContentProps = {
  data: DistributionContentSingle[];
  contentCSS?: Interpolation<Theme>;
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
  topText: string | number;
  description: string;
  color?: string;
  className?: string;
  descriptionClassname?: string;
};

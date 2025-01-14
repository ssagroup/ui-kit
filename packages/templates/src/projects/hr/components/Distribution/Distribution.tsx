import { DistributionProps } from './types';
import { DistributionCard } from './DistributionCard';
import { DistributionContent } from './DistributionContent';

export const Distribution = ({
  data,
  contentCSS,
  ...props
}: DistributionProps) => (
  <DistributionCard {...props}>
    <DistributionContent data={data} contentCSS={contentCSS} />
  </DistributionCard>
);

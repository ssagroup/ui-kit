import { DistributionCard } from './DistributionCard';
import { DistributionContent } from './DistributionContent';
import { DistributionProps } from './types';

export const Distribution = ({
  data,
  contentCSS,
  ...props
}: DistributionProps) => (
  <DistributionCard {...props}>
    <DistributionContent data={data} contentCSS={contentCSS} />
  </DistributionCard>
);

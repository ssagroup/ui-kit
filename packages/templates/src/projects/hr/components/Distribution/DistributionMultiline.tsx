import { DistributionMultilineProps } from './types';
import { DistributionCard } from './DistributionCard';
import { DistributionContent } from './DistributionContent';
import * as S from './styles';

export const DistributionMultiline = ({
  rows,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  isAdditionalRightBar = false,
  ...props
}: DistributionMultilineProps) => {
  return (
    <DistributionCard {...props} css={[S.DistributionCard, props.className]}>
      {rows.map(({ data }) => (
        <DistributionContent
          data={data}
          key={data
            .map((item, index) => index + item.value + item.label)
            .join()}
        />
      ))}
    </DistributionCard>
  );
};

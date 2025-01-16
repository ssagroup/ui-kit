import { DistributionMultilineProps } from './types';
import { DistributionCard } from './DistributionCard';
import { DistributionContent } from './DistributionContent';
import * as S from './styles';

export const DistributionMultiline = ({
  rows,
  isAdditionalRightBar = false,
  ...props
}: DistributionMultilineProps) => {
  return (
    <DistributionCard {...props} css={[S.DistributionCard, props.className]}>
      {rows.map(({ leftPercent, leftText, rightPercent, rightText }) => (
        <DistributionContent
          leftPercent={leftPercent}
          leftText={leftText}
          rightPercent={rightPercent}
          rightText={rightText}
          key={leftText + rightText + leftPercent + rightPercent}
          isAdditionalRightBar={isAdditionalRightBar}
        />
      ))}
    </DistributionCard>
  );
};

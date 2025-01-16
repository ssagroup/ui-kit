import { DistributionProps } from './types';
import { DistributionCard } from './DistributionCard';
import { DistributionContent } from './DistributionContent';

export const Distribution = ({
  leftPercent,
  leftText,
  rightPercent,
  rightText,
  ...props
}: DistributionProps) => {
  return (
    <DistributionCard
      {...props}
      css={[
        {
          '& > div:last-of-type': {
            height: '100%',
            display: 'flex',
          },
        },
        props.className,
      ]}>
      <DistributionContent
        leftPercent={leftPercent}
        leftText={leftText}
        rightPercent={rightPercent}
        rightText={rightText}
      />
    </DistributionCard>
  );
};

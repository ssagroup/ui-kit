import { useTheme } from '@emotion/react';
import { ProgressBar } from '@ssa-ui-kit/core';
import { DistributionContentProps } from './types';
import { ContentWrapper } from './ContentWrapper';
import { InfoBlock } from './InfoBlock';
import * as S from './styles';

export const DistributionContent = ({
  leftPercent,
  leftText,
  rightPercent,
  rightText,
  isAdditionalRightBar,
}: DistributionContentProps) => {
  const theme = useTheme();
  return (
    <ContentWrapper>
      <div
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <InfoBlock
          percent={leftPercent}
          text={leftText}
          color={theme.colors.green}
        />
        <InfoBlock
          percent={rightPercent}
          text={rightText}
          color={theme.colors.red}
          right
        />
      </div>
      <div css={S.Bar}>
        <ProgressBar
          percentage={leftPercent > 100 ? 100 : leftPercent}
          color="green"
          bgColor={isAdditionalRightBar ? theme.colors.grey : theme.colors.red}
        />
        {isAdditionalRightBar && (
          <div css={[S.AdditionalBar, { width: `${rightPercent}%` }]}></div>
        )}
      </div>
    </ContentWrapper>
  );
};

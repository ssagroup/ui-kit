import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { InfoBlockProps } from './types';

const TopText = styled(Typography)`
  line-height: 1;
  font-size: 16px;
  margin-bottom: 3px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 18px;
  }
`;

const Description = styled(Typography)`
  line-height: 1;
  font-size: 14px;
  overflow: hidden;
  overflow-wrap: anywhere;
  margin-bottom: 9px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 11px;
  }
`;

export const InfoBlock = ({
  topText,
  color,
  description,
  descriptionClassname,
  className,
}: InfoBlockProps) => {
  const theme = useTheme();
  return (
    <div className={className}>
      <TopText
        variant="h3"
        weight="bold"
        css={{
          fontSize: 13,
          [theme.mediaQueries.md]: {
            fontSize: 16,
          },
        }}>
        {topText}
      </TopText>
      <Description
        className={descriptionClassname}
        color={color}
        css={{
          fontSize: 11,
          [theme.mediaQueries.md]: {
            fontSize: 14,
          },
        }}>
        {description}
      </Description>
    </div>
  );
};

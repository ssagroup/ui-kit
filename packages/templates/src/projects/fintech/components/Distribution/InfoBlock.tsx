import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { InfoBlockProps } from './types';

const PercentsText = styled(Typography)`
  line-height: 1;
  font-size: 16px;
  margin-bottom: 3px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`;

const Description = styled(Typography)`
  line-height: 1;
  font-size: 12px;
  overflow: hidden;
  overflow-wrap: anywhere;
  margin-bottom: 9px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
    margin-bottom: 11px;
  }
`;

const rightBlockStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

export const InfoBlock = ({
  percent,
  color,
  text,
  className,
  right,
}: InfoBlockProps) => {
  return (
    <div className={className} css={right ? rightBlockStyles : undefined}>
      <PercentsText variant="h3" weight="bold">
        {percent}%
      </PercentsText>
      <Description color={color}>{text}</Description>
    </div>
  );
};

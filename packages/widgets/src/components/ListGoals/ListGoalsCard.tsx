import { css } from '@emotion/react';

import {
  Avatar,
  Card,
  CardContent,
  ProgressCircle,
  Typography,
  Wrapper,
} from '@ssa-ui-kit/core';

import { content } from './styles';
import { ItemCardProps, ProgressProps } from './types';

export const ListGoalsCard = ({
  image,
  title,
  details,
  progressProps,
}: ItemCardProps) => {
  const {
    size = 50,
    max = 100,
    currentValue = 0,
    infoContent,
    color = 'blue',
  } = progressProps;

  return (
    <Card noShadow>
      <Wrapper direction="row" avatarSize={42}>
        <Avatar size={42} image={image} css={{ borderRadius: 0 }} />

        <CardContent
          css={css`
            width: calc(100% - 42px);
            padding-left: 15px;
          `}>
          <div css={content}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle" as="p">
              {details}
            </Typography>
          </div>

          <ProgressCircle
            size={size}
            max={max}
            currentValue={currentValue}
            infoContent={
              infoContent || (
                <Typography variant="body1">{currentValue}%</Typography>
              )
            }
            color={color as ProgressProps['color']}
          />
        </CardContent>
      </Wrapper>
    </Card>
  );
};

import { useTheme, css } from '@emotion/react';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Wrapper,
  Typography,
  Icon,
} from '@ssa-ui-kit/core';

import { IUpcomingWorkoutCardProps } from './types';
import { contentWrapper } from './style';

/**
 *
 * UI Component that use CardList to render a list of upcoming workouts
 */
export const UpcomingWorkoutCard = ({
  image,
  title,
  workoutTime,
  renderDetails,
  onClick,
}: IUpcomingWorkoutCardProps) => {
  const theme = useTheme();
  return (
    <Card noShadow>
      <Wrapper direction="row">
        <Avatar size={42} image={image} />

        <CardContent
          css={css`
            width: calc(100% - 42px);
          `}>
          <Wrapper direction="column">
            <div css={contentWrapper}>
              <Typography variant="h6">{title}</Typography>
              <Button
                endIcon={<Icon name="more" />}
                variant="tertiary"
                size="small"
                onClick={onClick}
              />
            </div>

            <div css={contentWrapper}>
              <Typography
                variant="subtitle"
                color={theme.colors.greyDarker60}
                as="p">
                {renderDetails()}
              </Typography>
              <Typography variant="subtitle" as="p">
                {workoutTime}
              </Typography>
            </div>
          </Wrapper>
        </CardContent>
      </Wrapper>
    </Card>
  );
};

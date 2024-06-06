import { css } from '@emotion/react';

import { ProgressBar, Typography, Avatar, Wrapper } from '@ssa-ui-kit/core';

import Marker from './MealPlannerBadge';
import MealPlannerLegends from './MealPlannerLegends';
import MealPlannerBars from './MealPlannerBars';

import { MealPlannerCardProps } from './types';

const markerColor = {
  carbs: 'yellow',
  protein: 'green',
  fat: 'blue',
};

type MarkerColorKeys = keyof typeof markerColor;

export const MealPlannerCard = ({
  name,
  image,
  carbs,
  protein,
  fat,
}: MealPlannerCardProps) => {
  const listItems = { carbs, protein, fat };

  return (
    <Wrapper
      css={{
        marginTop: '5.6px',
      }}>
      <Avatar size={64} image={image} />

      <div
        css={css`
          width: calc(100% - 64px);
          padding-left: 15px;
        `}>
        <Typography variant="h6" weight="medium">
          {name}
        </Typography>

        <MealPlannerLegends.List>
          {Object.keys(listItems).map((item) => (
            <MealPlannerLegends.Item key={item}>
              <Marker color={markerColor[item as MarkerColorKeys] as keyof MainColors} />

              <Typography variant="body1">
                {listItems[item as MarkerColorKeys]}% {item}
              </Typography>
            </MealPlannerLegends.Item>
          ))}
        </MealPlannerLegends.List>

        <MealPlannerBars>
          {Object.keys(listItems).map((item) => (
            <li
              css={css`
                width: ${listItems[item as MarkerColorKeys]}%;
              `}
              key={item}>
              <ProgressBar
                percentage={100}
                color={markerColor[item as MarkerColorKeys] as keyof MainColors}
              />
            </li>
          ))}
        </MealPlannerBars>
      </div>
    </Wrapper>
  );
};

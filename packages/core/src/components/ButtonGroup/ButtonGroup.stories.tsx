import { css, useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ButtonGroup } from './ButtonGroup';
import { items } from './helpers';
import { ExternalStateStory } from './stories/ExternalState';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
} as Meta<typeof ButtonGroup>;

export const Default: StoryObj<typeof ButtonGroup> = () => {
  return <ButtonGroup items={items} onClick={(item) => item} />;
};

Default.args = {};

export const ExternalState: StoryObj<typeof ButtonGroup> = () => {
  return <ExternalStateStory />;
};

ExternalState.args = {};

export const CustomStyle: StoryObj<typeof ButtonGroup> = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        width: 100%;
        background: #f2f4f7;
        padding: 20px;
        border-radius: 20px;
      `}>
      <ButtonGroup
        items={items}
        buttonStyles={css`
          background: ${theme.colors.white};

          &:hover {
            background: ${theme.colors.greyLighter};
          }
        `}
        onClick={(item) => item}
      />
    </div>
  );
};

CustomStyle.args = {};

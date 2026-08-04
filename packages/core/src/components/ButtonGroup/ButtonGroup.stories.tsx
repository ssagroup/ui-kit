import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { css, useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import { ButtonGroup } from './ButtonGroup';
import { ButtonGroupButton } from './ButtonGroupButton';
import { items } from './helpers';
import { ButtonGroupItem } from './types';
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

export const Composed: StoryObj<typeof ButtonGroup> = () => {
  const [selected, setSelected] = useState<ButtonGroupItem['id']>('all');

  return (
    <ButtonGroup value={selected} onClick={({ id }) => setSelected(id)}>
      <ButtonGroupButton id="all">All</ButtonGroupButton>
      <ButtonGroupButton id="running" text="Running">
        <Icon name="clock" size={14} />
        <span css={{ marginLeft: 6 }}>Running</span>
      </ButtonGroupButton>
      <ButtonGroupButton id="stopped" disabled>
        Stopped
      </ButtonGroupButton>
    </ButtonGroup>
  );
};

Composed.parameters = {
  docs: {
    description: {
      story:
        'Composed children let a button carry an icon or any other markup — the `items` API is limited to plain labels. Selection still lives on the group; each button only needs an `id`.',
    },
  },
};

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

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
      <ButtonGroupButton id="running" icon={<Icon name="clock" size={24} />}>
        Running
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

export const Icons: StoryObj<typeof ButtonGroup> = () => {
  const [selected, setSelected] = useState<ButtonGroupItem['id']>('list');

  return (
    <ButtonGroup value={selected} onClick={({ id }) => setSelected(id)}>
      <ButtonGroupButton
        id="list"
        icon={<Icon name="list" size={24} />}
        aria-label="List view"
      />
      <ButtonGroupButton
        id="columns"
        icon={<Icon name="columns" size={24} />}
        aria-label="Column view"
      />
    </ButtonGroup>
  );
};

Icons.parameters = {
  docs: {
    description: {
      story:
        'An `icon` with no children makes the button icon-only: a 40x40 square. It has no text for a screen reader to read, so `aria-label` is required — it is the button’s only accessible name, and the label the group reports through `onClick`. The 24px icon here matches the design; any size works, and the square holds at 40px either way.',
    },
  },
};

export const IconsWithText: StoryObj<typeof ButtonGroup> = () => (
  <ButtonGroup
    defaultValue={2}
    items={[
      { id: 1, icon: <Icon name="list" size={24} />, text: 'List' },
      { id: 2, icon: <Icon name="columns" size={24} />, text: 'Columns' },
      {
        id: 3,
        icon: <Icon name="calendar" size={24} />,
        ariaLabel: 'Calendar view',
      },
    ]}
    onClick={(item) => item}
  />
);

IconsWithText.parameters = {
  docs: {
    description: {
      story:
        'The `items` API carries icons too — `icon`, `text`, or both. The third item is icon-only, so it takes an `ariaLabel` instead of `text`.',
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

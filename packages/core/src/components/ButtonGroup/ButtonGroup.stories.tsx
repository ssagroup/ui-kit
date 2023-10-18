import { Meta, StoryObj } from '@storybook/react';
import { css, useTheme } from '@emotion/react';
import { ButtonGroup } from './ButtonGroup';

const items = [
  { id: 1, text: 'All (10)' },
  { id: 2, text: 'Running (117)' },
  { id: 3, text: 'Stopped (2)' },
];

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
} as Meta<typeof ButtonGroup>;

export const Default: StoryObj<typeof ButtonGroup> = () => {
  return <ButtonGroup items={items} onClick={(item) => item} />;
};

Default.args = {};

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
        cssStyles={css`
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

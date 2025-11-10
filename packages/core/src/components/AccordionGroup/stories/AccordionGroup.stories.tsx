import { css, useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { AccordionGroup } from '../index';

import { AccordionGroupDecorator } from './helpers';
import { AccordionTemplate } from './helpers';

type Args = StoryObj<typeof AccordionGroup>;

export default {
  title: 'Components/AccordionGroup',
  component: AccordionGroup,
  decorators: [AccordionGroupDecorator],
  argTypes: {},
} as Meta<typeof AccordionGroup>;

const StoryTemplate: Args = {
  render: ({ ...args }) => <AccordionTemplate {...args} />,
};

export const Large = {
  ...StoryTemplate,
  args: {
    size: 'large',
  },
};

export const Medium = () => {
  const theme = useTheme();
  return (
    <AccordionTemplate
      size="medium"
      css={css`
        width: 340px;
        border-radius: 5px;
        border: 1px solid ${theme.colors.greyDropdownMain};
      `}
    />
  );
};

export const Small = () => {
  const theme = useTheme();
  return (
    <AccordionTemplate
      size="small"
      css={css`
        width: 240px;
        border-radius: 0;
        background: linear-gradient(
          108deg,
          ${theme.colors.greyDarker} 0%,
          ${theme.colors.greyDark} 100%
        );
      `}
    />
  );
};

export const LargeWithOnlySingleOpened = {
  ...StoryTemplate,
  args: {
    size: 'large',
    accordionsStayOpen: false,
  },
};

export const MediumWithOnlySingleOpened = () => {
  const theme = useTheme();
  return (
    <AccordionTemplate
      size="medium"
      accordionsStayOpen={false}
      css={css`
        width: 340px;
        border-radius: 5px;
        border: 1px solid ${theme.colors.greyDropdownMain};
      `}
    />
  );
};

export const SmallWithOnlySingleOpened = () => {
  const theme = useTheme();
  return (
    <AccordionTemplate
      size="small"
      accordionsStayOpen={false}
      css={css`
        width: 240px;
        border-radius: 0;
        background: linear-gradient(
          108deg,
          ${theme.colors.greyDarker} 0%,
          ${theme.colors.greyDark} 100%
        );
      `}
    />
  );
};

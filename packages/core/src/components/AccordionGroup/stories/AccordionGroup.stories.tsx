import type { Meta, StoryObj } from '@storybook/react';
import AccordionGroup from '../index';
import { AccordionGroupDecorator } from './helpers';
import { css, useTheme } from '@emotion/react';
import { AccordionTemplate } from './helpers';

type Args = StoryObj<typeof AccordionGroup>;

export default {
  title: 'Components/AccordionGroup',
  component: AccordionGroup,
  parameters: {
    docs: {
      description: {
        component:
          'An AccordionGroup is a container that allows users to toggle visible of related content on a page',
      },
    },
  },
  decorators: [AccordionGroupDecorator],
  argTypes: {},
} as Meta<typeof AccordionGroup>;

const StoryTemplate: Args = {
  render: ({ ...args }) => <AccordionTemplate {...(args as any)} />,
};

export const Large = {
  ...StoryTemplate,
  args: {
    variant: 'large',
  },
};

export const Medium = () => {
  const theme = useTheme();
  return (
    <AccordionTemplate
      variant="medium"
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
      variant="small"
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

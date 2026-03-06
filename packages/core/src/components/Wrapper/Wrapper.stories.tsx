import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useToggle } from '@ssa-ui-kit/hooks';

import Button from '@components/Button';
import Typography from '@components/Typography';

import Wrapper from './Wrapper';

const meta = {
  title: 'Components/Wrapper',
  component: Wrapper,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Flex direction',
    },
    alignItems: {
      control: 'select',
      options: [
        'flex-start',
        'center',
        'flex-end',
        'stretch',
        'baseline',
        'start',
        'end',
      ],
      description: 'Cross-axis alignment',
    },
    justifyContent: {
      control: 'select',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Main-axis alignment',
    },
    fade: {
      control: 'boolean',
      description: 'Enable fade in/out transition',
    },
    isVisible: {
      control: 'boolean',
      description: 'Visibility state',
    },
    fadeDelay: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: 'Fade duration in seconds',
    },
  },
} satisfies Meta<typeof Wrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

const boxStyles = {
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: '#e0e0e0',
};

export const Default: Story = {
  args: {},
  render: (args) => (
    <Wrapper {...args} css={{ gap: '12px' }}>
      <span css={boxStyles}>A</span>
      <span css={boxStyles}>B</span>
      <span css={boxStyles}>C</span>
    </Wrapper>
  ),
};

export const Direction: Story = {
  render: () => (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          direction="row" (default)
        </Typography>
        <Wrapper direction="row" css={{ gap: '12px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          direction="column"
        </Typography>
        <Wrapper
          direction="column"
          alignItems="flex-start"
          css={{ gap: '8px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          direction="row-reverse"
        </Typography>
        <Wrapper direction="row-reverse" css={{ gap: '12px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
    </div>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          justifyContent="space-between"
        </Typography>
        <Wrapper justifyContent="space-between" css={{ gap: '12px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          justifyContent="center"
        </Typography>
        <Wrapper justifyContent="center" css={{ gap: '12px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          justifyContent="space-evenly"
        </Typography>
        <Wrapper justifyContent="space-evenly" css={{ gap: '12px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
    </div>
  ),
};

export const AlignItems: Story = {
  render: () => (
    <div css={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          alignItems="flex-start" (column)
        </Typography>
        <Wrapper
          direction="column"
          alignItems="flex-start"
          css={{ gap: '8px', height: '120px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          alignItems="center" (default)
        </Typography>
        <Wrapper
          direction="row"
          alignItems="center"
          css={{ gap: '12px', height: '60px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
      <div>
        <Typography variant="body2" css={{ marginBottom: '8px' }}>
          alignItems="flex-end"
        </Typography>
        <Wrapper
          direction="column"
          alignItems="flex-end"
          css={{ gap: '8px', height: '120px' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
    </div>
  ),
};

export const Fade: Story = {
  render: function FadeStory() {
    const [isVisible, toggleVisible] = useToggle([true, false]);

    return (
      <div css={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Button onClick={() => toggleVisible()} size="small">
          {isVisible ? 'Hide' : 'Show'} content
        </Button>
        <Wrapper
          fade
          isVisible={isVisible}
          fadeDelay={0.4}
          css={{ gap: '12px', padding: '16px', backgroundColor: '#f5f5f5' }}>
          <span css={boxStyles}>A</span>
          <span css={boxStyles}>B</span>
          <span css={boxStyles}>C</span>
        </Wrapper>
      </div>
    );
  },
};

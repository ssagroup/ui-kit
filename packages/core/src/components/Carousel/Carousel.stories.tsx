import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Carousel } from './Carousel';
import { CarouselItem } from './types';

const photo = (seed: string, w: number, h: number, alt: string) => ({
  src: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  thumbnailSrc: `https://picsum.photos/seed/${seed}/${Math.round(w / 6)}/${Math.round(h / 6)}`,
  fullSrc: `https://picsum.photos/seed/${seed}/${w * 2}/${h * 2}`,
  alt,
});

// Mixed orientations on purpose: the frame keeps its size, images adapt.
const items: CarouselItem[] = [
  photo('ssa-1', 800, 600, 'Landscape photo'),
  photo('ssa-2', 600, 800, 'Portrait photo'),
  photo('ssa-3', 700, 700, 'Square photo'),
  photo('ssa-4', 960, 540, 'Wide photo'),
  photo('ssa-5', 800, 600, 'Another landscape photo'),
  photo('ssa-6', 600, 900, 'Tall photo'),
  photo('ssa-7', 800, 600, 'Last photo'),
];

const placeholders: CarouselItem[] = [{}, {}, {}, {}, {}];

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    thumbnails: {
      options: [false, 'left', 'right', 'bottom'],
      control: { type: 'inline-radio' },
    },
    controlsPosition: {
      options: ['overlay', 'below'],
      control: { type: 'inline-radio' },
    },
    fit: {
      options: ['contain', 'cover'],
      control: { type: 'inline-radio' },
    },
    aspectRatio: { control: { type: 'number', step: 0.1 } },
    autoPlayInterval: { control: { type: 'number', step: 500 } },
    transitionDuration: { control: { type: 'number', step: 100 } },
  },
  args: {
    items,
    thumbnails: false,
    showDots: true,
    showArrows: true,
    controlsPosition: 'overlay',
    allowOpenFull: false,
    aspectRatio: 1,
    fit: 'contain',
    loop: false,
    autoPlay: false,
    autoPlayInterval: 5000,
    transitionDuration: 300,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 392 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {};

export const ThumbnailsLeft: Story = {
  args: { thumbnails: 'left' },
};

export const ThumbnailsRight: Story = {
  args: { thumbnails: 'right' },
};

export const ThumbnailsBottom: Story = {
  args: { thumbnails: 'bottom' },
  decorators: [
    (Story) => (
      <div style={{ width: 324 }}>
        <Story />
      </div>
    ),
  ],
};

export const Placeholders: Story = {
  args: { items: placeholders, thumbnails: 'left' },
  parameters: {
    docs: {
      description: {
        story:
          'Slides without `src` (or whose image fails to load) render the grey picture placeholder.',
      },
    },
  },
};

export const WithoutControls: Story = {
  args: { showDots: false, showArrows: false, thumbnails: 'bottom' },
  decorators: ThumbnailsBottom.decorators,
};

export const ControlsBelow: Story = {
  args: { controlsPosition: 'below' },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 40,
        alignItems: 'flex-start',
      }}>
      <div style={{ width: 324, flexShrink: 0 }}>
        <Carousel {...args} aria-label="No thumbnails" />
      </div>
      <div style={{ width: 392, flexShrink: 0 }}>
        <Carousel {...args} thumbnails="left" aria-label="Thumbnails left" />
      </div>
      <div style={{ width: 324, flexShrink: 0 }}>
        <Carousel
          {...args}
          thumbnails="bottom"
          aria-label="Thumbnails bottom"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`controlsPosition="below"` moves the dots and arrows into their own row under the slide. The row lines up with the slide, so a side thumbnail strip stays as tall as the slide itself.',
      },
    },
  },
};

export const OpenFullSize: Story = {
  args: { allowOpenFull: true },
  parameters: {
    docs: {
      description: {
        story:
          'Hover or focus the slide to reveal the button that opens `fullSrc` (or `src`) in a new tab.',
      },
    },
  },
};

export const AutoPlay: Story = {
  args: { autoPlay: true, autoPlayInterval: 2500, transitionDuration: 600 },
  parameters: {
    docs: {
      description: {
        story:
          '`autoPlayInterval` sets how long each slide stays, `transitionDuration` how fast it slides. Pauses on hover and focus.',
      },
    },
  },
};

export const AspectRatioAndFit: Story = {
  args: { aspectRatio: 16 / 9, fit: 'cover', thumbnails: 'bottom' },
  decorators: [
    (Story) => (
      <div style={{ width: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export const FixedHeight: Story = {
  args: { height: 240, thumbnails: 'left' },
  decorators: [
    (Story) => (
      <div style={{ width: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export const Responsive: Story = {
  args: { thumbnails: 'left' },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 480,
          minWidth: 200,
          maxWidth: '100%',
          resize: 'horizontal',
          overflow: 'auto',
          padding: 8,
          border: '1px dashed #c3c5cc',
        }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Drag the bottom-right corner: width follows the container, height follows `aspectRatio`.',
      },
    },
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [index, setIndex] = useState(2);
    return (
      <div>
        <Carousel {...args} index={index} onIndexChange={setIndex} />
        <p>Current index: {index}</p>
      </div>
    );
  },
};

export const CustomContent: Story = {
  args: {
    renderItem: (item, index) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontSize: 32,
          background: index % 2 ? '#eef1f7' : '#f4f5f9',
        }}>
        Slide {index + 1}
      </div>
    ),
  },
};

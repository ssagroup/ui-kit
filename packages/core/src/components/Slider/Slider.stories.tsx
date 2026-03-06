import { useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import {
  Slider,
  SliderTrackFill,
  SliderTrackBg,
  SliderRangeInput,
  SliderValueLabel,
} from '.';

const WRAPPER = {
  padding: '40px 32px',
  borderRadius: 16,
} as const;

const WRAPPER_WITH_BG = {
  ...WRAPPER,
  background: 'rgb(238, 241, 247)',
} as const;

export default {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    valueLabelDisplay: {
      options: ['auto', 'on', 'off'],
      control: { type: 'select' },
    },
    withInputs: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    disableSwap: { control: { type: 'boolean' } },
    minDistance: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
  },
  args: {
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
    size: 'medium',
    valueLabelDisplay: 'auto',
    disabled: false,
    disableSwap: false,
  },
} as Meta<typeof Slider>;

type Story = StoryObj<typeof Slider>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    defaultValue: [20, 80],
    valueLabelDisplay: 'auto',
  },
  render: (args) => (
    <div style={WRAPPER}>
      <Slider {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Value labels always visible
// ---------------------------------------------------------------------------

export const ValueLabelsAlwaysOn: Story = {
  args: {
    label: 'Label',
    min: 0,
    max: 100,
    defaultValue: [25, 75],
    valueLabelDisplay: 'on',
  },
  render: (args) => (
    <div style={WRAPPER}>
      <Slider {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With number inputs
// ---------------------------------------------------------------------------

export const WithInputs: Story = {
  args: {
    label: 'Label',
    min: 1,
    max: 1000,
    step: 1,
    defaultValue: [1, 1000],
    withInputs: true,
  },
  render: (args) => (
    <div style={WRAPPER}>
      <Slider {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div
      style={{ ...WRAPPER, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Slider
        label="Small"
        size="small"
        defaultValue={[20, 70]}
        valueLabelDisplay="on"
      />
      <Slider
        label="Medium (default)"
        size="medium"
        defaultValue={[20, 70]}
        valueLabelDisplay="on"
      />
      <Slider
        label="Large"
        size="large"
        defaultValue={[20, 70]}
        valueLabelDisplay="on"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Marks — tick scale below the track (like a speedometer)
// ---------------------------------------------------------------------------

export const WithMarks: Story = {
  render: () => (
    <div
      style={{ ...WRAPPER, display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* Evenly spaced marks */}
      <Slider
        label="Evenly spaced marks"
        min={0}
        max={100}
        defaultValue={[20, 70]}
        valueLabelDisplay="on"
        marks={[
          { value: 0, label: '0' },
          { value: 25, label: '25' },
          { value: 50, label: '50' },
          { value: 75, label: '75' },
          { value: 100, label: '100' },
        ]}
      />

      {/* Custom / uneven marks — matches design image */}
      <Slider
        label="Custom marks (uneven)"
        min={100}
        max={1000}
        defaultValue={[230, 746]}
        valueLabelDisplay="on"
        marks={[
          { value: 100, label: '100' },
          { value: 250, label: '250' },
          { value: 500, label: '500' },
          { value: 750, label: '750' },
          { value: 1000, label: '1000' },
        ]}
      />

      {/* Marks without labels — ticks only */}
      <Slider
        label="Tick marks only (no labels)"
        min={0}
        max={100}
        defaultValue={[10, 90]}
        marks={[
          { value: 0 },
          { value: 20 },
          { value: 40 },
          { value: 60 },
          { value: 80 },
          { value: 100 },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disable swap
// ---------------------------------------------------------------------------

export const DisableSwap: Story = {
  args: {
    label: 'Thumbs cannot cross (disableSwap)',
    defaultValue: [20, 80],
    disableSwap: true,
    valueLabelDisplay: 'on',
  },
  render: (args) => (
    <div style={WRAPPER}>
      <Slider {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Min distance
// ---------------------------------------------------------------------------

export const MinDistance: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <div style={WRAPPER}>
        <Slider
          label="Min distance = 20"
          min={0}
          max={100}
          value={value}
          onChange={setValue}
          disableSwap
          minDistance={20}
          valueLabelDisplay="on"
        />
        <p style={{ marginTop: 12, fontSize: 14, color: '#2b2d31' }}>
          [{value[0]}, {value[1]}]
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: [25, 75],
    disabled: true,
    valueLabelDisplay: 'on',
  },
  render: (args) => (
    <div style={WRAPPER}>
      <Slider {...args} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <div style={WRAPPER}>
        <Slider
          label="Controlled"
          min={0}
          max={100}
          value={value}
          onChange={setValue}
          valueLabelDisplay="on"
        />
        <p style={{ marginTop: 12, fontSize: 14, color: '#2b2d31' }}>
          [{value[0]}, {value[1]}]
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Customisation — css prop
// Sub-elements are exported as Slider* named components and can be used
// directly as CSS-in-JS selectors inside the css prop.
// ---------------------------------------------------------------------------

export const CustomisationViaCssProp: Story = {
  render: () => (
    <div
      style={{ ...WRAPPER, display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Green */}
      <Slider
        label="Green fill — override via css prop"
        defaultValue={[20, 70]}
        valueLabelDisplay="on"
        css={css`
          ${SliderTrackFill} {
            background: #52c587;
          }
          ${SliderRangeInput}::-webkit-slider-thumb {
            background: #52c587;
          }
          ${SliderRangeInput}:not(:disabled)::-webkit-slider-thumb:hover {
            background: #36a86a;
          }
          ${SliderRangeInput}::-moz-range-thumb {
            background: #52c587;
          }
        `}
      />

      {/* Compact gap */}
      <Slider
        label="Compact gap — override via css prop"
        defaultValue={[30, 60]}
        valueLabelDisplay="on"
        css={css`
          gap: 4px;
        `}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Customisation — className
// ---------------------------------------------------------------------------

export const CustomisationViaClassName: Story = {
  render: () => (
    <div style={WRAPPER}>
      <style>{`
        .amber-slider ${SliderTrackBg}  { background: rgba(237,153,93,0.25); }
        .amber-slider ${SliderTrackFill} { background: rgb(237,153,93); }
        .amber-slider ${SliderRangeInput}::-webkit-slider-thumb { background: rgb(237,153,93); }
        .amber-slider ${SliderRangeInput}:not(:disabled)::-webkit-slider-thumb:hover {
          background: rgb(231,122,44);
        }
        .amber-slider ${SliderRangeInput}::-moz-range-thumb { background: rgb(237,153,93); }
        .amber-slider ${SliderValueLabel} { background: rgb(237,153,93); color: #fff; box-shadow: none; }
      `}</style>

      <div className="amber-slider">
        <Slider
          label="Amber — customised via className"
          defaultValue={[25, 70]}
          valueLabelDisplay="on"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With inputs controlled
// ---------------------------------------------------------------------------

export const WithInputsControlled: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([100, 800]);
    return (
      <div style={WRAPPER_WITH_BG}>
        <Slider
          label="Budget range"
          min={0}
          max={1000}
          step={10}
          value={value}
          onChange={setValue}
          withInputs
        />
      </div>
    );
  },
};

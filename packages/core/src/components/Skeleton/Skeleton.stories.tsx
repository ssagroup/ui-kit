import { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Skeleton } from './Skeleton';
import { SkeletonGroup } from './SkeletonGroup';
import { SkeletonText } from './presets/SkeletonText';
import { SkeletonListItem } from './presets/SkeletonListItem';
import { SkeletonMediaCard } from './presets/SkeletonMediaCard';
import { SkeletonTable } from './presets/SkeletonTable';
import { SkeletonForm } from './presets/SkeletonForm';
import { SkeletonWidgetCard } from './presets/SkeletonWidgetCard';
import { SkeletonAnimation, SkeletonCorners } from './types';

const surface: CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: 40,
  boxSizing: 'border-box',
};

const Panel = ({
  title,
  width = 464,
  children,
}: {
  title?: string;
  width?: number | string;
  children: ReactNode;
}) => (
  <div style={{ ...surface, width }}>
    {title && (
      <p style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600 }}>
        {title}
      </p>
    )}
    {children}
  </div>
);

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  decorators: [
    (Story) => (
      <div style={{ background: '#eef1f7', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      include: ['shape', 'width', 'height', 'radius', 'animation', 'corners'],
    },
  },
  args: {
    shape: 'rect',
    animation: 'wave',
    corners: 'rounded',
    height: 40,
  },
  argTypes: {
    shape: { control: 'inline-radio', options: ['rect', 'circle'] },
    animation: {
      control: 'inline-radio',
      options: ['wave', 'pulse', 'none'],
    },
    corners: { control: 'inline-radio', options: ['rounded', 'squared'] },
    width: { control: 'text' },
    height: { control: 'number' },
    radius: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => (
    <Panel>
      <SkeletonGroup>
        <Skeleton {...args} />
      </SkeletonGroup>
    </Panel>
  ),
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['wave', 'pulse', 'none'] as SkeletonAnimation[]).map((animation) => (
        <Panel key={animation} title={animation} width={320}>
          <SkeletonGroup animation={animation}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>
          </SkeletonGroup>
        </Panel>
      ))}
    </div>
  ),
};

export const Corners: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['squared', 'rounded'] as SkeletonCorners[]).map((corners) => (
        <Panel key={corners} title={`Card ${corners}`}>
          <SkeletonGroup corners={corners}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <SkeletonMediaCard />
              <SkeletonListItem
                chips={corners === 'rounded' ? 2 : 1}
                trailing={corners === 'rounded'}
                animation="pulse"
              />
            </div>
          </SkeletonGroup>
        </Panel>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Panel>
      <SkeletonGroup>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Skeleton shape="circle" />
          <Skeleton shape="circle" width={24} />
          <Skeleton height={32} width={80} />
          <Skeleton height={12} />
        </div>
      </SkeletonGroup>
    </Panel>
  ),
};

const PresetHeading = ({ children }: { children: ReactNode }) => (
  <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>
    {children}
  </p>
);

/** Every ready-made layout on one page, in the order the docs describe them. */
export const Presets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <PresetHeading>SkeletonText</PresetHeading>
        <Panel>
          <SkeletonText lines={4} />
        </Panel>
      </div>
      <div>
        <PresetHeading>SkeletonListItem</PresetHeading>
        <Panel width={560}>
          <SkeletonListItem count={3} chips={2} trailing />
        </Panel>
      </div>
      <div>
        <PresetHeading>SkeletonMediaCard</PresetHeading>
        <Panel>
          <SkeletonMediaCard mediaHeight={180} />
        </Panel>
      </div>
      <div>
        <PresetHeading>SkeletonTable</PresetHeading>
        <SkeletonTable rows={6} columns={5} />
      </div>
      <div>
        <PresetHeading>SkeletonForm</PresetHeading>
        <Panel width={720}>
          <SkeletonForm fields={6} columns={2} />
        </Panel>
      </div>
      <div>
        <PresetHeading>SkeletonWidgetCard</PresetHeading>
        <div style={{ display: 'flex', gap: 24, maxWidth: 900 }}>
          <SkeletonWidgetCard />
          <SkeletonWidgetCard>
            <Skeleton height={160} />
          </SkeletonWidgetCard>
        </div>
      </div>
    </div>
  ),
};

/**
 * Recipe: a dashboard — a header line, a row of widgets, a table. One group
 * sets the look and announces once.
 */
export const DashboardPage: Story = {
  render: () => (
    <SkeletonGroup label="Loading dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Skeleton height={32} width={240} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}>
          <SkeletonWidgetCard>
            <Skeleton height={120} />
          </SkeletonWidgetCard>
          <SkeletonWidgetCard>
            <Skeleton shape="circle" width={120} />
          </SkeletonWidgetCard>
          <SkeletonWidgetCard />
        </div>
        <SkeletonTable rows={5} columns={5} />
      </div>
    </SkeletonGroup>
  ),
};

/** Recipe: a list page — a title and search bar over a list of items. */
export const ListPage: Story = {
  render: () => (
    <SkeletonGroup label="Loading people">
      <Panel width={640}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Skeleton height={32} width="40%" />
            <Skeleton height={44} width="40%" style={{ marginLeft: 'auto' }} />
          </div>
          <SkeletonListItem count={4} lines={1} />
        </div>
      </Panel>
    </SkeletonGroup>
  ),
};

/** Recipe: a detail page — a profile row beside an edit form. */
export const DetailPage: Story = {
  render: () => (
    <SkeletonGroup animation="pulse" label="Loading profile">
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Panel width={360}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SkeletonListItem lines={1} chips={0} avatarSize={64} />
            <SkeletonText lines={5} />
          </div>
        </Panel>
        <Panel width={560}>
          <SkeletonForm fields={4} columns={2} />
        </Panel>
      </div>
    </SkeletonGroup>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Caption,
  Matrix,
  Panel,
  PanelRow,
  PanelStack,
  Stack,
  storyCanvas,
} from '@storybook-layout';

import { Skeleton } from './Skeleton';
import { SkeletonGroup } from './SkeletonGroup';
import { SkeletonText } from './presets/SkeletonText';
import { SkeletonListItem } from './presets/SkeletonListItem';
import { SkeletonMediaCard } from './presets/SkeletonMediaCard';
import { SkeletonTable } from './presets/SkeletonTable';
import { SkeletonForm } from './presets/SkeletonForm';
import { SkeletonWidgetCard } from './presets/SkeletonWidgetCard';
import { SkeletonAnimation, SkeletonCorners } from './types';

/** Props shown in the controls tables of the stories and the docs page. */
export const DOCUMENTED_SKELETON_PROPS = [
  'shape',
  'width',
  'height',
  'radius',
  'animation',
  'corners',
];

const ANIMATIONS: SkeletonAnimation[] = ['wave', 'pulse', 'none'];
const CORNERS: SkeletonCorners[] = ['rounded', 'squared'];

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  excludeStories: ['DOCUMENTED_SKELETON_PROPS'],
  decorators: [storyCanvas],
  parameters: {
    controls: { include: DOCUMENTED_SKELETON_PROPS },
  },
  args: {
    shape: 'rect',
    animation: 'wave',
    corners: 'rounded',
    height: 40,
  },
  argTypes: {
    shape: { control: 'inline-radio', options: ['rect', 'circle'] },
    animation: { control: 'inline-radio', options: ANIMATIONS },
    corners: { control: 'inline-radio', options: CORNERS },
    width: { control: 'text' },
    height: { control: 'number' },
    radius: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => (
    <Panel width={464}>
      <SkeletonGroup>
        <Skeleton {...args} />
      </SkeletonGroup>
    </Panel>
  ),
};

/**
 * A piece fills its container by default; `width` and `height` size it to
 * the content it stands for, and a circle stays round from `width` alone.
 */
export const Shapes: Story = {
  render: () => (
    <SkeletonGroup>
      <PanelRow>
        <Panel title="circle (default 48px)">
          <Skeleton shape="circle" />
        </Panel>
        <Panel title="circle, width 24">
          <Skeleton shape="circle" width={24} />
        </Panel>
        <Panel title="rect 80 × 32">
          <Skeleton height={32} width={80} />
        </Panel>
        <Panel title="line (100% × 12)" width={320}>
          <Skeleton height={12} />
        </Panel>
        <Panel title="radius 4" width={200}>
          <Skeleton height={48} radius={4} />
        </Panel>
      </PanelRow>
    </SkeletonGroup>
  ),
};

/** Every animation with both corner styles. */
export const AnimationsAndCorners: Story = {
  render: () => (
    <Panel>
      <Matrix
        rows={ANIMATIONS}
        columns={CORNERS}
        minColumnWidth={280}
        rowGap={32}
        align="start"
        renderCell={(animation, corners) => (
          <SkeletonGroup animation={animation} corners={corners}>
            <Stack gap={24}>
              <SkeletonMediaCard mediaHeight={80} />
              <SkeletonListItem chips={2} lines={1} trailing />
            </Stack>
          </SkeletonGroup>
        )}
      />
    </Panel>
  ),
};

/**
 * A group sets the look of everything inside; a value set on a piece or
 * layout wins, and a nested group only passes its settings down.
 */
export const GroupSettings: Story = {
  render: () => (
    <PanelRow>
      <Panel title="group: pulse, squared" width={360}>
        <SkeletonGroup animation="pulse" corners="squared">
          <Stack gap={24}>
            <SkeletonText lines={2} />
            <SkeletonListItem lines={1} chips={1} />
          </Stack>
        </SkeletonGroup>
      </Panel>
      <Panel title="group: wave · list item: pulse" width={360}>
        <SkeletonGroup animation="wave">
          <Stack gap={24}>
            <SkeletonText lines={2} />
            <SkeletonListItem lines={1} chips={1} animation="pulse" />
          </Stack>
        </SkeletonGroup>
      </Panel>
      <Panel title="nested group: rounded inside squared" width={360}>
        <SkeletonGroup corners="squared" label="Loading report">
          <Stack gap={24}>
            <SkeletonText lines={2} />
            <SkeletonGroup corners="rounded">
              <SkeletonListItem lines={1} chips={1} />
            </SkeletonGroup>
          </Stack>
        </SkeletonGroup>
      </Panel>
    </PanelRow>
  ),
};

/**
 * Every ready-made layout, in the order the docs describe them. The table and
 * the widget cards draw their own surface, so they sit on the canvas.
 */
export const Presets: Story = {
  render: () => (
    <PanelStack>
      <Panel title="SkeletonText" width={464}>
        <SkeletonText lines={4} />
      </Panel>
      <Panel title="SkeletonListItem" width={560}>
        <SkeletonListItem count={3} chips={2} trailing />
      </Panel>
      <Panel title="SkeletonMediaCard" width={464}>
        <SkeletonMediaCard mediaHeight={180} />
      </Panel>
      <div>
        <Caption style={{ marginBottom: 12 }}>SkeletonTable</Caption>
        <SkeletonTable rows={6} columns={5} />
      </div>
      <Panel title="SkeletonForm" width={720}>
        <SkeletonForm fields={6} columns={2} />
      </Panel>
      <div style={{ maxWidth: 900 }}>
        <Caption style={{ marginBottom: 12 }}>SkeletonWidgetCard</Caption>
        <Stack direction="row" gap={24}>
          <SkeletonWidgetCard />
          <SkeletonWidgetCard>
            <Skeleton height={160} />
          </SkeletonWidgetCard>
        </Stack>
      </div>
    </PanelStack>
  ),
};

const DashboardRecipe = () => (
  <div>
    <Caption style={{ marginBottom: 12 }}>Dashboard</Caption>
    <SkeletonGroup label="Loading dashboard">
      <Stack gap={24}>
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
      </Stack>
    </SkeletonGroup>
  </div>
);

const ListPageRecipe = () => (
  <Panel title="List page" width={640}>
    <SkeletonGroup label="Loading people">
      <Stack gap={32}>
        <Stack direction="row" gap={16} align="center">
          <Skeleton height={32} width="40%" />
          <Skeleton height={44} width="40%" style={{ marginLeft: 'auto' }} />
        </Stack>
        <SkeletonListItem count={4} lines={1} />
      </Stack>
    </SkeletonGroup>
  </Panel>
);

const DetailPageRecipe = () => (
  <div>
    <Caption style={{ marginBottom: 12 }}>Detail page</Caption>
    <SkeletonGroup animation="pulse" label="Loading profile">
      <PanelRow>
        <Panel width={360}>
          <Stack gap={24}>
            <SkeletonListItem lines={1} chips={0} avatarSize={64} />
            <SkeletonText lines={5} />
          </Stack>
        </Panel>
        <Panel width={560}>
          <SkeletonForm fields={4} columns={2} />
        </Panel>
      </PanelRow>
    </SkeletonGroup>
  </div>
);

/**
 * Page recipes: a dashboard, a list page and a detail page. One group per
 * page sets the look and announces once.
 */
export const ExamplesWithContent: Story = {
  name: 'Example with content',
  render: () => (
    <PanelStack>
      <DashboardRecipe />
      <ListPageRecipe />
      <DetailPageRecipe />
    </PanelStack>
  ),
};

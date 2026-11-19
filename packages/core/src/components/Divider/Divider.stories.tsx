import { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@components/Button';
import Icon from '@components/Icon';
import {
  Skeleton,
  SkeletonForm,
  SkeletonGroup,
  SkeletonListItem,
  SkeletonText,
} from '@components/Skeleton';

import { Divider } from './Divider';
import {
  DividerColor,
  DividerProps,
  DividerSize,
  DividerVariant,
} from './types';

/** Props shown in the controls tables of the stories and the docs page. */
export const DOCUMENTED_DIVIDER_PROPS = [
  'orientation',
  'variant',
  'size',
  'color',
  'length',
  'gap',
  'spacing',
  'fontSize',
  'iconSize',
  'icon',
  'children',
  'aria-label',
];

const VARIANTS: DividerVariant[] = ['solid', 'dashed', 'dotted'];
const SIZES: DividerSize[] = ['small', 'medium', 'large'];

const surface: CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: 24,
  boxSizing: 'border-box',
};

const caption: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 12,
  fontWeight: 600,
  color: 'rgba(43, 45, 49, 0.6)',
  textTransform: 'uppercase',
  letterSpacing: 0.4,
};

const Panel = ({
  title,
  width,
  children,
  style,
}: {
  title?: string;
  width?: number | string;
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div style={{ ...surface, width, ...style }}>
    {title && <p style={caption}>{title}</p>}
    {children}
  </div>
);

/** The design's "Avatar" slot: any node, here a 24px circle with an icon. */
const AvatarNode = ({ background = '#d2d4db' }: { background?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      borderRadius: '50%',
      background,
    }}>
    <Icon name="user" size={16} color="#2b2d31" />
  </span>
);

/** A fixed-height row for vertical dividers. */
const VerticalRow = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', height: 200, alignItems: 'center' }}>
    {children}
  </div>
);

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  excludeStories: ['DOCUMENTED_DIVIDER_PROPS'],
  decorators: [
    (Story) => (
      <div style={{ background: '#eef1f7', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { include: DOCUMENTED_DIVIDER_PROPS },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'small',
    color: 'subtle',
    children: 'This is a separator',
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    variant: { control: 'inline-radio', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    color: { control: 'text' },
    length: { control: 'text' },
    gap: { control: 'number' },
    spacing: { control: 'number' },
    fontSize: { control: 'number' },
    iconSize: { control: 'number' },
    icon: {
      control: 'select',
      options: [undefined, 'language', 'user', 'star', 'calendar', 'lock'],
    },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => {
    // The icon control replaces the text, as the props allow one or the other.
    const props = (
      args.icon ? { ...args, children: undefined } : args
    ) as DividerProps;
    return (
      <Panel width={args.orientation === 'vertical' ? undefined : 600}>
        {args.orientation === 'vertical' ? (
          <VerticalRow>
            <Divider {...props} />
          </VerticalRow>
        ) : (
          <Divider {...props} />
        )}
      </Panel>
    );
  },
};

/** Every line style at every thickness, in both orientations. */
export const StylesAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Panel title="Horizontal">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(3, minmax(160px, 1fr))',
            alignItems: 'center',
            columnGap: 24,
          }}>
          <span />
          {SIZES.map((size) => (
            <p key={size} style={caption}>
              {size}
            </p>
          ))}
          {VARIANTS.map((variant) => (
            <Row key={variant} label={variant}>
              {SIZES.map((size) => (
                <Divider key={size} variant={variant} size={size} />
              ))}
            </Row>
          ))}
        </div>
      </Panel>
      <Panel title="Vertical">
        <VerticalRow>
          {VARIANTS.flatMap((variant) =>
            SIZES.map((size) => (
              <div
                key={`${variant}-${size}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  width: 72,
                }}>
                <div style={{ flex: 1, display: 'flex' }}>
                  <Divider
                    orientation="vertical"
                    variant={variant}
                    size={size}
                  />
                </div>
                <span style={{ ...caption, margin: 0, fontSize: 10 }}>
                  {variant}
                  <br />
                  {size}
                </span>
              </div>
            )),
          )}
        </VerticalRow>
      </Panel>
    </div>
  ),
};

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <>
    <p style={{ ...caption, margin: 0 }}>{label}</p>
    {children}
  </>
);

/** Nothing, text, a kit icon or any node in the middle. */
export const Content: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Panel title="Horizontal" width={520}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Divider />
          <Divider>This is a separator</Divider>
          <Divider icon="language" />
          <Divider aria-label="Assignee">
            <AvatarNode />
          </Divider>
        </div>
      </Panel>
      <Panel title="Vertical">
        <VerticalRow>
          <Divider orientation="vertical" />
          <Divider orientation="vertical">This is a separator</Divider>
          <Divider orientation="vertical" icon="language" />
          <Divider orientation="vertical" aria-label="Assignee">
            <AvatarNode />
          </Divider>
        </VerticalRow>
      </Panel>
    </div>
  ),
};

const COLORS: { color: DividerColor; label: string }[] = [
  { color: 'subtle', label: 'subtle (default)' },
  { color: 'strong', label: 'strong' },
  { color: 'blue', label: 'theme key: blue' },
  { color: '#e5484d', label: 'CSS colour: #e5484d' },
];

/**
 * The presets colour only the line. A custom colour also paints the text and
 * the icon; a node keeps its own colours.
 */
export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24,
      }}>
      {COLORS.map(({ color, label }) => (
        <Panel key={label} title={label}>
          <Divider color={color} />
          <Divider color={color} variant="dashed">
            This is a separator
          </Divider>
          <Divider color={color} variant="dotted" icon="language" />
          <Divider color={color} size="medium" aria-label="Assignee">
            <AvatarNode />
          </Divider>
        </Panel>
      ))}
    </div>
  ),
};

/** Length, spacing, gap, font size and icon size. */
export const Customization: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Panel title="length" width={520}>
        <Divider length={200}>200px</Divider>
        <Divider length="60%">60%</Divider>
        <Divider>100% (default)</Divider>
      </Panel>
      <Panel title="spacing: 0 / 8 (default) / 24" width={520}>
        <div style={{ display: 'flex', gap: 24 }}>
          {[0, 8, 24].map((spacing) => (
            // Blocks touch the divider: the parent has no gap.
            <div key={spacing} style={{ flex: 1 }}>
              <Skeleton height={24} animation="none" />
              <Divider spacing={spacing} size="medium" color="strong" />
              <Skeleton height={24} animation="none" />
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="gap: 4 / 12 (default) / 32" width={520}>
        {[4, 12, 32].map((gap) => (
          <Divider key={gap} gap={gap}>
            gap {gap}
          </Divider>
        ))}
      </Panel>
      <Panel title="fontSize and iconSize" width={520}>
        <Divider fontSize={12}>12px text</Divider>
        <Divider fontSize={20}>20px text</Divider>
        <Divider icon="star" iconSize={14} />
        <Divider icon="star" iconSize={28} />
      </Panel>
      <Panel title="vertical length">
        <VerticalRow>
          <Divider orientation="vertical" length={40} />
          <Divider orientation="vertical" length={120} variant="dashed" />
          <Divider orientation="vertical" variant="dotted" />
        </VerticalRow>
      </Panel>
    </div>
  ),
};

const ModalExample = () => (
  <Panel width={380} style={{ boxShadow: '0 12px 40px rgba(43,45,49,0.16)' }}>
    <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Sign in</p>
    <Divider spacing={16} />
    <SkeletonGroup label="Loading sign-in form">
      <SkeletonForm fields={2} actions={false} />
    </SkeletonGroup>
    <Divider spacing={16}>Or continue with</Divider>
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="secondary" size="small" text="Google" block />
      <Button variant="secondary" size="small" text="Microsoft" block />
    </div>
  </Panel>
);

const ListExample = () => (
  <Panel width={420} title="Notifications">
    <SkeletonGroup label="Loading notifications">
      <Divider variant="dashed" color="strong" fontSize={12}>
        Today
      </Divider>
      <SkeletonListItem count={2} lines={1} chips={0} avatarSize={40} />
      <Divider variant="dashed" color="strong" fontSize={12}>
        Yesterday
      </Divider>
      <SkeletonListItem lines={1} chips={0} avatarSize={40} />
      <Divider spacing={16} />
      <SkeletonListItem lines={1} chips={0} avatarSize={40} />
    </SkeletonGroup>
  </Panel>
);

const ToolbarExample = () => (
  <Panel width="fit-content" title="Toolbar">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button size="small" text="Bold" />
      <Button size="small" text="Italic" />
      <Divider orientation="vertical" length={20} />
      <Button size="small" text="Left" />
      <Button size="small" text="Centre" />
      <Divider orientation="vertical" length={20} />
      <Button size="small" text="Link" />
    </div>
  </Panel>
);

const SidebarExample = () => (
  <Panel width={640} title="Sidebar layout">
    <SkeletonGroup label="Loading page">
      <div style={{ display: 'flex', height: 220 }}>
        <div
          style={{
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
          {[0, 1, 2, 3].map((item) => (
            <Skeleton key={item} height={14} width="80%" />
          ))}
        </div>
        <Divider orientation="vertical" spacing={16} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Skeleton height={24} width="50%" />
          <Divider spacing={12} />
          <SkeletonText lines={5} />
        </div>
      </div>
    </SkeletonGroup>
  </Panel>
);

const StatsExample = () => (
  <Panel width={520} title="Widget stats">
    <SkeletonGroup label="Loading stats">
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {['Hired', 'Interviews', 'Offers'].map((label, index) => (
          <div
            key={label}
            style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
            {index > 0 && <Divider orientation="vertical" variant="dotted" />}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: '4px 8px',
              }}>
              <span style={{ fontSize: 12, color: 'rgba(43,45,49,0.6)' }}>
                {label}
              </span>
              <Skeleton height={28} width={64} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonGroup>
  </Panel>
);

const FormSectionsExample = () => (
  <Panel width={420} title="Form sections">
    <SkeletonGroup label="Loading form">
      <SkeletonForm fields={2} actions={false} />
      <Divider color="blue" variant="dashed" icon="lock" spacing={16} />
      <SkeletonForm fields={1} actions={false} />
      <Divider size="medium" spacing={16}>
        Optional
      </Divider>
      <SkeletonForm fields={2} columns={2} />
    </SkeletonGroup>
  </Panel>
);

/**
 * The divider in real layouts: a modal, a grouped list, a toolbar, a sidebar
 * page, widget stats and a sectioned form. Skeletons stand in for content.
 */
export const ExamplesWithContent: Story = {
  name: 'Example with content',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        alignItems: 'flex-start',
      }}>
      <ModalExample />
      <ListExample />
      <FormSectionsExample />
      <ToolbarExample />
      <StatsExample />
      <SidebarExample />
    </div>
  ),
};

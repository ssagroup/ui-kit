// Dev-only story (see "Dev-only stories" in .storybook/main.ts): Divider in
// awkward parents, to eyeball sizing, spacing and wrapping after a change.
// Not part of the published Storybook.
import { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@components/Button';
import { Skeleton } from '@components/Skeleton';

import { Divider } from './Divider';

const meta: Meta = {
  title: 'Dev Playground/Divider',
  parameters: { layout: 'fullscreen' },
};

export default meta;

const block: CSSProperties = {
  background: '#dfe3ee',
  borderRadius: 8,
  padding: 8,
  fontSize: 12,
};

const Case = ({
  title,
  note,
  children,
  width = 360,
}: {
  title: string;
  note?: string;
  children: ReactNode;
  width?: number | string;
}) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 12,
      padding: 16,
      width,
      boxSizing: 'border-box',
    }}>
    <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 13 }}>{title}</p>
    {note && (
      <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6b6f76' }}>
        {note}
      </p>
    )}
    {/* Outline the case area so overflow is visible. */}
    <div style={{ outline: '1px dashed #f0a', outlineOffset: 2 }}>
      {children}
    </div>
  </div>
);

export const EdgeCases: StoryObj = {
  render: () => (
    <div
      style={{
        background: '#eef1f7',
        padding: 24,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        alignItems: 'flex-start',
      }}>
      <Case
        title="Block parent, no gap"
        note="spacing keeps 8px above and below without any parent gap.">
        <div style={block}>Section A</div>
        <Divider />
        <div style={block}>Section B</div>
        <Divider spacing={0} />
        <div style={block}>spacing=0 above</div>
      </Case>

      <Case
        title="Flex column, align-items: center"
        note="Horizontal default length is 100%, not shrink-to-fit.">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <div style={block}>Centred child</div>
          <Divider>Text</Divider>
          <Divider length={120} variant="dashed" />
        </div>
      </Case>

      <Case
        title="Flex row, no gap, stretch"
        note="Vertical without length takes the row height.">
        <div style={{ display: 'flex' }}>
          <div style={{ ...block, height: 80 }}>80px tall</div>
          <Divider orientation="vertical" />
          <div style={block}>short</div>
          <Divider orientation="vertical" variant="dotted" size="large" />
          <div style={block}>short</div>
        </div>
      </Case>

      <Case
        title="Flex row, align-items: center"
        note="Without length the divider still stretches (its own align-self wins); with length it is exact and centred.">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ ...block, height: 60 }}>60px</div>
          <Divider orientation="vertical" />
          <div style={block}>no length</div>
          <Divider orientation="vertical" length={24} />
          <div style={block}>length 24</div>
        </div>
      </Case>

      <Case
        title="Block parent with fixed height"
        note="Vertical fills it via min-height: 100%.">
        <div style={{ height: 100 }}>
          <Divider orientation="vertical" variant="dashed" />
        </div>
      </Case>

      <Case
        title="Block parent, auto height (trap)"
        note="Nothing to stretch to: only the 16px minimum shows. Set length here.">
        <div>
          <Divider orientation="vertical" />
        </div>
        <div>
          <Divider orientation="vertical" length={60} />
        </div>
      </Case>

      <Case
        title="Long text in a narrow container"
        note="Text wraps; each line keeps at least 16px."
        width={220}>
        <Divider>
          A very long separator label that cannot fit on one line
        </Divider>
        <Divider>Averyveryverylongunbrokenwordinsideadivider</Divider>
      </Case>

      <Case title="Vertical with long text" width={420}>
        <div style={{ display: 'flex', height: 160 }}>
          <div style={{ ...block, flex: 1 }}>Left</div>
          <Divider orientation="vertical">or</Divider>
          <div style={{ ...block, flex: 1 }}>Right</div>
          <Divider orientation="vertical">Choose one option</Divider>
          <div style={{ ...block, flex: 1 }}>Right</div>
        </div>
      </Case>

      <Case
        title="Big node and big text"
        note="The block grows with its content; lines stay centred.">
        <Divider>
          <Button size="small" variant="secondary" text="Load more" />
        </Divider>
        <Divider fontSize={28} size="large" color="purple">
          28px
        </Divider>
      </Case>

      <Case
        title="Inside CSS grid cells"
        note="Grid items stretch; vertical divider in its own track."
        width={420}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
          }}>
          <Skeleton height={60} animation="none" />
          <Divider orientation="vertical" variant="dashed" />
          <Skeleton height={60} animation="none" />
          <div style={{ gridColumn: '1 / -1' }}>
            <Divider icon="star" />
          </div>
        </div>
      </Case>

      <Case
        title="Overrides through style and className"
        note="style wins over the computed inline sizes.">
        <Divider style={{ paddingBlock: 2, columnGap: 2 }}>tight</Divider>
        <Divider style={{ opacity: 0.4 }} variant="dotted" size="large">
          faded
        </Divider>
      </Case>

      <Case
        title="Custom colour on every content type"
        note="Line, text, icon follow; the node sets its own colour.">
        <Divider color="green">green text</Divider>
        <Divider color="green" icon="check" />
        <Divider color="green">
          <span style={{ color: '#2b2d31', fontWeight: 700 }}>own colour</span>
        </Divider>
        <Divider color="rgb(255 0 0 / 30%)" size="large">
          modern rgb()
        </Divider>
      </Case>
    </div>
  ),
};

/**
 * Runtime accessibility checks across the interactive component surface.
 *
 * `eslint-plugin-jsx-a11y` already lints JSX statically; this suite covers what
 * only exists once a component renders — generated ids and their
 * `aria-labelledby`/`aria-describedby` targets, roles applied by wrappers,
 * label/control association through React Hook Form, and required-child
 * relationships (`role="tablist"` → `role="tab"` and so on).
 *
 * Adding a component: append to COMPONENTS below with realistic props. If a
 * rule has to be switched off, pass `rules` and say why in a comment — see
 * test-utils/axe.ts for the jsdom-wide exclusions.
 *
 * Keyboard interaction is documented per component in docs/accessibility.md;
 * axe cannot verify keyboard behaviour, so anything asserted there needs a
 * behavioural test rather than an axe run.
 */
import { MemoryRouter } from 'react-router-dom';
import { ReactElement } from 'react';

import { checkA11y, type AxeOptions } from './axe';

import { AccordionGroupContextProvider } from '@components/AccordionGroup';
import Avatar from '@components/Avatar';
import Badge from '@components/Badge';
import { Breadcrumbs } from '@components/Breadcrumbs';
import Button from '@components/Button';
import { ButtonGroup, ButtonGroupButton } from '@components/ButtonGroup';
import Checkbox from '@components/Checkbox';
import { Chip } from '@components/Chip';
import { Counter } from '@components/Counter';
import FileAttachment from '@components/FileAttachment';
import { IconButton } from '@components/IconButton';
import Modal from '@components/Modal';
import ModalContent from '@components/ModalContent';
import ModalDismissButton from '@components/ModalDismissButton';
import Progress from '@components/Progress';
import ProgressBar from '@components/ProgressBar';
import ProgressCircle from '@components/ProgressCircle';
import Radio from '@components/Radio';
import { Slider } from '@components/Slider';
import Tag from '@components/Tag';
import Typography from '@components/Typography';

type Case = {
  name: string;
  ui: ReactElement;
  /** Wrap in a router when the component renders links. */
  router?: boolean;
  axe?: AxeOptions;
};

const COMPONENTS: Case[] = [
  { name: 'Button', ui: <Button text="Save" /> },
  { name: 'Button (disabled)', ui: <Button text="Save" disabled /> },
  {
    name: 'Button (icon only, labelled)',
    ui: (
      <Button startIcon={<span aria-hidden="true">+</span>} aria-label="Add" />
    ),
  },
  {
    name: 'IconButton',
    ui: <IconButton icon="edit" aria-label="Edit" onClick={() => {}} />,
  },
  {
    name: 'ButtonGroup',
    ui: (
      <ButtonGroup
        items={[
          { id: 1, text: 'All' },
          { id: 2, text: 'Running' },
        ]}
        onClick={() => {}}
      />
    ),
  },
  {
    name: 'ButtonGroup (composed)',
    ui: (
      <ButtonGroup value="all" onClick={() => {}}>
        <ButtonGroupButton id="all">All</ButtonGroupButton>
        <ButtonGroupButton id="running">Running</ButtonGroupButton>
      </ButtonGroup>
    ),
  },
  {
    name: 'Checkbox',
    ui: <Checkbox text="Accept terms" onChange={() => {}} />,
  },
  {
    name: 'Checkbox (indeterminate)',
    ui: <Checkbox text="Select all" isIndeterminate onChange={() => {}} />,
  },
  {
    name: 'Radio',
    ui: <Radio name="plan" value="pro" text="Pro plan" checked={false} />,
  },
  {
    name: 'Slider',
    ui: <Slider label="Price range" defaultValue={[20, 80]} />,
  },
  { name: 'Typography', ui: <Typography variant="h2">Heading</Typography> },
  { name: 'Badge', ui: <Badge size="small">New</Badge> },
  { name: 'Tag', ui: <Tag size="small">Design</Tag> },
  { name: 'Chip', ui: <Chip label="Filter" /> },
  { name: 'Counter', ui: <Counter count={5} /> },
  {
    name: 'Avatar (image)',
    ui: <Avatar image="https://example.com/photo.jpg" />,
  },
  { name: 'Avatar (initials)', ui: <Avatar text="JD" /> },
  {
    name: 'Progress',
    ui: (
      <Progress>
        <ProgressBar percentage={50} color="green" aria-label="Upload" />
      </Progress>
    ),
  },
  {
    name: 'ProgressCircle',
    ui: (
      <ProgressCircle max={100} currentValue={40} aria-label="Storage used" />
    ),
  },
  {
    name: 'ProgressCircle (indeterminate)',
    ui: (
      <ProgressCircle
        max={100}
        currentValue={0}
        mode="infinite"
        aria-label="Loading"
      />
    ),
  },
  {
    name: 'FileAttachment (uploading)',
    ui: (
      <FileAttachment
        file={{ name: 'Report.pdf', size: 20 * 1024 * 1024 }}
        progress={40}
      />
    ),
  },
  {
    name: 'Breadcrumbs',
    router: true,
    ui: (
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Team', to: '/team' },
          { label: 'Current' },
        ]}
      />
    ),
  },
];

describe('Accessibility (axe)', () => {
  it.each(COMPONENTS)(
    '$name has no violations',
    async ({ ui, router, axe }) => {
      const { container } = render(
        router ? <MemoryRouter>{ui}</MemoryRouter> : ui,
      );

      expect(await checkA11y(container, axe)).toHaveNoViolations();
    },
  );

  // Rendered open so the dialog is in the tree at all, which the table above
  // has no way to express.
  it('Modal has no violations when open', async () => {
    const { container } = render(
      <Modal defaultOpen>
        <ModalContent aria-label="Confirm deletion">
          <ModalDismissButton>
            <Button text="Cancel" />
          </ModalDismissButton>
        </ModalContent>
      </Modal>,
    );

    expect(await checkA11y(container)).toHaveNoViolations();
  });

  // Needs a context provider, so it does not fit the table above.
  it('AccordionGroup has no violations', async () => {
    const { container } = render(
      <AccordionGroupContextProvider>
        <div />
      </AccordionGroupContextProvider>,
    );

    expect(await checkA11y(container)).toHaveNoViolations();
  });
});

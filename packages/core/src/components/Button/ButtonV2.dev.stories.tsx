// Dev-only story (see "Dev-only stories" in .storybook/main.ts): every #704
// case side by side with `buttonV2` off and on, most of them lifted from
// PeopleOps screens, plus the odd usages most likely to regress. Not part of
// the published Storybook.
//
// Each case renders the same JSX under a nested FeatureFlagsProvider, so the
// toolbar toggle does not matter here. "on + migrated" is the same screen
// after the consumer-side fix the flag asks for.
import {
  ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  CSSProperties,
} from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ClassNames, css } from '@emotion/react';
import {
  Button,
  ButtonGroup,
  ButtonGroupButton,
  Icon,
  Pagination,
  PaginationContextProvider,
  Typography,
} from '@components';
import { FeatureFlagsProvider } from '@contexts/FeatureFlags';
import theme from '@themes/main';
import { InheritColors, variants } from './helpers.stories-extra';

const meta: Meta = {
  title: 'Dev Playground/Button & ButtonGroup (buttonV2)',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

type ColumnKind = 'off' | 'on' | 'migrated';

const COLUMN_LABEL: Record<ColumnKind, string> = {
  off: 'buttonV2 off (today)',
  on: 'buttonV2 on, same code',
  migrated: 'buttonV2 on + consumer fix',
};

const Column = ({
  kind,
  width,
  children,
}: {
  kind: ColumnKind;
  width?: number;
  children: ReactNode;
}) => (
  <div css={{ minWidth: 0 }}>
    <div
      css={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: kind === 'off' ? '#8a8f98' : '#2f6fde',
        marginBottom: 8,
      }}>
      {COLUMN_LABEL[kind]}
    </div>
    <FeatureFlagsProvider flags={{ buttonV2: kind !== 'off' }}>
      <InheritColors
        css={{
          width,
          // Shows where a fixed-width container ends, so overflow is visible.
          outline: width ? '1px dashed #c9ced6' : undefined,
          outlineOffset: 4,
        }}>
        <Readouts>{children}</Readouts>
      </InheritColors>
    </FeatureFlagsProvider>
  </div>
);

type CaseProps = {
  title: string;
  /** Where the pattern comes from, e.g. a PeopleOps file. */
  source?: string;
  /** What to look for. */
  expect?: ReactNode;
  /** Fixed container width, for layout cases. */
  width?: number;
  children: ReactNode;
  /** The same screen after the consumer-side migration. */
  migrated?: ReactNode;
};

const Case = ({
  title,
  source,
  expect,
  width,
  children,
  migrated,
}: CaseProps) => (
  <section
    css={{
      padding: '16px 0',
      borderTop: '1px solid #eceef1',
    }}>
    <h4 css={{ margin: '0 0 4px', fontSize: 14 }}>{title}</h4>
    {source ? (
      <code css={{ fontSize: 11, color: '#8a8f98' }}>{source}</code>
    ) : null}
    {expect ? (
      <p css={{ margin: '4px 0 12px', fontSize: 12, color: '#555' }}>
        {expect}
      </p>
    ) : null}
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: `repeat(${migrated ? 3 : 2}, minmax(0, 1fr))`,
        gap: 32,
        alignItems: 'start',
      }}>
      <Column kind="off" width={width}>
        {children}
      </Column>
      <Column kind="on" width={width}>
        {children}
      </Column>
      {migrated ? (
        <Column kind="migrated" width={width}>
          {migrated}
        </Column>
      ) : null}
    </div>
  </section>
);

const Page = ({
  intro,
  children,
}: {
  intro: ReactNode;
  children: ReactNode;
}) => (
  <div css={{ padding: 24, maxWidth: 1400 }}>
    <p css={{ margin: '0 0 8px', fontSize: 13, color: '#555', maxWidth: 900 }}>
      {intro}
    </p>
    {children}
  </div>
);

const Row = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={style}
    css={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Readouts: measured icon gap and icon colour under every button, so a change
// is visible as a number, not only by eye.
// ---------------------------------------------------------------------------

const rectOf = (node: Node): DOMRect | null => {
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.textContent?.trim()) return null;
    const range = document.createRange();
    range.selectNodeContents(node);
    return range.getBoundingClientRect();
  }
  if (node instanceof Element) {
    // The loading label is `display: contents`: measure what is inside it.
    if (getComputedStyle(node).display === 'contents') return null;
    // For an icon wrapper, measure the glyph itself, so a margin on the Icon
    // counts towards the gap rather than widening the wrapper.
    const svg = node.tagName === 'svg' ? node : node.querySelector('svg');
    const rect = (svg ?? node).getBoundingClientRect();
    return rect.width > 0 ? rect : null;
  }
  return null;
};

const describeButton = (button: HTMLButtonElement) => {
  const pieces: Array<{ rect: DOMRect; isIcon: boolean }> = [];
  const walk = (parent: Node) => {
    parent.childNodes.forEach((child) => {
      if (
        child instanceof Element &&
        getComputedStyle(child).display === 'contents'
      ) {
        walk(child);
        return;
      }
      const rect = rectOf(child);
      if (rect) {
        const isIcon =
          child instanceof Element &&
          (child.tagName === 'svg' || child.querySelector(':scope > svg'));
        pieces.push({ rect, isIcon: Boolean(isIcon) });
      }
    });
  };
  walk(button);

  const gaps: string[] = [];
  for (let i = 1; i < pieces.length; i += 1) {
    const [a, b] = [pieces[i - 1], pieces[i]];
    if (a.isIcon || b.isIcon) {
      gaps.push(`${Math.round(b.rect.left - a.rect.right)}px`);
    }
  }
  // The glyph paints on its <path>; the <svg> itself has fill="none".
  const svg = button.querySelector('svg');
  const paint = svg?.querySelector('path') ?? svg;
  const iconColor = paint ? getComputedStyle(paint).fill : undefined;
  return {
    gap: gaps.length ? gaps.join(' / ') : '–',
    iconColor:
      iconColor && iconColor !== 'none' ? iconColor : svg ? 'n/a' : undefined,
    cursor: getComputedStyle(button).cursor,
    disabled: button.disabled,
  };
};

const Readouts = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const buttons = Array.from(
        ref.current.querySelectorAll<HTMLButtonElement>(
          '[data-readout] button',
        ),
      );
      setLines(
        buttons.map((button, index) => {
          const r = describeButton(button);
          return [
            `#${index + 1}`,
            `gap ${r.gap}`,
            r.iconColor ? `icon ${r.iconColor}` : null,
            r.disabled ? `cursor ${r.cursor}` : null,
          ]
            .filter(Boolean)
            .join(' · ');
        }),
      );
    };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  return (
    <div ref={ref}>
      {children}
      {lines.length ? (
        <pre
          css={{
            margin: '8px 0 0',
            fontSize: 10,
            lineHeight: 1.4,
            color: '#8a8f98',
            whiteSpace: 'pre-wrap',
          }}>
          {lines.join('\n')}
        </pre>
      ) : null}
    </div>
  );
};

/** Marks a block whose buttons get a readout line. */
const Measured = ({ children }: { children: ReactNode }) => (
  <div data-readout>{children}</div>
);

const RendersNothing = () => null;

// Typed as boolean so the conditional children read like app code.
const showHidden = false as boolean;
const showDeleted = false as boolean;

const plus = <Icon name="plus" size={14} color="currentColor" />;
const cross = <Icon name="cross" size={12} color="currentColor" />;
const basket = <Icon name="busket" size={16} color="currentColor" />;
const download = <Icon name="excel-download" size={16} color="currentColor" />;

// ---------------------------------------------------------------------------
// 1. Disabled colour
// ---------------------------------------------------------------------------

export const DisabledColour: Story = {
  name: '1. Disabled colour',
  render: () => (
    <Page
      intro={
        <>
          With the flag, a disabled button sets grey40 on the whole button, so
          everything painted in <code>currentColor</code> follows it, and the
          cursor is <code>not-allowed</code> (hover to check). Icons with a
          fixed colour keep it. The readout gives the icon fill and the cursor
          of each disabled button.
        </>
      }>
      <Case
        title="Every variant: disabled, currentColor startIcon, children label"
        expect="Off: icon stays white (solid variants) or dark (custom/tertiary) on grey. On: icon and label both grey40.">
        <Measured>
          <Row>
            {variants.map((variant) => (
              <Button key={variant} variant={variant} disabled startIcon={plus}>
                {variant}
              </Button>
            ))}
          </Row>
        </Measured>
      </Case>

      <Case
        title="text label + currentColor icon (Reject candidate)"
        source="PeopleOps CandidatePage.tsx:296 (computes the icon colour from the disabled state)"
        expect="The hack (left button in each pair) and currentColor (right) only look the same with the flag on; migrated drops the hack."
        migrated={
          <Measured>
            <Row>
              <Button
                variant="error"
                disabled
                text="Reject"
                startIcon={cross}
              />
              <Button variant="error" text="Reject" startIcon={cross} />
            </Row>
          </Measured>
        }>
        <Measured>
          <Row>
            <Button
              variant="error"
              disabled
              text="Reject"
              startIcon={
                <Icon name="cross" size={12} color={theme.colors.grey40} />
              }
            />
            <Button variant="error" disabled text="Reject" startIcon={cross} />
          </Row>
        </Measured>
      </Case>

      <Case
        title="Icon inside children after the label, with a manual gap (salary actions)"
        source="PeopleOps EmployeesActions/index.tsx:39-86"
        expect="Not startIcon/endIcon, so no gap change. With the flag, currentColor follows the disabled grey without the iconColor(disabled) helper.">
        <Measured>
          <Row>
            {[false, true].map((disabled) => (
              <Button
                key={String(disabled)}
                variant="primary"
                disabled={disabled}
                css={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Recalculate
                <Icon name="export" size={14} color="currentColor" />
              </Button>
            ))}
          </Row>
        </Measured>
      </Case>

      <Case
        title="Icon with no colour (kit Icon defaults to #000) and hardcoded white"
        source="PeopleOps QuestionsPage.tsx:456, ExportExcelButton.tsx:28"
        expect='Fixed colours are not touched by the flag: black stays black, white stays white on grey. Consumers need color="currentColor".'>
        <Measured>
          <Row>
            <Button
              variant="secondary"
              disabled
              startIcon={<Icon name="plus" size={14} />}>
              Add question
            </Button>
            <Button
              variant="primary"
              disabled
              startIcon={<Icon name="excel-download" size={16} color="#fff" />}>
              Export
            </Button>
            <Button variant="primary" disabled startIcon={download}>
              Export (currentColor)
            </Button>
          </Row>
        </Measured>
      </Case>

      <Case
        title="Consumer disabled styles on top"
        source="PeopleOps CorporateButton/styles.ts:26, assessmentSharedStyles.ts:71 (opacity), GhostButton/styles.ts:6"
        expect="1: CorporateButton-like (own grey40 + cursor: default on hover): identical either way, cursor stays default. 2: opacity .5 on disabled: on = grey AND faded (double mute). 3: consumer &:disabled { color: red } must still win. 4: consumer not-allowed already: no change.">
        <Measured>
          <Row>
            <Button
              variant="primary"
              disabled
              startIcon={plus}
              css={{
                '&:disabled': {
                  background: theme.colors.grey,
                  color: theme.colors.grey40,
                  '&:hover': { cursor: 'default', boxShadow: 'none' },
                },
              }}>
              Corporate
            </Button>
            <Button
              variant="primary"
              disabled
              startIcon={plus}
              css={{ '&:disabled': { opacity: 0.5, cursor: 'not-allowed' } }}>
              Opacity .5
            </Button>
            <Button
              variant="primary"
              disabled
              startIcon={plus}
              css={{ '&:disabled': { color: 'red' } }}>
              Red override
            </Button>
            <Button
              variant="custom"
              disabled
              startIcon={plus}
              css={{
                '&:not(:disabled):hover': { color: theme.colors.blueRoyal },
                '&:disabled': { cursor: 'not-allowed' },
              }}>
              Ghost
            </Button>
          </Row>
        </Measured>
      </Case>

      <Case
        title="Unscoped consumer hover on a disabled button"
        source="Known limitation (ticket item 4): consumer &:hover ties with the kit's &:disabled and wins"
        expect="Hover each: left lights up purple while disabled (both columns, the flag does not change this); right uses &:hover:not(:disabled) and stays grey.">
        <Row>
          <Button
            variant="primary"
            disabled
            css={{ '&:hover': { background: '#7B47EB' } }}>
            Unscoped hover
          </Button>
          <Button
            variant="primary"
            disabled
            css={{ '&:hover:not(:disabled)': { background: '#7B47EB' } }}>
            Scoped hover
          </Button>
        </Row>
      </Case>

      <Case
        title="Loading: spinner per variant"
        expect="Off: spinner is white on grey (solid) or dark (custom). On: every spinner is grey40, matching the label it replaces.">
        <Row>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} loading startIcon={plus}>
              {variant}
            </Button>
          ))}
        </Row>
      </Case>

      <Case
        title="Children with their own colour (Typography, coloured span)"
        expect="An explicitly coloured child keeps its colour; only inheriting content follows the button.">
        <Measured>
          <Row>
            <Button variant="secondary" disabled startIcon={plus}>
              <Typography variant="body2" color={theme.colors.blueRoyal}>
                Typography child
              </Typography>
            </Button>
            <Button variant="primary" disabled>
              <span>plain span</span>
              <span css={{ color: theme.colors.yellow }}> + yellow span</span>
            </Button>
          </Row>
        </Measured>
      </Case>
    </Page>
  ),
};

// ---------------------------------------------------------------------------
// 2. Icon gap
// ---------------------------------------------------------------------------

const GapMatrix = () => (
  <div css={{ display: 'grid', gap: 8 }}>
    {(['small', 'medium', 'large'] as const).map((size) => (
      <Measured key={size}>
        <Row>
          <Button size={size} variant="primary" text="text" startIcon={plus} />
          <Button size={size} variant="primary" startIcon={plus}>
            children
          </Button>
          <Button size={size} variant="secondary" endIcon={plus}>
            end
          </Button>
          <Button
            size={size}
            variant="secondary"
            startIcon={plus}
            endIcon={cross}>
            both
          </Button>
        </Row>
      </Measured>
    ))}
  </div>
);

export const IconGap: Story = {
  name: '2. Icon gap',
  render: () => (
    <Page
      intro={
        <>
          Before the flag only <code>text</code> counted as a label, so an icon
          next to a <code>children</code> label sat flush. The readout shows the
          measured distance between icon and label: 6px is the target.
        </>
      }>
      <Case
        title="text vs children, start / end / both, three sizes"
        expect="text: 6px in both columns. children: 0px off, 6px on.">
        <GapMatrix />
      </Case>

      <Case
        title="What counts as a label"
        expect="1-5 render nothing: icon-only, 0 margin, in both columns (5 is an empty Fragment). 6: number 0 is a label. 7: whitespace is a label (passed on purpose). 8: Fragment with content. 9: element child. 10: a component returning null still counts as a label (known limitation): on = 6px margin on an icon with nothing next to it.">
        <Measured>
          <Row>
            <Button
              variant="secondary"
              startIcon={plus}
              aria-label="Add (null child)">
              {null}
            </Button>
            <Button
              variant="secondary"
              startIcon={plus}
              aria-label="Add (false child)">
              {false}
            </Button>
            <Button
              variant="secondary"
              startIcon={plus}
              aria-label="Add (empty string child)">
              {''}
            </Button>
            <Button
              variant="secondary"
              startIcon={plus}
              aria-label="Add (array child)">
              {[null, false, undefined]}
            </Button>
            <Button
              variant="secondary"
              startIcon={plus}
              aria-label="Add (empty fragment child)">
              <>{showHidden && 'hidden'}</>
            </Button>
            <Button variant="secondary" startIcon={plus}>
              {0}
            </Button>
            <Button variant="secondary" startIcon={plus}>
              {' '}
            </Button>
            <Button variant="secondary" startIcon={plus}>
              <>
                {showHidden && 'hidden'}
                Count {3}
              </>
            </Button>
            <Button variant="secondary" startIcon={plus}>
              <strong>Bold</strong>
            </Button>
            <Button
              variant="secondary"
              startIcon={plus}
              aria-label="Add (null component child)">
              <RendersNothing />
            </Button>
          </Row>
        </Measured>
      </Case>

      <Case
        title="Consumer gap on the button (Request basket)"
        source="PeopleOps ProductCard/styles.ts:166 (gap: 4) via RequestButton.tsx:75"
        expect="Off: 4px. On, same code: 10px (doubled). Migrated (gap removed): 6px."
        migrated={
          <Measured>
            <Button variant="primary" startIcon={basket}>
              Request
            </Button>
          </Measured>
        }>
        <Measured>
          <Button variant="primary" startIcon={basket} css={{ gap: 4 }}>
            Request
          </Button>
        </Measured>
      </Case>

      <Case
        title="Consumer gap 8 (PersonalDevelopment card, DataTableCard)"
        source="PeopleOps PersonalDevelopmentCard/styles.ts:30, DataTableCard/styles.ts:96"
        expect="Off: 8px. On: 14px. Migrated: 6px (or keep 8 by overriding via startIconClassName, see next case)."
        migrated={
          <Measured>
            <Button variant="secondary" startIcon={download}>
              Download report
            </Button>
          </Measured>
        }>
        <Measured>
          <Button
            variant="secondary"
            startIcon={download}
            css={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Download report
          </Button>
        </Measured>
      </Case>

      <Case
        title="Margin on the Icon itself (Compensation calendar button)"
        source="PeopleOps PeopleCompensation.tsx:298 (css={{ marginRight: 8 }} on the Icon)"
        expect="Off: 8px. On: 14px. Migrated: 6px."
        migrated={
          <Measured>
            <Button
              variant="secondary"
              startIcon={
                <Icon name="calendar" size={16} color="currentColor" />
              }>
              Set period
            </Button>
          </Measured>
        }>
        <Measured>
          <Button
            variant="secondary"
            startIcon={
              <Icon
                name="calendar"
                size={16}
                color="currentColor"
                css={{ marginRight: 8 }}
              />
            }>
            Set period
          </Button>
        </Measured>
      </Case>

      <Case
        title="Custom gap through startIconClassName / endIconClassName"
        expect="An Emotion class with margin-right: 12px on the icon wrapper (ClassNames). Text label: 12px in both columns. Children label: 0px off (forced margin: 0 inline), 12px on">
        <Measured>
          <ClassNames>
            {({ css: toClass }) => (
              <Row>
                <Button
                  variant="secondary"
                  text="text"
                  startIcon={plus}
                  startIconClassName={toClass({ marginRight: 12 })}
                />
                <Button
                  variant="secondary"
                  startIcon={plus}
                  startIconClassName={toClass({ marginRight: 12 })}>
                  children
                </Button>
              </Row>
            )}
          </ClassNames>
        </Measured>
      </Case>

      <Case
        title="Kit-internal: icon-only + label-less ghost buttons (GhostButton add rows)"
        source="PeopleOps GhostButton with startIcon + children: ExperienceEditPage.tsx:125, ApplicationRows.tsx:135"
        expect="Flush today; the flag adds the 6px these screens never had.">
        <Measured>
          <Row>
            <Button
              variant="custom"
              startIcon={<Icon name="plus" size={12} color="currentColor" />}
              css={{ color: theme.colors.blueRoyal }}>
              Add experience
            </Button>
            <Button
              variant="custom"
              startIcon={<Icon name="plus" size={12} color="currentColor" />}
              css={{ color: theme.colors.blueRoyal }}>
              Add application
            </Button>
          </Row>
        </Measured>
      </Case>
    </Page>
  ),
};

// ---------------------------------------------------------------------------
// 3. Block mode
// ---------------------------------------------------------------------------

export const BlockMode: Story = {
  name: '3. Block mode',
  render: () => (
    <Page
      intro={
        <>
          <code>block</code> used <code>{'span { margin: auto }'}</code>, which
          also hit the icon wrappers and spread icon and label across the width.
          With the flag the content is centred as one group.
        </>
      }>
      <Case
        title="Block: text, children, both icons, icon-only, loading"
        width={320}
        expect="Off: icon and label float apart. On: centred together, 6px gap; icon-only is centred; the loading button keeps its height and width.">
        <div css={{ display: 'grid', gap: 8 }}>
          <Measured>
            <Button block variant="primary" text="Submit" startIcon={plus} />
          </Measured>
          <Measured>
            <Button block variant="secondary" startIcon={plus}>
              Add another workplace
            </Button>
          </Measured>
          <Measured>
            <Button block variant="secondary" startIcon={plus} endIcon={cross}>
              Both icons
            </Button>
          </Measured>
          <Measured>
            <Button
              block
              variant="secondary"
              startIcon={plus}
              aria-label="Add"
            />
          </Measured>
          <Button block variant="primary" loading startIcon={plus}>
            Saving
          </Button>
        </div>
      </Case>

      <Case
        title="Block with a consumer justify-content"
        width={320}
        expect="A consumer css justify-content: flex-start must still win, so the content sits left in both columns.">
        <Measured>
          <Button
            block
            variant="secondary"
            startIcon={plus}
            css={{ justifyContent: 'flex-start' }}>
            Left-aligned menu row
          </Button>
        </Measured>
      </Case>
    </Page>
  ),
};

// ---------------------------------------------------------------------------
// 4. ARIA (not flagged)
// ---------------------------------------------------------------------------

const DisclosureToggle = () => {
  const [open, setOpen] = useState(false);
  const listId = useId();
  return (
    <div>
      <Button
        variant="secondary"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(!open)}
        endIcon={
          <Icon
            name={open ? 'carrot-up' : 'carrot-down'}
            size={12}
            color="currentColor"
          />
        }>
        Questions (3)
      </Button>
      <ul id={listId} hidden={!open} css={{ margin: '8px 0 0' }}>
        <li>Communication</li>
        <li>Ownership</li>
        <li>Technical depth</li>
      </ul>
      <AttrReadout />
    </div>
  );
};

/** Prints the aria-* attributes the button actually rendered. */
const AttrReadout = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const [attrs, setAttrs] = useState('');
  useLayoutEffect(() => {
    const button = ref.current?.parentElement?.querySelector('button');
    if (!button) return;
    const read = () =>
      setAttrs(
        Array.from(button.attributes)
          .filter((a) => a.name.startsWith('aria-'))
          .map((a) => `${a.name}="${a.value}"`)
          .join(' '),
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(button, { attributes: true });
    return () => observer.disconnect();
  }, []);
  return (
    <code
      ref={ref}
      css={{ display: 'block', marginTop: 6, fontSize: 10, color: '#8a8f98' }}>
      {attrs}
    </code>
  );
};

export const Aria: Story = {
  name: '4. ARIA attributes',
  render: () => (
    <Page
      intro={
        <>
          Not behind the flag: Button now types every <code>aria-*</code>{' '}
          attribute. The runtime always forwarded them; only typed props objects
          failed to compile. Both columns should behave the same.
        </>
      }>
      <Case
        title="Disclosure toggle (hand-rolled <button> today)"
        source="PeopleOps SurveyLayout.tsx:190, ResultsTable.tsx:111"
        expect="aria-expanded flips on click; aria-controls points at the list.">
        <DisclosureToggle />
      </Case>
      <Case title="Menu trigger and live region attributes">
        <div>
          <Row>
            <Button
              variant="custom"
              aria-haspopup="menu"
              aria-expanded={false}
              startIcon={<Icon name="more-vertical" size={16} />}
              aria-label="Row actions"
            />
            <Button
              variant="primary"
              loading
              aria-live="polite"
              aria-describedby="save-hint">
              Save
            </Button>
          </Row>
          <AttrReadout />
        </div>
      </Case>
    </Page>
  ),
};

// ---------------------------------------------------------------------------
// 5. ButtonGroup wrapper
// ---------------------------------------------------------------------------

const periodItems = [
  { id: 'day', text: 'Day' },
  { id: 'week', text: 'Week' },
  { id: 'month', text: 'Month' },
];

const unitItems = [
  { id: 'hours', text: 'Hours' },
  { id: 'days', text: 'Days' },
];

const leaveItems = [
  { id: 'all', text: 'All' },
  { id: 'vacation', text: 'Vacation' },
  { id: 'sick', text: 'Sick leave' },
  { id: 'dayoff', text: 'Day off' },
  { id: 'unpaid', text: 'Unpaid' },
];

const presetItems = [
  { id: 'full', text: 'Full CV' },
  { id: 'short', text: 'Short' },
  { id: 'client', text: 'For client' },
  { id: 'tech', text: 'Tech only' },
  { id: 'anon', text: 'Anonymised' },
];

export const ButtonGroupWrapper: Story = {
  name: '5. ButtonGroup wrapper',
  render: () => (
    <Page
      intro={
        <>
          With the flag the buttons sit in an inline-flex{' '}
          <code>{'<span role="group">'}</code>. Layouts that spaced, stretched
          or wrapped the buttons as their own children change; wrapper divs
          PeopleOps added to fight the old behaviour become redundant.
        </>
      }>
      <Case
        title="Parent with gap: 16 (no wrapper div)"
        source="PeopleOps TimeTrackerHeader/ViewControls.tsx (added a div because of this)"
        expect="Off: the gap pulls the segments apart. On: the strip stays joined, 16px from the label.">
        <div css={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span>View</span>
          <ButtonGroup items={periodItems} />
          <Button variant="secondary" text="Today" />
        </div>
      </Case>

      <Case
        title="Header with space-between (no wrapper div)"
        source="PeopleOps RecruitingDashboard/PeriodSwitcher.tsx"
        width={520}
        expect="Off: the three buttons are spread over the header. On: title left, strip right.">
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <strong>Hiring funnel</strong>
          <ButtonGroup items={periodItems} />
        </div>
      </Case>

      <Case
        title="Mobile unit toggle: flex: 1 on the buttons via buttonStyles"
        source="PeopleOps UserCard/styles.ts:109-133, index.tsx:76"
        width={300}
        expect="Off: the two buttons split the width. On, same code: they shrink to content (BREAKS). Migrated: the group itself is display: flex."
        migrated={
          <div css={{ display: 'flex' }}>
            <ButtonGroup
              items={unitItems}
              css={{ display: 'flex', flex: '1 1 100px' }}
              buttonStyles={css({ flex: 1, minWidth: 0 })}
            />
          </div>
        }>
        <div css={{ display: 'flex' }}>
          <div css={{ display: 'flex', flex: '1 1 100px' }}>
            <ButtonGroup
              items={unitItems}
              buttonStyles={css({ flex: 1, minWidth: 0 })}
            />
          </div>
        </div>
      </Case>

      <Case
        title="Tabs stretched with '& > *': { flex: 1 }"
        source="PeopleOps CalculationTabs/styles.ts:3-18"
        width={300}
        expect="Off: 50/50. On, same code: the rule hits the wrapper, buttons don't stretch (BREAKS). Migrated: '& > button' on the group."
        migrated={
          <ButtonGroup
            items={[
              { id: 'calc', text: 'Calculations' },
              { id: 'hist', text: 'History' },
            ]}
            css={{
              display: 'flex',
              width: '100%',
              '& > button': { flex: 1, minWidth: 0 },
            }}
          />
        }>
        <div
          css={{
            display: 'flex',
            width: '100%',
            '& > *': { flex: 1, minWidth: 0 },
          }}>
          <ButtonGroup
            items={[
              { id: 'calc', text: 'Calculations' },
              { id: 'hist', text: 'History' },
            ]}
          />
        </div>
      </Case>

      <Case
        title="Preset row with flex-wrap"
        source="PeopleOps ShareCvPage.tsx:112, 336"
        width={300}
        expect="Off: presets wrap onto two lines. On, same code: one nowrap strip overflows the box (BREAKS). Migrated: flexWrap on the group."
        migrated={
          <ButtonGroup
            items={presetItems}
            css={{ flexWrap: 'wrap', rowGap: 4 }}
          />
        }>
        <div css={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <ButtonGroup items={presetItems} />
        </div>
      </Case>

      <Case
        title="Filter pills in a wrapping header (gap 12)"
        source="PeopleOps LeaveRecordsList/index.tsx:97, styles.ts:19"
        width={340}
        expect="Off: pills wrap inside the block div. On: the strip no longer wraps ('& > div { gap: 0 }' still matches nothing: the wrapper is a span). Migrated: flexWrap on the group."
        migrated={
          <header
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}>
            <strong>Leave records</strong>
            <ButtonGroup
              items={leaveItems}
              css={{ flexWrap: 'wrap', rowGap: 4 }}
            />
          </header>
        }>
        <header
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
          <strong>Leave records</strong>
          <div css={{ '& > div': { gap: 0 } }}>
            <ButtonGroup items={leaveItems} />
          </div>
        </header>
      </Case>

      <Case
        title="Group followed by a sibling button in the same parent"
        source="PeopleOps PeopleEducation.tsx:326 (wraps the group in a div because of this)"
        expect="Off: the strip's last button is not :last-child (the Add button is), so it loses its right corners, and :first-of-type would hit a preceding <button>. On: corners correct.">
        <div css={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ButtonGroup
            items={[
              { id: 'list', text: 'List' },
              { id: 'cards', text: 'Cards' },
            ]}
          />
          <Button variant="primary" startIcon={plus}>
            Add
          </Button>
        </div>
      </Case>

      <Case
        title="Inline in text and inside a table cell"
        expect="The strip sits on the text line (vertical-align: middle) and does not grow the cell.">
        <div>
          <p css={{ margin: '0 0 8px' }}>
            Show <ButtonGroup items={unitItems} /> for this month.
          </p>
          <table css={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td css={{ border: '1px solid #ddd', padding: 8 }}>Unit</td>
                <td css={{ border: '1px solid #ddd', padding: 8 }}>
                  <ButtonGroup items={unitItems} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Case>

      <Case
        title="Disabled items: first, middle, last; icon items"
        expect="Disabled buttons grey (currentColor icons get grey + the group's svg opacity .4 with the flag: double muted, known). not-allowed cursor only with the flag.">
        <div css={{ display: 'grid', gap: 8 }}>
          <Measured>
            <ButtonGroup
              items={[
                { id: 1, text: 'First', disabled: true },
                { id: 2, text: 'Middle' },
                { id: 3, text: 'Last', disabled: true },
              ]}
              defaultValue={2}
            />
          </Measured>
          <Measured>
            <ButtonGroup
              aria-label="Layout"
              items={[
                {
                  id: 'grid',
                  icon: <Icon name="card-text" size={20} />,
                  ariaLabel: 'Grid',
                },
                {
                  id: 'list',
                  icon: <Icon name="bulleted-list" size={20} />,
                  ariaLabel: 'List',
                },
                {
                  id: 'off',
                  icon: (
                    <Icon name="bulleted-list" size={20} color="currentColor" />
                  ),
                  ariaLabel: 'Disabled, currentColor',
                  disabled: true,
                },
              ]}
            />
          </Measured>
        </div>
      </Case>

      <Case
        title="buttonStyles hover: unscoped vs scoped, on a disabled item"
        source="ButtonGroup CustomStyle story; ticket item 4"
        expect="Hover the disabled 'Stopped': top lights up (unscoped &:hover wins the tie), bottom stays grey (&:hover:not(:disabled)), in both columns by design. Also note the parent is display: grid: with the flag off every button is its own grid item and stretches full width; with the flag on each group is one item and keeps its size.">
        <div css={{ display: 'grid', gap: 8 }}>
          <ButtonGroup
            items={[
              { id: 1, text: 'All' },
              { id: 2, text: 'Stopped', disabled: true },
            ]}
            buttonStyles={css({
              background: 'white',
              '&:hover': { background: '#ffe08a' },
            })}
          />
          <ButtonGroup
            items={[
              { id: 1, text: 'All' },
              { id: 2, text: 'Stopped', disabled: true },
            ]}
            buttonStyles={css({
              background: 'white',
              '&:hover:not(:disabled)': { background: '#ffe08a' },
            })}
          />
        </div>
      </Case>

      <Case
        title="Composed mode with a conditional last child"
        expect="{showDeleted && <ButtonGroupButton/>} after the last button: corners still round on 'Archived'.">
        <ButtonGroup defaultValue="active" aria-label="Status">
          <ButtonGroupButton id="active">Active</ButtonGroupButton>
          <ButtonGroupButton id="archived">Archived</ButtonGroupButton>
          {showDeleted && (
            <ButtonGroupButton id="deleted">Deleted</ButtonGroupButton>
          )}
        </ButtonGroup>
      </Case>

      <Case
        title="Too narrow for the strip"
        width={180}
        expect="Off: buttons wrap as inline boxes. On: max-width 100% but nowrap, so it overflows the dashed box. Consumers wanting wrap pass flexWrap.">
        <ButtonGroup items={leaveItems} />
      </Case>

      <Case
        title="Group with only the wrapper props and an aria-labelledby heading"
        expect="On: role=group named by the heading (check the a11y panel). Off: props ignored + one dev warning in the console.">
        <div>
          <h5 id="pg-heading" css={{ margin: '0 0 6px' }}>
            Report period
          </h5>
          <ButtonGroup
            items={periodItems}
            aria-labelledby="pg-heading"
            className="report-period"
          />
        </div>
      </Case>
    </Page>
  ),
};

// ---------------------------------------------------------------------------
// 6. Kit components built on Button / ButtonGroup
// ---------------------------------------------------------------------------

export const KitComponents: Story = {
  name: '6. Kit components',
  render: () => (
    <Page
      intro={
        <>
          Kit components that render Button internally pick up the flag too.
          Pagination's disabled arrow sets its own icon colour and cursor, so it
          looks the same either way.
        </>
      }>
      <Case
        title="Pagination on page 1 (prev arrow disabled)"
        expect="Identical in both columns: Pagination keeps cursor: default and its fixed icon colour on the disabled arrow.">
        <Measured>
          <PaginationContextProvider selectedPage={1}>
            <Pagination pagesCount={7} />
          </PaginationContextProvider>
        </Measured>
      </Case>
    </Page>
  ),
};

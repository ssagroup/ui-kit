// Dev-only story (see "Dev-only stories" in .storybook/main.ts): every form
// field side by side in one row, to eyeball that height, radius, border and
// label offset line up after a change. Not part of the published Storybook.
import { useForm, FormProvider } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  DatePicker,
  DateRangePicker,
  Dropdown,
  DropdownOption,
  FileUpload,
  MultipleDropdown,
  NumberField,
  Textarea,
  TextField,
  Typeahead,
  TypeaheadOption,
} from '@components';

type Args = {
  labelled: boolean;
  disabled: boolean;
  required: boolean;
  /** Plain block cells: fields then sit in a line box, as in most app forms. */
  blockCells: boolean;
  showGuides: boolean;
};

const meta: Meta<Args> = {
  title: 'Dev Playground/Field row alignment',
  // The #703 alignment these stories check ships behind fieldGeometryV2.
  // Switch the flag toolbar to "off" to compare with the pre-3.27.2 geometry.
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    featureFlags: { fieldGeometryV2: true },
  },
  args: {
    labelled: true,
    disabled: false,
    required: false,
    blockCells: false,
    showGuides: true,
  },
};
export default meta;

const LABEL_BLOCK = 24; // 18px line-height + 6px gap
const CONTROL_HEIGHT = 44;

const Row = ({
  labelled,
  disabled,
  required,
  blockCells,
  showGuides,
}: Args) => {
  const methods = useForm();
  const label = (text: string) => (labelled ? text : undefined);
  const top = labelled ? LABEL_BLOCK : 0;

  return (
    <FormProvider {...methods}>
      <div css={{ padding: 24, overflowX: 'auto' }}>
        <p css={{ margin: '0 0 16px', fontSize: 13, color: '#666' }}>
          Red lines mark where a {CONTROL_HEIGHT}px control should start and end
          ({top}px and {top + CONTROL_HEIGHT}px from the top of each cell).
          Every bordered box should touch both lines and have the same corner
          radius.
        </p>
        <div
          data-testid="row"
          css={{
            // One row of fixed-width columns; scrolls sideways on narrow screens.
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 260,
            gap: 16,
            alignItems: 'start',
            // Same wrapper PeopleOps uses around each field.
            '& > [data-field]': {
              position: 'relative',
              ...(blockCells
                ? // A block parent puts inline-level fields in a line box, where
                  // the default baseline alignment can add a few px above them.
                  { display: 'block' }
                : {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }),
              '&::before, &::after': showGuides
                ? {
                    content: '""',
                    position: 'absolute',
                    left: -8,
                    right: -8,
                    height: 0,
                    borderTop: '1px solid rgba(255, 0, 0, 0.6)',
                    pointerEvents: 'none',
                    zIndex: 100,
                  }
                : { display: 'none' },
              '&::before': { top },
              '&::after': { top: top + CONTROL_HEIGHT - 1 },
            },
          }}>
          <div data-field="Dropdown">
            <Dropdown
              width="100%"
              label={label('Dropdown')}
              placeholder="Select"
              disabled={disabled}
              required={required}>
              <DropdownOption value="a">Option A</DropdownOption>
            </Dropdown>
          </div>

          <div data-field="MultipleDropdown">
            <MultipleDropdown
              width="100%"
              labelText={label('MultipleDropdown')}
              disabled={disabled}
              required={required}>
              <DropdownOption value="a">Option A</DropdownOption>
            </MultipleDropdown>
          </div>

          <div data-field="Typeahead">
            <Typeahead
              width="100%"
              label={label('Typeahead')}
              placeholder="Search"
              disabled={disabled}
              required={required}>
              <TypeaheadOption value="a" label="Option A">
                Option A
              </TypeaheadOption>
            </Typeahead>
          </div>

          <div data-field="TextField">
            <TextField
              name="textField"
              label={label('TextField')}
              placeholder="Text"
              disabled={disabled}
              required={required}
            />
          </div>

          <div data-field="NumberField">
            <NumberField
              name="numberField"
              label={label('NumberField')}
              disabled={disabled}
              required={required}
            />
          </div>

          <div data-field="DatePicker">
            <DatePicker
              name="datePicker"
              label={label('DatePicker')}
              disabled={disabled}
              required={required}
            />
          </div>

          <div data-field="DateRangePicker">
            <DateRangePicker
              name="dateRange"
              label={label('DateRangePicker')}
              showStatusArea={false}
              disabled={disabled}
              required={required}
            />
          </div>

          <div data-field="Textarea">
            <Textarea
              name="textarea"
              label={label('Textarea')}
              placeholder="Text"
              rows={1}
              register={methods.register}
              disabled={disabled}
              required={required}
            />
          </div>

          <div data-field="FileUpload">
            <FileUpload
              label={label('FileUpload')}
              disabled={disabled}
              required={required}
              onChange={() => undefined}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

type Story = StoryObj<Args>;

/** Every field with a label. Toggle the controls to try the other cases. */
export const Labelled: Story = { render: (args) => <Row {...args} /> };

/** No labels: all controls should start at the very top of their cell. */
export const Unlabelled: Story = {
  args: { labelled: false },
  render: (args) => <Row {...args} />,
};

/** Disabled state: same geometry, only colours change. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Row {...args} />,
};

/**
 * Required fields: a red `*` after each label. The label block stays 24px,
 * so the lines still hold.
 */
export const Required: Story = {
  args: { required: true },
  render: (args) => <Row {...args} />,
};

/**
 * Each field in a plain block `<div>`, not a flex column. Inline-level
 * wrappers then sit in a line box: without `vertical-align: top` they drop
 * a couple of px below the guides.
 */
export const BlockCells: Story = {
  args: { blockCells: true, required: true },
  render: (args) => <Row {...args} />,
};

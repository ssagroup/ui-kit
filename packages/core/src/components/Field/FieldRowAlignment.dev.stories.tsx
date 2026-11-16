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
  TextField,
  Typeahead,
  TypeaheadOption,
} from '@components';

type Args = {
  labelled: boolean;
  disabled: boolean;
  showGuides: boolean;
};

const meta: Meta<Args> = {
  title: 'Dev Playground/Field row alignment',
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
  args: { labelled: true, disabled: false, showGuides: true },
};
export default meta;

const LABEL_BLOCK = 24; // 18px line-height + 6px gap
const CONTROL_HEIGHT = 44;

const Row = ({ labelled, disabled, showGuides }: Args) => {
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
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
              disabled={disabled}>
              <DropdownOption value="a">Option A</DropdownOption>
            </Dropdown>
          </div>

          <div data-field="MultipleDropdown">
            <MultipleDropdown
              width="100%"
              labelText={label('MultipleDropdown')}
              disabled={disabled}>
              <DropdownOption value="a">Option A</DropdownOption>
            </MultipleDropdown>
          </div>

          <div data-field="Typeahead">
            <Typeahead
              width="100%"
              label={label('Typeahead')}
              placeholder="Search"
              disabled={disabled}>
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
            />
          </div>

          <div data-field="NumberField">
            <NumberField
              name="numberField"
              label={label('NumberField')}
              disabled={disabled}
            />
          </div>

          <div data-field="DatePicker">
            <DatePicker
              name="datePicker"
              label={label('DatePicker')}
              disabled={disabled}
            />
          </div>

          <div data-field="DateRangePicker">
            <DateRangePicker
              name="dateRange"
              label={label('DateRangePicker')}
              showStatusArea={false}
              disabled={disabled}
            />
          </div>

          <div data-field="FileUpload">
            <FileUpload
              label={label('FileUpload')}
              disabled={disabled}
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

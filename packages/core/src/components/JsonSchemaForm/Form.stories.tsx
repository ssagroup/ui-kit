import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import validator from '@rjsf/validator-ajv8';
import { AccordionGroupContextProvider } from '@components/AccordionGroup';
import { getStorybookAvatar } from '@storybook-assets/avatars';
import { Form } from './';

type FormProps = Omit<React.ComponentProps<typeof Form>, 'validator'>;

const managers = [
  'John Doe',
  'Jane Smith',
  'Bob Johnson',
  'Alice Williams',
].map((name, index) => ({
  const: String(index + 1),
  title: name,
  avatar: getStorybookAvatar(index),
}));

const meta = {
  title: 'Forms/JsonSchemaForm',
  render: (args) => <Form {...args} validator={validator} />,
  args: {
    onSubmit: fn(),
    onChange: fn(),
    onError: fn(),
  },
  argTypes: {
    onSubmit: { control: false },
    onChange: { control: false },
    onError: { control: false },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} satisfies Meta<FormProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `JsonSchema.Form` is `@rjsf/core`'s Form with the kit's theme: fields render
 * as kit components, and the submit button is a kit Button. Pass `schema`,
 * an optional `uiSchema` and `formData`, and a `validator` from
 * `@rjsf/validator-ajv8`; everything else is the standard rjsf API.
 *
 * Each schema type maps to a kit widget:
 * `string` → TextField, `boolean` → Checkbox, an `enum` → Typeahead (or
 * RadioGroup with `'ui:widget': 'radio'`), an array of unique enum items →
 * multi-select Typeahead (or Checkboxes with `'ui:widget': 'checkboxes'`).
 * `oneOf` options may carry an `avatar` URL, shown in the Typeahead.
 */
export const Default: Story = {
  args: {
    schema: {
      title: 'Employee profile',
      type: 'object',
      properties: {
        fullName: { type: 'string', title: 'Full name' },
        nicknames: {
          type: 'array',
          title: 'Nicknames',
          items: { type: 'string' },
        },
        remote: { type: 'boolean', title: 'Works remotely' },
        seniority: {
          type: 'string',
          title: 'Seniority',
          enum: ['Junior', 'Middle', 'Senior'],
        },
        languages: {
          type: 'array',
          title: 'Languages',
          uniqueItems: true,
          items: { type: 'string', enum: ['English', 'French', 'German'] },
        },
        department: {
          type: 'string',
          title: 'Department',
          enum: ['Engineering', 'Marketing', 'Sales'],
        },
        skills: {
          type: 'array',
          title: 'Skills',
          uniqueItems: true,
          items: {
            type: 'string',
            enum: ['React', 'TypeScript', 'Node.js', 'Design'],
          },
        },
        managers: {
          type: 'array',
          title: 'Managers',
          uniqueItems: true,
          items: { type: 'string', oneOf: managers },
        },
        password: { type: 'string', title: 'Password' },
      },
    },
    uiSchema: {
      fullName: {
        'ui:placeholder': 'Jane Doe',
        'ui:help': 'As shown on the badge',
      },
      seniority: {
        'ui:widget': 'radio',
        'ui:options': { inline: true },
      },
      languages: { 'ui:widget': 'checkboxes' },
      department: { 'ui:placeholder': 'Choose a department' },
      skills: { 'ui:placeholder': 'Pick skills' },
      managers: {
        'ui:placeholder': 'Select managers',
        'ui:options': { typeaheadAvatarSize: 'small' },
      },
      password: { 'ui:widget': 'password' },
    },
    formData: {
      fullName: 'Jane Smith',
      nicknames: ['Janie'],
      remote: true,
      seniority: 'Senior',
      languages: ['English'],
      department: 'Engineering',
      skills: ['React', 'TypeScript'],
      managers: ['1'],
      password: 'secret',
    },
  },
};

/**
 * List required properties in the schema's `required` array (and
 * `minItems: 1` for a multi-select). Errors show under each field after the
 * first submit; `showErrorList: false` hides rjsf's summary at the top.
 * Messages are rjsf's own and quote the field's title ("must have required
 * property 'Manager'") — pass `transformErrors` to reword them. The theme
 * adds no required marker to labels.
 *
 * Extra `ui:options` on a select go straight to the Typeahead. Here
 * `autoSelect: false` stops it from selecting an option the moment the typed
 * text matches a label, so the user has to pick one explicitly.
 *
 * By default rjsf (5.24+) fills a `oneOf` field with its first option's
 * `const`, so a required select is never empty.
 * `experimental_defaultFormStateBehavior: { constAsDefaults: 'skipOneOf' }`
 * turns that off.
 */
export const Validation: Story = {
  args: {
    showErrorList: false,
    experimental_defaultFormStateBehavior: { constAsDefaults: 'skipOneOf' },
    schema: {
      type: 'object',
      required: ['fullName', 'manager', 'reviewers', 'startDate'],
      properties: {
        fullName: { type: 'string', title: 'Full name' },
        manager: {
          type: 'string',
          title: 'Manager',
          oneOf: managers,
        },
        reviewers: {
          type: 'array',
          title: 'Reviewers',
          minItems: 1,
          uniqueItems: true,
          items: { type: 'string', oneOf: managers },
        },
        startDate: { type: 'string', title: 'Start date' },
      },
    },
    uiSchema: {
      manager: {
        'ui:placeholder': 'Select a manager',
        'ui:options': { typeaheadAvatarSize: 'small', autoSelect: false },
      },
      reviewers: {
        'ui:placeholder': 'Select reviewers',
        'ui:options': { typeaheadAvatarSize: 'small', autoSelect: false },
      },
      startDate: {
        'ui:widget': 'date',
        'ui:options': { outputFormat: 'yyyy-MM-dd' },
      },
    },
  },
};

/**
 * `'ui:widget': 'date'` renders a DatePicker on a `string` property;
 * `'ui:field': 'daterange'` renders a DateRangePicker on an object property
 * with `start` and `end` strings.
 *
 * `format` is what the user types and sees, `outputFormat` what lands in
 * `formData`. A range picks days by default; `rangePickerType: 'months'` or
 * `'years'` switches the calendar, and `showPresentOption` adds a "Present"
 * button for an open-ended end date.
 */
export const DateFields: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        birthday: { type: 'string', title: 'Birthday' },
        vacation: {
          type: 'object',
          title: 'Vacation',
          properties: { start: { type: 'string' }, end: { type: 'string' } },
        },
        employment: {
          type: 'object',
          title: 'Employment',
          properties: { start: { type: 'string' }, end: { type: 'string' } },
        },
        contract: {
          type: 'object',
          title: 'Contract (months)',
          properties: { start: { type: 'string' }, end: { type: 'string' } },
        },
        education: {
          type: 'object',
          title: 'Education (years)',
          properties: { start: { type: 'string' }, end: { type: 'string' } },
        },
      },
    },
    uiSchema: {
      birthday: {
        'ui:widget': 'date',
        'ui:options': { format: 'dd/mm/yyyy', outputFormat: 'yyyy-MM-dd' },
      },
      vacation: {
        'ui:field': 'daterange',
        'ui:options': { outputFormat: 'yyyy-MM-dd' },
      },
      employment: {
        'ui:field': 'daterange',
        'ui:help': 'Click "Present" for an ongoing job',
        'ui:options': {
          format: 'dd/mm/yyyy',
          outputFormat: 'yyyy-MM-dd',
          showPresentOption: true,
        },
      },
      contract: {
        'ui:field': 'daterange',
        'ui:options': {
          rangePickerType: 'months',
          format: 'mm/yyyy',
          outputFormat: 'yyyy-MM',
        },
      },
      education: {
        'ui:field': 'daterange',
        'ui:options': {
          rangePickerType: 'years',
          format: 'yyyy',
          outputFormat: 'yyyy',
        },
      },
    },
    formData: {
      vacation: { start: '2025-07-01', end: '2025-07-14' },
    },
  },
};

/**
 * `'ui:field': 'accordion'` turns an object property into a collapsible
 * section. It needs `'ui:options': { targetField: 'ObjectField' }` (it throws
 * without it) and an `AccordionGroupContextProvider` around the form, which
 * holds the open state. `collapsed: false` opens a section on mount; after
 * that the user owns it.
 */
export const Accordion: Story = {
  render: (args) => (
    <AccordionGroupContextProvider>
      <Form {...args} validator={validator} />
    </AccordionGroupContextProvider>
  ),
  args: {
    schema: {
      type: 'object',
      properties: {
        employment: {
          type: 'object',
          title: 'Employment details',
          properties: {
            status: {
              type: 'string',
              title: 'Status',
              enum: ['Employed', 'Unemployed'],
            },
            type: {
              type: 'string',
              title: 'Type',
              enum: ['Full-time', 'Part-time', 'Contract'],
            },
          },
        },
        conditions: {
          type: 'object',
          title: 'Work conditions',
          properties: {
            department: {
              type: 'string',
              title: 'Department',
              enum: ['Engineering', 'Marketing', 'Sales'],
            },
            workMode: {
              type: 'string',
              title: 'Work mode',
              enum: ['remote', 'on-site'],
            },
          },
        },
      },
    },
    uiSchema: {
      employment: {
        'ui:field': 'accordion',
        'ui:options': { targetField: 'ObjectField', collapsed: true },
      },
      conditions: {
        'ui:field': 'accordion',
        'ui:options': { targetField: 'ObjectField', collapsed: false },
        workMode: { 'ui:enumNames': ['Remote', 'On-site'] },
      },
    },
  },
};

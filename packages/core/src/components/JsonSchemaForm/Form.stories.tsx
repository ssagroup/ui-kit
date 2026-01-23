import { useState } from 'react';
import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import validator from '@rjsf/validator-ajv8';
import { DateTime } from 'luxon';
import TextField from '@components/TextField';
import Icon from '@components/Icon';
import Button from '@components/Button';
import { applyHiddenWidget, getFieldsToHide } from './utils';
import { Form } from './';
import { AccordionGroupContextProvider } from '@components/AccordionGroup';
import { getStorybookAvatar } from '@storybook-assets/avatars';

type FormProps = Omit<React.ComponentProps<typeof Form>, 'validator'>;

const managerOptions = [
  {
    id: '1',
    name: 'John Doe',
    avatar: getStorybookAvatar(0),
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: getStorybookAvatar(1),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    avatar: getStorybookAvatar(2),
  },
  {
    id: '4',
    name: 'Alice Williams',
    avatar: getStorybookAvatar(3),
  },
];

const meta = {
  title: 'Forms/FormBuilder',
  render: (args) => <Form {...args} validator={validator} />,
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data.formData);
    },
  },
  tags: ['autodocs'],
} satisfies Meta<FormProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formData: {
      stringField: 'String field value',
      arrayField: ['Item 1', 'Item 2'],
      checkboxField: true,
      radioField: 'Option 1',
      checkboxesField: ['foo', 'bar'],
      selectField: 'Option 2',
      selectMultipleField: ['Option 1', 'Option 2', 'Option 3'],
      managerSelectField: [managerOptions[1].id],
      passwordField: 'password',
      dateRangeField: {
        start: '01/15/2025',
        end: '01/25/2025',
      },
    },
    schema: {
      title: 'Test Form',
      description: 'Test Form Description',
      type: 'object',
      properties: {
        stringField: {
          title: 'String field title',
          type: 'string',
        },
        arrayField: {
          type: 'array',
          title: 'Array field title',
          description: 'Array field description',
          items: {
            type: 'string',
          },
        },
        checkboxField: {
          type: 'boolean',
          title: 'Checkbox field title',
        },
        radioField: {
          type: 'string',
          title: 'Radio field title',
          enum: ['Option 1', 'Option 2'],
        },
        checkboxesField: {
          type: 'array',
          title: 'Checkboxes field title',
          items: {
            type: 'string',
            enum: ['foo', 'bar', 'fuzz', 'qux'],
          },
          uniqueItems: true,
        },
        selectField: {
          type: 'string',
          title: 'Select field title',
          default: 'Option 1',
          enum: ['Option 1', 'Option 2'],
        },
        selectMultipleField: {
          type: 'array',
          title: 'Select multiple fields title',
          default: ['Option 1', 'Option 2', 'Option 3'],
          items: {
            type: 'string',
            enum: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          },
          uniqueItems: true,
        },
        managerSelectField: {
          type: 'array',
          title: 'Select managers',
          uniqueItems: true,
          items: {
            type: 'string',
            oneOf: managerOptions.map((manager) => ({
              const: manager.id,
              title: manager.name,
              avatar: manager.avatar,
            })),
          },
        },
        passwordField: {
          type: 'string',
          title: 'Password field title',
          minLength: 8,
        },
        dateRangeField: {
          type: 'object',
          title: 'Date Range field-1',
          properties: {
            start: {
              type: 'string',
            },
            end: {
              type: 'string',
            },
          },
        },
        dateRangeField2: {
          type: 'object',
          title: 'Date Range field-2',
          properties: {
            start: {
              type: 'string',
            },
            end: {
              type: 'string',
            },
          },
        },
        optionalDateField: {
          type: 'string',
          title: 'Date picker',
        },
      },
    },
    uiSchema: {
      stringField: {
        'ui:help': 'String field help',
        'ui:placeholder': 'String field placeholder',
      },
      checkboxField: {
        'ui:help': 'checkbox',
      },
      radioField: {
        'ui:widget': 'radio',
        'ui:options': {
          inline: true,
        },
      },
      checkboxesField: {
        'ui:widget': 'checkboxes',
        'ui:help': 'Checkboxes field help',
      },
      passwordField: {
        'ui:widget': 'password',
        'ui:help': 'Password field help',
      },
      dateRangeField: {
        'ui:field': 'daterange',
        'ui:help': 'First date range picker example',
        'ui:options': {
          outputFormat: 'mm/dd/yyyy',
        },
      },
      dateRangeField2: {
        'ui:field': 'daterange',
        'ui:help':
          'Date range picker example with European format (dd/mm/yyyy)',
        'ui:options': {
          format: 'dd/mm/yyyy',
          outputFormat: 'yyyy-MM-dd',
        },
      },
      optionalDateField: {
        'ui:widget': 'date',
        'ui:options': {
          outputFormat: 'yyyy-MM-dd',
        },
      },
      selectField: {
        'ui:placeholder': 'Choose an option',
      },
      selectMultipleField: {
        'ui:placeholder': 'Please select multiple options',
      },
      managerSelectField: {
        'ui:widget': 'select',
        'ui:placeholder': 'Select managers',
        'ui:options': {
          typeaheadAvatarSize: 24,
        },
      },
    },
  },
};

export const Accordion: Story = {
  render: (args) => {
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState<Record<string, unknown>>({
      employmentDetails: {
        employmentStartDate: {
          start: '2024-01-15',
          end: '2024-12-31',
        },
      },
      companyAndWorkConditions: {
        projectPeriod: {
          start: '2024-06-01',
          end: '2024-08-31',
        },
      },
    });

    const searchResults = search ? getFieldsToHide(args.schema, search) : [];
    const updatedUiSchema = applyHiddenWidget(
      args.uiSchema || {},
      searchResults,
    );

    if (search) {
      Object.values(updatedUiSchema).forEach((field) => {
        field!['ui:options']!.collapsed = false;
      });
    }

    return (
      <>
        <TextField
          name="search"
          placeholder="Search"
          inputProps={{
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }}
          startElement={<Icon name="search" />}
        />
        <AccordionGroupContextProvider>
          <Form
            {...args}
            css={{ marginTop: '10px' }}
            formContext={{
              onAccordionChange: (id: string, value: boolean) => {
                updatedUiSchema[id]['ui:options'].collapsed = value;
              },
            }}
            formData={formData}
            onChange={(data) => {
              setFormData(data.formData as Record<string, unknown>);
              // Example: Access both date ranges from form data
              const formDataObj = data.formData as {
                employmentDetails?: {
                  employmentStartDate?: { start?: string; end?: string };
                };
                companyAndWorkConditions?: {
                  projectPeriod?: { start?: string; end?: string };
                };
              };
              if (formDataObj.employmentDetails?.employmentStartDate) {
                console.log(
                  'Employment period:',
                  formDataObj.employmentDetails.employmentStartDate,
                );
              }
              if (formDataObj.companyAndWorkConditions?.projectPeriod) {
                console.log(
                  'Project period:',
                  formDataObj.companyAndWorkConditions.projectPeriod,
                );
              }
            }}
            uiSchema={updatedUiSchema}
            validator={validator}>
            <Button onClick={() => setFormData({})}>Clear</Button>
            <Button
              type="submit"
              css={{ marginLeft: '10px' }}
              onClick={() => {
                // Example: Access both date ranges on submit
                const formDataObj = formData as {
                  employmentDetails?: {
                    employmentStartDate?: { start?: string; end?: string };
                  };
                  companyAndWorkConditions?: {
                    projectPeriod?: { start?: string; end?: string };
                  };
                };
                const employmentPeriod =
                  formDataObj.employmentDetails?.employmentStartDate;
                const projectPeriod =
                  formDataObj.companyAndWorkConditions?.projectPeriod;
                console.log('Employment period:', employmentPeriod);
                console.log('Project period:', projectPeriod);
              }}>
              Submit
            </Button>
          </Form>
        </AccordionGroupContextProvider>
      </>
    );
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        employmentDetails: {
          type: 'object',
          title: 'Employment Details',
          properties: {
            employmentStatus: {
              type: 'string',
              title: 'Employment status',
              enum: ['Employed', 'Unemployed'],
            },
            employmentType: {
              type: 'string',
              title: 'Employment type',
              enum: ['Full-time', 'Part-time', 'Contract'],
            },
            employmentStartDate: {
              type: 'object',
              title: 'Employment start date',
              properties: {
                start: {
                  type: 'string',
                },
                end: {
                  type: 'string',
                },
              },
            },
          },
        },
        companyAndWorkConditions: {
          type: 'object',
          title: 'Company & Work Conditions',
          properties: {
            department: {
              type: 'string',
              title: 'Department',
              enum: ['Engineering', 'Marketing', 'Sales'],
            },
            workMode: {
              type: 'string',
              title: 'Work mode',
              enum: ['remote-id', 'on-site-id'],
            },
            projectPeriod: {
              type: 'object',
              title: 'Project period',
              properties: {
                start: {
                  type: 'string',
                },
                end: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    uiSchema: {
      employmentDetails: {
        'ui:field': 'accordion',
        'ui:options': {
          targetField: 'ObjectField',
          collapsed: true,
        },
        employmentStartDate: {
          'ui:field': 'daterange',
        },
      },
      companyAndWorkConditions: {
        'ui:field': 'accordion',
        'ui:options': {
          targetField: 'ObjectField',
          collapsed: true,
        },
        workMode: {
          'ui:enumNames': ['Remote', 'On-site'],
        },
        projectPeriod: {
          'ui:field': 'daterange',
          'ui:options': {
            outputFormat: 'yyyy-MM-dd',
          },
        },
      },
    },
  },
};

export const DatePickerWithValidation: Story = {
  parameters: {
    docs: {
      // TODO create a form with validation of all fields !
      disable: true,
    },
  },
  args: {
    formData: {},
    schema: {
      title: 'Date Picker Validation Examples',
      description: 'Try different validation scenarios with DatePicker fields',
      type: 'object',
      required: ['requiredDate', 'birthDate', 'eventDate'],
      properties: {
        requiredDate: {
          type: 'string',
          title: 'Required Date *',
          description: 'This field is required. Try submitting without a date.',
        },
        birthDate: {
          type: 'string',
          title: 'Birth Date *',
          description: 'Required field with date range (1900-2150)',
        },
        eventDate: {
          type: 'string',
          title: 'Event Date *',
          description:
            'Required field - must be in the future. Try past dates or invalid formats.',
        },
        optionalDate: {
          type: 'string',
          title: 'Optional Date',
          description: 'This field is optional, but if filled must be valid',
        },
      },
    },
    uiSchema: {
      requiredDate: {
        'ui:widget': 'date',
        'ui:help': 'This field is required. Try submitting without a date.',
        'ui:options': {
          outputFormat: 'mm/dd/yyyy',
        },
      },
      birthDate: {
        'ui:widget': 'date',
        'ui:help': 'Birth date must be between 01/01/1900 and 12/31/2150',
        'ui:options': {
          outputFormat: 'mm/dd/yyyy',
          dateMin: '01/01/1900',
          dateMax: '12/31/2150',
        },
      },
      eventDate: {
        'ui:widget': 'date',
        'ui:help':
          'Event date must be in the future. Try invalid dates like 99/99/9999 or past dates.',
        'ui:options': {
          outputFormat: 'mm/dd/yyyy',
          dateMin: DateTime.now().plus({ days: 1 }).toFormat('MM/dd/yyyy'),
        },
      },
      optionalDate: {
        'ui:widget': 'date',
        'ui:help':
          'Optional field - try invalid dates like 13/45/2025 or 02/30/2025 to see validation errors',
        'ui:options': {
          outputFormat: 'mm/dd/yyyy',
        },
      },
    },
  },
};

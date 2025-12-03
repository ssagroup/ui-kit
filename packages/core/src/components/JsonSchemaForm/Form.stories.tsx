import { useState } from 'react';
import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import validator from '@rjsf/validator-ajv8';
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
        dateField: {
          type: 'string',
          title: 'Date field title',
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
      dateField: {
        'ui:widget': 'date',
        'ui:help': 'Date field help',
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
    const [formData, setFormData] = useState({});

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
              setFormData(data.formData as object);
            }}
            uiSchema={updatedUiSchema}
            validator={validator}>
            <Button onClick={() => setFormData({})}>Clear</Button>
            <Button type="submit" css={{ marginLeft: '10px' }}>
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
      },
    },
  },
};

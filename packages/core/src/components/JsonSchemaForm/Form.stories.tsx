import { type StoryObj, type Meta } from '@storybook/react';
import validator from '@rjsf/validator-ajv8';

import { Form } from './';

type FormProps = Omit<React.ComponentProps<typeof Form>, 'validator'>;

const meta = {
  title: 'Forms/FormBuilder',
  render: (args) => <Form {...args} validator={validator} />,
  tags: ['autodocs'],
} satisfies Meta<FormProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data.formData);
    },
    formData: {
      stringField: 'String field value',
      arrayField: ['Item 1', 'Item 2'],
      checkboxField: true,
      radioField: 'Option 1',
      checkboxesField: ['foo', 'bar'],
      selectField: 'Option 2',
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
    },
  },
};

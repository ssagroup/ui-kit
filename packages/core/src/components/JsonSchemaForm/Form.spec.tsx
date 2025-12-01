import validator from '@rjsf/validator-ajv8';

import { Form } from '.';

const managers = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
] as const;

describe('Form (rjsf)', () => {
  it('Render form', () => {
    const { container } = render(
      <Form
        validator={validator}
        schema={{
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
              default: ['Option 1', 'Option 3'],
              items: {
                type: 'string',
                enum: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
              },
              uniqueItems: true,
            },
            managers: {
              type: 'array',
              title: 'Select managers',
              uniqueItems: true,
              items: {
                type: 'string',
                oneOf: managers.map((manager) => ({
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
          },
        }}
        uiSchema={{
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
          managers: {
            'ui:widget': 'select',
            'ui:placeholder': 'Select managers...',
            'ui:options': {
              typeaheadAvatarSize: 24,
            },
          },
        }}
        formData={{
          stringField: 'String field value',
          arrayField: ['Item 1', 'Item 2'],
          checkboxField: true,
          radioField: 'Option 1',
          checkboxesField: ['foo', 'bar'],
          selectField: 'Option 2',
          selectMultipleField: ['Option 1', 'Option 3'],
          managers: [managers[0].id, managers[2].id],
          passwordField: 'password',
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useForm, FieldError, FieldValues } from 'react-hook-form';

import TextField from '@components/TextField';
import Icon from '@components/Icon';
import Form from '@components/Form';
import FormGroup from '@components/FormGroup';

type Args = Parameters<typeof TextField>[0];

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    validationSchema: {
      control: {
        disable: true,
      },
    },
    register: {
      control: {
        disable: true,
      },
    },
    setCountChar: {
      control: {
        disable: true,
      },
    },
    startElement: {
      control: {
        disable: true,
      },
    },
    endElement: {
      control: {
        disable: true,
      },
    },
    type: {
      description: 'input HTML valid type',
    },
  },
  decorators: [
    (Story, context) => {
      const useFormResult = useForm<FieldValues>();
      return (
        <Form
          onSubmit={useFormResult.handleSubmit((data) => {
            console.log('>>>onSubmit', data);
          })}>
          <FormGroup>
            {Story({
              args: {
                ...context.args,
                register: useFormResult.register,
              },
            })}
          </FormGroup>
        </Form>
      );
    },
  ],
} as Meta<typeof TextField>;

const mockError: FieldError = {
  type: 'required',
  message: 'Required field',
};

export const Basic: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
Basic.args = {
  placeholder: 'Field',
  label: 'Field',
  name: 'field1',
  validationSchema: {
    required: 'Required',
  },
  helperText: 'some nice text',
};

export const WithError: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} errors={mockError} />;
};
WithError.args = {
  placeholder: 'Field error',
  label: 'Field',
  name: 'field2',
};

export const WithSuccess: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
WithSuccess.args = {
  placeholder: 'Field success',
  label: 'Field',
  name: 'field3',
  success: true,
  helperText: 'some nice text',
};

export const Disabled: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} endElement={<Icon name="visible" size={16} />} />;
};
Disabled.args = {
  placeholder: 'Field disabled',
  label: 'Field',
  name: 'field4',
  helperText: 'some nice text',
  disabled: true,
};

export const WithStatusDisabled: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
WithStatusDisabled.args = {
  placeholder: 'Field success disabled',
  label: 'Field',
  name: 'field5',
  helperText: 'some nice text',
  disabled: true,
  success: true,
};

export const WithAction: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      {...args}
      endElement={
        <button
          type="submit"
          onClick={(event) => {
            console.log('>>>action...');
            event.preventDefault();
          }}>
          Action
        </button>
      }
    />
  );
};
WithAction.args = {
  type: 'password',
  placeholder: 'Field',
  label: 'Field',
  name: 'field6',
  helperText: 'some nice text',
};

export const WithStartIcon: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField {...args} startElement={<Icon name="search" size={16} />} />
  );
};
WithStartIcon.args = {
  placeholder: 'Search',
  label: 'Field',
  name: 'field-start-icon',
  helperText: 'some nice text',
};

export const WithStartAndEndIcons: StoryObj<typeof TextField> = (
  args: Args,
) => {
  return (
    <TextField
      {...args}
      startElement={<Icon name="user" size={16} />}
      endElement={<Icon name="visible" size={16} />}
    />
  );
};
WithStartAndEndIcons.args = {
  placeholder: 'Placeholder',
  label: 'Field',
  name: 'field-start-end-icons',
  helperText: 'some nice text',
};

export const MultilineSimple: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
MultilineSimple.args = {
  multirow: true,
  rows: 10,
  placeholder: 'Textarea',
  name: 'textarea-simple',
};

export const Multiline: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
Multiline.args = {
  multirow: true,
  maxLength: 100,
  label: 'Textarea',
  placeholder: 'Textarea',
  name: 'textarea',
  helperText: 'some nice text',
};

export const MultilineWithError: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} errors={mockError} />;
};
MultilineWithError.args = {
  multirow: true,
  maxLength: 100,
  label: 'Textarea',
  placeholder: 'Textarea',
  name: 'textarea-error',
};

export const MultilineWithSuccess: StoryObj<typeof TextField> = (
  args: Args,
) => {
  return <TextField {...args} />;
};
MultilineWithSuccess.args = {
  multirow: true,
  maxLength: 100,
  label: 'Textarea',
  placeholder: 'Textarea',
  name: 'textarea-success',
  success: true,
  helperText: 'some nice text',
};

export const MultilineResizeVertical: StoryObj<typeof TextField> = (
  args: Args,
) => {
  return <TextField {...args} css={{ resize: 'vertical' }} />;
};
MultilineResizeVertical.args = {
  multirow: true,
  rows: 10,
  label: 'Textarea (vertical resize)',
  placeholder: 'Textarea',
  name: 'textarea-resize-vertical',
  helperText:
    'Resize is limited to vertical only via css={{ resize: "vertical" }}',
};
MultilineResizeVertical.storyName = 'Multiline — Resize Vertical';
MultilineResizeVertical.parameters = {
  docs: {
    description: {
      story:
        'Vertical-only resize. Pass `css={{ resize: "vertical" }}` to restrict the user to resizing only the height.',
    },
  },
};

export const MultilineResizeHorizontal: StoryObj<typeof TextField> = (
  args: Args,
) => {
  return <TextField {...args} css={{ resize: 'horizontal' }} />;
};
MultilineResizeHorizontal.args = {
  multirow: true,
  rows: 10,
  label: 'Textarea (horizontal resize)',
  placeholder: 'Textarea',
  name: 'textarea-resize-horizontal',
  helperText:
    'Resize is limited to horizontal only via css={{ resize: "horizontal" }}',
};
MultilineResizeHorizontal.storyName = 'Multiline — Resize Horizontal';
MultilineResizeHorizontal.parameters = {
  docs: {
    description: {
      story:
        'Horizontal-only resize. Pass `css={{ resize: "horizontal" }}` to restrict the user to resizing only the width. ',
    },
  },
};

export const MultilineDisabled: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
MultilineDisabled.args = {
  multirow: true,
  disabled: true,
  label: 'Textarea',
  placeholder: 'Textarea',
  name: 'textarea-disabled',
  helperText: 'some nice text',
};

export const MultilineNoResize: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} css={{ resize: 'none' }} />;
};
MultilineNoResize.args = {
  multirow: true,
  rows: 6,
  label: 'Textarea (resize disabled)',
  placeholder: 'Textarea',
  name: 'textarea-no-resize',
  helperText: 'Resize handle is disabled via css={{ resize: "none" }}',
};
MultilineNoResize.storyName = 'Multiline — No Resize';
MultilineNoResize.parameters = {
  docs: {
    description: {
      story:
        'Resize fully disabled. Pass `css={{ resize: "none" }}` to remove the resize handle entirely.',
    },
  },
};

export const Focused: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
Focused.args = {
  ...Basic.args,
  label: 'Focused field',
};

Focused.parameters = {
  pseudo: {
    focus: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FieldValues, useForm } from 'react-hook-form';

import Textarea from '@components/Textarea';
import FormHelperText from '@components/FormHelperText';

type Args = Parameters<typeof Textarea>[0];

export default {
  title: 'Components/Textarea',
  component: Textarea,
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
    status: {
      control: 'select',
      options: ['basic', 'error', 'success', 'custom'],
      description: 'Visual validation status (palette: error/success/primary)',
    },
  },
} as Meta<typeof Textarea>;

export const Basic: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

Basic.args = {
  placeholder: 'Textarea',
  title: 'Textarea title',
  name: 'textarea',
  validationSchema: {
    required: 'Required',
  },
};
Basic.storyName = 'Textarea';

export const VerticalResize: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

VerticalResize.storyName = 'Resize — Vertical';
VerticalResize.args = {
  placeholder: 'Textarea',
  title: 'Textarea title',
  name: 'textarea',
  css: { resize: 'vertical' },
  validationSchema: {
    required: 'Required',
  },
};
VerticalResize.parameters = {
  docs: {
    description: {
      story:
        'Vertical-only resize. Pass `css={{ resize: "vertical" }}` to restrict the user to resizing only the height.',
    },
  },
};

export const HorizontalResize: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

HorizontalResize.storyName = 'Resize — Horizontal';
HorizontalResize.args = {
  placeholder: 'Textarea',
  title: 'Textarea title',
  name: 'textarea',
  css: { resize: 'horizontal' },
  validationSchema: {
    required: 'Required',
  },
};
HorizontalResize.parameters = {
  docs: {
    description: {
      story:
        'Horizontal-only resize. Pass `css={{ resize: "horizontal" }}` to restrict the user to resizing only the width.',
    },
  },
};

export const ResizeDisabled: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

ResizeDisabled.storyName = 'Resize — Disabled';
ResizeDisabled.args = {
  placeholder: 'Textarea',
  title: 'Textarea title',
  name: 'textarea',
  css: { resize: 'none' },
  validationSchema: {
    required: 'Required',
  },
};
ResizeDisabled.parameters = {
  docs: {
    description: {
      story:
        'Resize fully disabled. Pass `css={{ resize: "none" }}` to remove the resize handle entirely.',
    },
  },
};

export const Focused: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};
Focused.args = {
  ...Basic.args,
};

Focused.parameters = {
  pseudo: {
    focus: true,
  },
};

export const Disabled: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

Disabled.args = {
  ...Basic.args,
  disabled: true,
};

export const ReadOnly: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

ReadOnly.args = {
  ...Basic.args,
  readOnly: true,
};

export const AllStatuses: StoryObj<typeof Textarea> = () => {
  const { register } = useForm<FieldValues>();
  const baseProps = {
    register,
    rows: 3,
    validationSchema: { required: 'Required' },
  };
  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <label
          htmlFor="sb-status-basic"
          css={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
          Basic
        </label>
        <Textarea
          {...baseProps}
          name="sb-status-basic"
          id="sb-status-basic"
          status="basic"
          placeholder="Basic (default)"
        />
        <FormHelperText status="basic">
          Default state, no validation feedback.
        </FormHelperText>
      </div>
      <div>
        <label
          htmlFor="sb-status-error"
          css={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
          Error
        </label>
        <Textarea
          {...baseProps}
          name="sb-status-error"
          id="sb-status-error"
          status="error"
          placeholder="Error state"
        />
        <FormHelperText status="error">
          Validation failed. Please fix the errors.
        </FormHelperText>
      </div>
      <div>
        <label
          htmlFor="sb-status-success"
          css={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
          Success
        </label>
        <Textarea
          {...baseProps}
          name="sb-status-success"
          id="sb-status-success"
          status="success"
          placeholder="Success state"
        />
        <FormHelperText status="success">Looks good!</FormHelperText>
      </div>
      <div>
        <label
          htmlFor="sb-status-custom"
          css={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
          Custom
        </label>
        <Textarea
          {...baseProps}
          name="sb-status-custom"
          id="sb-status-custom"
          status="custom"
          placeholder="Custom (same as basic)"
        />
        <FormHelperText status="basic">
          Custom status, same styling as basic.
        </FormHelperText>
      </div>
    </div>
  );
};
AllStatuses.storyName = 'All statuses';

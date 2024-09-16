import React, { useEffect, useState } from 'react';
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import type { Meta, StoryObj } from '@storybook/react';
import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { Typeahead } from '.';
import { TypeaheadProps } from './types';
import { highlightInputMatch } from './utils';
import { TypeaheadItemIcon, TypeaheadOption } from './components';

const items = [
  { id: 1, value: 'First' },
  { id: 2, value: 'Second' },
  { id: 3, value: 'Third' },
  { id: 4, label: 'Fourth', value: 4 },
  { id: 5, value: 'Fifth' },
  { id: 6, value: 'Sixth' },
];

export default {
  title: 'Components/Typeahead',
  component: Typeahead,
  argTypes: {
    onChange: {
      control: {
        disable: true,
      },
    },
    className: {
      description: 'Used in order to overwrite the default style',
      table: {
        type: {
          summary: 'StyledComponent',
        },
      },
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, { args }) => {
      return <div style={{ paddingBottom: 200 }}>{Story({ ...args })}</div>;
    },
  ],
} as Meta<typeof Typeahead>;

export const Basic: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { handleSubmit, register, setValue } = useFormResult;
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typeahead
        initialSelectedItems={[items[2].id]}
        isDisabled={args.isDisabled}
        name={'typeahead-dropdown'}
        label="Label"
        helperText="Helper Text"
        register={register}
        setValue={setValue}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ label, value, id }) => (
          <TypeaheadOption key={id} value={id} label={label || value}>
            {label || value}
          </TypeaheadOption>
        ))}
      </Typeahead>
      <Button type="submit" css={{ marginTop: 5 }}>
        Submit
      </Button>
    </form>
  );
};

Basic.args = { isDisabled: false };

export const Multiple: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isDirty },
  } = useFormResult;
  const fieldName = 'typeahead-dropdown';
  const error = errors[fieldName]
    ? {
        type: errors[fieldName].type,
        message: errors[fieldName].message,
      }
    : undefined;

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  const fieldWatch = watch(fieldName);
  useEffect(() => {
    if (isDirty) {
      if (Array.isArray(fieldWatch) && !fieldWatch.length) {
        setError(fieldName, {
          message: 'Required field',
          type: 'required',
        });
      } else {
        clearErrors(fieldName);
      }
    }
  }, [fieldWatch, isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typeahead
        initialSelectedItems={[items[2].id, items[1].id]}
        isMultiple
        isDisabled={args.isDisabled}
        label="Label"
        helperText="Helper Text"
        register={register}
        setValue={setValue}
        validationSchema={{
          required: 'Required',
        }}
        name={fieldName}
        error={error as FieldError}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ label, value, id }) => (
          <TypeaheadOption key={id} value={id} label={label || value}>
            {label || value}
          </TypeaheadOption>
        ))}
      </Typeahead>
      <Button type="submit" css={{ marginTop: 5 }}>
        Submit
      </Button>
    </form>
  );
};

Multiple.args = { isDisabled: false };

const imageItems = [
  { id: 1, label: 'First', value: 1, iconName: 'cogwheel' },
  { id: 2, label: 'Second', value: 2, iconName: 'information' },
  { id: 3, label: 'Third', value: 3, iconName: 'notification' },
  { id: 4, label: 'Fourth', value: 4, iconName: 'roles' },
  { id: 5, label: 'Fifth', value: 5, iconName: 'settings' },
  { id: 6, label: 'Sixth', value: 6, iconName: 'user' },
];

const getIconNameByValue = (value: number) =>
  (imageItems.find((item) => item.value === value)?.iconName ||
    'user') as IconProps['name'];

export const WithImageAndStartIcon: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { register, setValue } = useFormResult;
  return (
    <Typeahead
      initialSelectedItems={[imageItems[2].id, imageItems[1].id]}
      isMultiple
      isDisabled={args.isDisabled}
      name={'typeahead-dropdown'}
      label="Label"
      startIcon={<Icon name="user" size={16} />}
      startIconClassName={css`
        position: absolute;
        left: 14px;
      `}
      css={{
        width: 500,
        paddingLeft: 38,
      }}
      register={register}
      setValue={setValue}
      renderOption={({ label, input, value }) => (
        <React.Fragment>
          <TypeaheadItemIcon
            name={getIconNameByValue(Number(value))}
            size={18}
          />
          {highlightInputMatch(label, input)}
        </React.Fragment>
      )}>
      {imageItems.map(({ label, value, id, iconName }) => (
        <TypeaheadOption key={id} value={id} label={label || value}>
          <TypeaheadItemIcon name={iconName as IconProps['name']} size={18} />
          {label || value}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};

WithImageAndStartIcon.args = { isDisabled: false };

const mockError: FieldError = {
  type: 'required',
  message: 'Required field',
};

export const WithError: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { register, setValue } = useFormResult;
  return (
    <Typeahead
      initialSelectedItems={[]}
      isDisabled={args.isDisabled}
      name={'typeahead-dropdown'}
      label="Label"
      register={register}
      setValue={setValue}
      validationSchema={{
        required: 'Required',
      }}
      error={mockError}
      renderOption={({ label, input }) => highlightInputMatch(label, input)}>
      {items.map(({ label, value, id }) => (
        <TypeaheadOption key={id} value={id} label={label || value}>
          {label || value}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};

WithError.args = { isDisabled: false };

export const WithSuccess: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { register, setValue } = useFormResult;
  return (
    <Typeahead
      initialSelectedItems={[items[2].id]}
      isDisabled={args.isDisabled}
      name={'typeahead-dropdown'}
      label="Label"
      register={register}
      setValue={setValue}
      validationSchema={{
        required: 'Required',
      }}
      success
      helperText="Helper text"
      renderOption={({ label, input }) => highlightInputMatch(label, input)}>
      {items.map(({ label, value, id }) => (
        <TypeaheadOption key={id} value={id} label={label || value}>
          {label || value}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};

WithSuccess.args = { isDisabled: false };

export const Opened: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { register, setValue } = useFormResult;
  return (
    <Typeahead
      isDisabled={args.isDisabled}
      name={'typeahead-dropdown'}
      label="Label"
      isOpen
      register={register}
      setValue={setValue}
      renderOption={({ label, input }) => highlightInputMatch(label, input)}>
      {items.map(({ label, value, id }) => (
        <TypeaheadOption key={id} value={id} label={label || value}>
          {label || value}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Opened.args = { isDisabled: false };

export const DynamicallyChangedItems = (args: TypeaheadProps) => {
  const [localItems, setLocalItems] = useState(items);

  const handleUpdate = () => {
    setLocalItems((state) => [
      ...state,
      {
        id: state[state.length - 1].id + 1,
        label: `New item #${state[state.length - 1].id + 1}`,
        value: state[state.length - 1].id + 1,
      },
    ]);
  };

  const useFormResult = useForm<FieldValues>();
  const { handleSubmit, register, setValue } = useFormResult;
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper
        css={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
        <Typeahead
          initialSelectedItems={[localItems[2].id]}
          isMultiple
          name={'typeahead-dropdown'}
          label="Label"
          register={register}
          setValue={setValue}
          validationSchema={{
            required: 'Required',
          }}
          renderOption={({ label, input }) => highlightInputMatch(label, input)}
          {...args}>
          {localItems.map(({ label, value, id }) => (
            <TypeaheadOption key={id} value={id} label={label || value}>
              {label || value}
            </TypeaheadOption>
          ))}
        </Typeahead>
        <Button variant="primary" onClick={handleUpdate}>
          Update items
        </Button>
        <Button type="submit" variant="info">
          Submit
        </Button>
      </Wrapper>
    </form>
  );
};

DynamicallyChangedItems.args = { isDisabled: false };

export const Disabled: StoryObj = (args: TypeaheadProps) => {
  const theme = useTheme();
  const useFormResult = useForm<FieldValues>();
  const { register, setValue } = useFormResult;
  return (
    <Typeahead
      initialSelectedItems={[items[2].id, items[1].id]}
      isMultiple
      isDisabled={args.isDisabled}
      name={'typeahead-dropdown'}
      label="Label"
      startIcon={<Icon name="user" size={16} color={theme.colors.grey} />}
      css={{
        width: 500,
      }}
      register={register}
      setValue={setValue}
      helperText="Helper text"
      renderOption={({ label, input, value }) => (
        <React.Fragment>
          <TypeaheadItemIcon
            name={getIconNameByValue(Number(value))}
            color={args.isDisabled ? theme.colors.grey : '#000'}
            size={18}
          />
          {highlightInputMatch(label, input)}
        </React.Fragment>
      )}>
      {imageItems.map(({ label, value, id, iconName }) => (
        <TypeaheadOption key={id} value={id} label={label || value}>
          <TypeaheadItemIcon
            name={iconName as IconProps['name']}
            size={18}
            color={args.isDisabled ? theme.colors.grey : '#000'}
          />
          {label || value}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Disabled.args = { isDisabled: true };

export const NoItems: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { register, setValue } = useFormResult;
  return (
    <Typeahead
      isMultiple
      isDisabled={args.isDisabled}
      name={'typeahead-dropdown'}
      label="Label"
      css={{
        width: 500,
      }}
      register={register}
      setValue={setValue}
      helperText="Helper text">
      {null}
    </Typeahead>
  );
};

NoItems.args = { isDisabled: false };

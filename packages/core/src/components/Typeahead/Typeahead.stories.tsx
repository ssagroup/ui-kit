import React, { useEffect, useRef, useState } from 'react';
import {
  FieldError,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Avatar from '@components/Avatar';
import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { getStorybookAvatar } from '@storybook-assets/avatars';
import { Typeahead } from '.';
import { TypeaheadProps, TypeaheadValue } from './types';
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
  parameters: {
    docs: {
      source: {
        type: 'code',
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
  const { handleSubmit } = useFormResult;
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <FormProvider {...useFormResult}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typeahead
          defaultSelectedItems={[items[2].id]}
          isDisabled={args.isDisabled}
          onEmptyChange={(isEmpty) => {
            console.log('>>>onEmptyChange event', isEmpty);
          }}
          name={'typeahead-dropdown'}
          label="Label"
          helperText="Helper Text"
          renderOption={({ label, input }) =>
            highlightInputMatch(label, input)
          }>
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
    </FormProvider>
  );
};

Basic.args = { isDisabled: false };

export const Multiple: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const {
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { isDirty },
  } = useFormResult;
  const fieldName = 'typeahead-dropdown';

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
    <FormProvider {...useFormResult}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typeahead
          defaultSelectedItems={[items[2].id, items[1].id]}
          isMultiple
          isDisabled={args.isDisabled}
          onEmptyChange={(isEmpty) => {
            console.log('>>>onEmptyChange event', isEmpty);
          }}
          label="Label"
          helperText="Helper Text"
          validationSchema={{
            required: 'Required',
          }}
          name={fieldName}
          renderOption={({ label, input }) =>
            highlightInputMatch(label, input)
          }>
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
    </FormProvider>
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
] as const;

export const WithImageAndStartIcon: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  return (
    <FormProvider {...useFormResult}>
      <Typeahead
        defaultSelectedItems={[imageItems[2].id, imageItems[1].id]}
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
    </FormProvider>
  );
};

WithImageAndStartIcon.args = { isDisabled: false };

export const WithAvatars: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  return (
    <FormProvider {...useFormResult}>
      <Typeahead
        css={{ width: 420 }}
        defaultSelectedItems={[managerOptions[0].id, managerOptions[2].id]}
        isMultiple
        isDisabled={args.isDisabled}
        name="typeahead-managers"
        label="Select managers"
        placeholder="Select managers..."
        renderOption={({ label, input }) => highlightInputMatch(label, input)}
        {...args}>
        {managerOptions.map(({ id, name, avatar }) => (
          <TypeaheadOption
            key={id}
            value={id}
            label={name}
            avatar={<Avatar size={20} image={avatar} />}>
            {name}
          </TypeaheadOption>
        ))}
      </Typeahead>
    </FormProvider>
  );
};

WithAvatars.args = { isDisabled: false };

const mockError: FieldError = {
  type: 'required',
  message: 'Required field',
};

export const WithError: StoryObj = (args: TypeaheadProps) => {
  const fieldName = 'typeahead-dropdown';
  const useFormResult = useForm<FieldValues>();
  const { setError } = useFormResult;

  useEffect(() => {
    setError(fieldName, mockError);
  }, []);

  return (
    <FormProvider {...useFormResult}>
      <Typeahead
        defaultSelectedItems={[]}
        isDisabled={args.isDisabled}
        name={fieldName}
        label="Label"
        validationSchema={{
          required: mockError.message,
        }}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ label, value, id }) => (
          <TypeaheadOption key={id} value={id} label={label || value}>
            {label || value}
          </TypeaheadOption>
        ))}
      </Typeahead>
    </FormProvider>
  );
};

WithError.args = { isDisabled: false };

export const WithSuccess: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  return (
    <FormProvider {...useFormResult}>
      <Typeahead
        defaultSelectedItems={[items[2].id]}
        isDisabled={args.isDisabled}
        name={'typeahead-dropdown'}
        label="Label"
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
    </FormProvider>
  );
};

WithSuccess.args = { isDisabled: false };

export const Opened: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  return (
    <FormProvider {...useFormResult}>
      <Typeahead
        isDisabled={args.isDisabled}
        name={'typeahead-dropdown'}
        label="Label"
        isOpen
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ label, value, id }) => (
          <TypeaheadOption key={id} value={id} label={label || value}>
            {label || value}
          </TypeaheadOption>
        ))}
      </Typeahead>
    </FormProvider>
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
  const { handleSubmit } = useFormResult;
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <FormProvider {...useFormResult}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper
          css={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
          <Typeahead
            defaultSelectedItems={[localItems[2].id]}
            isMultiple
            name={'typeahead-dropdown'}
            label="Label"
            validationSchema={{
              required: 'Required',
            }}
            renderOption={({ label, input }) =>
              highlightInputMatch(label, input)
            }
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
    </FormProvider>
  );
};

DynamicallyChangedItems.args = { isDisabled: false };

export const DynamicallyChangedSelectedItems = (args: TypeaheadProps) => {
  const selectedItemIndex = useRef(0);
  const [selectedItems, setSelectedItems] = useState([items[0].id]);

  const handleUpdate = () => {
    const newSelectedIndex =
      selectedItemIndex.current + 1 >= items.length
        ? 0
        : selectedItemIndex.current + 1;
    selectedItemIndex.current = newSelectedIndex;
    setSelectedItems(() => {
      return newSelectedIndex === items.length - 1
        ? []
        : [items[selectedItemIndex.current].id];
    });
  };

  const handleOnChange = (
    selectedItem: TypeaheadValue,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setSelectedItems((prev) => [...prev, Number(selectedItem)]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== selectedItem));
    }
  };

  const useFormResult = useForm<FieldValues>();
  const { handleSubmit } = useFormResult;
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <FormProvider {...useFormResult}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper
          css={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
          <Typeahead
            selectedItems={selectedItems}
            isMultiple
            name={'typeahead-dropdown'}
            label="Label"
            onChange={handleOnChange}
            validationSchema={{
              required: 'Required',
            }}
            onClearAll={() => {
              console.log('>>>onClearAll event');
              setSelectedItems([]);
            }}
            onRemoveSelectedClick={(selectedItem) => {
              console.log('>>>onRemoveSelectedClick event', selectedItem);
            }}
            onEmptyChange={(isEmpty) => {
              console.log('>>>onEmptyChange event', isEmpty);
            }}
            renderOption={({ label, input }) =>
              highlightInputMatch(label, input)
            }
            {...args}>
            {items.map(({ label, value, id }) => (
              <TypeaheadOption key={id} value={id} label={label || value}>
                {label || value}
              </TypeaheadOption>
            ))}
          </Typeahead>
          <Button variant="primary" onClick={handleUpdate}>
            Update selected items
          </Button>
          <Button type="submit" variant="info">
            Submit
          </Button>
        </Wrapper>
      </form>
    </FormProvider>
  );
};

DynamicallyChangedSelectedItems.args = { isDisabled: false };

export const WithFormState = (args: TypeaheadProps) => {
  const selectedItemIndex = useRef(0);

  const fieldName = 'typeahead-dropdown';
  const useFormResult = useForm<FieldValues>({
    defaultValues: { [fieldName]: [items[0].id] },
  });
  const { handleSubmit } = useFormResult;
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  const handleUpdate = () => {
    const newSelectedIndex =
      selectedItemIndex.current + 1 >= items.length
        ? 0
        : selectedItemIndex.current + 1;
    selectedItemIndex.current = newSelectedIndex;
    useFormResult.setValue(
      fieldName,
      newSelectedIndex === items.length - 1
        ? []
        : [items[selectedItemIndex.current].id],
      { shouldValidate: true },
    );
  };

  return (
    <FormProvider {...useFormResult}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper
          css={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
          <Typeahead
            isMultiple
            name={fieldName}
            label="Label"
            validationSchema={{
              required: 'Required',
            }}
            onRemoveSelectedClick={(selectedItem) => {
              console.log('>>>onRemoveSelectedClick event', selectedItem);
            }}
            onEmptyChange={(isEmpty) => {
              console.log('>>>onEmptyChange event', isEmpty);
            }}
            renderOption={({ label, input }) =>
              highlightInputMatch(label, input)
            }
            {...args}>
            {items.map(({ label, value, id }) => (
              <TypeaheadOption key={id} value={id} label={label || value}>
                {label || value}
              </TypeaheadOption>
            ))}
          </Typeahead>
          <Button variant="primary" onClick={handleUpdate}>
            Update selected items
          </Button>
          <Button type="submit" variant="info">
            Submit
          </Button>
        </Wrapper>
      </form>
    </FormProvider>
  );
};

WithFormState.args = { isDisabled: false };

export const Disabled: StoryObj = (args: TypeaheadProps) => {
  const theme = useTheme();
  const useFormResult = useForm<FieldValues>();
  return (
    <FormProvider {...useFormResult}>
      <Typeahead
        defaultSelectedItems={[items[2].id, items[1].id]}
        isMultiple
        isDisabled={args.isDisabled}
        name={'typeahead-dropdown'}
        label="Label"
        startIcon={<Icon name="user" size={16} color={theme.colors.grey} />}
        css={{
          width: 500,
        }}
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
    </FormProvider>
  );
};

Disabled.args = { isDisabled: true };

export const NoItems: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  return (
    <FormProvider {...useFormResult}>
      <Typeahead
        isMultiple
        isDisabled={args.isDisabled}
        name={'typeahead-dropdown'}
        label="Label"
        css={{
          width: 500,
        }}
        helperText="Helper text">
        {null}
      </Typeahead>
    </FormProvider>
  );
};

NoItems.args = { isDisabled: false };

import React, { useState } from 'react';
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
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { Typeahead } from '.';
import { TypeaheadProps } from './types';
import { highlightInputMatch } from './utils';
import { TypeaheadItemImage, TypeaheadOption } from './components';

const image =
  'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASGSURBVHgBfVVbUhtXEO2eGQ0SLz1AIAgYycSO7XKVo898hazA3kGSFeBkATHFAhJYAVlCvIKwgiiqpCLHNhbgBwgkIYHempl2952HBkr2VI10de/M6dOnT7cQPnMVCoWEaU5vEsIGgbNGDuRknwgaRM7fRPQcnP4f+Xz+8FMYOG6zVCpnQac9x6ENchwGJP+IZO3dGOwT7fVosP3NmEDazY2X5aNNzcACx/4WXIAwOvq3YoeoAvLih5g+8Vex+GLzswFeld8+Ixt2HKKEz9wDC5hfA3bXcswbkOTPneI/pWdjJToov3tqE/1Gtg0Og/u3xxw0TSO+URLq9wdhDEI3Hwmmojno/Jx/+GAnCFAqn2QjYBVYc2HOMVQQpfHUVIzS8ymMRaO8Zyu9zEgEWq02nFaq1Gp3gkTkQ7Lj3017SFz7+4eGnOpkb/myOCNZYCmThpmZKTw7q8HR5XuwLNvVlROJz87ArdVlrNcbUDmvkUsWPc6UMCb0PV58hy57uyzMLdtGh9kL8/R8UsChfPiOGBhZHohOmIrhVautiqDrOt5ZXwPJ4uT0nJRarl78nAbWoJ3UDLCfCKAwV6UUWSZjkEjMCriwRtM06e6XWchwRouL8/jg3joYho5So9dvjiEen2EpJ9EvqSsVkBmd3mQX0WPPMfKCeiKdToHIYtuOYjw/l0BhecBgrw+OqNlscYYpdSb1qlSqsLgwBzfqINlsaLx8pLiPbKkyuLpqBzbVdY2L2gl+d3s9MM2IWgvg5VULYtEJycrvGfQCZTVVXE8iiSwOGQyHwPUILCrgUhMGJQkm7FvtbiCFZGozQV3TR/5XZ1rW8OyoMgj3RbiR6hdNikQi+NWd2+r8vFoDcY/0hltY750Rc1VkZLcZDHzEYGs+qDAXJpLucGih17V4dl6FRrMJ7Bzo9fqezkoiMgxDegMtywpIqcZErWEwZpkBbvne54yINcaZ6Slk5jA5GcXMwjzEYjEYDIYqR9G/2+lhtV6Hy8u2PAttlkwIMgHpeL+1ixyA9vneCMmiGmvliwywLJBKxuH47QfxOvnshMxcKgHLS4tc3CYkE3F4f1Lx5pLykgrEjz3HQrmcMDrDi7Du8r2UWVCF/f/VG+h2+948ElkwGA3TzPx2dhXOzut819S5zCuNJdZYSgOtnJbP5Rr8zr47tEZT8gMzOj2rQm5thRnOqpqI0eQxcVIqmaCV5QzUahcg9fF6AKW4IpGm4++5XO7QHXalUnZo6wWZIV4dFGMJyMOOa5BmtpOqBrLHAVCyqjBwp9P15pMA6yDBWZ4GD4p8EECu4r8vnnJVfg3/Y4VlE1eYEUPZUAiw731/oucaBjZI4wAaGj+t55Z31Xt+gEcP7+1ww2x7wH7ga4UdDC2SJrRVz6B/+bZ0nUO47YNfayz/KhT/40zgF0ZOhvf9AgteUOWR54V9AzV96+766m74vbF/+oVCKcsibQHS9z6QG8Cd+SLXCF9Zcp8i+ON91vwm1tgA4UBc7ic89h8z0NeMFfcCHrNmh2zFPwc9YzefZyd+4voIMSvIE1PFRoIAAAAASUVORK5CYII=';

const items = [
  { id: 1, value: 'First' },
  { id: 2, value: 'Second' },
  { id: 3, value: 'Third' },
  { id: 4, value: 'Fourth' },
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
        register={register}
        setValue={setValue}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ value, id }) => (
          <TypeaheadOption key={id} value={id} label={value}>
            {value}
          </TypeaheadOption>
        ))}
      </Typeahead>
      <Button type="submit">Submit</Button>
    </form>
  );
};

Basic.args = { isDisabled: false };

export const Multiple: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { handleSubmit, register, setValue } = useFormResult;
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typeahead
        initialSelectedItems={[items[2].id, items[1].id]}
        isMultiple
        isDisabled={args.isDisabled}
        label="Label"
        register={register}
        setValue={setValue}
        name={'typeahead-dropdown'}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ value, id }) => (
          <TypeaheadOption key={id} value={id} label={value}>
            {value}
          </TypeaheadOption>
        ))}
      </Typeahead>
      <Button type="submit">Submit</Button>
    </form>
  );
};

Multiple.args = { isDisabled: false };

export const WithImageAndStartIcon: StoryObj = (args: TypeaheadProps) => {
  const useFormResult = useForm<FieldValues>();
  const { register, setValue } = useFormResult;
  return (
    <Typeahead
      initialSelectedItems={[items[2].id, items[1].id]}
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
      renderOption={({ label, input }) => (
        <React.Fragment>
          <TypeaheadItemImage src={`data:image/png;base64,${image}`} />
          {highlightInputMatch(label, input)}
        </React.Fragment>
      )}>
      {items.map(({ value, id }) => (
        <TypeaheadOption key={id} value={id} label={value}>
          <TypeaheadItemImage src={`data:image/png;base64,${image}`} />
          {value}
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

// TODO: remove an error on choosing?
// TODO: add disabled story
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
      errors={mockError}
      renderOption={({ label, input }) => highlightInputMatch(label, input)}>
      {items.map(({ value, id }) => (
        <TypeaheadOption key={id} value={id} label={value}>
          {value}
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
      {items.map(({ value, id }) => (
        <TypeaheadOption key={id} value={id} label={value}>
          {value}
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
      {items.map(({ value, id }) => (
        <TypeaheadOption key={id} value={id} label={value}>
          {value}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Opened.args = { isDisabled: false };

export const DynamicallyChangedItems: StoryObj = (args: TypeaheadProps) => {
  const [localItems, setLocalItems] = useState(items);

  const handleUpdate = () => {
    setLocalItems((state) => [
      ...state,
      {
        id: state[state.length - 1].id + 1,
        value: `New item #${state[state.length - 1].id + 1}`,
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
          isDisabled={args.isDisabled}
          isMultiple
          name={'typeahead-dropdown'}
          label="Label"
          register={register}
          setValue={setValue}
          validationSchema={{
            required: 'Required',
          }}
          renderOption={({ label, input }) =>
            highlightInputMatch(label, input)
          }>
          {localItems.map(({ value, id }) => (
            <TypeaheadOption key={id} value={id} label={value}>
              {value}
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
      renderOption={({ label, input }) => (
        <React.Fragment>
          <TypeaheadItemImage src={`data:image/png;base64,${image}`} />
          {highlightInputMatch(label, input)}
        </React.Fragment>
      )}>
      {items.map(({ value, id }) => (
        <TypeaheadOption key={id} value={id} label={value}>
          <TypeaheadItemImage src={`data:image/png;base64,${image}`} />
          {value}
        </TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Disabled.args = { isDisabled: true };

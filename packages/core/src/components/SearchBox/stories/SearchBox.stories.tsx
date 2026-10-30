import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { useForm } from 'react-hook-form';

import { SearchBox } from '..';
import { SearchBoxProps } from '../types';

type Args = SearchBoxProps;

const people = [
  'Amelia Clarke',
  'Benjamin Ortiz',
  'Chloe Nakamura',
  'Daniel Okafor',
  'Emma Lindqvist',
  'Felix Romano',
  'Grace Mbeki',
  'Henry Kowalski',
];

export default {
  title: 'Widgets/SearchBox',
  component: SearchBox,
  args: {
    callbackDelay: 500,
    autoSearchTrigger: true,
    inputProps: { 'aria-label': 'Search' },
    callback: fn(),
  },
  argTypes: {
    placeholder: { control: 'text' },
    callbackDelay: { control: { type: 'number', min: 0, step: 100 } },
    callback: { control: false },
    register: { control: false },
    control: { control: false },
    resetField: { control: false },
    setValue: { control: false },
    validationSchema: { control: false },
    errors: { control: false },
    inputProps: { control: false },
    startElement: { control: false },
    endElement: { control: false },
    onKeyUp: { control: false },
    as: { control: false },
    css: { control: false },
    onStartElementClick: { control: false },
    onEndElementClick: { control: false },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree.
    docs: { source: { type: 'code' } },
  },
} as Meta<Args>;

/**
 * SearchBox is a compact search field for toolbars and table headers. It is
 * driven by react-hook-form: pass `register`, `control` and `resetField` from
 * your `useForm()`, plus a `name`. No `FormProvider` is needed.
 *
 * `callback` receives the search term `callbackDelay` ms (default 500) after
 * the user stops typing. Enter calls it straight away. With
 * `autoSearchTrigger={false}`, only Enter calls it.
 *
 * Once the field has text, the search icon turns into a clear button. Clearing
 * empties the field, focuses it again and, with auto search on, calls
 * `callback('')` after the delay.
 *
 * The width is fixed: 139px, and 180px from the `md` breakpoint up. The
 * placeholder defaults to `Search by name`.
 */
export const Default: StoryObj<Args> = {
  render: function Render(args) {
    const { register, control, resetField } = useForm();
    return (
      <SearchBox
        {...args}
        name="search"
        register={register}
        control={control}
        resetField={resetField}
      />
    );
  },
};

/**
 * A typical use: store the term from `callback` and filter with it. The list
 * updates once typing pauses, not on every keystroke.
 *
 * Keep SearchBox in its own `useForm()`. It watches the whole form, so other
 * fields in the same form re-send the current term whenever they change.
 */
export const FilteringAList: StoryObj<Args> = {
  args: { placeholder: 'Search people' },
  render: function Render(args) {
    const { register, control, resetField } = useForm();
    const [term, setTerm] = useState('');
    const matches = people.filter((person) =>
      person.toLowerCase().includes(term.toLowerCase()),
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SearchBox
          {...args}
          name="people"
          register={register}
          control={control}
          resetField={resetField}
          callback={(next) => {
            setTerm(next ?? '');
            args.callback(next);
          }}
        />
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {matches.map((person) => (
            <li key={person}>{person}</li>
          ))}
          {matches.length === 0 && <li>No one matches “{term}”</li>}
        </ul>
      </div>
    );
  },
};

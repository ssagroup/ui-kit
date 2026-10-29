import { useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import Avatar, { AvatarSizes } from '@components/Avatar';
import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';
import Button from '@components/Button';
import { getStorybookAvatar } from '@storybook-assets/avatars';
import { Typeahead } from '.';
import { TypeaheadProps, TypeaheadValue } from './types';
import { highlightInputMatch } from './utils';
import {
  TypeaheadItemIcon,
  TypeaheadOption,
  TypeaheadOptionGroup,
} from './components';

type Item = { value: number; label: string };

const items: Item[] = [
  { value: 1, label: 'Design' },
  { value: 2, label: 'Engineering' },
  { value: 3, label: 'Finance' },
  { value: 4, label: 'Human Resources' },
  { value: 5, label: 'Legal' },
  { value: 6, label: 'Marketing' },
  { value: 7, label: 'Operations' },
  { value: 8, label: 'Product' },
  { value: 9, label: 'Sales' },
  { value: 10, label: 'Support' },
];

const people = ['Alice Smith', 'Bob Jones', 'Carol White', 'David Brown'].map(
  (name, index) => ({
    value: index + 1,
    label: name,
    avatar: getStorybookAvatar(index),
  }),
);

const tools: Array<Item & { icon: IconProps['name'] }> = [
  { value: 1, label: 'Settings', icon: 'cogwheel' },
  { value: 2, label: 'Information', icon: 'information' },
  { value: 3, label: 'Notifications', icon: 'notification' },
  { value: 4, label: 'Roles', icon: 'roles' },
  { value: 5, label: 'Users', icon: 'user' },
];

const certifications = [
  'Adobe Certified Expert - Adobe Commerce Developer',
  'Adobe Certified Professional - Adobe Commerce Business Practitioner',
  'Adobe Certified Professional - Adobe Commerce Developer',
  'Android Certified Application Developer',
  'AWS Certified Solutions Architect',
  'Google Cloud Professional Data Engineer',
];

const groupedItems = [
  {
    label: 'Fruits',
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'potato', label: 'Potato' },
      { value: 'onion', label: 'Onion', disabled: true },
    ],
  },
];

export default {
  title: 'Components/Typeahead',
  component: Typeahead,
  args: {
    onChange: fn(),
    onClearAll: fn(),
    onRemoveSelectedClick: fn(),
    onEmptyChange: fn(),
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
    selectedItems: { control: false },
    defaultSelectedItems: { control: false },
    isDisabled: { control: false },
    children: { control: false },
    error: { control: false },
    validationSchema: { control: false },
    renderOption: { control: false },
    startIcon: { control: false },
    endIcon: { control: false },
    onChange: { control: false },
    onClearAll: { control: false },
    onRemoveSelectedClick: { control: false },
    onEmptyChange: { control: false },
    isOpen: {
      description:
        'Initial open state. Read on mount only — later changes are ignored.',
    },
    width: { control: 'text' },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree,
    // which expands every option and leaks story-only props such as `key`.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 240 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Typeahead>;

/**
 * Typing filters the options by `label` (falling back to `value`) and
 * suggests the rest of the first match inline; `Tab` or `Enter` accepts it.
 * With `autoSelect` (the default) typing an option's full label selects it.
 * `filterOptions={false}` always shows every option and turns `autoSelect`
 * off too.
 *
 * The selection is an array of option values, also in single-select mode:
 * seed it with `defaultValue`, or own it with `value` (see Controlled
 * Selection). `onChange` receives the option's `value` and whether it is now
 * selected; picking the selected option again in single-select mode clears
 * it.
 *
 * Every prop in the Controls panel applies here. `isOpen` opens the list on
 * mount; it is read once and is not a controlled prop, so this story remounts
 * the typeahead when the control changes.
 */
export const Default: StoryObj<TypeaheadProps> = {
  args: {
    name: 'department',
    label: 'Department',
    placeholder: 'Search departments',
    defaultValue: [2],
    isMultiple: false,
    disabled: false,
    isOpen: false,
  },
  render: (args) => (
    <Typeahead key={String(args.isOpen)} {...args}>
      {items.map((item) => (
        <TypeaheadOption
          key={item.value}
          value={item.value}
          label={item.label}
        />
      ))}
    </Typeahead>
  ),
};

/**
 * With `isMultiple` each pick adds a chip to the trigger and the list stays
 * open. A chip's cross removes it (`onChange` with `false`, then
 * `onRemoveSelectedClick`); `Backspace` in an empty input removes the last
 * one. The cross at the end clears everything and fires `onClearAll` only —
 * not `onChange`. `onEmptyChange` reports whenever the selection becomes
 * empty or non-empty.
 */
export const Multiple: StoryObj<TypeaheadProps> = {
  args: {
    name: 'departments',
    label: 'Departments',
    placeholder: 'Search departments',
    isMultiple: true,
    defaultValue: [1, 3, 6],
    width: 420,
  },
  render: (args) => (
    <Typeahead {...args}>
      {items.map((item) => (
        <TypeaheadOption
          key={item.value}
          value={item.value}
          label={item.label}
        />
      ))}
    </Typeahead>
  ),
};

/**
 * `label`, `helperText`, `error` (a react-hook-form `FieldError`) and `success`
 * give the typeahead the same field chrome as the other form controls; the
 * error message replaces the helper text. `labelBadge` adds a status badge
 * next to the label and is announced as the input's description — it needs a
 * `label`.
 *
 * Inside a `FormProvider` the field's own validation error is shown as well;
 * see React Hook Form.
 */
export const FormField: StoryObj<TypeaheadProps> = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Typeahead
        {...args}
        name="field-helper"
        label="Department"
        helperText="Choose the employee's department"
        defaultValue={[2]}>
        {items.map((item) => (
          <TypeaheadOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Typeahead>
      <Typeahead
        {...args}
        name="field-error"
        label="Department"
        error={{ type: 'required', message: 'Department is required' }}>
        {items.map((item) => (
          <TypeaheadOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Typeahead>
      <Typeahead
        {...args}
        name="field-success"
        label="Department"
        success
        helperText="Looks good!"
        defaultValue={[2]}>
        {items.map((item) => (
          <TypeaheadOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Typeahead>
      <Typeahead
        {...args}
        name="field-badge"
        label="Recruiter"
        labelBadge={{ text: 'default' }}
        defaultValue={[3]}>
        {people.map((person) => (
          <TypeaheadOption
            key={person.value}
            value={person.value}
            label={person.label}
          />
        ))}
      </Typeahead>
    </div>
  ),
};

/**
 * An option's row shows its `children`, falling back to `label`; `label`
 * stays the text that is filtered on and shown once selected, so keep it
 * plain. `avatar` fills the leading slot of the row.
 *
 * `renderOption` replaces every row's content and receives the option's
 * `value` and `label` and the current `input` — here with
 * `highlightInputMatch`, which bolds the typed text. `startIcon` sits at the
 * start of the trigger.
 */
export const OptionContent: StoryObj<TypeaheadProps> = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Typeahead
        {...args}
        name="managers"
        label="Managers"
        isMultiple
        width={420}
        defaultValue={[1, 3]}>
        {people.map((person) => (
          <TypeaheadOption
            key={person.value}
            value={person.value}
            label={person.label}
            avatar={<Avatar size={AvatarSizes.small} image={person.avatar} />}
          />
        ))}
      </Typeahead>
      <Typeahead
        {...args}
        name="tool"
        label="Tool"
        placeholder="Type to search"
        startIcon={<Icon name="search" size={16} />}
        renderOption={({ label, input, value }) => (
          <>
            <TypeaheadItemIcon
              name={tools.find((tool) => tool.value === value)?.icon ?? 'user'}
              size={18}
            />
            {highlightInputMatch(label, input)}
          </>
        )}>
        {tools.map((tool) => (
          <TypeaheadOption
            key={tool.value}
            value={tool.value}
            label={tool.label}
          />
        ))}
      </Typeahead>
    </div>
  ),
};

/**
 * Wrap options in `TypeaheadOptionGroup` to show them under a title. Typing
 * filters the options inside each group; a group with no match is hidden,
 * title included. Titles are not selectable and arrow keys skip them.
 */
export const Groups: StoryObj<TypeaheadProps> = {
  args: {
    name: 'ingredients',
    label: 'Ingredients',
    placeholder: 'Search ingredients',
    helperText: 'Try typing “o”',
    isMultiple: true,
    defaultValue: ['banana'],
  },
  render: (args) => (
    <Typeahead {...args}>
      {groupedItems.map((group) => (
        <TypeaheadOptionGroup key={group.label} label={group.label}>
          {group.items.map((item) => (
            <TypeaheadOption
              key={item.value}
              value={item.value}
              label={item.label}
              disabled={item.disabled}
            />
          ))}
        </TypeaheadOptionGroup>
      ))}
    </Typeahead>
  ),
};

/**
 * With `singleLine` the multiple-selection trigger never grows vertically: it
 * shows as many chips as fit, then a counter for the rest. Chips are
 * truncated and show their full label in a tooltip. Drag the dashed box's
 * corner to resize it.
 */
export const SingleLine: StoryObj<TypeaheadProps> = {
  args: {
    name: 'certifications',
    label: 'Certifications',
    isMultiple: true,
    singleLine: true,
    width: '100%',
    defaultValue: certifications.slice(0, 4),
  },
  render: (args) => (
    <div
      style={{
        resize: 'horizontal',
        overflow: 'hidden',
        width: 400,
        minWidth: 160,
        maxWidth: '100%',
        padding: 4,
        border: '1px dashed #ccc',
      }}>
      <Typeahead {...args}>
        {certifications.map((name) => (
          <TypeaheadOption key={name} value={name} label={name} />
        ))}
      </Typeahead>
    </div>
  ),
};

/**
 * `allowCustomValues` lets the user add a value that is not an option: what
 * they type is offered first in the list and added with `Enter`. Custom values
 * are shown in the primary colour and kept in the selection as typed.
 */
export const CustomValues: StoryObj<TypeaheadProps> = {
  args: {
    name: 'skills',
    label: 'Skills',
    placeholder: 'Pick or type a skill',
    helperText: 'Type a skill that is not listed and press Enter',
    isMultiple: true,
    allowCustomValues: true,
    width: 420,
    defaultValue: ['React', 'GraphQL'],
  },
  render: (args) => (
    <Typeahead {...args}>
      {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map((skill) => (
        <TypeaheadOption key={skill} value={skill} label={skill} />
      ))}
    </Typeahead>
  ),
};

/**
 * Pass `value` to own the selection and update it from `onChange`. Clearing
 * everything with the trigger's cross fires `onClearAll`, not `onChange`, so
 * handle both. The buttons change the selection from outside the typeahead.
 */
export const Controlled: StoryObj<TypeaheadProps> = {
  args: {
    name: 'controlled',
    label: 'Departments',
    isMultiple: true,
    width: 420,
  },
  render: function Render(args) {
    const [selected, setSelected] = useState<TypeaheadValue[]>([2]);

    return (
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <Typeahead
          {...args}
          value={selected}
          onChange={(value, isSelected) => {
            setSelected((prev) =>
              isSelected
                ? [...prev, value]
                : prev.filter((item) => item !== value),
            );
            args.onChange?.(value, isSelected);
          }}
          onClearAll={() => {
            setSelected([]);
            args.onClearAll?.();
          }}>
          {items.map((item) => (
            <TypeaheadOption
              key={item.value}
              value={item.value}
              label={item.label}
            />
          ))}
        </Typeahead>
        <Button
          variant="primary"
          onClick={() => setSelected(items.map((item) => item.value))}>
          Select all
        </Button>
        <Button variant="secondary" onClick={() => setSelected([])}>
          Clear
        </Button>
      </div>
    );
  },
};

/**
 * Inside a `FormProvider` the typeahead registers itself under `name`: the
 * form's value for that field is the selection — an array with `isMultiple`,
 * a single value otherwise — and `validationSchema` takes react-hook-form
 * rules. Without `value` or `defaultValue` the selection follows the form, so
 * `defaultValues` and `setValue` drive it. Validation runs when the list
 * closes and on submit.
 */
export const ReactHookForm: StoryObj<TypeaheadProps> = {
  args: { label: 'Departments', isMultiple: true, width: 420 },
  render: function Render(args) {
    const form = useForm<FieldValues>({
      defaultValues: { departments: [1, 2] },
    });
    const [submitted, setSubmitted] = useState<FieldValues>();

    return (
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(setSubmitted)}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Typeahead
            {...args}
            name="departments"
            validationSchema={{ required: 'Pick at least one department' }}>
            {items.map((item) => (
              <TypeaheadOption
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </Typeahead>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              variant="secondary"
              onClick={() =>
                form.setValue('departments', [9, 10], { shouldValidate: true })
              }>
              Set Sales and Support
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
          {submitted && <code>{JSON.stringify(submitted)}</code>}
        </form>
      </FormProvider>
    );
  },
};

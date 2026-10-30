import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { useForm } from 'react-hook-form';

import { Field } from '@components/Field';
import FormHelperText from '@components/FormHelperText';
import { getLabelBadgeId } from '@components/Label';
import Textarea from './Textarea';
import { TextareaProps } from './types';

type Args = TextareaProps;

export default {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    onPaste: fn(),
  },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['basic', 'error', 'success', 'custom'],
    },
    register: { control: false },
    validationSchema: { control: false },
    setCountChar: { control: false },
    onPaste: { control: false },
    as: { control: false },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<Args>;

/**
 * Textarea is the bare multi-line field: a bordered `<textarea>` with status
 * borders and no label or helper text. For a labelled field with helper text
 * and a counter, use `TextField multirow`.
 *
 * Pass `register` from react-hook-form and the textarea registers itself under
 * `name` with `validationSchema` as its rules. Its id is `id`, or
 * `formElement-{name}` by default.
 *
 * Every prop in the Controls panel applies here:
 *
 * - `status` only colours the border (`custom` looks the same as `basic`);
 * - `disabled` mutes it and removes the resize handle;
 * - `readOnly` keeps it focusable and scrollable, without hover or focus
 *   colours;
 * - `rows` sets the initial height (default 10);
 * - `maxLength` stops typing at the limit.
 */
export const Default: StoryObj<Args> = {
  args: {
    name: 'message',
    placeholder: 'Write a message',
    status: 'basic',
    disabled: false,
    readOnly: false,
    rows: 4,
  },
  render: function Render(args) {
    const { register } = useForm();
    return <Textarea {...args} register={register} />;
  },
};

/**
 * The textarea can be resized in both directions by default. Restrict it with
 * the `css` prop: `resize: 'vertical'`, `'horizontal'` or `'none'`. A
 * disabled textarea is never resizable.
 *
 * Two layout rules decide how far it can be dragged:
 *
 * - it fills its container's width (`max-width: 100%`), so it can only grow
 *   wider if you give it a smaller starting `width`;
 * - it is a flex item (`flex: 1 100%`): directly inside a flex column, the
 *   flex basis wins over a dragged height. Wrap it in its own element there,
 *   as here.
 */
export const Resize: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Textarea
            {...args}
            name="vertical"
            placeholder="resize: vertical"
            rows={3}
            register={register}
            css={{ resize: 'vertical' }}
          />
        </div>
        <div>
          <Textarea
            {...args}
            name="horizontal"
            placeholder="resize: horizontal"
            rows={3}
            register={register}
            css={{ resize: 'horizontal', width: 240 }}
          />
        </div>
        <div>
          <Textarea
            {...args}
            name="none"
            placeholder="resize: none"
            rows={3}
            register={register}
            css={{ resize: 'none' }}
          />
        </div>
      </div>
    );
  },
};

/**
 * Textarea shows no counter itself. `setCountChar` is called with the change
 * event on every edit, so keep the length in state and render the counter
 * yourself; `maxLength` stops typing at the limit. (`TextField multirow`
 * does all of this for you.)
 */
export const CharacterCounter: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    const [count, setCount] = useState(0);
    return (
      <div>
        <Textarea
          {...args}
          name="bio"
          placeholder="Tell us about yourself"
          rows={4}
          maxLength={200}
          register={register}
          setCountChar={(event) =>
            setCount((event.target as HTMLTextAreaElement).value.length)
          }
        />
        <FormHelperText css={{ textAlign: 'right' }}>
          {count} / 200
        </FormHelperText>
      </div>
    );
  },
};

/**
 * Textarea renders no label. Pair it with a `Field.Label` whose `htmlFor`
 * matches the textarea's `id`; the label's `badge` works like the fields'
 * `labelBadge`. Point the textarea's `aria-describedby` at
 * `getLabelBadgeId(id)` so the badge is announced as its description.
 */
export const WithLabel: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    return (
      <Field.Root>
        <Field.Label
          htmlFor="bio"
          badge={{ text: 'not present in the CV', color: 'warning' }}>
          Bio
        </Field.Label>
        <Textarea
          {...args}
          id="bio"
          name="bio"
          rows={4}
          register={register}
          aria-describedby={getLabelBadgeId('bio')}
        />
      </Field.Root>
    );
  },
};

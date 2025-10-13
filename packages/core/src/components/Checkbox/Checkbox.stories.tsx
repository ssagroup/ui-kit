import { Fragment } from 'react';

import type { Meta } from '@storybook/react-webpack5';

import Typography from '@components/Typography';

import Checkbox, { CheckboxProps } from './index';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    id: {
      control: {
        disable: true,
      },
    },
  },
  args: {
    text: 'label',
  },
} as Meta<typeof Checkbox>;

export const Default = {};

const checkboxPropsVariants: Array<CheckboxProps & { caption?: string }> = [
  {
    id: 'checked',
    caption: 'Checked by default',
    initialState: true,
    onChange() {
      /* no-op */
    },
  },
  {
    id: 'checked-disabled',
    initialState: true,
    isDisabled: true,
    onChange() {
      /* no-op */
    },
  },
  {
    id: 'not-checked',
    caption: 'Un-checked by default',
    onChange() {
      /* no-op */
    },
  },
  {
    id: 'not-checked-disabled',
    isDisabled: true,
    onChange() {
      /* no-op */
    },
  },
  {
    id: 'undetermined',
    caption: 'Undetermined',
    isIndeterminate: true,
    onChange() {
      /* no-op */
    },
  },
  {
    id: 'undetermined-disabled',
    isIndeterminate: true,
    isDisabled: true,
    onChange() {
      /* no-op */
    },
  },
];

export const AllStates = () => (
  <Fragment>
    {checkboxPropsVariants.map(({ id, caption, ...props }) => (
      <Fragment key={id}>
        {caption ? <Typography variant="h6">{caption}</Typography> : null}
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '20px' }}>
            <Checkbox text="label" {...props} id={id} />
          </span>{' '}
          <Checkbox {...props} id={`${id}-no-text`} />
        </div>
      </Fragment>
    ))}
  </Fragment>
);

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
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
  },
  args: {
    text: 'label',
    color: 'primary',
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

const colors: Array<CheckboxProps['color']> = ['primary', 'success'];

export const Colors = () => (
  <Fragment>
    {colors.map((color) => (
      <Fragment key={color}>
        <Typography variant="h6" css={{ textTransform: 'capitalize' }}>
          {color}
        </Typography>
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
          <Checkbox
            id={`${color}-unchecked`}
            text="Unchecked"
            color={color}
            onChange={() => {
              /* no-op */
            }}
          />
          <Checkbox
            id={`${color}-checked`}
            text="Checked"
            color={color}
            initialState
            onChange={() => {
              /* no-op */
            }}
          />
          <Checkbox
            id={`${color}-indeterminate`}
            text="Indeterminate"
            color={color}
            isIndeterminate
            onChange={() => {
              /* no-op */
            }}
          />
          <Checkbox
            id={`${color}-disabled`}
            text="Disabled"
            color={color}
            isDisabled
            onChange={() => {
              /* no-op */
            }}
          />
        </div>
      </Fragment>
    ))}
  </Fragment>
);

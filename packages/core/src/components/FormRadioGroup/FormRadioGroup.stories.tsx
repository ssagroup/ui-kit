import { Fragment } from 'react';
import { Meta } from '@storybook/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Typography from '@components/Typography';
import Button from '@components/Button';
import Radio from '@components/Radio';

import { FormRadioGroupProps } from './types';
import FormRadioGroup from './FormRadioGroup';

export default {
  title: 'Components/Radio Buttons/FormRadioGroup',
  component: FormRadioGroup,
  argTypes: {
    className: {
      control: {
        disable: true,
      },
    },
    initialState: {
      control: {
        disable: true,
      },
    },
    control: {
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
} as Meta<typeof FormRadioGroup>;

type DemoForm = {
  tree: string;
};

export const FormRadioGroupStory = (args: FormRadioGroupProps<DemoForm>) => {
  const { name, isRequired, initialState } = args;

  const { handleSubmit, control } = useForm<DemoForm>();

  const onSubmit: SubmitHandler<DemoForm> = (data: DemoForm) =>
    alert(JSON.stringify(data, null, ' '));

  return (
    <Fragment>
      <Typography variant="h4">Form Radio Group</Typography>

      <form onSubmit={handleSubmit(onSubmit)} css={{ marginTop: '10px' }}>
        <FormRadioGroup
          name={name}
          isRequired={isRequired}
          initialState={initialState}
          control={control}>
          <Radio id="radio1" value="oak" text="Oak" />
          <Radio id="radio2" value="spruce" text="Spruce" />
          <Radio
            id="radio3"
            value="chestnut"
            text="Chestnut"
            isDisabled={true}
          />
        </FormRadioGroup>

        <Button
          size="small"
          type="submit"
          text="Submit"
          css={{
            marginTop: '7px',
          }}
        />
      </form>
    </Fragment>
  );
};

FormRadioGroupStory.args = {
  name: 'tree',
  isRequired: true,
};
FormRadioGroupStory.storyName = 'FormRadioGroup';

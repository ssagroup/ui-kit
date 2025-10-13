import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Meta } from '@storybook/react-webpack5';

import Button from '@components/Button';
import Radio from '@components/Radio';
import Typography from '@components/Typography';

import FormRadioGroup from './FormRadioGroup';
import { FormRadioGroupProps } from './types';

export default {
  title: 'Components/Radio Buttons/FormRadioGroup',
  component: FormRadioGroup,
  argTypes: {
    className: {
      control: {
        disable: true,
      },
    },
    externalState: {
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
  const { name, isRequired, externalState } = args;

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
          externalState={externalState}
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

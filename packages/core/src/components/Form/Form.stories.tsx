import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useForm, FieldError } from 'react-hook-form';
import Button from '@components/Button';
import Card from '@components/Card';
import CardContent from '@components/CardContent';
import CardHeader from '@components/CardHeader';
import FormAction from '@components/FormAction';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import Link from '@components/Link';
import TextField from '@components/TextField';
import Typography from '@components/Typography';
import Form from './Form';

export default {
  title: 'Forms/Form',
  component: Form,
  subcomponents: { FormGroup, FormAction },
  parameters: {
    controls: { disable: true },
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof Form>;

/**
 * Form is a styled `<form>` and nothing else: state, validation and submit
 * come from react-hook-form, wired through the native `onSubmit`. Put each
 * row in a `FormGroup` — it takes the full width, so rows stack — and the
 * buttons in a `FormAction`. Anything placed straight into Form flows in a
 * wrapping row.
 *
 * `noValidate` keeps the browser's own validation out of the way, so only
 * react-hook-form's messages show.
 */
export const Default: StoryObj = {
  render: function Render() {
    const [isVisible, setIsVisible] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    return (
      <Card css={{ width: 346, padding: 48 }}>
        <CardHeader>
          <Typography variant="h4">Sign in</Typography>
        </CardHeader>
        <CardContent>
          <Form
            noValidate
            onSubmit={handleSubmit((values) => console.log(values))}>
            <FormGroup>
              <TextField
                name="email"
                label="Email"
                placeholder="you@example.com"
                register={register}
                validationSchema={{ required: 'Enter your email' }}
                errors={errors.email as FieldError}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                name="password"
                label="Password"
                type={isVisible ? 'text' : 'password'}
                register={register}
                validationSchema={{ required: 'Enter your password' }}
                errors={errors.password as FieldError}
                endElement={
                  <Button
                    variant="tertiary"
                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                    endIcon={
                      <Icon
                        name={isVisible ? 'invisible' : 'visible'}
                        size={16}
                      />
                    }
                    onClick={() => setIsVisible((value) => !value)}
                  />
                }
              />
            </FormGroup>
            <FormGroup>
              <Link href="#">Forgot password?</Link>
            </FormGroup>
            <FormAction>
              <Button variant="primary" type="submit" text="Sign in" block />
            </FormAction>
          </Form>
        </CardContent>
      </Card>
    );
  },
};

/**
 * A `FormGroup` is one full-width row that lays its own children out in a
 * wrapping row, so two fields side by side go into one group. TextField
 * renders a fragment, so wrap each field in its own element to keep its
 * label, input and message together.
 *
 * For a plain stacked form without groups, set `css={{ flexFlow: 'column' }}`
 * on Form instead.
 */
export const Layout: StoryObj = {
  render: function Render() {
    const { register, handleSubmit, reset } = useForm();

    return (
      <Form
        noValidate
        onSubmit={handleSubmit((values) => console.log(values))}
        css={{ maxWidth: 520 }}>
        <FormGroup css={{ gap: 16 }}>
          <div style={{ flex: 1 }}>
            <TextField
              name="firstName"
              label="First name"
              register={register}
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField name="lastName" label="Last name" register={register} />
          </div>
        </FormGroup>
        <FormGroup>
          <div style={{ flex: 1 }}>
            <TextField name="email" label="Email" register={register} />
          </div>
        </FormGroup>
        <FormAction css={{ display: 'flex', gap: 8 }}>
          <Button variant="primary" type="submit" text="Save" />
          <Button variant="secondary" text="Cancel" onClick={() => reset()} />
        </FormAction>
      </Form>
    );
  },
};

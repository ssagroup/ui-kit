import React from 'react';
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { userEvent, within } from 'storybook/test';

import { css } from '@emotion/react';
import {
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

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
import mainTheme from '@themes/main';

import Form from './Form';

export default {
  title: 'Forms/Samples',
  component: Form,
  parameters: {
    controls: { disable: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <div
        css={css`
          width: 346px;

          margin: 0 auto;
        `}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Card>;

const wrapper = css`
  display: flex;
  width: 100%;

  padding-block-start: 16px;

  justify-content: center;

  a {
    padding-inline: 8px;
  }
`;

export const SingIn: StoryObj<typeof Card> = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Card
        css={css`
          background-color: ${mainTheme.colors.greyLighter};

          padding: 48px;
        `}>
        <CardHeader>
          <Typography variant="h4">Sing In</Typography>
        </CardHeader>

        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                placeholder="Email"
                label="Email"
                name="email"
                register={register}
                validationSchema={{
                  required: 'Required',
                }}
                errors={errors?.email as FieldError}
              />
            </FormGroup>

            <FormGroup>
              <TextField
                placeholder="Password"
                label="Password"
                name="password"
                type={isVisible ? 'text' : 'password'}
                register={register}
                validationSchema={{
                  required: 'Required',
                }}
                endElement={
                  <Button
                    variant="tertiary"
                    endIcon={
                      <Icon
                        name={isVisible ? 'invisible' : 'visible'}
                        size={16}
                      />
                    }
                    onClick={handleVisibility}
                  />
                }
                errors={errors?.password as FieldError}
              />
            </FormGroup>

            <FormGroup>
              <Link href="#">Forgot password?</Link>
            </FormGroup>

            <FormAction>
              <Button type="submit" text="Submit" block />
            </FormAction>

            <span css={wrapper}>
              <Typography variant="subtitle">Don’t have an account?</Typography>
              <Link href="#">Sign Up</Link>
            </span>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

SingIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const user = await canvas.getByPlaceholderText('Email');
  const password = await canvas.getByPlaceholderText('Password');

  await userEvent.click(user);
  await userEvent.keyboard('email@email.com');
  await userEvent.click(password);
  await userEvent.keyboard('123');

  const btn = await canvas.getByRole('button', { name: /submit/i });
  await userEvent.click(btn);
};

export const ForgotPasswordTemplate: StoryObj<typeof Card> = () => {
  const [visibleForm, setVisibleForm] = React.useState('request');
  const [email, setEmail] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setEmail(data.email);
    setVisibleForm('confirm');
  };

  return (
    <>
      <Card
        css={css`
          display: ${visibleForm === 'request' ? 'block' : 'none'};
          background-color: ${mainTheme.colors.greyLighter};

          padding: 48px;
        `}>
        <CardHeader
          css={{
            display: 'block',
          }}>
          <Typography variant="h4">Forgot Password?</Typography>
          <Typography variant="subtitle">
            No worries, we’ll sent reset instructions
          </Typography>
        </CardHeader>

        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                placeholder="Email"
                label="Email"
                name="email"
                register={register}
                validationSchema={{
                  required: 'Required',
                }}
                errors={errors?.email as FieldError}
              />
            </FormGroup>

            <FormAction>
              <Button type="submit" text="Reset Password" block />
            </FormAction>
          </Form>
        </CardContent>
      </Card>

      <Card
        css={css`
          display: ${visibleForm === 'confirm' ? 'block' : 'none'};
          background-color: ${mainTheme.colors.greyLighter};

          padding: 48px;
        `}>
        <CardContent>
          <div
            css={css`
              text-align: center;
            `}>
            <Typography variant="h4" gutter>
              Check Your Email
            </Typography>
            <Typography variant="subtitle" gutter>
              We sent a password reset link to <strong>{email}</strong>.
            </Typography>

            <span css={wrapper}>
              <Typography variant="subtitle">
                Didn’t receive the email?
              </Typography>
              <Link href="#">Resend</Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

ForgotPasswordTemplate.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const user = await canvas.getByPlaceholderText('Email');

  await userEvent.click(user);
  await userEvent.keyboard('email@email.com');
};

export const RecoverPasswordTemplate: StoryObj<typeof Card> = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);
  const [visibleForm, setVisibleForm] = React.useState('request');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = () => {
    setVisibleForm('confirm');
  };

  const handleVisibility = (input: string) => () =>
    input === 'password'
      ? setIsVisible(!isVisible)
      : setIsVisibleConfirm(!isVisibleConfirm);

  return (
    <>
      <Card
        css={css`
          display: ${visibleForm === 'request' ? 'block' : 'none'};
          background-color: ${mainTheme.colors.greyLighter};

          padding: 48px;
        `}>
        <CardHeader
          css={{
            display: 'block',
          }}>
          <Typography variant="h4">Forgot Password?</Typography>
          <Typography variant="subtitle">
            No worries, we’ll sent reset instructions
          </Typography>
        </CardHeader>

        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                placeholder="Password"
                label="New Password"
                name="password"
                type={isVisible ? 'text' : 'password'}
                register={register}
                validationSchema={{
                  required: 'Required',
                }}
                endElement={
                  <Button
                    variant="tertiary"
                    endIcon={
                      <Icon
                        name={isVisible ? 'invisible' : 'visible'}
                        size={16}
                      />
                    }
                    onClick={handleVisibility('password')}
                  />
                }
                errors={errors?.password as FieldError}
              />
            </FormGroup>

            <FormGroup>
              <FormGroup>
                <TextField
                  placeholder="Confirm password"
                  label="Confirm Password"
                  name="confirmPassword"
                  type={isVisibleConfirm ? 'text' : 'password'}
                  register={register}
                  validationSchema={{
                    required: 'Required',
                  }}
                  endElement={
                    <Button
                      variant="tertiary"
                      endIcon={
                        <Icon
                          name={isVisibleConfirm ? 'invisible' : 'visible'}
                          size={16}
                        />
                      }
                      onClick={handleVisibility('confirmPassword')}
                    />
                  }
                  errors={errors?.confirmPassword as FieldError}
                />
              </FormGroup>
            </FormGroup>

            <FormAction>
              <Button type="submit" text="Reset Password" block />
            </FormAction>
          </Form>
        </CardContent>
      </Card>

      <Card
        css={css`
          display: ${visibleForm === 'confirm' ? 'block' : 'none'};
          background-color: ${mainTheme.colors.greyLighter};

          padding: 48px;
        `}>
        <CardContent>
          <div
            css={css`
              text-align: center;
            `}>
            <Typography variant="h4" gutter>
              Password Reset
            </Typography>
            <Typography variant="subtitle" gutter>
              Your password has been successfully reset. Click to Sign In.
            </Typography>

            <Button text="Sign In" block />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

RecoverPasswordTemplate.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const [pass, confirmPass] = await canvas.getAllByPlaceholderText(/Password/i);

  await userEvent.click(pass);
  await userEvent.keyboard('123');

  await userEvent.click(confirmPass);
  await userEvent.keyboard('123');
};

RecoverPasswordTemplate.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const [pass, confirmPass] = await canvas.getAllByPlaceholderText(/Password/i);

  await userEvent.click(pass);
  await userEvent.keyboard('123');

  await userEvent.click(confirmPass);
  await userEvent.keyboard('123');

  const btn = await canvas.getByRole('button', { name: /reset password/i });

  await userEvent.click(btn);
};

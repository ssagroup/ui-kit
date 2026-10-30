import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * Form - Styled `<form>` element that lays its children out as a wrapping flex row.
 *
 * ### It does not manage form state
 * Unlike the `Form` component in many other kits, this one adds **no** state,
 * validation, context or submit handling — it is a layout primitive over a real
 * `<form>`. There is no `onSubmit` wiring, no `values`/`errors`, and nothing is
 * provided to descendants via context.
 *
 * State comes from `react-hook-form`: keep `useForm` in your component and hand
 * `handleSubmit` to the native `onSubmit`. Because it renders a plain `<form>`,
 * every native attribute (`onSubmit`, `noValidate`, `id`, `method`) works as-is.
 *
 * ### Layout
 * Children flow in a wrapping row. Put each row in a `FormGroup` (full width)
 * and the buttons in a `FormAction`; for a stacked form without groups,
 * override the direction with `css`.
 *
 * @category Form Structure
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * // State lives in react-hook-form; Form only lays the fields out
 * // (TextField expects the untyped useForm(), hence the FieldError cast)
 * const { register, handleSubmit, formState } = useForm();
 *
 * <Form onSubmit={handleSubmit(onSubmit)}>
 *   <FormGroup>
 *     <TextField
 *       name="title"
 *       register={register}
 *       errors={formState.errors.title as FieldError}
 *     />
 *   </FormGroup>
 *   <FormAction>
 *     <Button type="submit" variant="primary" text="Save" />
 *   </FormAction>
 * </Form>
 * ```
 *
 * @example
 * ```tsx
 * // Stack the fields instead of wrapping them in a row
 * <Form onSubmit={handleSubmit(onSubmit)} css={{ flexFlow: 'column', gap: 16 }}>
 *   <TextField name="email" register={register} />
 *   <TextField name="password" type="password" register={register} />
 * </Form>
 * ```
 */
const Form = styled.form<CommonProps>`
  display: flex;
  flex-flow: row wrap;
`;

export default Form;

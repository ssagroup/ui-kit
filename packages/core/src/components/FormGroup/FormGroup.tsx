import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * FormGroup - One full-width row inside a `Form`
 *
 * A `<div>` with `flex: 1 1 100%`, so each group starts a new row of the
 * parent Form. Its own children wrap in a row (`align-items: flex-start`),
 * which puts two fields in one group side by side. Adds 10px of vertical
 * margin.
 *
 * @category Form Structure
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <FormGroup>
 *   <TextField name="email" label="Email" register={register} />
 * </FormGroup>
 * ```
 */
const FormGroup = styled.div<CommonProps>`
  display: flex;

  margin: 10px 0;

  flex: 1 1 100%;
  flex-wrap: wrap;

  align-items: flex-start;
`;

export default FormGroup;

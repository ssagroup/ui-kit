import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * FormAction - Full-width row for a form's buttons
 *
 * A `<div>` with `flex: 1 1 100%` and no other styles; add `css` for spacing
 * between several buttons.
 *
 * @category Form Structure
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <FormAction>
 *   <Button variant="primary" type="submit" text="Save" block />
 * </FormAction>
 * ```
 */
const FormAction = styled.div<CommonProps>`
  flex: 1 1 100%;
`;

export default FormAction;

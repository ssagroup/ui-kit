import CardBase from './CardBase';

import { CardProps } from './types';

/**
 * Card - Elevated surface that groups related content.
 *
 * ### Composition
 * `Card` provides the surface, 20px padding and a white rounded background, and
 * stacks its children in a centred column. It renders no title of its own —
 * build the inside from the sibling components:
 *
 * ```
 * Card
 * ├── CardHeader   — title row, optional overhanging icon
 * └── CardContent  — padded body, row or column
 * ```
 *
 * All three are separate top-level exports rather than `Card.Header`-style
 * statics, so import each one you use. Both are optional — a `Card` wrapping
 * plain children is valid.
 *
 * ### `onClick` changes the rendered element
 * Without `onClick` a `Card` is a `div`. **With `onClick` it renders a
 * `button`**, so it becomes focusable and Enter/Space activate it. That is the
 * accessible behaviour for a clickable card, but it also means button UA styles
 * apply and the card can no longer legally contain another button or link.
 * If you need interactive controls inside the card, leave `onClick` off and put
 * the handler on a control within it.
 *
 * ### Elevation
 * Cards carry a shadow by default; `noShadow` flattens it. There is no numeric
 * elevation scale and no outlined variant — for a bordered look, apply a border
 * through `css`.
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>Team capacity</CardHeader>
 *   <CardContent>
 *     <Typography variant="body1">14 of 20 seats filled</Typography>
 *   </CardContent>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Activatable card — renders as a <button>, so no controls inside
 * <Card onClick={() => navigate(`/people/${id}`)}>
 *   <CardContent>{fullName}</CardContent>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Flat card sitting inside an already-elevated panel
 * <Card noShadow css={{ width: '100%' }}>
 *   <CardContent direction="column">{fields}</CardContent>
 * </Card>
 * ```
 */
const Card = ({ children, onClick, ...props }: CardProps) => {
  return (
    <CardBase {...props} as={onClick ? 'button' : 'div'} onClick={onClick}>
      {children}
    </CardBase>
  );
};

export default Card;

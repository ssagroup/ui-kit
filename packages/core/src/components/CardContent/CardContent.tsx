import { CommonProps } from '@global-types/emotion';
import { resolveAriaProp } from '@utils/deprecation';
import CardContentBase from './CardContentBase';

export interface CardProps extends CommonProps {
  /** Body content of the card. */
  children: React.ReactNode;
  style?: React.CSSProperties;
  /**
   * `flex-direction` for the body. Defaults to a row, so vertically stacked
   * content needs `"column"`.
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  className?: string;
  /** Id of the element labelling this content region. */
  'aria-labelledby'?: string;
  /**
   * Id of the element labelling this content region.
   *
   * @deprecated Use `aria-labelledby` instead — `ariaLabelledby` is removed in
   * the next major release.
   */
  ariaLabelledby?: string;
  role?: string;
}

/**
 * CardContent - Padded body region of a `Card`.
 *
 * Place it inside a `Card`, after `CardHeader` when there is one. The padding
 * comes from the `Card` itself; what `CardContent` adds is the layout.
 *
 * ### It spreads its children apart
 * The body is a flex container with `justify-content: space-between`, so two
 * children sit at opposite ends rather than next to each other — handy for a
 * label/value row, surprising if you expected them adjacent. `direction` maps
 * to `flex-direction` and defaults to `row`, so stacked content needs
 * `direction="column"` (which also switches `align-items` from `center` to
 * `normal`, letting children stretch to full width).
 *
 * ### Labelling
 * When you give the region a `role`, name it with `aria-labelledby` pointing at
 * the id of the heading in `CardHeader`. (`ariaLabelledby` is the deprecated
 * spelling and is removed next major.)
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>Recent activity</CardHeader>
 *   <CardContent direction="column">{rows}</CardContent>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Named region, labelled by the header's heading
 * <Card>
 *   <CardHeader><h3 id="capacity-title">Capacity</h3></CardHeader>
 *   <CardContent role="region" aria-labelledby="capacity-title">
 *     {chart}
 *   </CardContent>
 * </Card>
 * ```
 */
const CardContent = ({
  children,
  'aria-labelledby': ariaLabelledbyNative,
  ariaLabelledby,
  ...props
}: CardProps) => (
  <CardContentBase
    aria-labelledby={resolveAriaProp(
      'CardContent',
      'aria-labelledby',
      ariaLabelledbyNative,
      ariaLabelledby,
    )}
    {...props}>
    {children}
  </CardContentBase>
);

export default CardContent;

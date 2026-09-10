import { CommonProps } from '@global-types/emotion';
import CardHeaderBase from './CardHeaderBase';

export interface CardProps extends CommonProps {
  /** Header content — normally the card title. */
  children: React.ReactNode;
  /**
   * Badge rendered overhanging the header's top-left corner, outside the card
   * bounds. For an icon inline with the title, put it in `children` instead.
   */
  icon?: React.ReactNode;
  /** Removes the header's background fill. */
  transparent?: boolean;
}

/**
 * CardHeader - Title row for a `Card`.
 *
 * Place it as the first child of a `Card`, above `CardContent`.
 *
 * ### The `icon` slot overhangs the card
 * `icon` is positioned outside the header's top-left corner, so it deliberately
 * bleeds past the card edge as a badge. It is not an inline leading icon — for
 * that, put an `Icon` in `children` alongside the title text. Because it
 * overhangs, a `Card` with `overflow: hidden` will clip it.
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>Upcoming events</CardHeader>
 *   <CardContent>{list}</CardContent>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Overhanging badge; the parent Card must not clip its overflow
 * <CardHeader icon={<Icon name="calendar" size={24} />}>This week</CardHeader>
 * ```
 *
 * @example
 * ```tsx
 * // Inline icon next to the title — plain children, not the icon slot
 * <CardHeader>
 *   <Icon name="information" size={16} /> Payroll notes
 * </CardHeader>
 * ```
 */
const CardHeader = ({ children, icon, transparent, ...props }: CardProps) => (
  <CardHeaderBase transparent={transparent} hasIcon={!!icon} {...props}>
    {icon ? (
      <span
        style={{
          position: 'absolute',
          left: '-30px',
          top: '-30px',
        }}>
        {icon}
      </span>
    ) : null}
    {children}
  </CardHeaderBase>
);

export default CardHeader;

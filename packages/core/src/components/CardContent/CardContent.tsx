import { CommonProps } from '@global-types/emotion';
import { resolveAriaProp } from '@utils/deprecation';
import CardContentBase from './CardContentBase';

export interface CardProps extends CommonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
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

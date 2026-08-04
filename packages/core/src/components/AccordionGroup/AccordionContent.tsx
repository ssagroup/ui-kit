import CardContent from '@components/CardContent';
import { RenderContentProps } from './types';
import { createContentStyles } from './styles';
import { useTheme } from '@emotion/react';

/**
 * AccordionContent - Default component for accordion content panels
 *
 * A pre-built component for rendering accordion content that handles styling
 * and accessibility attributes. Can be used as the content in `renderContent`
 * prop for Accordion components, or as a reference for custom content implementations.
 *
 * Features:
 * - Proper ARIA attributes for accessibility
 * - Size-aware styling
 * - Smooth expand/collapse transitions
 * - Accepts any React children
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Accordion
 *   id="example"
 *   title="My Accordion"
 *   renderTitle={AccordionTitle}
 *   renderContent={(props) => (
 *     <AccordionContent {...props}>
 *       <p>This is the accordion content</p>
 *       <ul>
 *         <li>Item 1</li>
 *         <li>Item 2</li>
 *       </ul>
 *     </AccordionContent>
 *   )}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom content using AccordionContent props
 * <Accordion
 *   renderContent={({ open, ...props }) => (
 *     <div {...props} style={{ display: open ? 'block' : 'none' }}>
 *       Custom content with conditional rendering
 *     </div>
 *   )}
 * />
 * ```
 *
 * @see {@link Accordion} - Parent component that uses this component
 */
export const AccordionContent = ({
  open,
  // Accordion passes both spellings; keep the deprecated one out of `rest` so
  // it cannot reach the DOM.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOpened,
  children,
  size = 'empty',
  ...rest
}: RenderContentProps & {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  const styles = createContentStyles(theme, open);
  return (
    <CardContent css={styles[size]} {...rest}>
      {children}
    </CardContent>
  );
};

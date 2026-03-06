/**
 * Props for the Typography component
 *
 * Text typography component with semantic variants, font weights, and customizable
 * styling. Renders appropriate HTML elements based on variant while allowing
 * custom element override via `as` prop. Supports all standard typography variants
 * from headings to body text and captions.
 *
 * @example
 * ```tsx
 * // Heading variant
 * <Typography variant="h1">Main Title</Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Body text with custom styling
 * <Typography variant="body1" weight="bold" color="#333">
 *   Important text
 * </Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Semantic override
 * <Typography variant="h2" as="h1">
 *   Looks like h2, but renders as h1
 * </Typography>
 * ```
 */
export interface TypographyProps {
  /**
   * Typography variant determining size, line-height, and semantic HTML element
   * - `h1`-`h6`: Heading variants (renders as h1-h6)
   * - `subtitle`: Subtitle text (renders as h6)
   * - `body1`-`body3`: Body text variants (renders as p)
   * - `caption`: Caption/small text (renders as span)
   * @default 'body1'
   */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption';

  /**
   * Font weight variant
   * @default 'regular'
   */
  weight?: 'lighter' | 'regular' | 'medium' | 'bold';

  /**
   * Whether to add bottom margin (gutter)
   * Useful for spacing between typography elements
   * @default false
   */
  gutter?: boolean;

  /**
   * Text color (CSS color value)
   * @default 'rgba(43, 45, 49, 1)'
   */
  color?: string;

  /**
   * Text content to display
   */
  children: React.ReactNode;

  /**
   * Override the HTML element type
   * Allows semantic HTML override (e.g., h2 variant as h1 element)
   */
  as?: React.ElementType;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Ref to the rendered element
   */
  ref?: React.Ref<HTMLElement>;

  /**
   * HTML id attribute
   */
  id?: string;
}

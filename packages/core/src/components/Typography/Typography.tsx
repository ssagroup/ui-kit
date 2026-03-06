import { forwardRef } from 'react';
import { css } from '@emotion/react';

import { TypographyProps } from './types';
import * as style from './styles';

const variantsMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  caption: 'span',
};

/**
 * Typography - Text typography component with semantic variants
 *
 * A flexible typography component that provides consistent text styling across
 * the application. Supports semantic HTML variants (headings, body text, captions)
 * with customizable font weights, colors, and spacing. Automatically renders
 * appropriate HTML elements based on variant while allowing semantic override.
 *
 * @category Components
 * @subcategory Display
 *
 * @example
 * ```tsx
 * // Heading
 * <Typography variant="h1">Main Title</Typography>
 * <Typography variant="h2">Section Title</Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Body text
 * <Typography variant="body1">
 *   This is regular body text
 * </Typography>
 * <Typography variant="body2" weight="bold" color="#333">
 *   This is bold, darker body text
 * </Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Semantic override
 * <Typography variant="h2" as="h1">
 *   Looks like h2 but semantically is h1
 * </Typography>
 * ```
 *
 * @example
 * ```tsx
 * // With gutter for spacing
 * <Typography variant="body1" gutter>
 *   This text has bottom margin
 * </Typography>
 * ```
 *
 * @accessibility
 * - Uses semantic HTML elements by default
 * - Supports proper heading hierarchy
 * - Respects user font size preferences
 */
const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  {
    children,
    weight = 'regular',
    variant = 'body1',
    gutter = false,
    color = 'rgba(43, 45, 49, 1)',
    as,
    ...props
  },
  ref,
) {
  const Component = as || variantsMapping[variant];

  return (
    <Component
      ref={ref}
      css={[
        style[variant],
        style[weight],
        css`
          color: ${color};
        `,
        gutter && style.gutter,
      ]}
      {...props}>
      {children}
    </Component>
  );
});

export default Typography;

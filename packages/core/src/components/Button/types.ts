import { AriaAttributes } from 'react';
import { SerializedStyles, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';

/**
 * ARIA properties for button accessibility
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
type ButtonAriaProps = Pick<
  AriaAttributes,
  | 'aria-labelledby'
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-disabled'
  | 'aria-pressed'
  | 'aria-current'
>;

/**
 * Props for the Button component
 *
 * A flexible button component that supports multiple variants, sizes, and configurations.
 * Buttons can display text, icons, or custom children content.
 *
 * @example
 * ```tsx
 * // Basic button with text
 * <Button text="Click me" onClick={handleClick} />
 * ```
 *
 * @example
 * ```tsx
 * // Button with icon
 * <Button
 *   text="Save"
 *   startIcon={<Icon name="check" />}
 *   variant="primary"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Full-width block button
 * <Button text="Submit" block variant="primary" />
 * ```
 */
export interface ButtonProps extends ButtonAriaProps {
  /**
   * Makes the button span the full width of its container
   * @default false
   */
  block?: boolean;

  /**
   * Size variant of the button
   * - `small`: Compact button for dense UIs (default)
   * - `medium`: Standard button size
   * - `large`: Prominent button for key actions
   * @default 'small'
   */
  size?: keyof MainSizes;

  /**
   * Text content to display inside the button
   * Either `text`, `children`, or icons must be provided
   */
  text?: string;

  /**
   * Icon to display before the button text/content
   * Can be any React node, commonly an Icon component
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display after the button text/content
   * Can be any React node, commonly an Icon component
   */
  endIcon?: React.ReactNode;

  /**
   * Custom CSS class name for the start icon wrapper
   */
  startIconClassName?: string;

  /**
   * Custom CSS class name for the end icon wrapper
   */
  endIconClassName?: string;

  /**
   * Visual style variant of the button (uses theme.palette)
   * - `primary` | `secondary` | `tertiary` | `error` | `warning` | `success`
   * @default 'tertiary'
   */
  variant?: keyof ButtonVariants;

  /**
   * HTML button type attribute
   * - `button`: Standard button (default)
   * - `submit`: Form submission button
   * - `reset`: Form reset button
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';

  /**
   * Disables the button, preventing user interaction
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Custom CSS class name for the button
   */
  className?: string;

  /**
   * Click event handler
   * Fired when the button is clicked (if not disabled)
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Custom content to render inside the button
   * If provided, takes precedence over `text` prop
   * Either `text`, `children`, or icons must be provided
   */
  children?: React.ReactNode;
}

/**
 * Button variant style functions.
 * Each function reads from `theme.palette.<variant>` using the following convention:
 * - `main`  → default background
 * - `dark`  → hover and active background
 * - `light` → focus background
 */
export interface ButtonVariants {
  primary: (theme: Theme) => SerializedStyles;
  secondary: (theme: Theme) => SerializedStyles;
  tertiary: (theme: Theme) => SerializedStyles;
  error: (theme: Theme) => SerializedStyles;
  warning: (theme: Theme) => SerializedStyles;
  success: (theme: Theme) => SerializedStyles;
}

export type ButtonTextProps = {
  text: string;
  className?: string;
  testId?: string;
};

export type ColoredButtonTextProps = Required<Pick<ButtonProps, 'size'>> & {
  text: string;
};

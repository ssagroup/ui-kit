import { forwardRef } from 'react';
import { useTheme } from '@emotion/react';

import Wrapper from '@components/Wrapper/Wrapper';

import { ButtonBase } from './ButtonBase';
import {
  WhiteButtonText,
  GreyButtonText,
  DisabledButtonText,
} from './ButtonText';
import { ButtonProps, ButtonVariants } from './types';
import {
  sizeStyles,
  variantStyles,
  buttonBlock,
  iconWrapperLeft,
  iconWrapperRight,
} from './styles';

const WHITE_TEXT_VARIANTS = new Set<keyof ButtonVariants>([
  'primary',
  'error',
  'warning',
  'success',
]);

/**
 * Button - Interactive button component for user actions.
 *
 * Variant colors are driven entirely by `theme.palette` — each variant reads
 * `palette.<variant>.main` for the default background, `palette.<variant>.dark`
 * for hover and active states, and `palette.<variant>.light` for focus state.
 * Override any palette entry in a custom theme to restyle a variant without
 * affecting other components.
 *
 * ### Variants (default: `tertiary`)
 * - `primary`   — blue, high emphasis, white text
 * - `secondary` — grey, medium emphasis, dark text
 * - `tertiary`  — transparent background, dark text, focus outline only (default)
 * - `error`     — red, destructive actions, white text
 * - `warning`   — orange, caution actions, white text
 * - `success`   — green, confirmation actions, white text
 *
 * @category Form Controls
 * @subcategory Action
 *
 * @example
 * ```tsx
 * // No variant passed → tertiary (transparent ghost button)
 * <Button text="Cancel" onClick={handleCancel} />
 * ```
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" onClick={handleSave}>
 *   Save
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * // Full-width block button
 * <Button variant="primary" size="large" block type="submit">
 *   Submit Form
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * // Button with custom children
 * <Button variant="secondary" onClick={handleAction}>
 *   <span>Custom Content</span>
 *   <Icon name="arrow-right" />
 * </Button>
 * ```
 *
 * @see {@link ButtonGroup} - For grouped button layouts
 * @see {@link Icon} - For button icons
 *
 * @accessibility
 * Supports full ARIA attributes including:
 * - aria-label, aria-labelledby for accessible labels
 * - aria-disabled for disabled state
 * - aria-pressed for toggle buttons
 * - Keyboard navigation (Enter/Space to activate)
 * - Focus management
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      block = false,
      size = 'small',
      text,
      startIcon,
      endIcon,
      startIconClassName,
      endIconClassName,
      variant = 'tertiary',
      type = 'button',
      className,
      isDisabled,
      onClick,
      children,
      ...ariaProps
    },
    ref,
  ) {
    if (!text && !startIcon && !endIcon && !children) {
      throw new Error('Button must have either text or icon or children');
    }

    const theme = useTheme();

    const appliedVariantStyle = variantStyles[variant](theme);

    const resolveTextNode = () => {
      if (!text) return null;
      if (isDisabled) return <DisabledButtonText text={text} size={size} />;
      if (WHITE_TEXT_VARIANTS.has(variant)) {
        return <WhiteButtonText text={text} size={size} />;
      }
      return <GreyButtonText text={text} size={size} />;
    };

    const btn = (
      <ButtonBase
        ref={ref}
        css={[sizeStyles[size], appliedVariantStyle]}
        type={type}
        disabled={isDisabled}
        className={className}
        onClick={onClick}
        {...ariaProps}>
        {startIcon ? (
          <span
            style={!text ? { margin: 0 } : undefined}
            css={iconWrapperRight}
            className={startIconClassName}>
            {startIcon}
          </span>
        ) : null}
        {children ?? resolveTextNode()}
        {endIcon ? (
          <span
            style={!text ? { margin: 0 } : undefined}
            css={iconWrapperLeft}
            className={endIconClassName}>
            {endIcon}
          </span>
        ) : null}
      </ButtonBase>
    );

    return block ? <Wrapper css={buttonBlock}>{btn}</Wrapper> : btn;
  },
);

export default Button;

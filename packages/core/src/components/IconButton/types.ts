import type { Interpolation, Theme } from '@emotion/react';
import type { MapIconsType } from '@components/Icon/types';

export type IconButtonProps = {
  /**
   * Icon name from the UI kit Icon component (e.g. "edit", "bin", "search")
   */
  icon: keyof MapIconsType;

  /**
   * Click handler
   */
  onClick: () => void;

  /**
   * Accessible label for screen readers. When omitted, the raw icon name is used.
   */
  'aria-label'?: string;

  /**
   * Tooltip text; when provided, uses the kit's Tooltip on hover.
   */
  title?: string;

  /**
   * Disables the button and applies disabled styles
   * @default false
   */
  disabled?: boolean;

  /**
   * Use transparent background instead of theme grey
   * @default false
   */
  transparent?: boolean;

  /**
   * Custom styles in one prop. Each key is applied where it belongs:
   * - `button`: Emotion styles merged with default button styles
   * - `iconColor`: icon color (defaults to theme.colors.greyDarker)
   * - `icon`: Emotion styles passed to the Icon
   */
  styles?: {
    button?: Interpolation<Theme>;
    iconColor?: string;
    icon?: Interpolation<Theme>;
  };
};

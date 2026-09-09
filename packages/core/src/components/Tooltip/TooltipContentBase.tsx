import styled from '@emotion/styled';
import { TooltipColor } from './types';
import * as styles from './styles';

export interface TooltipContentBaseProps {
  /** Color scheme of the surface. Defaults to `grey`. */
  tooltipColor?: TooltipColor;
  /** Outlines the surface with a 1px border. */
  hasBorder?: boolean;
  /** Casts the design's drop shadow. Defaults to `true`. */
  hasShadow?: boolean;
}

export const TooltipContentBase = styled.div<TooltipContentBaseProps>`
  border-radius: 8px;
  font-weight: 600;

  /*
   * The FloatingPortal alone does not win a stacking contest: it appends to
   * <body> with z-index auto, so anything positioned above 0 paints over the
   * tooltip -- a Dropdown's options list (2), Typeahead's list (5) or a
   * ModalDialog (1000) would all hide it. This matches the kit's top tier
   * (NavBar and the notification stack), so a tooltip triggered from inside
   * those is still visible. Overridable per instance via TooltipContent's
   * inline style prop.
   */
  z-index: 9999;
  ${({ theme, tooltipColor = 'grey' }) =>
    styles.surfaceColors[tooltipColor](theme)};
  ${({ theme, hasBorder }) => (hasBorder ? styles.border(theme) : '')};
  ${({ theme, hasShadow = true }) => (hasShadow ? styles.shadow(theme) : '')};
`;

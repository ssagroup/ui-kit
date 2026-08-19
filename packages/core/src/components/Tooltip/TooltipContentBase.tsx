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
  ${({ theme, tooltipColor = 'grey' }) =>
    styles.surfaceColors[tooltipColor](theme)};
  ${({ theme, hasBorder }) => (hasBorder ? styles.border(theme) : '')};
  ${({ theme, hasShadow = true }) => (hasShadow ? styles.shadow(theme) : '')};
`;

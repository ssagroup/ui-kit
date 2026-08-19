import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
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

const colorStyles = (theme: Theme, tooltipColor: TooltipColor) => {
  switch (tooltipColor) {
    case 'white':
      return styles.white(theme);
    case 'dark':
      return styles.dark(theme);
    case 'nonOpaque':
      return styles.nonOpaque(theme);
    default:
      return styles.grey(theme);
  }
};

export const TooltipContentBase = styled.div<TooltipContentBaseProps>`
  border-radius: 8px;
  font-weight: 600;
  ${({ theme, tooltipColor = 'grey' }) => colorStyles(theme, tooltipColor)};
  ${({ theme, hasBorder }) => (hasBorder ? styles.border(theme) : '')};
  ${({ theme, hasShadow = true }) => (hasShadow ? styles.shadow(theme) : '')};
`;

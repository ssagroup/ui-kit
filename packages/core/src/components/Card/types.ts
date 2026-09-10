import { CommonProps } from '@global-types/emotion';

export interface CardProps extends CommonProps {
  /**
   * Drops the drop shadow, leaving a flat surface. Cards are elevated by
   * default — there is no numeric elevation scale.
   */
  noShadow?: boolean;
  /**
   * Card body. Usually `CardHeader` followed by `CardContent`, but any content
   * is accepted.
   */
  children: React.ReactNode;
  className?: string;
  /**
   * Makes the whole card activatable. Passing this **changes the rendered
   * element from `div` to `button`**, which brings focus and keyboard
   * activation with it — see the note on the component.
   */
  onClick?: () => void;
}

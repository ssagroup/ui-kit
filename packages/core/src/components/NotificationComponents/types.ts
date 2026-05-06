export enum NotificationPositions {
  centerTop = 'center-top',
  centerBottom = 'center-bottom',
  leftTop = 'left-top',
  leftBottom = 'left-bottom',
  rightTop = 'right-top',
  rightBottom = 'right-bottom',
}

export enum NotificationSizes {
  small = 'small',
  large = 'large',
}

export interface SharedProps {
  size?: NotificationSizes;
  cancelText?: string;
  submitText?: string;
}

export interface DynamicProps extends SharedProps {
  title?: string;
  description?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

export interface GlobalSharedProps extends SharedProps {
  animationDuration?: number;
  withShadow?: boolean;
  withBorder?: boolean;
  containerSelector?: string;
  position?: NotificationPositions;
  /**
   * Maximum number of notifications visible at once.
   * When a new notification arrives and the stack is already at the limit,
   * the oldest one is removed to make room — top positions drop from the
   * bottom of the stack, bottom positions drop from the top.
   * No limit when omitted.
   */
  maxAmount?: number;
}

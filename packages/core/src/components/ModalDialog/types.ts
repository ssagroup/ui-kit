/**
 * Props for the ModalDialog presentational component.
 *
 * Used by ModalContent when rendering the dialog. open controls visibility;
 * noBackground removes the overlay; aria-label is required for accessibility.
 *
 * @example
 * ```tsx
 * <ModalDialog open aria-label="Confirm action">
 *   <p>Are you sure?</p>
 * </ModalDialog>
 * ```
 */
export interface ModalDialogProps {
  /** Whether the dialog is visible. When false, content is hidden (display: none). */
  open?: boolean;
  /**
   * Whether the dialog is visible.
   *
   * @deprecated Use `open` instead — `isOpen` is removed in the next major
   * release.
   */
  isOpen?: boolean;
  /** When true, the overlay is transparent (no dimmed background). */
  noBackground?: boolean;
  /** Accessible name for the dialog (required for screen readers). */
  'aria-label'?: string;
  /** Dialog body content. */
  children?: React.ReactNode;
  /** Optional CSS class for the inner dialog element. */
  className?: string;
}

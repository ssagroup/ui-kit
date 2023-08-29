export interface ModalDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  noBackground?: boolean;
  'aria-label'?: string;
  children?: React.ReactNode;
}

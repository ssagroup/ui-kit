export type ModalContextProps = [boolean, (isOpen: boolean) => void];

export interface ModalProps {
  'aria-label'?: string;
  noBackground?: boolean;
  isOpen?: boolean;
  children?: React.ReactNode;
}

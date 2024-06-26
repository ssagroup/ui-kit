import { CommonProps } from '@global-types/emotion';

export interface FormHelperTextProps extends CommonProps {
  children: React.ReactNode;
  role?: string;
  status?: string;
  disabled?: boolean;
}

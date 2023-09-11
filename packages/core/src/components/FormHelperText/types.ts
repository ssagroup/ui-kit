import { CommonProps } from '@global-types/emotion';

export interface IFormHelperText extends CommonProps {
  children: React.ReactNode;
  role?: string;
  status?: string;
  disabled?: boolean;
}

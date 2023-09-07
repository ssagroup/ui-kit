import { CommonProps } from '../..';

export interface IFormHelperText extends CommonProps {
  children: React.ReactNode;
  role?: string;
  status?: string;
  disabled?: boolean;
}

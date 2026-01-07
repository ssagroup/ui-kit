import { ReactNode } from 'react';

export interface UserProfileProps {
  name: string;
  email: string;
  trigger: string | React.JSX.Element;
  onClick: () => void;
  logOutText?: string;
  className?: string;
  additionalInfo?: ReactNode[];
  customContent?: ReactNode;
}

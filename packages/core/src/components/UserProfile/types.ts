import React from 'react';

export interface UserProfileProps {
  name: string;
  email: string;
  trigger: string | JSX.Element;
  onClick: () => void;
  logOutText?: string;
  className?: string;
  additionalInfo?: React.ReactNode[];
  customContent?: React.ReactNode;
}

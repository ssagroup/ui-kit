export interface UserProfileProps {
  name: string;
  email: string;
  trigger: string | JSX.Element;
  onClick: () => void;
  logOutText?: string;
  className?: string;
}

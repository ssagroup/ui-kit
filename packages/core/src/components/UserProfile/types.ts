export interface UserProfileProps {
  name: string;
  email: string;
  trigger: string | React.JSX.Element;
  onClick: () => void;
  logOutText?: string;
  className?: string;
}

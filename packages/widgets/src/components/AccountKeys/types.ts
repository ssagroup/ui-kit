export interface AccountKeysProps {
  title: string | JSX.Element;
  apiKey: string;
  secretKey: string;
  onDelete: () => void;
  onVisibilityChange: (e: boolean) => void;
  isDisabled?: boolean;
}

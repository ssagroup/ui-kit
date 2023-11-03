export interface ExchangeAccountKeysProps {
  title: string | JSX.Element;
  apiKey: string;
  secretKey: string;
  onDelete: () => void;
  onVisibilityChange: () => void;
  isDisabled?: boolean;
}

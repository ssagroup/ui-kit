export interface ExchangeAccountKeysProps {
  title: string | JSX.Element;
  apiKey: string;
  secretKey: string;
  onDelete: () => void;
  onVisible: () => void;
  isLoading?: boolean;
}

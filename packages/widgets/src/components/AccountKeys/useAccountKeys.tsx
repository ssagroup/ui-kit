import { useUncontrolled } from '@ssa-ui-kit/hooks';

export type UseAccountKeysOptions = {
  title?: string | React.JSX.Element;
  apiKey: string;
  secretKey: string;
  placeholder?: string | React.JSX.Element;
  visible?: boolean;
  defaultVisible?: boolean;
  onDelete?: () => void;
  onVisibilityChange?: (e: boolean) => void;
  isDisabled?: boolean;
};

export const useAccountKeys = ({
  title,
  apiKey,
  secretKey,
  placeholder: controlledPlaceholder,
  isDisabled,
  visible,
  defaultVisible,
  onDelete,
  onVisibilityChange,
}: UseAccountKeysOptions) => {
  const [_visible, _setVisible] = useUncontrolled({
    value: visible,
    defaultValue: defaultVisible,
    finalValue: false,
  });

  const _placeholder = controlledPlaceholder || <span>******</span>;

  const setVisible = (value: boolean) => {
    _setVisible(value);
    onVisibilityChange?.(value);
  };

  const toggleVisible = () => {
    setVisible(!_visible);
  };

  return {
    title,
    apiKey,
    secretKey,
    placeholder: _placeholder,
    visible: _visible,
    isDisabled,
    onDelete,
    setVisible,
    toggleVisible,
  };
};

export type UseAccountKeysStore = ReturnType<typeof useAccountKeys>;

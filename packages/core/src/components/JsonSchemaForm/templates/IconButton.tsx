import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from '@rjsf/utils';

import Button from '@components/Button';
import { ButtonProps } from '@components/Button/types';
import Icon from '@components/Icon';

export const IconButton = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: IconButtonProps<T, S, F> & Omit<ButtonProps, 'onClick'>,
) => {
  const { iconType = 'button', icon, onClick, ...otherProps } = props;
  return (
    <Button
      onClick={onClick}
      type={iconType as ButtonProps['type']}
      startIcon={icon}
      {...otherProps}
    />
  );
};

export const AddButton = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: IconButtonProps<T, S, F>,
) => {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.AddItemButton)}
      {...props}
      variant="tertiary"
      icon={<Icon name="plus" size={16} />}
    />
  );
};

export const RemoveButton = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: IconButtonProps<T, S, F>,
) => {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.RemoveButton)}
      {...props}
      variant="tertiary"
      icon={<Icon name="cross" size={14} />}
    />
  );
};

export const CopyButton = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: IconButtonProps<T, S, F>,
) => {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.CopyButton)}
      {...props}
      variant="tertiary"
      icon={<Icon name="copy" size={16} />}
    />
  );
};

export const MoveDownButton = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: IconButtonProps<T, S, F>,
) => {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.MoveDownButton)}
      {...props}
      variant="tertiary"
      icon={<Icon name="arrow-down" size={16} />}
    />
  );
};

export const MoveUpButton = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: IconButtonProps<T, S, F>,
) => {
  const {
    registry: { translateString },
  } = props;
  return (
    <IconButton
      title={translateString(TranslatableString.MoveUpButton)}
      {...props}
      variant="tertiary"
      icon={<Icon name="arrow-up" size={16} />}
    />
  );
};

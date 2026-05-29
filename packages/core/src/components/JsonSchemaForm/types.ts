import { AvatarSizes } from '@components/Avatar/types';

export type SelectOptionSchemaExtension = {
  avatar?: string;
};

export type SelectWidgetUiOptions = {
  typeaheadAvatarSize?: AvatarSizes;
  /** Shows a border around avatars in the typeahead list. @default false */
  typeaheadAvatarBorder?: boolean;
};

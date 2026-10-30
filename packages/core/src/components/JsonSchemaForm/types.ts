import { AvatarSizes } from '@components/Avatar/types';

/** Extra keys allowed on a `oneOf` option for the select widget. */
export type SelectOptionSchemaExtension = {
  /** Image URL shown next to the option in the Typeahead */
  avatar?: string;
};

/** Kit-specific `ui:options` for the select widget. */
export type SelectWidgetUiOptions = {
  /** Avatar size for options that have an `avatar`. @default AvatarSizes.small */
  typeaheadAvatarSize?: AvatarSizes;
  /** Shows a border around avatars in the typeahead list. @default false */
  typeaheadAvatarBorder?: boolean;
};

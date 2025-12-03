import { avatar01 } from './avatar01';
import { avatar02 } from './avatar02';
import { avatar03 } from './avatar03';
import { avatar04 } from './avatar04';
import { avatar05 } from './avatar05';

export { avatar01, avatar02, avatar03, avatar04, avatar05 };

const storybookAvatars = [
  avatar01,
  avatar02,
  avatar03,
  avatar04,
  avatar05,
] as const;

export type StorybookAvatarId = (typeof storybookAvatars)[number];

export const getStorybookAvatar = (index: number): string =>
  storybookAvatars[index % storybookAvatars.length];

export const storybookAvatarList = [...storybookAvatars];

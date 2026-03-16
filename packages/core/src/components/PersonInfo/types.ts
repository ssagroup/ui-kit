import { ReactNode } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import { IconProps } from '../Icon/types';
import { getLinkAttributes } from './helpers';

/**
 * Style keys that can be overridden via PersonInfoProps.styles.
 * All PersonInfo sub-components accept optional css from this map.
 */
type PersonInfoStyleKeys =
  | 'title'
  | 'avatarName'
  | 'counter'
  | 'attributes'
  | 'badge'
  | 'badgeItem'
  | 'value'
  | 'description';

export type PersonInfoStyles = Partial<
  Record<PersonInfoStyleKeys, Interpolation<Theme>>
>;

/**
 * Single user entry for the counter tooltip list.
 * Used by PersonInfoCounter; avatar is image URL, link opens in same/new tab per openLinkInNewTab.
 */
export interface PersonInfoCounterTooltipUser {
  id: string | number;
  name: string;
  avatar: string;
  link?: string;
  openLinkInNewTab?: boolean;
}

/**
 * Tooltip payload for the “+N” counter next to the value.
 * users array is rendered as a list inside the tooltip (e.g. via ImageItem).
 */
export interface PersonInfoCounterTooltip {
  users: PersonInfoCounterTooltipUser[];
}

export type PersonInfoLinkAttributes = ReturnType<typeof getLinkAttributes>;

/**
 * Props for the value sub-component (avatar row value, optionally a link).
 * linkAttributes come from helpers.getLinkAttributes(link, openLinkInNewTab).
 */
export interface PersonInfoValueProps {
  value: string;
  css?: Interpolation<Theme>;
  linkAttributes?: PersonInfoLinkAttributes;
}

/**
 * Props for the PersonInfo component.
 * Uses theme.colors only (no theme.palette). See PersonInfo.tsx JSDoc for structure and examples.
 *
 * @example
 * ```tsx
 * <PersonInfo title="Assignee" value="John Doe" />
 * ```
 *
 * @example
 * ```tsx
 * <PersonInfo title="Owner" value="Jane" avatar="/j.jpg" link="/users/jane" />
 * ```
 *
 * @example
 * ```tsx
 * <PersonInfo title="Status" value="3" counterTooltip={{ users: [...] }} />
 * ```
 */
export interface PersonInfoProps extends CommonProps {
  /** Main label (required). */
  title: string;
  /** Icon name or custom ReactNode before the title. */
  icon?: IconProps['name'] | ReactNode;
  /** Primary value; with link becomes a link. */
  value?: string;
  /** Badge(s): single node or array of string | ReactNode. Strings use DEFAULT_BADGE_COLORS. */
  badges?: ReactNode | (string | ReactNode)[];
  /** Avatar image URL, shown next to value. */
  avatar?: string;
  /** “+N” counter with tooltip listing users. */
  counterTooltip?: PersonInfoCounterTooltip;
  /** List of strings or ReactNodes below the row. */
  attributes?: (string | ReactNode)[];
  /** Extra description text. */
  description?: string;
  /** Optional style overrides per PersonInfoStyleKeys. */
  styles?: PersonInfoStyles;
  /** If set, value (or avatar+value) renders as a link. */
  link?: string;
  /** When link is set, open in new tab and use rel="noreferrer". */
  openLinkInNewTab?: boolean;
}

/**
 * Props for PersonInfoAvatar (value + optional avatar, optional link).
 * Used internally by PersonInfo.
 */
export interface PersonInfoAvatarProps {
  avatar?: string;
  value?: string;
  styles?: PersonInfoStyles;
  link?: string;
  openLinkInNewTab?: boolean;
}

/**
 * Props for PersonInfoCounter (“+N” with tooltip).
 * css overrides styles.counter.
 */
export interface PersonInfoCounterProps {
  counterTooltip?: PersonInfoCounterTooltip;
  css?: PersonInfoStyles['counter'];
}

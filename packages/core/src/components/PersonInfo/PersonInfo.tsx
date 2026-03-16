import React from 'react';
import { PersonInfoProps } from './types';
import { PersonInfoIcon } from './PersonInfoIcon';
import { PersonInfoAvatar } from './PersonInfoAvatar';
import { PersonInfoBadges } from './PersonInfoBadges';
import { PersonInfoCounter } from './PersonInfoCounter';

import * as S from './styles';

/**
 * PersonInfo - Compact row for displaying a person or entity with title, value, and optional metadata.
 *
 * Uses `theme.colors` only (e.g. greyDropdownFocused, greyDarker, blue for link hover). Does not use
 * `theme.palette`. Link and value hover use theme.colors.blue. Badge colors come from BADGE_COLORS(theme).
 *
 * ### Structure
 * - Optional leading icon (name or custom ReactNode)
 * - Title (required) and a row with: optional avatar + value (optionally a link), optional counter with tooltip
 * - Optional badges (Badge components or strings)
 * - Optional attributes list (strings or ReactNodes)
 * - Optional description text
 *
 * ### Key props
 * - `title` (required) — main label
 * - `value` — primary value; use with `link` / `openLinkInNewTab` for a clickable value
 * - `icon` — Icon name or custom node before the title
 * - `avatar` — image URL; shown next to value
 * - `badges` — ReactNode or array of ReactNode/string; rendered as badges below the row
 * - `counterTooltip` — { users: [{ id, name, avatar, link?, openLinkInNewTab? }] } for a count + tooltip
 * - `attributes` — array of strings or ReactNodes below the row
 * - `description` — extra text block
 * - `styles` — optional overrides for title, avatarName, counter, attributes, badge, badgeItem, value, description
 *
 * @category Components
 * @subcategory Display
 *
 * @example
 * ```tsx
 * <PersonInfo title="Assignee" value="John Doe" />
 * ```
 *
 * @example
 * ```tsx
 * <PersonInfo
 *   title="Owner"
 *   value="Jane Smith"
 *   icon="user"
 *   avatar="/avatar.jpg"
 *   link="/users/jane"
 *   openLinkInNewTab={false}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <PersonInfo
 *   title="Status"
 *   value="In progress"
 *   badges={[<Badge key="1">Active</Badge>]}
 *   attributes={['Due: Jan 15', 'Priority: High']}
 *   description="Additional context text."
 * />
 * ```
 *
 * @example
 * ```tsx
 * <PersonInfo
 *   title="Participants"
 *   value="3"
 *   counterTooltip={{
 *     users: [
 *       { id: 1, name: 'Alice', avatar: '/a.jpg', link: '/users/1' },
 *       { id: 2, name: 'Bob', avatar: '/b.jpg' },
 *     ],
 *   }}
 * />
 * ```
 *
 * @see {@link Avatar} - Often used for avatar prop or inside counter tooltip
 * @see {@link Icon} - Common choice for icon prop
 * @see {@link Badge} - Used when badges prop contains Badge components
 *
 * @accessibility
 * - Semantic structure (heading-like title, list of attributes)
 * - Links support openLinkInNewTab and get appropriate attributes
 * - Counter tooltip is focusable and keyboard-accessible via Tooltip
 */
export const PersonInfo = React.forwardRef<HTMLDivElement, PersonInfoProps>(
  function PersonInfo(
    {
      title,
      icon,
      value,
      badges,
      avatar,
      counterTooltip,
      attributes,
      description,
      styles,
      className,
      link,
      openLinkInNewTab,
      ...props
    },
    ref,
  ) {
    return (
      <S.PersonInfoBase ref={ref} className={className} {...props}>
        <S.PersonInfoHeader>
          {icon && <PersonInfoIcon icon={icon} />}
          <S.TitleWrapper>
            <S.Title css={styles?.title}>{title}</S.Title>
            <S.Row>
              <PersonInfoAvatar
                avatar={avatar}
                value={value}
                styles={styles}
                link={link}
                openLinkInNewTab={openLinkInNewTab}
              />
              {counterTooltip && (
                <PersonInfoCounter
                  counterTooltip={counterTooltip}
                  css={styles?.counter}
                />
              )}
            </S.Row>
            {badges && <PersonInfoBadges badges={badges} styles={styles} />}
            {attributes && attributes.length > 0 && (
              <S.AttributesList>
                {attributes.map((attr, index) => {
                  if (typeof attr === 'string') {
                    return (
                      <S.TextBase key={index} css={styles?.attributes}>
                        {attr}
                      </S.TextBase>
                    );
                  }
                  return <React.Fragment key={index}>{attr}</React.Fragment>;
                })}
              </S.AttributesList>
            )}
            {description && (
              <S.TextBase css={styles?.description}>{description}</S.TextBase>
            )}
          </S.TitleWrapper>
        </S.PersonInfoHeader>
      </S.PersonInfoBase>
    );
  },
);

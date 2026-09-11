import * as S from '../styles';
import { CollapsibleNavBarHeader } from '../types';

/**
 * The panel's header: a headline, and optionally a picture and a person.
 *
 * Covers the three variants in the design — headline only, headline with a
 * large picture above the name, and headline with a small avatar inline
 * beside it — from one shape, by leaving out whichever parts aren't given.
 * The whole block is hidden in the collapsed rail, where there is no room
 * for it.
 */
/**
 * Whether a header has anything to show. Shared with `CollapsibleNavBar`,
 * which drops the logo's top margin off the menu only when the header is
 * actually rendered — `header={{}}`, or one whose fields are all conditionally
 * undefined, must leave the spacing alone.
 */
export const hasHeaderContent = (header?: CollapsibleNavBarHeader) =>
  !!header && !!(header.title || header.name || header.avatar || header.image);

export const NavHeader = ({
  title,
  name,
  avatar,
  image,
}: CollapsibleNavBarHeader) => {
  if (!hasHeaderContent({ title, name, avatar, image })) {
    return null;
  }

  return (
    <div css={S.Header} className="collapsible-nav-header">
      {title && (
        <p css={S.HeaderTitle} className="collapsible-nav-header__title">
          {title}
        </p>
      )}

      {(image || name || avatar) && (
        <div css={S.HeaderPerson}>
          {image && (
            <div css={S.HeaderImage} className="collapsible-nav-header__image">
              {image}
            </div>
          )}

          {(name || avatar) && (
            <div css={S.HeaderName} className="collapsible-nav-header__name">
              {avatar}
              {name && <span>{name}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

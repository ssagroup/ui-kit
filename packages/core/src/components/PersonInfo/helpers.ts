/**
 * Returns link props for PersonInfo value/avatar when link is set.
 * For AI: used by PersonInfoAvatar and PersonInfoValue. Returns { as: 'a', href, target?, rel? }
 * when link is truthy; otherwise {}. openLinkInNewTab sets target="_blank" and rel="noreferrer".
 */
export const getLinkAttributes = (
  link?: string,
  openLinkInNewTab?: boolean,
) => {
  const isLink = Boolean(link);
  return isLink
    ? {
        as: 'a' as const,
        href: link,
        target: openLinkInNewTab ? '_blank' : undefined,
        rel: openLinkInNewTab ? 'noreferrer' : undefined,
      }
    : {};
};

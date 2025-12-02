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

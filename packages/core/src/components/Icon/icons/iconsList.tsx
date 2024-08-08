// This file is also imported into the Button/Button.stories.tsx
// and into the ./index.tsx
// We need such a file to let webpack create a chunk for
// the <Icon /> component which uses React.lazy().
// If we import <Icon /> directly into the Button/Button.stories.tsx,
// webpack will consider that as an objection to the chunk creation.
//
// Make sure the order in this array corresponds to the one in the
// ./index.tsx
import * as Icons from './all';

export const iconsList = (Object.keys(Icons) as Array<keyof typeof Icons>).map(
  (keyName) => Icons[keyName].ICON_NAME,
);

import { css } from '@emotion/react';
import userEvent from '@testing-library/user-event';
import { links } from './stories/mockData';
import { MemoryRouterDecorator } from './stories/decorators';

import { LinksTabBar } from './index';

jest.mock('d3-color', () => ({}));

function setup(Component: React.ElementType) {
  return {
    user: userEvent.setup(),
    ...render(MemoryRouterDecorator(Component)),
  };
}

describe('Widget: LinksTabBar', () => {
  it('Renders all passed in links and reacts to clicks', async () => {
    const { user, getByRole, getByText } = setup(() => (
      <LinksTabBar links={links} />
    ));

    getByText(`Current route: ${links[0].children}`);

    for (const link of links) {
      const linkEl = getByRole('link', { name: link.children });
      await user.click(linkEl);
      getByText(`Current route: ${link.children}`);
    }
  });

  it('Renders with custom styles', () => {
    const { getAllByRole } = setup(() => (
      <LinksTabBar
        links={links}
        css={css`
          background-color: magenta;
        `}
      />
    ));
    const linkEl = getAllByRole('link')[0];

    expect(linkEl.parentNode).toHaveStyle(`background-color: magenta`);
  });

  it('Renders with a custom base tag', () => {
    const { getByRole } = setup(() => <LinksTabBar links={links} as="nav" />);
    getByRole('navigation');
  });
});

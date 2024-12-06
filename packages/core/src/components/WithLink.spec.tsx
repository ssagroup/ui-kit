import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { WithLink } from './WithLink';

describe('WithLink', () => {
  it('Renders with link', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route path="/*" element={<WithLink link="/link">Child</WithLink>} />
        </Routes>
      </MemoryRouter>,
    );

    const linkEl = getByRole('link', {
      name: new RegExp('Child', 'i'),
    });

    expect(linkEl).toHaveAttribute('href', '/link');
  });

  it('Renders with child element', () => {
    const { getByTitle } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <WithLink>
                <div title="Child"></div>
              </WithLink>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const child = getByTitle('Child');

    expect(child).toBeInTheDocument();
  });
});

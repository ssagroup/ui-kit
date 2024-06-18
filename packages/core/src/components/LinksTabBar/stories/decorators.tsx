import { MemoryRouter, Route, Routes, Outlet } from 'react-router-dom';
import { links } from './mockData';

export const RoutePlaceholder = ({
  children,
}: {
  children: React.ReactNode;
}) => <div>Current route: {children}</div>;

export const MemoryRouterDecorator = (Component: React.ElementType) => (
  <div style={{ width: '591px', padding: '10px' }}>
    <MemoryRouter initialEntries={[links[0].to]}>
      <Routes>
        <Route
          element={
            <div>
              <Component />
              <div style={{ marginTop: '25px' }}>
                <Outlet />
              </div>
            </div>
          }>
          {links.map((link, index) => (
            <Route
              key={index}
              path={link.to}
              element={<RoutePlaceholder>{link.children}</RoutePlaceholder>}
            />
          ))}
        </Route>
      </Routes>
    </MemoryRouter>
  </div>
);

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CollapsibleNavBar } from '../CollapsibleNavBar';

export const StoryComponent = ({
  items,
}: Parameters<typeof CollapsibleNavBar>[0]) => (
  <MemoryRouter>
    <Routes>
      <Route
        path="/*"
        element={
          <div style={{ height: '100vh', position: 'relative' }}>
            <CollapsibleNavBar items={items} />
          </div>
        }
      />
    </Routes>
  </MemoryRouter>
);

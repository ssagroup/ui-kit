import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CollapsibleNavBar } from '../CollapsibleNavBar';
import { Logo } from './Logo';

export const StoryComponent = ({
  items,
}: Parameters<typeof CollapsibleNavBar>[0]) => (
  <MemoryRouter>
    <Routes>
      <Route
        path="/*"
        element={
          <div style={{ height: '100vh', position: 'relative' }}>
            <CollapsibleNavBar
              items={items}
              renderLogo={<Logo />}
              onChange={(isChecked) => {
                console.log('>>>checked ', isChecked);
              }}
            />
          </div>
        }
      />
    </Routes>
  </MemoryRouter>
);

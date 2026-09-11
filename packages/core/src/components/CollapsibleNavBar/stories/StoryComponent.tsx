import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CollapsibleNavBar } from '../CollapsibleNavBar';
import { Logo } from './Logo';

export const StoryComponent = ({
  renderLogo = <Logo />,
  ...props
}: Parameters<typeof CollapsibleNavBar>[0]) => (
  <MemoryRouter>
    <Routes>
      <Route
        path="/*"
        element={
          <div style={{ height: '100vh', position: 'relative' }}>
            <CollapsibleNavBar
              {...props}
              renderLogo={renderLogo}
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

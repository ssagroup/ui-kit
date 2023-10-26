import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AddNewAccountCard } from './AddNewAccountCard';

describe('AddNewAccountCard', () => {
  it('Renders with onClick and button element', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole } = render(<AddNewAccountCard onclick={mockOnClick} />);

    const buttonEl = getByRole('button', {
      name: new RegExp('Add new account', 'i'),
    });

    await user.click(buttonEl);
    expect(mockOnClick).toBeCalledTimes(1);
  });

  it('Renders with link element', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <div css={{ width: '100%', maxWidth: '500px' }}>
                <AddNewAccountCard link="/link" />
              </div>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const linkEl = getByRole('link', {
      name: new RegExp('Add new account', 'i'),
    });

    expect(linkEl).toHaveAttribute('href', '/link');
  });
});

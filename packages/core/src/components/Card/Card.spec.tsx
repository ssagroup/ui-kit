import { userEvent } from 'storybook/test';
import { screen } from '../../../customTest';

import Icon from '@components/Icon';
import CardContent from '@components/CardContent';
import CardHeader from '@components/CardHeader';

import Card from './index';

describe('Card', () => {
  it('Render Card', () => {
    render(
      <div>
        <Card>
          <CardHeader>
            <h2>Card</h2>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              eleifend, dui in commodo porttitor, neque metus lobortis sem, at
              suscipit arcu ligula non enim.
            </p>
          </CardContent>
        </Card>
      </div>,
    );

    const cardHeader = screen.getByText(/card/i).closest('div');

    expect(cardHeader).toHaveStyle('background: inherit');
  });

  it('Render Card with icon header', async () => {
    render(
      <div>
        <Card>
          <CardHeader icon={<Icon name="calendar" size={57} />}>
            <h2>Card</h2>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              eleifend, dui in commodo porttitor, neque metus lobortis sem, at
              suscipit arcu ligula non enim.
            </p>
          </CardContent>
        </Card>
      </div>,
    );

    const icon = await screen.findByTitle(/calendar/i);

    expect(icon).toBeInTheDocument();
  });

  it('Render Card with transparent header', () => {
    render(
      <div>
        <CardHeader transparent>
          <h2>Card</h2>
        </CardHeader>
        <Card>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              eleifend, dui in commodo porttitor, neque metus lobortis sem, at
              suscipit arcu ligula non enim.
            </p>
          </CardContent>
        </Card>
      </div>,
    );

    const cardHeader = screen.getByText(/card/i).closest('div');

    expect(cardHeader).toHaveStyle('background: transparent');
  });

  it('Handles click on a Card', async () => {
    const onClick = jest.fn();
    render(
      <Card onClick={onClick}>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>,
    );

    const cardBtnEl = screen.getByRole('button', { name: 'Header Content' });
    await userEvent.click(cardBtnEl);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

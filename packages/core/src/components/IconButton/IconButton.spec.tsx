import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders button with aria-label and type="button"', () => {
    const { getByRole } = render(
      <IconButton icon="edit" aria-label="Edit" onClick={() => {}} />,
    );
    const button = getByRole('button', { name: 'Edit' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies default and transparent styles', () => {
    const { getByRole } = render(
      <IconButton icon="edit" aria-label="Edit" onClick={() => {}} />,
    );
    const button = getByRole('button');
    expect(button).toHaveStyleRule('border-radius', '8px');
  });

  it('renders without an onClick handler', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<IconButton icon="edit" aria-label="Edit" />);

    const button = getByRole('button', { name: 'Edit' });
    await user.click(button);

    expect(button).toBeInTheDocument();
  });

  it('honours the type prop so it can submit a form', () => {
    const onSubmit = jest.fn((event: React.FormEvent) =>
      event.preventDefault(),
    );
    const { getByRole } = render(
      <form onSubmit={onSubmit}>
        <IconButton icon="edit" aria-label="Save" type="submit" />
      </form>,
    );

    expect(getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'submit',
    );
  });

  it.each([
    ['small', 36, 20],
    ['medium', 46, 24],
    ['large', 54, 28],
  ] as const)('sizes the box and icon for %s', (size, box, icon) => {
    const { getByRole, container } = render(
      <IconButton icon="edit" aria-label="Edit" size={size} />,
    );

    const button = getByRole('button');
    expect(button).toHaveStyleRule('width', `${box}px`);
    expect(button).toHaveStyleRule('height', `${box}px`);
    expect(container.querySelector('svg')).toHaveAttribute(
      'width',
      `${icon}px`,
    );
  });

  it('defaults to the small size', () => {
    const { getByRole } = render(<IconButton icon="edit" aria-label="Edit" />);

    expect(getByRole('button')).toHaveStyleRule('width', '36px');
  });
});

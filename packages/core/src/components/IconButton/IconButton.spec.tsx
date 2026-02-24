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
});

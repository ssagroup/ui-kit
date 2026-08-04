import { css } from '@emotion/react';

import { Link } from './Link';

describe('Link', () => {
  it('renders an anchor with its href and content', () => {
    const { getByRole } = render(<Link href="/settings">Settings</Link>);

    const link = getByRole('link', { name: 'Settings' });
    expect(link).toHaveAttribute('href', '/settings');
  });

  it('defaults rel to noopener noreferrer for target="_blank"', () => {
    const { getByRole } = render(
      <Link href="https://example.com" target="_blank">
        Docs
      </Link>,
    );

    const link = getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps an explicit rel', () => {
    const { getByRole } = render(
      <Link href="https://example.com" target="_blank" rel="nofollow">
        Docs
      </Link>,
    );

    expect(getByRole('link')).toHaveAttribute('rel', 'nofollow');
  });

  it('adds no rel when the link opens in the same tab', () => {
    const { getByRole } = render(<Link href="/settings">Settings</Link>);

    expect(getByRole('link')).not.toHaveAttribute('rel');
  });

  it('forwards className, css and other anchor attributes', () => {
    const { getByRole } = render(
      <Link
        href="/file.pdf"
        className="custom"
        download
        onClick={() => {}}
        css={css({ color: 'rgb(255, 0, 0)' })}>
        Download
      </Link>,
    );

    const link = getByRole('link');
    expect(link).toHaveClass('custom');
    expect(link).toHaveAttribute('download');
    expect(link).toHaveStyleRule('color', 'rgb(255, 0, 0)');
  });
});

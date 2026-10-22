import { MemoryRouter } from 'react-router-dom';

import { Footer } from './Footer';
import { FooterColumn, FooterLink, FooterProps } from './types';
import { screen, within } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

const links: FooterLink[] = [
  { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
  { id: 'terms', label: 'Terms & Conditions', href: 'https://example.com/t' },
];

const columns: FooterColumn[] = [
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', label: 'About us', path: '/about' },
      { id: 'careers', label: 'Careers' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    links: [{ id: 'help', label: 'Help', path: '/help' }],
  },
];

const renderFooter = (props: Partial<FooterProps> = {}) =>
  render(
    <MemoryRouter>
      <Footer copyright="Acme © 2026" links={links} {...props} />
    </MemoryRouter>,
  );

describe('Footer', () => {
  it('renders the copyright and legal links in a contentinfo landmark', () => {
    renderFooter();

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText('Acme © 2026')).toBeInTheDocument();
    const legal = within(footer).getByRole('navigation', { name: 'Legal' });
    expect(
      within(legal).getByRole('link', { name: 'Privacy Policy' }),
    ).toHaveAttribute('href', '/privacy');
    expect(
      within(legal).getByRole('link', { name: 'Terms & Conditions' }),
    ).toHaveAttribute('href', 'https://example.com/t');
  });

  it('names the legal navigation from linksLabel', () => {
    renderFooter({ linksLabel: 'Policies' });

    expect(
      screen.getByRole('navigation', { name: 'Policies' }),
    ).toBeInTheDocument();
  });

  it('renders no legal navigation without links', () => {
    renderFooter({ links: [] });

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('works without a router when no link has a path', () => {
    render(
      <Footer
        copyright="Acme"
        links={[{ id: 'site', label: 'Site', href: 'https://example.com' }]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Site' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('renders each column as a navigation named by its title', () => {
    renderFooter({ columns });

    const company = screen.getByRole('navigation', { name: 'Company' });
    expect(
      within(company).getByRole('link', { name: 'About us' }),
    ).toHaveAttribute('href', '/about');
    // No path or href: plain text, not a link.
    expect(within(company).getByText('Careers')).toBeInTheDocument();
    expect(
      within(company).queryByRole('link', { name: 'Careers' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Support' }),
    ).toBeInTheDocument();
  });

  it('renders the logo and description', () => {
    renderFooter({
      logo: <img src="/logo.svg" alt="Acme" />,
      description: 'Software for teams',
    });

    expect(screen.getByRole('img', { name: 'Acme' })).toBeInTheDocument();
    expect(screen.getByText('Software for teams')).toBeInTheDocument();
  });

  it('gives each size its own bottom bar, and the extended footer medium', () => {
    const classOf = (props: Partial<FooterProps>) => {
      const { unmount } = renderFooter(props);
      const className =
        screen.getByText('Acme © 2026').parentElement!.className;
      unmount();
      return className;
    };

    const small = classOf({ size: 'small' });
    const medium = classOf({ size: 'medium' });
    const large = classOf({ size: 'large' });
    expect(new Set([small, medium, large]).size).toBe(3);
    expect(classOf({ size: 'large', columns })).toBe(medium);
  });

  it('has no axe violations when extended', async () => {
    const { container } = renderFooter({
      logo: <img src="/logo.svg" alt="Acme" />,
      description: 'Software for teams',
      columns,
    });

    await checkA11y(container);
  });

  it('has no axe violations in the dark theme', async () => {
    const { container } = renderFooter({ theme: 'dark', size: 'large' });

    await checkA11y(container);
  });
});

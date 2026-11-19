import { Divider } from './Divider';
import { screen } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

const lines = (container: Element) =>
  Array.from(container.querySelectorAll('[data-divider-line] line'));

describe('Divider', () => {
  it('renders a horizontal separator with a single line by default', () => {
    const { container } = render(<Divider />);
    const separator = screen.getByRole('separator');

    expect(separator).not.toHaveAttribute('aria-orientation');
    expect(separator.style.width).toBe('100%');
    expect(separator.style.paddingBlock).toBe('8px');
    expect(lines(container)).toHaveLength(1);
    expect(lines(container)[0]).toHaveAttribute('stroke-width', '1');
    expect(lines(container)[0]).not.toHaveAttribute('stroke-dasharray');
  });

  it('marks a vertical divider and stretches it without a length', () => {
    const { rerender } = render(<Divider orientation="vertical" />);
    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator.style.alignSelf).toBe('stretch');
    expect(separator.style.minHeight).toBe('100%');
    expect(separator.style.paddingInline).toBe('8px');

    rerender(<Divider orientation="vertical" length={24} />);
    expect(separator.style.height).toBe('24px');
    expect(separator.style.alignSelf).toBe('center');
    expect(separator.style.minHeight).toBe('');
  });

  it.each([
    ['small', 1],
    ['medium', 2],
    ['large', 3],
  ] as const)('draws a %s line %ipx thick', (size, stroke) => {
    const { container } = render(<Divider size={size} />);
    expect(lines(container)[0]).toHaveAttribute('stroke-width', `${stroke}`);
  });

  it.each([
    ['dashed', 'small', '4 4'],
    ['dashed', 'medium', '4 6'],
    ['dashed', 'large', '4 8'],
    ['dotted', 'small', '0 4'],
    ['dotted', 'medium', '0 6'],
    ['dotted', 'large', '0 8'],
  ] as const)(
    'spaces a %s %s line as in the design',
    (variant, size, dashArray) => {
      const { container } = render(<Divider variant={variant} size={size} />);
      const [line] = lines(container);
      expect(line).toHaveAttribute('stroke-dasharray', dashArray);
      expect(line).toHaveAttribute('stroke-linecap', 'round');
    },
  );

  it('splits the line around text and names the separator with it', () => {
    const { container } = render(<Divider>Or continue with</Divider>);

    expect(
      screen.getByRole('separator', { name: 'Or continue with' }),
    ).toBeInTheDocument();
    expect(lines(container)).toHaveLength(2);
    expect(screen.getByText('Or continue with')).toHaveAttribute(
      'data-divider-content',
    );
  });

  it('prefers an explicit aria-label', () => {
    render(<Divider aria-label="Section break">Or</Divider>);
    expect(
      screen.getByRole('separator', { name: 'Section break' }),
    ).toBeInTheDocument();
  });

  it('keeps the design text and icon colours with the presets', () => {
    const { container } = render(
      <>
        <Divider>Text</Divider>
        <Divider color="strong" icon="star" />
      </>,
    );
    const [subtleLine, , strongLine] = lines(container);

    expect(subtleLine).toHaveAttribute('stroke', 'rgba(210, 212, 219, 1)');
    expect(strongLine).toHaveAttribute('stroke', 'rgba(85, 87, 90, 0.64)');
    expect(screen.getByText('Text').style.color).toBe('rgb(43, 45, 49)');
  });

  it('paints line, text and icon with a custom colour', () => {
    const { container } = render(
      <>
        <Divider color="blue">Text</Divider>
        <Divider color="#e5484d" icon="star" />
      </>,
    );
    const [blueLine, , redLine] = lines(container);

    expect(blueLine).toHaveAttribute('stroke', 'rgba(65, 120, 225, 1)');
    expect(screen.getByText('Text').style.color).toBe('rgb(65, 120, 225)');
    expect(redLine).toHaveAttribute('stroke', '#e5484d');

    const content = container.querySelectorAll('[data-divider-content]')[1];
    expect(content.querySelector('svg')).toBeInTheDocument();
    expect(content.innerHTML.toLowerCase()).toContain('#e5484d');
  });

  it('renders a node as is, so it can keep its own colour', () => {
    render(
      <Divider color="blue">
        <span style={{ color: 'green' }}>Node</span>
      </Divider>,
    );
    const node = screen.getByText('Node');

    expect(node.style.color).toBe('green');
    expect(node.parentElement?.style.color).toBe('rgb(65, 120, 225)');
    // A node does not name the separator by itself.
    expect(screen.getByRole('separator')).not.toHaveAttribute('aria-label');
  });

  it('keeps a node outside the separator, so an interactive one stays reachable', () => {
    const { container } = render(
      <Divider orientation="vertical" aria-label="More results">
        <button type="button">Load more</button>
      </Divider>,
    );
    const separator = screen.getByRole('separator', { name: 'More results' });
    const button = screen.getByRole('button', { name: 'Load more' });

    // The role sits on the first line piece, not on the wrapper.
    expect(separator).toHaveAttribute('data-divider-line');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).not.toContainElement(button);
    expect(container.firstElementChild).not.toHaveAttribute('role');
    expect(screen.getAllByRole('separator')).toHaveLength(1);
  });

  it.each([
    ['an empty string', ''],
    ['false', false],
    ['null', null],
  ])('treats %s as no content', (_, children) => {
    const { container } = render(<Divider>{children}</Divider>);
    const separator = screen.getByRole('separator');

    expect(lines(container)).toHaveLength(1);
    expect(container.querySelector('[data-divider-content]')).toBeNull();
    expect(separator).not.toHaveAttribute('aria-label');
    expect(separator).toBe(container.firstElementChild);
  });

  it('names a number content and keeps 0', () => {
    const { container } = render(<Divider>{0}</Divider>);
    expect(screen.getByRole('separator', { name: '0' })).toBeInTheDocument();
    expect(lines(container)).toHaveLength(2);
  });

  it('applies length, gap, spacing and font size inline', () => {
    render(
      <Divider length="60%" gap={4} spacing={0} fontSize={20}>
        Text
      </Divider>,
    );
    const separator = screen.getByRole('separator');

    expect(separator.style.width).toBe('60%');
    expect(separator.style.columnGap).toBe('4px');
    expect(parseFloat(separator.style.paddingBlock)).toBe(0);
    expect(screen.getByText('Text').style.fontSize).toBe('20px');
  });

  it('passes className and style to the root', () => {
    render(<Divider className="custom" style={{ marginTop: 4 }} />);
    const separator = screen.getByRole('separator');

    expect(separator).toHaveClass('custom');
    expect(separator.style.marginTop).toBe('4px');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Divider />
        <Divider variant="dashed">Text</Divider>
        <Divider icon="star" aria-label="Favourites" />
        <Divider aria-label="More results">
          <button type="button">Load more</button>
        </Divider>
        <div style={{ display: 'flex', height: 40 }}>
          <Divider orientation="vertical" />
        </div>
      </div>,
    );
    await checkA11y(container);
  });
});

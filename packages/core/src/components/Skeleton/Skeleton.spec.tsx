import { Skeleton } from './Skeleton';
import { SkeletonGroup } from './SkeletonGroup';
import { SkeletonText } from './presets/SkeletonText';
import { SkeletonListItem } from './presets/SkeletonListItem';
import { SkeletonMediaCard } from './presets/SkeletonMediaCard';
import { SkeletonTable } from './presets/SkeletonTable';
import { SkeletonForm } from './presets/SkeletonForm';
import { SkeletonWidgetCard } from './presets/SkeletonWidgetCard';
import { screen } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

const pieces = (container: Element) =>
  Array.from(container.querySelectorAll<HTMLElement>('[data-skeleton]'));

describe('Skeleton', () => {
  it('fills its container by default and is hidden from screen readers', () => {
    const { container } = render(<Skeleton />);
    const [piece] = pieces(container);

    expect(piece).toHaveAttribute('aria-hidden', 'true');
    expect(piece.style.width).toBe('100%');
    expect(piece.style.height).toBe('16px');
    expect(piece.style.borderRadius).toBe('12px');
  });

  it('takes numbers as pixels and strings as CSS lengths', () => {
    const { container } = render(<Skeleton width={120} height="2rem" />);
    const [piece] = pieces(container);

    expect(piece.style.width).toBe('120px');
    expect(piece.style.height).toBe('2rem');
  });

  it('keeps pixel widths and circles fixed in a flex row and lets relative widths shrink', () => {
    const { container } = render(
      <>
        <Skeleton width={80} />
        <Skeleton shape="circle" width="3rem" />
        <Skeleton />
        <Skeleton width="60%" />
      </>,
    );
    const [chip, avatar, line, title] = pieces(container);

    expect(chip.style.flexShrink).toBe('0');
    expect(avatar.style.flexShrink).toBe('0');
    expect(line.style.flexShrink).toBe('1');
    expect(title.style.flexShrink).toBe('1');
  });

  it('renders a 48px circle by default and keeps it round from width alone', () => {
    const { container } = render(
      <>
        <Skeleton shape="circle" />
        <Skeleton shape="circle" width={24} radius={4} />
      </>,
    );
    const [avatar, dot] = pieces(container);

    expect(avatar.style.width).toBe('48px');
    expect(avatar.style.height).toBe('48px');
    expect(avatar.style.borderRadius).toBe('50%');
    expect(dot.style.height).toBe('24px');
    expect(dot.style.borderRadius).toBe('50%');
  });

  it('gives squared bars 4px corners and thin squared lines 2px', () => {
    const { container } = render(
      <>
        <Skeleton corners="squared" height={24} />
        <Skeleton corners="squared" height={12} />
        <Skeleton corners="squared" height={12} radius={6} />
      </>,
    );
    const [bar, line, custom] = pieces(container);

    expect(bar.style.borderRadius).toBe('4px');
    expect(line.style.borderRadius).toBe('2px');
    expect(custom.style.borderRadius).toBe('6px');
  });

  it('sweeps a band for wave and fades for pulse', () => {
    const { container } = render(
      <>
        <Skeleton animation="wave" />
        <Skeleton animation="pulse" />
        <Skeleton animation="none" />
      </>,
    );
    const [wave, pulse, still] = pieces(container);
    const reducedMotionOff = {
      media: '(prefers-reduced-motion: no-preference)',
    };

    expect(wave).toHaveStyleRule('animation', expect.stringMatching(/1600ms/), {
      ...reducedMotionOff,
      target: '::after',
    });
    expect(pulse).toHaveStyleRule(
      'animation',
      expect.stringMatching(/800ms ease-in-out infinite alternate/),
      reducedMotionOff,
    );
    expect(still).not.toHaveStyleRule('animation', expect.anything(), {
      media: '(prefers-reduced-motion: no-preference)',
    });
  });
});

describe('SkeletonGroup', () => {
  it('marks the region busy and announces the label once', () => {
    const { container } = render(
      <SkeletonGroup label="Loading employees">
        <SkeletonText />
        <SkeletonListItem count={2} />
      </SkeletonGroup>,
    );

    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('Loading employees');
    expect(container.querySelectorAll('[aria-busy="true"]')).toHaveLength(1);
  });

  it('keeps the status outside the busy region, where updates are not held back', () => {
    const { container } = render(<SkeletonGroup label="Loading" />);
    const busy = container.querySelector('[aria-busy="true"]');

    expect(busy).not.toContainElement(screen.getByRole('status'));
  });

  it('updates the announced text when the label changes', () => {
    const { rerender } = render(<SkeletonGroup label="Loading people" />);
    rerender(<SkeletonGroup label="Loading teams" />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading teams');
  });

  it('passes animation and corners down, and a piece setting wins', () => {
    const { container } = render(
      <SkeletonGroup animation="pulse" corners="squared">
        <Skeleton height={24} />
        <Skeleton height={24} corners="rounded" animation="none" />
      </SkeletonGroup>,
    );
    const [inherited, own] = pieces(container);

    expect(inherited.style.borderRadius).toBe('4px');
    expect(inherited).toHaveStyleRule('animation', expect.anything(), {
      media: '(prefers-reduced-motion: no-preference)',
    });
    expect(own.style.borderRadius).toBe('12px');
    expect(own).not.toHaveStyleRule('animation', expect.anything(), {
      media: '(prefers-reduced-motion: no-preference)',
    });
  });

  it('announces a standalone preset by itself', () => {
    render(<SkeletonMediaCard label="Loading chart" />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading chart');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <SkeletonGroup>
        <SkeletonListItem trailing chips={2} />
        <SkeletonTable rows={2} columns={3} />
        <SkeletonForm fields={2} />
      </SkeletonGroup>,
    );

    await checkA11y(container);
  });
});

describe('presets', () => {
  it('SkeletonText renders the lines with a shorter last one', () => {
    const { container } = render(<SkeletonText lines={3} />);
    const lines = pieces(container);

    expect(lines).toHaveLength(3);
    expect(lines[0].style.width).toBe('100%');
    expect(lines[2].style.width).toBe('60%');
  });

  it('SkeletonText keeps a single line full width', () => {
    const { container } = render(<SkeletonText lines={1} />);

    expect(pieces(container)[0].style.width).toBe('100%');
  });

  it('SkeletonListItem repeats items with avatar, title, lines and chips', () => {
    const { container } = render(
      <SkeletonListItem count={2} lines={2} chips={2} trailing />,
    );

    // avatar + title + badge + dot + 2 lines + 2 chips = 8 per item
    expect(pieces(container)).toHaveLength(16);
  });

  it('SkeletonListItem can drop the avatar and chips', () => {
    const { container } = render(
      <SkeletonListItem avatar={false} chips={0} lines={1} />,
    );

    expect(pieces(container)).toHaveLength(2);
  });

  it('SkeletonMediaCard gives the squared media block 2px corners', () => {
    const { container } = render(
      <SkeletonMediaCard corners="squared" mediaHeight={200} />,
    );
    const [title, media] = pieces(container);

    expect(title.style.borderRadius).toBe('4px');
    expect(media.style.height).toBe('200px');
    expect(media.style.borderRadius).toBe('2px');
  });

  it('SkeletonTable renders a real table with a bar per cell', () => {
    render(<SkeletonTable rows={3} columns={4} />);

    const table = screen.getByRole('table', { hidden: true });
    expect(table.querySelectorAll('thead th')).toHaveLength(4);
    expect(table.querySelectorAll('tbody tr')).toHaveLength(3);
    expect(table.querySelectorAll('tbody td')).toHaveLength(12);
  });

  it('SkeletonTable can drop the header', () => {
    render(<SkeletonTable header={false} />);

    expect(
      screen.getByRole('table', { hidden: true }).querySelector('thead'),
    ).toBeNull();
  });

  it('SkeletonForm uses the kit field height and lays fields in columns', () => {
    const { container } = render(<SkeletonForm fields={4} columns={2} />);
    const controls = pieces(container).filter(
      (piece) => piece.style.height === '44px',
    );

    // 4 controls + the button
    expect(controls).toHaveLength(5);
    expect(
      container.querySelector<HTMLElement>('[style*="grid-template-columns"]')
        ?.style.gridTemplateColumns,
    ).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('SkeletonWidgetCard renders text by default and children when given', () => {
    const { container, rerender } = render(<SkeletonWidgetCard />);
    // title + 3 text lines
    expect(pieces(container)).toHaveLength(4);

    rerender(
      <SkeletonWidgetCard title={false}>
        <Skeleton height={200} />
      </SkeletonWidgetCard>,
    );
    expect(pieces(container)).toHaveLength(1);
  });
});

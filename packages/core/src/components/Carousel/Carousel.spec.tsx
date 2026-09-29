import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Carousel } from './Carousel';
import { CarouselItem } from './types';
import { screen } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';

const items: CarouselItem[] = [
  { src: '/a.jpg', alt: 'A', fullSrc: '/a-full.jpg' },
  { src: '/b.jpg', alt: 'B' },
  { src: '/c.jpg', alt: 'C' },
];

const setup = (ui: React.ReactElement) => ({
  user: userEvent.setup(),
  ...render(ui),
});

const activeSlide = () =>
  screen
    .getAllByRole('group', { hidden: true })
    .find((el) => el.getAttribute('aria-hidden') === 'false');

describe('Carousel', () => {
  it('renders a labelled carousel region with the first slide active', () => {
    render(<Carousel items={items} />);

    const region = screen.getByRole('region', { name: 'Image carousel' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    expect(activeSlide()).toHaveAttribute('aria-label', '1 of 3');
    expect(screen.getByAltText('A')).toBeInTheDocument();
  });

  it('forwards the ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Carousel items={items} ref={ref} />);

    expect(ref.current).toHaveAttribute('role', 'region');
  });

  it('moves with the arrows and disables them at the ends without loop', async () => {
    const { user } = setup(<Carousel items={items} />);

    const prev = screen.getByRole('button', { name: 'Previous slide' });
    const next = screen.getByRole('button', { name: 'Next slide' });
    expect(prev).toBeDisabled();

    await user.click(next);
    await user.click(next);
    expect(activeSlide()).toHaveAttribute('aria-label', '3 of 3');
    expect(next).toBeDisabled();
  });

  it('wraps around with loop', async () => {
    const { user } = setup(<Carousel items={items} loop />);

    await user.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(activeSlide()).toHaveAttribute('aria-label', '3 of 3');
  });

  it('jumps to a slide from its dot', async () => {
    const { user } = setup(<Carousel items={items} />);

    const dot = screen.getByRole('button', { name: 'Go to slide 3: C' });
    await user.click(dot);
    expect(dot).toHaveAttribute('aria-current', 'true');
    expect(activeSlide()).toHaveAttribute('aria-label', '3 of 3');
  });

  it('hides dots and arrows when turned off', () => {
    render(<Carousel items={items} showDots={false} showArrows={false} />);

    expect(screen.queryByRole('button', { name: /slide/i })).toBeNull();
  });

  it('renders thumbnails that select their slide', async () => {
    const { user } = setup(<Carousel items={items} thumbnails="left" />);

    const thumb = screen.getByRole('button', { name: 'Show slide 2: B' });
    await user.click(thumb);
    expect(thumb).toHaveAttribute('aria-current', 'true');
    expect(activeSlide()).toHaveAttribute('aria-label', '2 of 3');
  });

  it('navigates with the keyboard from inside the carousel', () => {
    render(<Carousel items={items} />);
    const viewport = screen.getByRole('button', { name: 'Go to slide 1: A' });

    fireEvent.keyDown(viewport, { key: 'End' });
    expect(activeSlide()).toHaveAttribute('aria-label', '3 of 3');
    fireEvent.keyDown(viewport, { key: 'ArrowLeft' });
    expect(activeSlide()).toHaveAttribute('aria-label', '2 of 3');
    fireEvent.keyDown(viewport, { key: 'Home' });
    expect(activeSlide()).toHaveAttribute('aria-label', '1 of 3');
  });

  it('works controlled and reports changes', async () => {
    const onIndexChange = jest.fn();
    const { user, rerender } = setup(
      <Carousel items={items} index={1} onIndexChange={onIndexChange} />,
    );
    expect(activeSlide()).toHaveAttribute('aria-label', '2 of 3');

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(onIndexChange).toHaveBeenCalledWith(2);
    // Parent has not moved yet, so neither has the carousel.
    expect(activeSlide()).toHaveAttribute('aria-label', '2 of 3');

    rerender(
      <Carousel items={items} index={0} onIndexChange={onIndexChange} />,
    );
    expect(activeSlide()).toHaveAttribute('aria-label', '1 of 3');
  });

  it('opens the full-size image in a new tab', () => {
    render(<Carousel items={items} allowOpenFull />);

    const link = screen.getByRole('link', { name: /open full size/i });
    expect(link).toHaveAttribute('href', '/a-full.jpg');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders placeholders for missing and broken images', () => {
    render(<Carousel items={[{}, { src: '/broken.jpg', alt: 'Broken' }]} />);

    expect(screen.getAllByTestId('carousel-placeholder')).toHaveLength(1);
    fireEvent.error(screen.getByAltText('Broken'));
    expect(screen.getAllByTestId('carousel-placeholder')).toHaveLength(2);
  });

  it('sizes the slide from aspectRatio, or from height when given', () => {
    const { rerender } = render(<Carousel items={items} aspectRatio={4 / 3} />);
    const viewport = () =>
      screen.getByRole('region').firstElementChild as HTMLElement;
    expect(viewport().style.aspectRatio).toBe(String(4 / 3));

    rerender(<Carousel items={items} height={240} />);
    expect(viewport().style.height).toBe('240px');
    expect(viewport().style.aspectRatio).toBe('');
  });

  it('applies the transition duration to the track', () => {
    render(<Carousel items={items} transitionDuration={750} />);
    const track = screen.getByRole('region').firstElementChild!
      .firstElementChild as HTMLElement;

    expect(track.style.transitionDuration).toBe('750ms');
  });

  it('uses renderItem for custom slides', () => {
    render(
      <Carousel
        items={items}
        renderItem={(item) => <span>Custom {item.alt}</span>}
      />,
    );

    expect(screen.getByText('Custom A')).toBeInTheDocument();
    expect(screen.queryByAltText('A')).toBeNull();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Carousel items={items} thumbnails="bottom" allowOpenFull />,
    );

    expect(await checkA11y(container)).toHaveNoViolations();
  });

  describe('autoPlay', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('advances on the interval and loops', () => {
      render(<Carousel items={items} autoPlay autoPlayInterval={1000} />);

      act(() => jest.advanceTimersByTime(1000));
      expect(activeSlide()).toHaveAttribute('aria-label', '2 of 3');
      act(() => jest.advanceTimersByTime(1000));
      act(() => jest.advanceTimersByTime(1000));
      expect(activeSlide()).toHaveAttribute('aria-label', '1 of 3');
    });

    it('pauses while hovered', () => {
      render(<Carousel items={items} autoPlay autoPlayInterval={1000} />);

      fireEvent.mouseEnter(screen.getByRole('region'));
      act(() => jest.advanceTimersByTime(3000));
      expect(activeSlide()).toHaveAttribute('aria-label', '1 of 3');

      fireEvent.mouseLeave(screen.getByRole('region'));
      act(() => jest.advanceTimersByTime(1000));
      expect(activeSlide()).toHaveAttribute('aria-label', '2 of 3');
    });

    it('does not announce slide changes while playing', () => {
      render(<Carousel items={items} autoPlay />);
      const track = screen.getByRole('region').firstElementChild!
        .firstElementChild as HTMLElement;

      expect(track).toHaveAttribute('aria-live', 'off');
    });
  });
});

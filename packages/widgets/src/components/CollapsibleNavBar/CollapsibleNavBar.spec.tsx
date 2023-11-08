import { fireEvent } from '@testing-library/dom';
import { ITEMS } from './stories/consts';
import { StoryComponent } from './stories/StoryComponent';

describe('CollapsibleNavBar', () => {
  it('Should be correctly rendered', () => {
    const { queryByText, getAllByText } = render(
      <StoryComponent items={ITEMS} />,
    );

    queryByText('Dashboard');
    queryByText('Bots');
    queryByText('Statistics');
    queryByText('Max in Work');
    queryByText('History');
    getAllByText('Settings');
  });

  it('Should be expanded the group', () => {
    const { container } = render(<StoryComponent items={ITEMS} />);

    const statisticsArrow = container.querySelector(
      'button#chartstatisticsaccordion',
    );

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(statisticsArrow as Node);

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'true');
  });

  it('Sidebar should be expanded', () => {
    const { container } = render(<StoryComponent items={ITEMS} />);

    const contentToggler = container.querySelector('label[for=contentToggler]');
    const arrow = contentToggler?.querySelector('title');

    expect(arrow?.textContent).toEqual('Carrot right');

    fireEvent.click(contentToggler as Node);

    expect(
      container
        .querySelector('label[for=contentToggler]')
        ?.querySelector('title')?.textContent,
    ).toEqual('Carrot left');
  });
});

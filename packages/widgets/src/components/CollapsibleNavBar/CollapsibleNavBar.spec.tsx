import { fireEvent } from '@testing-library/dom';
import { ITEMS } from './stories/consts';
import { StoryComponent } from './stories/StoryComponent';
import { Logo } from './stories/Logo';

describe('CollapsibleNavBar', () => {
  it('Should be correctly rendered', () => {
    const { queryByText, getAllByText } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    queryByText('Dashboard');
    queryByText('Bots');
    queryByText('Statistics');
    queryByText('Max in Work');
    queryByText('History');
    getAllByText('Settings');
  });

  it('Should expand the group', () => {
    const { container } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    const statisticsArrow = container.querySelector(
      'button#chartstatisticsaccordion',
    );

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(statisticsArrow as Node);

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should be expanded', () => {
    const { queryByLabelText, getByLabelText } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    const contentToggler = getByLabelText('Carrot right');

    fireEvent.click(contentToggler as Node);

    expect(queryByLabelText('Carrot right')).not.toBeInTheDocument();

    getByLabelText('Carrot left');
  });
});

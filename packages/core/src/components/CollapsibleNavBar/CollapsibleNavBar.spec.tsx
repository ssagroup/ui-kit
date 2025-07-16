import { fireEvent } from '@testing-library/dom';
import { ITEMS } from './stories/consts';
import { StoryComponent } from './stories/StoryComponent';
import { Logo } from './stories/Logo';

describe('CollapsibleNavBar', () => {
  it('Should be correctly rendered', () => {
    const { getByText, getAllByText } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    getByText('Dashboard');
    getByText('Bots');
    getByText('Notifications');
    getByText('Statistics');
    getByText('Max in Work');
    getByText('History');
    getAllByText('Settings');
  });

  it('Should expand the group', () => {
    const { getByTestId } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    const statisticsArrow = getByTestId('accordion-title');

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(statisticsArrow as Node);

    expect(statisticsArrow as Node).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should be expanded', () => {
    const { getByTestId } = render(
      <StoryComponent items={ITEMS} renderLogo={<Logo />} />,
    );

    const contentToggler = getByTestId('collapsible-nav-content-toggle-label');

    fireEvent.click(contentToggler as Node);

    expect(getByTestId('collapsible-nav-content-toggle-label')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});

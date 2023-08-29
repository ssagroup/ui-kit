import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor, within } from '../../../customTest';
import ResizeObserver from 'resize-observer-polyfill';

import { progressInfoData as data } from './mockProgressInfoRequest';

import ProgressInfo from './index';

const ResponsivePieMock = ({
  colors,
}: {
  onMouseMove: (p: { data: { y: number } }) => void;
  colors?: string;
}) => <div data-testid="progress-mock" css={{ color: colors }}></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

const setup = (component) => {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
};

describe('ProgressInfo', () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });

  it('Renders the correct number items legends & items', async () => {
    render(<ProgressInfo data={data} />);

    await waitFor(async () => {
      const [listActivities, listTotal] = await screen.findAllByRole('list');
      const listActivitiesEls = await within(listActivities).findAllByRole(
        'listitem',
      );
      const listTotalEls = await within(listTotal).findAllByRole('listitem');

      expect(listActivitiesEls).toHaveLength(2);
      expect(listTotalEls).toHaveLength(2);
    });
  });

  it('Changes its content when a period is changed', async () => {
    const { getByTestId, getByRole, getAllByRole, getByText } = render(
      <ProgressInfo data={data} />,
    );

    await waitFor(async () => {
      const dropdownEl = getByTestId('dropdown');
      const dropdownToggleEl = within(dropdownEl).getByRole('combobox');

      await fireEvent.click(dropdownToggleEl);

      const listItemEls = within(getByRole('listbox')).getAllByRole('button');

      await fireEvent.click(listItemEls[2]);

      const [listActivities, listTotal] = getAllByRole('list');
      const listActivitiesEls = within(listActivities).getAllByRole('listitem');
      const listTotalEls = within(listTotal).getAllByRole('listitem');

      expect(listActivitiesEls).toHaveLength(2);
      expect(listTotalEls).toHaveLength(2);
      expect(getByText(/210 hrs/i)).toBeInTheDocument();
      expect(getByText(/266 hrs/i)).toBeInTheDocument();
    });
  });

  it('Renders without data', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { queryByTestId } = render(<ProgressInfo data="" />);

    await waitFor(async () => {
      const dropdownEl = await queryByTestId('dropdown');

      expect(dropdownEl).not.toBeInTheDocument();
    });
  });

  it('Renders ResponsivePie', async () => {
    const { getByTestId } = setup(<ProgressInfo data={data} />);

    await expect(getByTestId('progress-mock')).toBeInTheDocument();
  });
});

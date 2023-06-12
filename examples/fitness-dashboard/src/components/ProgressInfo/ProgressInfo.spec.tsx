import { customTest } from '@ssa-ui-kit/utils';
import ResizeObserver from 'resize-observer-polyfill';

import { progressInfoData as data } from '@apis/sources/mock/utils/mockProgressInfoRequest';

import ProgressInfo from './index';

const { fireEvent, screen, waitFor, within } = customTest;

describe('ProgressInfo', () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });

  it('renders the correct number items legends & items', async () => {
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

  it('Filter that when change period', async () => {
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

  it('renders without data', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { queryByTestId } = render(<ProgressInfo data="" />);

    await waitFor(async () => {
      const dropdownEl = await queryByTestId('dropdown');

      expect(dropdownEl).not.toBeInTheDocument();
    });
  });
});

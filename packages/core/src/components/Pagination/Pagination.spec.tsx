import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { screen, within } from '../../../customTest';

import { Pagination, PaginationContextProvider } from './index';

function setup(component: React.ReactNode, selectedPage?: number) {
  return {
    user: userEvent.setup(),
    ...render(
      <PaginationContextProvider selectedPage={selectedPage}>
        {component}
      </PaginationContextProvider>,
    ),
  };
}

const testCases = {
  noSelectedPage: [
    { pages: 1, expected: [1] },
    { pages: 2, expected: [1, 2] },
    { pages: 3, expected: [1, 2, 3] },
    { pages: 4, expected: [1, 2, 3, 4] },
    { pages: 5, expected: [1, 2, 3, 4, 5] },
    { pages: 6, expected: [1, 2, 3, -1, 6] },
    { pages: 7, expected: [1, 2, 3, -1, 7] },
    { pages: 8, expected: [1, 2, 3, -1, 8] },
    { pages: 9, expected: [1, 2, 3, -1, 9] },
    { pages: 10, expected: [1, 2, 3, -1, 10] },
  ],
  selectedPage: [
    { pages: 10, selected: 1, expected: [1, 2, 3, -1, 10] },
    { pages: 10, selected: 2, expected: [1, 2, 3, -1, 10] },
    { pages: 10, selected: 3, expected: [1, 2, 3, 4, -1, 10] },
    { pages: 10, selected: 4, expected: [1, 2, 3, 4, 5, -1, 10] },
    { pages: 10, selected: 5, expected: [1, -1, 4, 5, 6, -1, 10] },
    { pages: 10, selected: 6, expected: [1, -1, 5, 6, 7, -1, 10] },
    { pages: 10, selected: 7, expected: [1, -1, 6, 7, 8, 9, 10] },
    { pages: 10, selected: 8, expected: [1, -1, 7, 8, 9, 10] },
    { pages: 10, selected: 9, expected: [1, -1, 8, 9, 10] },
    { pages: 10, selected: 10, expected: [1, -1, 9, 10] },
  ],
};

const checkPages = (range: number[], selected?: number) => {
  const navigation = screen.getByRole('navigation');
  const pagerWrapper = navigation.querySelector('div') as HTMLDivElement;
  const withinNavigation = within(navigation);

  withinNavigation.getByRole('button', { name: 'Go to previous page' });
  withinNavigation.getByRole('button', { name: 'Go to next page' });

  // Pager group: [prevArrow, numbersWrapper, nextArrow]; page buttons and
  // ellipsis breaks live inside the numbers wrapper.
  const numbersWrapper = pagerWrapper.children[1] as HTMLElement;
  const buttonsAndBreaks = Array.from(numbersWrapper.children);

  for (let i = 0; i < range.length; ++i) {
    const page = range[i];
    const el = buttonsAndBreaks[i];

    if (page === -1) {
      expect(el).toHaveTextContent('...');
    } else {
      if (selected === page) {
        expect(el).toHaveAttribute('aria-label', `Current page ${page}`);
        expect(el).toHaveAttribute('aria-current', 'true');
      } else {
        expect(el).toHaveAttribute('aria-label', `Go to page ${page}`);
        expect(el).not.toHaveAttribute('aria-current', 'true');
      }
      expect(el).toHaveTextContent(String(page));
    }
  }
};

describe('Pagination', () => {
  describe('No page selected', () => {
    it.each(testCases.noSelectedPage)(
      'Renders $pages page(s)',
      ({ pages, expected }) => {
        setup(<Pagination pagesCount={pages} />);

        checkPages(expected);
      },
    );
  });

  describe('With a selected page', () => {
    it.each(testCases.selectedPage)(
      'Renders $pages page(s) (selected: $selected)',
      ({ pages, selected, expected }) => {
        setup(<Pagination pagesCount={pages} />, selected);

        checkPages(expected, selected);
      },
    );
  });

  it("Selects a page when it's clicked", async () => {
    const { user } = setup(<Pagination pagesCount={3} />, 1);

    let pageOneEl = screen.getByRole('button', {
      name: 'Current page 1',
      current: true,
    });
    expect(pageOneEl).toHaveTextContent('1');

    let pageTwoEl = screen.getByRole('button', { name: 'Go to page 2' });
    expect(pageTwoEl).toHaveTextContent('2');

    await user.click(pageTwoEl);

    pageOneEl = screen.getByRole('button', { name: 'Go to page 1' });
    expect(pageOneEl).not.toHaveAttribute('aria-current', 'true');
    expect(pageOneEl).toHaveTextContent('1');

    pageTwoEl = screen.getByRole('button', {
      name: 'Current page 2',
      current: true,
    });
    expect(pageTwoEl).toHaveTextContent('2');
  });

  it('A click on the selected page does nothing', async () => {
    const { user } = setup(<Pagination pagesCount={3} />, 1);

    let pageOneEl = screen.getByRole('button', {
      name: 'Current page 1',
      current: true,
    });

    await user.click(pageOneEl);

    pageOneEl = screen.getByRole('button', {
      name: 'Current page 1',
      current: true,
    });
    expect(pageOneEl).toHaveAttribute('aria-current', 'true');
    expect(pageOneEl).toHaveTextContent('1');
  });

  it('Changes a selected page when the "Previous page" button is clicked', async () => {
    const { user } = setup(<Pagination pagesCount={3} />, 2);

    const leftArrowEl = screen.getByRole('button', {
      name: 'Go to previous page',
    });

    await user.click(leftArrowEl);

    const activeEl = screen.getByRole('button', { current: true });
    expect(activeEl).toHaveTextContent('1');
  });

  it('Changes a selected page when the "Next page" button is clicked', async () => {
    const { user } = setup(<Pagination pagesCount={3} />, 2);

    const rightArrowEl = screen.getByRole('button', {
      name: 'Go to next page',
    });

    await user.click(rightArrowEl);

    const activeEl = screen.getByRole('button', { current: true });
    expect(activeEl).toHaveTextContent('3');
  });

  it('Ignores click on the disabled "Previous page" button', async () => {
    const { user } = setup(<Pagination pagesCount={3} />, 1);

    const leftArrowEl = screen.getByRole('button', {
      name: 'Go to previous page',
    });

    expect(leftArrowEl).toBeDisabled();

    await user.click(leftArrowEl);

    const activeEl = screen.getByRole('button', { current: true });
    expect(activeEl).toHaveTextContent('1');

    expect(leftArrowEl).toBeDisabled();
  });

  it('Ignores click on the disabled "Next page" button', async () => {
    const { user } = setup(<Pagination pagesCount={3} />, 3);

    const rightArrowEl = screen.getByRole('button', {
      name: 'Go to next page',
    });
    expect(rightArrowEl).toBeDisabled();

    await user.click(rightArrowEl);

    const activeEl = screen.getByRole('button', { current: true });
    expect(activeEl).toHaveTextContent('3');

    expect(rightArrowEl).toBeDisabled();
  });

  it('Renders with custom styles', () => {
    setup(<Pagination pagesCount={3} css={{ backgroundColor: 'yellow' }} />, 2);

    const paginationEl = screen.getByRole('navigation');
    expect(paginationEl).toHaveStyle('background-color: yellow');
  });

  it('Renders with a custom root element', () => {
    setup(<Pagination pagesCount={3} as="div" />, 2);

    const navEl = screen.queryByRole('navigation');
    expect(navEl).not.toBeInTheDocument();
    expect(document.body.children.length).toBe(1);
    expect(document.body.children[0]?.tagName).toBe('DIV');
  });

  it('Renders the default "current / total" page count', () => {
    setup(<Pagination pagesCount={3} isPageSettingVisible />, 1);

    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('Renders a custom page count via renderPageCount', () => {
    setup(
      <Pagination
        pagesCount={300}
        isPageSettingVisible
        renderPageCount={(current, total) => (
          <span>
            Pages {current} out of {total}
          </span>
        )}
      />,
      1,
    );

    expect(screen.getByText('Pages 1 out of 300')).toBeInTheDocument();
    expect(screen.queryByText('1 / 300')).not.toBeInTheDocument();
  });

  it('Hides the page count when isPageFromCountVisible is false', () => {
    setup(
      <Pagination
        pagesCount={3}
        isPageSettingVisible
        isPageFromCountVisible={false}
      />,
      1,
    );

    expect(screen.queryByText('1 / 3')).not.toBeInTheDocument();
  });

  it('Renders in a disabled state', () => {
    setup(<Pagination pagesCount={3} isDisabled={true} />, 2);

    const buttonEls = screen.getAllByRole('button');
    expect(buttonEls.length).toBe(5); // "previous" "1" "2" "3" "next"
    for (const btnEl of buttonEls) {
      expect(btnEl).toBeDisabled();
    }
  });

  describe('Controlled mode', () => {
    it('Reflects the `page` prop and calls `onPageChange` instead of navigating internally', async () => {
      const onPageChange = jest.fn();
      const user = userEvent.setup();
      render(
        <PaginationContextProvider page={2} onPageChange={onPageChange}>
          <Pagination pagesCount={3} />
        </PaginationContextProvider>,
      );

      screen.getByRole('button', { name: 'Current page 2', current: true });

      await user.click(screen.getByRole('button', { name: 'Go to page 3' }));

      expect(onPageChange).toHaveBeenCalledWith(3);
      // Page prop hasn't changed, so the displayed page doesn't move on
      // its own - the parent owns the value.
      screen.getByRole('button', { name: 'Current page 2', current: true });
    });

    it('Advances when the parent updates the controlled `page` value', async () => {
      const user = userEvent.setup();
      const ControlledPagination = () => {
        const [page, setPage] = useState(1);
        return (
          <PaginationContextProvider page={page} onPageChange={setPage}>
            <Pagination pagesCount={3} />
          </PaginationContextProvider>
        );
      };
      render(<ControlledPagination />);

      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));

      screen.getByRole('button', { name: 'Current page 2', current: true });
    });

    it('Reflects the `perPage` prop and calls `onPerPageChange` on the rows per page dropdown', async () => {
      const onPerPageChange = jest.fn();
      const user = userEvent.setup();
      render(
        <PaginationContextProvider
          perPage={25}
          onPerPageChange={onPerPageChange}>
          <Pagination pagesCount={3} isRowPerPageVisible />
        </PaginationContextProvider>,
      );

      await user.click(screen.getByRole('combobox'));

      const listboxEl = screen.getByRole('listbox');
      await user.click(within(listboxEl).getByRole('button', { name: '50' }));

      expect(onPerPageChange).toHaveBeenCalledWith(50);
    });

    it('Warns in dev mode when switching between controlled and uncontrolled `page` across renders', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        /* no-op */
      });

      const { rerender } = render(
        <PaginationContextProvider page={1}>
          <Pagination pagesCount={3} />
        </PaginationContextProvider>,
      );

      rerender(
        <PaginationContextProvider>
          <Pagination pagesCount={3} />
        </PaginationContextProvider>,
      );

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('"page"'),
      );

      (console.error as jest.Mock).mockRestore();
    });
  });
});

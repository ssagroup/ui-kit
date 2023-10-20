import { fireEvent } from '@testing-library/dom';
import { StoryComponent } from '.';

describe('SearchBox', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should be correctly rendered', () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <StoryComponent />,
    );
    getByTestId('search-icon');
    getByPlaceholderText('Search by name');
    expect(queryByTestId('cross-icon')).not.toBeInTheDocument();
  });

  it('should value and icon be changed', () => {
    const { getByPlaceholderText, getByTestId } = render(<StoryComponent />);

    const inputElement = getByPlaceholderText('Search by name');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    const crossIcon = getByTestId('cross-icon');
    fireEvent.click(crossIcon);

    expect((inputElement as HTMLInputElement).value).toBe('');
  });

  it('should be cleared by pressing the cross icon', () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <StoryComponent />,
    );

    const inputElement = getByPlaceholderText('Search by name');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    getByTestId('cross-icon');
    expect((inputElement as HTMLInputElement).value).toBe('test');
    expect(queryByTestId('search-icon')).not.toBeInTheDocument();
  });

  it('should callback called', () => {
    const { getByPlaceholderText } = render(<StoryComponent />);

    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    const inputElement = getByPlaceholderText('Search by name');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    jest.runAllTimers();
    expect(consoleLogMock.mock.calls).toEqual([
      ['Searching for the term...', 'test'],
    ]);
    consoleLogMock.mockRestore();
  });

  it('should callback called, pressing by the key Enter', () => {
    const { getByPlaceholderText } = render(<StoryComponent />);

    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    const inputElement = getByPlaceholderText('Search by name');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.keyUp(inputElement, {
      key: 'Enter',
    });
    expect(consoleLogMock.mock.calls).toEqual([
      ['Searching for the term...', 'test'],
    ]);
    consoleLogMock.mockRestore();
  });
});

import { fireEvent } from '@testing-library/dom';
import { StoryComponent } from './stories/StoryComponent';

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

  it('should change value and icon', () => {
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

  it('should call the callback', () => {
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

  it('should call the callback by pressing the Enter key', () => {
    const handleCallback = jest.fn();
    const { getByPlaceholderText } = render(
      <StoryComponent handleCallback={handleCallback} />,
    );

    const inputElement = getByPlaceholderText('Search by name');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.keyUp(inputElement, {
      key: 'Enter',
    });
    expect(handleCallback.mock.calls).toEqual([['test']]);
  });
});

import { fireEvent } from '@testing-library/dom';
import { StoryComponent } from './stories/StoryComponent';

describe('TableFilters', () => {
  it('Should be correctly rendered', () => {
    const { getByText, getByRole, queryByText } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    let cancelButtonEl = queryByText('Cancel');
    expect(cancelButtonEl).not.toBeInTheDocument();
    fireEvent.click(buttonEl);
    cancelButtonEl = getByText('Cancel');
    getByText('Strategy');
    getByText('checkbox1');
    fireEvent.click(cancelButtonEl);
    expect(queryByText('Cancel')).not.toBeInTheDocument();
  });
  it('Should be all checked (Strategy group)', () => {
    const { getByText, getByRole } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    fireEvent.click(buttonEl);
    fireEvent.click(getByText('checkbox2'));
    fireEvent.click(getByText('checkbox3'));
    fireEvent.click(getByText('checkbox5'));
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'div[role=region][title=Strategy] input',
    );
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(true);
    });
  });
  it('Should be reset to the initial state', () => {
    const { getByText, getByRole } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    fireEvent.click(buttonEl);
    fireEvent.click(getByText('checkbox2'));
    fireEvent.click(getByText('checkbox3'));
    fireEvent.click(getByText('checkbox5'));
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'div[role=region][title=Strategy] input',
    );
    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(true);
    });
    fireEvent.click(getByText('Clear'));
    checkboxes.forEach((checkbox, key) => {
      expect(checkbox.checked).toEqual([0, 3].includes(key));
    });
  });
  it('Should be submitted correctly', () => {
    const { getByText, getByRole } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    fireEvent.click(buttonEl);
    fireEvent.click(getByText('checkbox2'));
    fireEvent.click(getByText('checkbox3'));
    fireEvent.click(getByText('checkbox5'));

    const logSpy = jest.spyOn(console, 'log');
    fireEvent.click(getByText('Apply'));
    expect(logSpy).toHaveBeenCalledWith('>>>onSubmit data', {
      exchange: { binance: true },
      pairs: { btcfdusd: true },
      status: { running: true },
      strategy: {
        checkbox1: true,
        checkbox2: true,
        checkbox3: true,
        checkbox4: true,
        checkbox5: true,
      },
    });
  });
});

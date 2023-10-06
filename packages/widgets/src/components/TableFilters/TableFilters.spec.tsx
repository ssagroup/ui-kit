import { fireEvent } from '@testing-library/dom';
import { StoryComponent } from './stories/StoryComponent';
import { TableFilters } from '.';
import { mockData } from './stories/mockData';

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
  it('Should be cleared with persisting of disabled values', () => {
    const { getByText, getByRole } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    fireEvent.click(buttonEl);
    fireEvent.click(getByText('checkbox2'));
    fireEvent.click(getByText('checkbox3'));
    fireEvent.click(getByText('checkbox5'));
    let strategyCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'div[role=region][title=Strategy] input',
    );
    strategyCheckboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(true);
    });
    fireEvent.click(getByText('Clear'));
    strategyCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'div[role=region][title=Strategy] input',
    );
    strategyCheckboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(false);
    });
    const pairsCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'div[role=region][title=Pairs] input',
    );
    pairsCheckboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(true);
      expect(checkbox.disabled).toEqual(true);
    });
    const exchangeCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'div[role=region][title=Exchange] input',
    );
    exchangeCheckboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(true);
      expect(checkbox.disabled).toEqual(true);
    });
  });
  it('Should be correctly working custom handlers', () => {
    const { getByText, getByRole } = render(
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TableFilters
          checkboxData={mockData}
          handleSubmit={() => {
            console.log('>>>Submit: completed');
          }}
          handleCancel={() => {
            console.log('>>>Cancel: completed');
          }}
          handleClear={() => {
            console.log('>>>Clear: completed');
          }}
        />
      </div>,
    );

    const logSpy = jest.spyOn(console, 'log');
    const buttonEl = getByRole('button');
    fireEvent.click(buttonEl);
    fireEvent.click(getByText('checkbox2'));
    fireEvent.click(getByText('Clear'));
    expect(logSpy).toHaveBeenCalledWith('>>>Clear: completed');
    fireEvent.click(getByText('checkbox2'));
    fireEvent.click(getByText('Apply'));
    expect(logSpy).toHaveBeenCalledWith('>>>Submit: completed');
    fireEvent.click(getByText('Cancel'));
    expect(logSpy).toHaveBeenCalledWith('>>>Cancel: completed');
  });
  it('Should be submitted with callback', () => {
    const { getByText, getByRole } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    fireEvent.click(buttonEl);
    fireEvent.click(getByText('checkbox2'));
    fireEvent.click(getByText('checkbox3'));
    fireEvent.click(getByText('checkbox5'));

    const logSpy = jest.spyOn(console, 'log');
    fireEvent.click(getByText('Apply'));
    expect(logSpy).toHaveBeenCalledWith('>>>onSubmit', {
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
  it('Should be submitted by default', () => {
    const { getByText, getByRole, getByTestId } = render(
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TableFilters checkboxData={mockData} />
      </div>,
    );

    const buttonEl = getByRole('button');
    fireEvent.click(buttonEl);

    const formEl = getByTestId('table-filters-form');
    formEl.onsubmit = jest.fn(() => {
      console.log('>>>Form submitted');
    });
    const logSpy = jest.spyOn(console, 'log');
    fireEvent.click(getByText('Apply'));
    expect(logSpy).toHaveBeenCalledWith('>>>Form submitted');
  });
});

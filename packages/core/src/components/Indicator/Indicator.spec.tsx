import Indicator from './Indicator';

describe('Indicator', () => {
  it('Renders with default left position', () => {
    const { getByTestId } = render(<Indicator isVisible={true} />);

    getByTestId('indicator-left');
  });

  it('Renders with right position', () => {
    const { getByTestId } = render(
      <Indicator isVisible={true} position="right" />,
    );

    getByTestId('indicator-right');
  });

  it('Renders with children and default left position', () => {
    const { getByText, getByTestId } = render(
      <Indicator isVisible={true}>
        <span>Content</span>
      </Indicator>,
    );

    getByTestId('indicator-left');
    getByText('Content');
  });

  it('Renders with children and Indicator text', () => {
    const { getByText, getByTestId } = render(
      <Indicator isVisible={true} text={'+20'}>
        <span>Content</span>
      </Indicator>,
    );

    getByTestId('indicator-left');
    getByText('Content');
    getByText('+20');
  });

  it('Is not rendered in the document', () => {
    const { queryByTestId } = render(<Indicator isVisible={false} />);

    expect(queryByTestId('indicator-left')).not.toBeInTheDocument;
  });
});

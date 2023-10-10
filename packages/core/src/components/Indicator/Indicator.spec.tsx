import Indicator from './Indicator';

describe('Indicator', () => {
  it('Renders with default left position', () => {
    const { getByTestId } = render(
      <Indicator isVisible={true}>
        <span>Content</span>
      </Indicator>,
    );

    getByTestId('indicator-left');
  });

  it('Renders with right position', () => {
    const { getByTestId } = render(
      <Indicator isVisible={true} position="right">
        <span>Content</span>
      </Indicator>,
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

  it('Renders with children and right position', () => {
    const { getByText, getByTestId } = render(
      <Indicator position="right" isVisible={true}>
        <span>Content</span>
      </Indicator>,
    );

    getByTestId('indicator-right');
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
    const { queryByTestId } = render(
      <Indicator isVisible={false}>
        <span>Content</span>
      </Indicator>,
    );

    expect(queryByTestId('indicator-left')).not.toBeInTheDocument();
  });
});

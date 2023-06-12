import { screen } from '../../../customTest';
import Typography from './index';

describe('Typography', () => {
  it('Render Typography h1 with correct font-size and weight', () => {
    render(<Typography variant="h1">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 2.488rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="h1" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography h2 with correct font-size and weight', () => {
    render(<Typography variant="h2">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 1.188rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="h2" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography h3 with correct font-size and weight', () => {
    render(<Typography variant="h3">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 1.438rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="h3" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography h4 with correct font-size and weight', () => {
    render(<Typography variant="h4">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 1.44rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="h4" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography h5 with correct font-size and weight', () => {
    render(<Typography variant="h5">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 1rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="h5" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography h6 with correct font-size and weight', () => {
    render(<Typography variant="h6">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 1rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="h6" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography subtitle with correct font-size and weight', () => {
    render(<Typography variant="subtitle">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 0.833rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="subtitle" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography body1 with correct font-size and weight', () => {
    render(<Typography>text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 0.694rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="body1" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography body2 with correct font-size and weight', () => {
    render(<Typography variant="body2">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 0.579rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="body2" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography body3 with correct font-size and weight', () => {
    render(<Typography variant="body3">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 0.5rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="body3" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography caption with correct font-size and weight', () => {
    render(<Typography variant="caption">text regular</Typography>);

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 0.481rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);

    render(
      <Typography variant="caption" weight="bold">
        text bold
      </Typography>,
    );

    const textBold = screen.getByText(/text bold/i);

    expect(textBold).toHaveStyle(`font-weight: 700`);
  });

  it('Render Typography with gutter', () => {
    render(
      <Typography variant="h1" gutter>
        text regular
      </Typography>,
    );

    const textRegular = screen.getByText(/text regular/i);

    expect(textRegular).toHaveStyle(`font-size: 2.488rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);
    expect(textRegular).toHaveStyle('margin-block-end: 1rem');
  });

  it('Render Typography with a tag specified in the "as" prop', () => {
    render(
      <Typography variant="h1" gutter as="p">
        text regular
      </Typography>,
    );

    const textRegular = screen.getByText(/text regular/i);
    expect(textRegular.tagName.toLowerCase()).toBe('p');

    expect(textRegular).toHaveStyle(`font-size: 2.488rem`);
    expect(textRegular).toHaveStyle(`font-weight: 500`);
    expect(textRegular).toHaveStyle('margin-block-end: 1rem');
  });
});

import ResponsiveImage from './index';

describe('ResponsiveImage', () => {
  it('Renders with the required props', () => {
    render(
      <ResponsiveImage
        srcSet="/img/steps/steps_64.png 64w, /img/steps/steps_48.png 48w"
        sizes="(min-width: 1440px) 64px, 48px"
        src="/img/steps/steps_48.png"
        alt="Steps"
      />,
    );

    const imageEl = document.getElementsByTagName('img')[0];
    expect(imageEl).toBeInTheDocument();

    expect(imageEl).toHaveAttribute(
      'srcSet',
      '/img/steps/steps_64.png 64w, /img/steps/steps_48.png 48w',
    );
    expect(imageEl).toHaveAttribute('sizes', '(min-width: 1440px) 64px, 48px');
    expect(imageEl).toHaveAttribute('src', '/img/steps/steps_48.png');
    expect(imageEl).toHaveAttribute('alt', 'Steps');
  });

  it('Renders with custom styles ', () => {
    render(
      <ResponsiveImage
        srcSet="/img/steps/steps_64.png 64w, /img/steps/steps_48.png 48w"
        sizes="(min-width: 1440px) 64px, 48px"
        src="/img/steps/steps_48.png"
        alt="Steps"
        css={{
          marginLeft: '10px',
        }}
      />,
    );

    const imageEl = document.getElementsByTagName('img')[0];
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveStyle(`margin-left: 10px`);
  });
});

import { IResponsiveImageProps } from './types';

/**
 * A simple wrapper over the `<img />` tag.
 *
 * Don't forget to adjust Device Pixel Ratio in DevTools
 * when testing srcSet, and use Hard Reload to force the
 * browser to load an image of another resolution.
 * */
const ResponsiveImage = ({ src, alt, ...props }: IResponsiveImageProps) => {
  return <img src={src} alt={alt} {...props} />;
};

export default ResponsiveImage;

import { IResponsiveImageProps } from './types';

/**
 * A simple wrapper over the `<img />` tag.
 *
 * Don't forget to adjust Device Pixel Ratio in DevTools
 * when testing srcSet.
 * */
const ResponsiveImage = ({ src, alt, ...props }: IResponsiveImageProps) => {
  return <img src={src} alt={alt} {...props} />;
};

export default ResponsiveImage;

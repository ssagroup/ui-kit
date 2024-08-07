import { SVGProps } from '@components/Icon/types';

export const More = ({
  fill = '#000',
  size = 24,
  tooltip = 'More',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M5.4001 10.2C4.4101 10.2 3.6001 11.01 3.6001 12C3.6001 12.99 4.4101 13.8 5.4001 13.8C6.3901 13.8 7.2001 12.99 7.2001 12C7.2001 11.01 6.3901 10.2 5.4001 10.2Z"
      fill={fill}
    />
    <path
      d="M12.0002 10.2C11.0102 10.2 10.2002 11.01 10.2002 12C10.2002 12.99 11.0102 13.8 12.0002 13.8C12.9902 13.8 13.8002 12.99 13.8002 12C13.8002 11.01 12.9902 10.2 12.0002 10.2Z"
      fill={fill}
    />
    <path
      d="M18.6003 10.2C17.6103 10.2 16.8003 11.01 16.8003 12C16.8003 12.99 17.6103 13.8 18.6003 13.8C19.5903 13.8 20.4003 12.99 20.4003 12C20.4003 11.01 19.5903 10.2 18.6003 10.2Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'more';

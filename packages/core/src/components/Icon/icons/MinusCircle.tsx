import { SVGProps } from '@components/Icon/types';

export const MinusCircle = ({
  fill = '#000',
  size = 24,
  tooltip = 'Minus circle',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M5.8999 10C5.8999 9.61341 6.2133 9.30001 6.5999 9.30001H13.2666C13.6532 9.30001 13.9666 9.61341 13.9666 10C13.9666 10.3866 13.6532 10.7 13.2666 10.7H6.5999C6.2133 10.7 5.8999 10.3866 5.8999 10Z"
      fill={fill}
    />
    <path
      d="M0.899902 10C0.899902 5.03008 4.9633 0.966675 9.93324 0.966675C14.9032 0.966675 18.9666 5.03008 18.9666 10C18.9666 14.9699 14.9032 19.0333 9.93324 19.0333C4.9633 19.0333 0.899902 14.9699 0.899902 10ZM9.93324 2.36667C5.7365 2.36667 2.2999 5.80327 2.2999 10C2.2999 14.1967 5.7365 17.6333 9.93324 17.6333C14.13 17.6333 17.5666 14.1967 17.5666 10C17.5666 5.80327 14.13 2.36667 9.93324 2.36667Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'minus-circle';

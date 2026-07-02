import { SVGProps } from '@components/Icon/types';

export const Save = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g transform="translate(4.8, 2.3)">
      <path
        d="M13 1.7002C13 1.53451 12.8659 1.40039 12.7002 1.40039H1.7002C1.53451 1.40039 1.40039 1.53451 1.40039 1.7002V17.5781L7.2002 14.7441L13 17.5781V1.7002ZM14.4004 17.8994C14.4003 18.7867 13.47 19.3671 12.6729 18.9775L7.2002 16.3018L1.72754 18.9775C0.930364 19.3671 5.0618e-05 18.7867 0 17.8994V1.7002C6.44188e-08 0.761311 0.761311 0 1.7002 0H12.7002C13.6391 0 14.4004 0.761312 14.4004 1.7002V17.8994Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'save';

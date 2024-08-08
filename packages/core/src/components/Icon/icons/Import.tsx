import { SVGProps } from '@components/Icon/types';

export const Import = ({
  fill = '#000',
  size = 24,
  tooltip = 'Import',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <g id="box-arrow-in-down">
      <path
        id="box-arrow-bg"
        d="M15.75 7.25H19.25C19.8023 7.25 20.25 7.69772 20.25 8.25V21.25C20.25 21.8023 19.8023 22.25 19.25 22.25H4.75C4.19772 22.25 3.75 21.8023 3.75 21.25V8.25C3.75 7.69772 4.19772 7.25 4.75 7.25H8.25"
        stroke={fill}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        id="Vector 284"
        d="M7.5 11.75L12 16.25M12 16.25L16.5 11.75M12 16.25V1.25"
        stroke={fill}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const ICON_NAME = 'import';

import { SVGProps } from '@components/Icon/types';

export const Folder = ({
  fill = '#000',
  size = 24,
  tooltip = 'Folder',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{tooltip}</title>
    <g transform="translate(1.5, 2.5)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.08008 0C7.66388 0 8.21867 0.255016 8.59863 0.698242L10.7002 3.15039C10.8902 3.37204 11.168 3.5 11.46 3.5H17C19.2091 3.5 21 5.29086 21 7.5V15C21 17.14 19.3194 18.8879 17.2061 18.9951L17 19H4C1.79086 19 1.61064e-08 17.2091 0 15V4C0 1.79086 1.79086 0 4 0H7.08008ZM4 1.40039C2.56406 1.40039 1.40039 2.56406 1.40039 4V15C1.40039 16.4359 2.56406 17.5996 4 17.5996H17C18.4359 17.5996 19.5996 16.4359 19.5996 15V7.5C19.5996 6.06406 18.4359 4.90039 17 4.90039H11.46C10.7593 4.90039 10.0937 4.59347 9.6377 4.06152L7.53613 1.60938C7.42214 1.47639 7.25523 1.40039 7.08008 1.40039H4Z"
        fill={fill}
      />
    </g>
  </svg>
);

export const ICON_NAME = 'folder';

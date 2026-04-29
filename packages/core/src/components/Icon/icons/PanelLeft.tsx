import { SVGProps } from '@components/Icon/types';

export const PanelLeft = ({
  fill = '#000',
  size = 24,
  tooltip = 'Panel Left',
  ...props
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M18.2061 3.00488C20.3194 3.11211 22 4.85996 22 7V17L21.9951 17.2061C21.8913 19.2512 20.2512 20.8913 18.2061 20.9951L18 21H6L5.79395 20.9951C3.7488 20.8913 2.10865 19.2512 2.00488 17.2061L2 17V7C2 4.85996 3.68056 3.11211 5.79395 3.00488L6 3H18L18.2061 3.00488ZM6 4.40039C4.56406 4.40039 3.40039 5.56406 3.40039 7V17C3.40039 18.4359 4.56406 19.5996 6 19.5996H7.7998V4.40039H6ZM9.2002 19.5996H18C19.4359 19.5996 20.5996 18.4359 20.5996 17V7C20.5996 5.56406 19.4359 4.40039 18 4.40039H9.2002V19.5996Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'panelLeft';

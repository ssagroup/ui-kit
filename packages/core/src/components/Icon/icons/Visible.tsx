import { SVGProps } from '@components/Icon/types';

export const Visible = ({
  fill = '#000',
  size = 24,
  tooltip = 'Visible',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ICON_NAME = 'visible';

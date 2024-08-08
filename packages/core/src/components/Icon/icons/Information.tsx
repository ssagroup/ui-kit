import { SVGProps } from '@components/Icon/types';

export const Information = ({
  fill = '#000',
  size = 24,
  tooltip = 'Information',
  ...props
}: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>{tooltip}</title>
    <path
      d="M9.99998 17.8889C14.3651 17.8889 17.9365 14.3175 17.9365 9.95238C17.9365 5.5873 14.3651 2.01587 9.99998 2.01587C5.6349 2.01587 2.06348 5.5873 2.06348 9.95238C2.06348 14.3175 5.6349 17.8889 9.99998 17.8889Z"
      stroke={fill}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99573 7.77759C9.44344 7.77759 8.99573 7.32987 8.99573 6.77759C8.99573 6.2253 9.44344 5.77759 9.99573 5.77759H10.0029C10.5551 5.77759 11.0029 6.2253 11.0029 6.77759C11.0029 7.32987 10.5551 7.77759 10.0029 7.77759H9.99573ZM10.7 13.1268C10.7 13.5134 10.3866 13.8268 9.99999 13.8268C9.61339 13.8268 9.29999 13.5134 9.29999 13.1268V9.15854C9.29999 8.77194 9.61339 8.45854 9.99999 8.45854C10.3866 8.45854 10.7 8.77194 10.7 9.15854V13.1268Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'information';

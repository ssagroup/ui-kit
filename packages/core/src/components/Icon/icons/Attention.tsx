import { SVGProps } from '@components/Icon/types';

export const Attention = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <title>Attention</title>
    <path
      d="M10 1.90479L2.85718 6.1905V13.8095L10 18.5715L17.1429 13.8095V6.1905L10 1.90479Z"
      stroke={fill}
      strokeWidth="1.2"
    />
    <path
      d="M10.7004 6.19048C10.7004 5.80388 10.387 5.49048 10.0004 5.49048C9.6138 5.49048 9.3004 5.80388 9.3004 6.19048V10.1587C9.3004 10.5453 9.6138 10.8587 10.0004 10.8587C10.387 10.8587 10.7004 10.5453 10.7004 10.1587V6.19048ZM9.99622 12.1746C9.44393 12.1746 8.99622 12.6224 8.99622 13.1746C8.99622 13.7269 9.44393 14.1746 9.99622 14.1746H10.0033C10.5556 14.1746 11.0033 13.7269 11.0033 13.1746C11.0033 12.6224 10.5556 12.1746 10.0033 12.1746H9.99622Z"
      fill={fill}
    />
  </svg>
);

import { SVGProps } from '@components/Icon/types';

export const Lock = ({ fill = '#000', size = 24 }: SVGProps) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    fill="none"
    viewBox="0 0 16 21"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Lock</title>
    <path
      d="M13.625 8.41602H13V5.91602C13 3.15852 10.7575 0.916016 8 0.916016C5.2425 0.916016 3 3.15852 3 5.91602V8.41602H2.375C1.34167 8.41602 0.5 9.25685 0.5 10.291V19.041C0.5 20.0752 1.34167 20.916 2.375 20.916H13.625C14.6583 20.916 15.5 20.0752 15.5 19.041V10.291C15.5 9.25685 14.6583 8.41602 13.625 8.41602ZM4.66667 5.91602C4.66667 4.07768 6.16167 2.58268 8 2.58268C9.83833 2.58268 11.3333 4.07768 11.3333 5.91602V8.41602H4.66667V5.91602ZM8.83333 14.851V16.7493C8.83333 17.2093 8.46083 17.5827 8 17.5827C7.53917 17.5827 7.16667 17.2093 7.16667 16.7493V14.851C6.67083 14.5618 6.33333 14.0302 6.33333 13.416C6.33333 12.4968 7.08083 11.7493 8 11.7493C8.91917 11.7493 9.66667 12.4968 9.66667 13.416C9.66667 14.0302 9.32917 14.5618 8.83333 14.851Z"
      fill={fill}
    />
  </svg>
);
import { SVGProps } from '@components/Icon/types';

export const Copy = ({ fill = '#000', size = 15 }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 15 15"
    fill="none">
    <title>Copy</title>
    <g clipPath="url(#clip0_532_12716)">
      <path
        d="M12.8755 14.5239H5.40479C4.49601 14.5239 3.75684 13.7848 3.75684 12.876V5.40527C3.75684 4.4965 4.49601 3.75732 5.40479 3.75732H12.8755C13.7843 3.75732 14.5234 4.4965 14.5234 5.40527V12.876C14.5234 13.7848 13.7843 14.5239 12.8755 14.5239ZM5.40479 4.85596C5.10189 4.85596 4.85547 5.10238 4.85547 5.40527V12.876C4.85547 13.1789 5.10189 13.4253 5.40479 13.4253H12.8755C13.1784 13.4253 13.4248 13.1789 13.4248 12.876V5.40527C13.4248 5.10238 13.1784 4.85596 12.8755 4.85596H5.40479ZM2.6582 10.1294H2.10889C1.80599 10.1294 1.55957 9.88297 1.55957 9.58008V2.10938C1.55957 1.80648 1.80599 1.56006 2.10889 1.56006H9.57959C9.88249 1.56006 10.1289 1.80648 10.1289 2.10938V2.63123H11.2275V2.10938C11.2275 1.2006 10.4884 0.461426 9.57959 0.461426H2.10889C1.20011 0.461426 0.460938 1.2006 0.460938 2.10938V9.58008C0.460938 10.4889 1.20011 11.228 2.10889 11.228H2.6582V10.1294Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_532_12716">
        <rect width={size} height={size} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
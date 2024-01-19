import { SVGProps } from '@components/Icon/types';

export const Unlock = ({ fill = '#000', size = 24, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 15 15"
    fill="none"
    {...props}>
    <path
      d="M6.65912 9.39867C6.65912 8.92244 7.02368 8.55788 7.49991 8.55788C7.97614 8.55788 8.3407 8.92244 8.3407 9.39867C8.3407 9.65047 8.22903 9.87161 8.06044 10.0117V10.8C8.06044 11.1087 7.80864 11.3605 7.49991 11.3605C7.19118 11.3605 6.93939 11.1087 6.93939 10.8V10.0117C6.77079 9.87161 6.65912 9.65047 6.65912 9.39867Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.83532 0.155603C6.18303 0.0480855 6.53419 -0.00110042 6.87832 1.86603e-05C6.9938 2.86739e-05 7.10506 0.00696763 7.2172 0.0182945C8.58196 0.158886 9.80554 1.10042 10.2356 2.48784L10.2423 2.50954V2.51968C10.2737 2.62671 10.3587 2.90395 10.4389 3.1641C10.4816 3.3028 10.5228 3.43589 10.5532 3.53432L10.6022 3.69236C10.6572 3.84181 10.6239 4.00725 10.5205 4.1254L10.5198 4.12618C10.4137 4.24582 10.2505 4.29597 10.0952 4.25777C9.94024 4.22049 9.821 4.09922 9.78152 3.94804L9.73402 3.79382C9.70448 3.69783 9.66443 3.56751 9.62239 3.43024C9.53858 3.15656 9.44609 2.8527 9.41386 2.73987L9.40808 2.71967V2.71315C8.96217 1.32972 7.47234 0.553255 6.08177 0.985168C4.68006 1.42061 3.88983 2.91025 4.3238 4.30953L4.38411 4.50397H4.38227C4.49217 4.83056 4.65126 5.33061 4.73747 5.60528H11.9841C12.5279 5.60528 12.9749 6.05233 12.9749 6.59607V13.3224C12.9749 13.8661 12.5279 14.3132 11.9841 14.3132H3.01569C2.47195 14.3132 2.0249 13.8661 2.0249 13.3224V6.59607C2.0249 6.05233 2.47195 5.60528 3.01569 5.60528H3.82849C3.71189 5.22705 3.56504 4.75383 3.50527 4.58903L3.49628 4.56425V4.54284C2.93702 2.69678 3.99409 0.727215 5.83532 0.155603ZM3.01569 6.46581C2.94308 6.46581 2.88543 6.52346 2.88543 6.59607V13.3224C2.88543 13.395 2.94308 13.4527 3.01569 13.4527H11.9841C12.0567 13.4527 12.1144 13.395 12.1144 13.3224V6.59607C12.1144 6.52346 12.0567 6.46581 11.9841 6.46581H3.01569Z"
      fill={fill}
    />
  </svg>
);

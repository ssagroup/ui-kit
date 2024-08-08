import { SVGProps } from '@components/Icon/types';

export const BanUser = ({
  fill = '#000',
  size = 24,
  tooltip = 'Ban User',
  ...props
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 15 15"
    fill="none"
    {...props}>
    <title>{tooltip}</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.32475 6.84657C7.1623 6.84657 7.88756 6.54617 8.48015 5.95349C9.07273 5.36091 9.37313 4.63584 9.37313 3.79819C9.37313 2.96082 9.07273 2.23566 8.48005 1.64289C7.88737 1.0504 7.16221 0.75 6.32475 0.75C5.4871 0.75 4.76203 1.0504 4.16945 1.64298C3.57686 2.23557 3.27637 2.96073 3.27637 3.79819C3.27637 4.63584 3.57686 5.361 4.16954 5.95359C4.76222 6.54608 5.48739 6.84657 6.32475 6.84657ZM6.32475 5.94322C6.92265 5.94322 7.41813 5.73806 7.84133 5.31478C8.26459 4.89153 8.46978 4.39615 8.46978 3.79819C8.46978 3.20064 8.26472 2.70522 7.84139 2.28175C7.41803 1.8586 6.92244 1.65335 6.32475 1.65335C5.72679 1.65335 5.23146 1.85849 4.80821 2.28174C4.3849 2.70505 4.17971 3.2005 4.17971 3.79819C4.17971 4.39607 4.3849 4.89146 4.8082 5.31472C5.23165 5.73801 5.7272 5.94322 6.32475 5.94322Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.40491 7.07368C8.64621 6.91658 8.77116 6.86356 8.90035 6.86356C9.22933 6.86356 9.53687 6.91918 9.81438 7.02897C10.0929 7.13934 10.3337 7.29065 10.5304 7.47884C10.7185 7.65873 10.8861 7.87734 11.0288 8.1284C11.0678 8.1969 11.1046 8.26625 11.1392 8.33627C11.0663 8.33083 10.9926 8.32806 10.9183 8.32806C10.6539 8.32806 10.3974 8.3631 10.1531 8.42877C10.0742 8.31154 9.99081 8.21279 9.90601 8.13169C9.80175 8.03193 9.66283 7.94068 9.48207 7.86897C9.34396 7.81433 9.18229 7.77844 8.9962 7.76925C8.97133 7.78386 8.93928 7.8037 8.89778 7.83072C8.74653 7.92935 8.57059 8.04279 8.37518 8.16765L8.37421 8.16827C8.12063 8.32984 7.81769 8.4572 7.49865 8.56025C7.14272 8.67538 6.77433 8.73598 6.40429 8.73598C6.03408 8.73598 5.6658 8.67533 5.30974 8.56026C4.99111 8.45733 4.68724 8.32948 4.43366 8.16772C4.23995 8.04394 4.06384 7.93045 3.91037 7.83047C3.86914 7.80359 3.83709 7.78371 3.81234 7.76916C3.62639 7.77837 3.46492 7.81428 3.32696 7.86893C3.14647 7.94039 3.00743 8.0315 2.90291 8.13146C2.78463 8.24474 2.66913 8.39197 2.56542 8.57459C2.45769 8.76425 2.37195 8.95964 2.30978 9.15379C2.24417 9.35897 2.18714 9.59032 2.142 9.84182C2.09594 10.0986 2.06597 10.3352 2.05148 10.5448C2.03619 10.7652 2.02835 10.9957 2.02835 11.2297C2.02835 11.6847 2.16507 11.9681 2.37189 12.1652C2.5854 12.3684 2.89015 12.503 3.35755 12.503H8.21879C8.37265 12.8428 8.5889 13.1489 8.85275 13.4063H3.35755C2.6994 13.4063 2.15819 13.2089 1.74916 12.8196C1.33502 12.4252 1.125 11.8904 1.125 11.2297C1.125 10.9758 1.1335 10.7245 1.1503 10.4823C1.16739 10.2351 1.20196 9.96602 1.25284 9.68233C1.30421 9.39613 1.37036 9.12566 1.44944 8.87837C1.53132 8.62259 1.64256 8.37028 1.77996 8.1284C1.92248 7.87744 2.09021 7.65892 2.27821 7.47894C2.47509 7.29055 2.71601 7.13924 2.99429 7.02907C3.27171 6.91918 3.57915 6.86347 3.90823 6.86347C4.03743 6.86347 4.16247 6.91648 4.40348 7.07358C4.55421 7.17178 4.72802 7.28379 4.92008 7.40652C5.08568 7.51216 5.31027 7.61113 5.5874 7.70064C5.85834 7.78822 6.13306 7.83264 6.40429 7.83264C6.67553 7.83264 6.95034 7.78822 7.22099 7.70064C7.49841 7.61103 7.723 7.51206 7.8888 7.40642C8.08269 7.28254 8.2564 7.17053 8.40491 7.07368Z"
      fill={fill}
    />
    <path
      d="M12.1119 10.0904C12.2736 10.2521 12.2736 10.5143 12.1119 10.6759L11.5013 11.2865L12.1119 11.8971C12.2736 12.0588 12.2736 12.3209 12.1119 12.4826C11.9502 12.6443 11.688 12.6443 11.5263 12.4826L10.9158 11.8721L10.3052 12.4826C10.1435 12.6443 9.88134 12.6443 9.71965 12.4826C9.55796 12.3209 9.55796 12.0588 9.71965 11.8971L10.3302 11.2865L9.71965 10.6759C9.55796 10.5143 9.55796 10.2521 9.71965 10.0904C9.88134 9.92872 10.1435 9.92872 10.3052 10.0904L10.9158 10.701L11.5263 10.0904C11.688 9.92872 11.9502 9.92872 12.1119 10.0904Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.9573 11.289C7.9573 9.65946 9.28871 8.32806 10.9183 8.32806C12.5478 8.32806 13.8792 9.65946 13.8792 11.289C13.8792 12.9186 12.5478 14.25 10.9183 14.25C9.28871 14.25 7.9573 12.9186 7.9573 11.289ZM10.9183 9.23141C9.78761 9.23141 8.86065 10.1584 8.86065 11.289C8.86065 12.4197 9.78761 13.3467 10.9183 13.3467C12.0489 13.3467 12.9759 12.4197 12.9759 11.289C12.9759 10.1584 12.0489 9.23141 10.9183 9.23141Z"
      fill={fill}
    />
  </svg>
);

export const ICON_NAME = 'ban-user';

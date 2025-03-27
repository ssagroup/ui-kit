import { useTheme } from '@emotion/react';
import { ClassnameArray } from '@ssa-ui-kit/utils';
import { useCollapsibleNavBarItemContext } from '../CollapsibleNavBarItemContext';

export const CustomIcon = () => {
  const size = 24;
  const props = {};
  const theme = useTheme();
  const fill = theme.colors.grey;
  const { isActive, isHover } = useCollapsibleNavBarItemContext();
  const classNames = new ClassnameArray();
  classNames.push('svg-icon');
  classNames.toggle('is-active', isActive);
  classNames.toggle('is-hover', isHover);

  return (
    <svg
      className={classNames.join(' ')}
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        '&.is-active > path, &:hover > path, &:not(.is-active):hover > path, &:not(.is-active).is-hover > path':
          {
            fill: theme.colors.white,
          },
      }}
      {...props}>
      <path
        d="M708.76 993.953333a53.366667 53.366667 0 0 1-46.28-26.666666L532.1 741.466667l-154.666667 148.586666A21.333333 21.333333 0 0 1 341.333333 874.666667V192a21.333333 21.333333 0 0 1 6.706667-15.526667c5.333333-5.02 15.26-8.74 25.72-2.666666l91.946667 53.086666 498.833333 288a21.333333 21.333333 0 0 1-4.733333 38.966667l-206 59.64 130.386666 225.826667a53.333333 53.333333 0 0 1-19.526666 72.826666l-129.333334 74.666667a53.02 53.02 0 0 1-26.573333 7.133333z m-171.806667-308.073333a20.666667 20.666667 0 0 1 3 0.213333 21.333333 21.333333 0 0 1 15.48 10.453334l144 249.413333a10.666667 10.666667 0 0 0 14.566667 3.906667l129.333333-74.666667a10.666667 10.666667 0 0 0 3.906667-14.573333l-144-249.413334a21.333333 21.333333 0 0 1 12.546667-31.16l184.053333-53.286666L384 228.953333v595.633334l138.18-132.76a21.333333 21.333333 0 0 1 14.773333-5.946667zM298.666667 661.333333a21.333333 21.333333 0 0 0-21.333334-21.333333H96a10.666667 10.666667 0 0 1-10.666667-10.666667V96a10.666667 10.666667 0 0 1 10.666667-10.666667h746.666667a10.666667 10.666667 0 0 1 10.666666 10.666667v266.666667a21.333333 21.333333 0 0 0 42.666667 0V96a53.393333 53.393333 0 0 0-53.333333-53.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333333v533.333333a53.393333 53.393333 0 0 0 53.333333 53.333334h181.333333a21.333333 21.333333 0 0 0 21.333334-21.333334z"
        fill={fill}
      />
    </svg>
  );
};

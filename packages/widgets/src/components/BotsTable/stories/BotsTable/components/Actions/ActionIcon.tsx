import { useTheme } from '@emotion/react';
import { Icon } from '@ssa-ui-kit/core';

export const ActionIcon = ({
  name,
}: {
  name: Parameters<typeof Icon>[0]['name'];
}) => {
  const theme = useTheme();
  return <Icon name={name} size={15} color={theme.colors.greyFilterIcon} />;
};

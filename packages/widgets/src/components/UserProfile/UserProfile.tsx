import { useTheme } from '@emotion/react';
import {
  Button,
  Icon,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '@ssa-ui-kit/core';
import { UserProfileProps } from './types';
import {
  UserInfo,
  ContentWrapper,
  LogoutWrapper,
  ResetBtnStyles,
  CustomButton,
} from './styles';

export const UserProfile = ({ name, email, trigger }: UserProfileProps) => {
  const theme = useTheme();
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger css={ResetBtnStyles}>{trigger}</PopoverTrigger>
      <PopoverContent css={ContentWrapper}>
        <div css={UserInfo}>
          <PopoverHeading variant="h5" weight="bold">
            {name}
          </PopoverHeading>
          <PopoverDescription
            css={{ fontSize: 14, marginTop: 6 }}
            weight="regular"
            color={theme.colors.greyDropdownFocused}>
            {email}
          </PopoverDescription>
        </div>
        <div css={LogoutWrapper}>
          <Button variant="info" css={CustomButton}>
            <Icon name="log-out" size={15} color={theme.colors.white} />
            Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

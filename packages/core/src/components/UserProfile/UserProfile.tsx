import { useTheme } from '@emotion/react';
import Button from '@components/Button';
import Icon from '@components/Icon';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '@components/Popover';
import Wrapper from '@components/Wrapper';
import { UserProfileProps } from './types';
import {
  UserInfo,
  ContentWrapper,
  LogoutWrapper,
  ResetBtnStyles,
  CustomButton,
  CustomContentWrapper,
  AdditionalInfo,
} from './styles';

export const UserProfile = ({
  name,
  email,
  trigger,
  onClick,
  logOutText = 'Log Out',
  className,
  additionalInfo,
  customContent,
}: UserProfileProps) => {
  const theme = useTheme();

  return (
    <Popover placement="bottom-end" interactionsEnabled="both">
      <PopoverTrigger css={ResetBtnStyles}>{trigger}</PopoverTrigger>
      <PopoverContent css={ContentWrapper(theme)} className={className}>
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
          {additionalInfo && additionalInfo.length > 0 && (
            <Wrapper
              direction="column"
              alignItems="flex-start"
              css={AdditionalInfo(theme)}>
              {additionalInfo.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </Wrapper>
          )}
        </div>
        {customContent && (
          <Wrapper css={CustomContentWrapper(theme)}>{customContent}</Wrapper>
        )}
        <div css={LogoutWrapper(theme)}>
          <Button variant="info" css={CustomButton} onClick={onClick}>
            <Icon name="log-out" size={15} color={theme.colors.white} />
            {logOutText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

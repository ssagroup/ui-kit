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
import { UserProfileProps } from './types';
import {
  UserInfo,
  ContentWrapper,
  LogoutWrapper,
  ResetBtnStyles,
  CustomButton,
  CustomContentWrapper,
  AdditionalInfoWrapper,
} from './styles';

/**
 * UserProfile - User profile dropdown with logout functionality
 *
 * A user profile component that displays user information (name, email) and a
 * logout button in a popover dropdown. Supports custom trigger elements, additional
 * information display, and custom content sections. Uses Popover component for
 * positioning and interactions.
 *
 * Component structure:
 * - UserProfile (main component)
 *   - Popover (wrapper with positioning)
 *     - PopoverTrigger (custom trigger element)
 *     - PopoverContent (profile content)
 *       - UserInfo (name, email, additional info)
 *       - CustomContent (optional custom section)
 *       - LogoutButton (logout action)
 *
 * @category Components
 * @subcategory Navigation
 *
 * @example
 * ```tsx
 * // Basic user profile with icon trigger
 * <UserProfile
 *   name="John Doe"
 *   email="john.doe@example.com"
 *   trigger={<Icon name="user" size={32} />}
 *   onClick={() => handleLogout()}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With avatar trigger and additional info
 * <UserProfile
 *   name="Jane Smith"
 *   email="jane@example.com"
 *   trigger={<Avatar src="/avatar.jpg" size={40} />}
 *   onClick={handleLogout}
 *   additionalInfo={[
 *     <Typography key="role">Administrator</Typography>,
 *     <Typography key="department">Engineering</Typography>,
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With custom content section
 * <UserProfile
 *   name="Bob Johnson"
 *   email="bob@example.com"
 *   trigger={<Button variant="secondary">Profile</Button>}
 *   onClick={handleLogout}
 *   customContent={
 *     <div css={{ padding: '12px', borderTop: '1px solid #eee' }}>
 *       <Button onClick={handleSettings} variant="secondary">
 *         Settings
 *       </Button>
 *     </div>
 *   }
 *   logOutText="Sign Out"
 * />
 * ```
 *
 * @see {@link Popover} - Used for dropdown positioning and interactions
 * @see {@link Icon} - Common trigger element
 * @see {@link Avatar} - Common trigger element
 *
 * @accessibility
 * - ARIA attributes via Popover component
 * - Keyboard navigation support
 * - Screen reader friendly
 * - Proper focus management
 * - Semantic heading structure
 */
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
      <PopoverContent css={ContentWrapper} className={className}>
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
            <AdditionalInfoWrapper>
              {additionalInfo.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </AdditionalInfoWrapper>
          )}
        </div>
        {customContent && (
          <CustomContentWrapper>{customContent}</CustomContentWrapper>
        )}
        <div css={LogoutWrapper}>
          <Button variant="primary" css={CustomButton} onClick={onClick}>
            <Icon name="log-out" size={15} color={theme.colors.white} />
            {logOutText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

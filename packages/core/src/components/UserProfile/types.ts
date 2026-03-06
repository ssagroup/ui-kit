import { ReactNode } from 'react';

/**
 * Props for the UserProfile component
 *
 * A user profile dropdown component that displays user information and a logout
 * button in a popover. Supports custom trigger elements, additional info, and
 * custom content sections.
 *
 * @example
 * ```tsx
 * // Basic user profile
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
 * // With additional info
 * <UserProfile
 *   name="Jane Smith"
 *   email="jane@example.com"
 *   trigger={<Avatar src="/avatar.jpg" />}
 *   onClick={handleLogout}
 *   additionalInfo={[
 *     <Typography key="role">Administrator</Typography>,
 *     <Typography key="org">Acme Corp</Typography>,
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With custom content
 * <UserProfile
 *   name="Bob Johnson"
 *   email="bob@example.com"
 *   trigger={<Button>Profile</Button>}
 *   onClick={handleLogout}
 *   customContent={
 *     <div>
 *       <Button onClick={handleSettings}>Settings</Button>
 *       <Button onClick={handlePreferences}>Preferences</Button>
 *     </div>
 *   }
 *   logOutText="Sign Out"
 * />
 * ```
 */
export interface UserProfileProps {
  /**
   * User's full name
   * Displayed as heading in the profile popover
   */
  name: string;

  /**
   * User's email address
   * Displayed as description text in the profile popover
   */
  email: string;

  /**
   * Trigger element that opens the profile popover
   * Can be a string, icon, avatar, button, or any React element
   */
  trigger: string | React.JSX.Element;

  /**
   * Callback function when logout button is clicked
   * Typically handles user logout logic
   */
  onClick: () => void;

  /**
   * Text for the logout button
   * @default 'Log Out'
   */
  logOutText?: string;

  /**
   * Custom CSS class name for the popover content
   */
  className?: string;

  /**
   * Array of additional information elements
   * Displayed between email and custom content sections
   * Each element is rendered in a wrapper div
   */
  additionalInfo?: ReactNode[];

  /**
   * Custom content section
   * Displayed between user info and logout button
   * Useful for additional actions or information
   */
  customContent?: ReactNode;
}

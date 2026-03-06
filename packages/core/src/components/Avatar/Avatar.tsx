import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * Avatar - Circular image component for user profiles
 *
 * A simple circular avatar component that displays an image with customizable size.
 * The image is displayed with a circular border-radius and centered within the container.
 *
 * @category Components
 * @subcategory Display
 *
 * @example
 * ```tsx
 * // Basic avatar
 * <Avatar size={40} image="/path/to/avatar.jpg" />
 * ```
 *
 * @example
 * ```tsx
 * // Large avatar
 * <Avatar size={100} image={user.avatarUrl} />
 * ```
 *
 * @example
 * ```tsx
 * // Avatar with custom styling
 * <Avatar
 *   size={60}
 *   image="/avatar.png"
 *   css={{ border: '2px solid blue' }}
 * />
 * ```
 *
 * @see {@link UserProfile} - For complete user profile display with avatar
 */
const Avatar = styled.div<{ size: number; image: string } & CommonProps>`
  border-radius: 100px;

  overflow: hidden;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  background: ${({ image }) => `url(${image})`} center / contain no-repeat;
`;

export default Avatar;

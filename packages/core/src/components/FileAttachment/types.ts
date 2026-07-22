import { Interpolation, Theme } from '@emotion/react';
import { IconProps } from '@components/Icon/types';

export interface FileAttachmentFile {
  name: string;
  size: number;
  /** Local file/blob not yet uploaded — used to render an image preview via an object URL. Ignored for non-image file names. */
  content?: File | Blob;
  /** URL of an already-uploaded image, e.g. returned by the backend. Ignored for non-image file names. Takes precedence over `content`. */
  previewUrl?: string;
}

export interface FileAttachmentProps {
  file: FileAttachmentFile;
  size?: 'large' | 'small';
  progress?: number;
  progressDisplay?: 'text' | 'bar';
  uploadingText?: string;
  uploadedText?: string;
  showDescription?: boolean;
  icon?: IconProps['name'];
  isDisabled?: boolean;
  onRemove?: () => void;
  className?: string;
  css?: Interpolation<Theme>;
}

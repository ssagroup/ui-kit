import { IconProps } from '@components/Icon/types';

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${Math.round(bytes / (1024 * 1024))} MB`;
};

const EXTENSION_ICON_MAP: Record<string, IconProps['name']> = {
  pdf: 'file-pdf',
  doc: 'file-word',
  docx: 'file-word',
  xls: 'excel-download',
  xlsx: 'excel-download',
};

/** Returns the file-type icon for a known extension, or `null` when the design's grey Placeholder look should be used instead. */
export const getFileTypeIcon = (fileName: string): IconProps['name'] | null => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return (extension && EXTENSION_ICON_MAP[extension]) || null;
};

const IMAGE_FILE_NAME_REGEX = /\.(png|jpe?g|gif|webp|bmp|avif|svg)$/i;

/** Gates image-preview rendering strictly on the file name's extension, so a pdf/php/etc. is never rendered via `<img>` even if preview data is (incorrectly) supplied for it. */
export const isImageFile = (fileName: string): boolean =>
  IMAGE_FILE_NAME_REGEX.test(fileName);

import { Interpolation, Theme } from '@emotion/react';

export type FileRejectionReason = 'size' | 'format';

export interface FileUploadProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  actionText?: string;
  error?: string;
  disabled?: boolean;
  css?: Interpolation<Theme>;
  allowedFormats?: string[];
  maxFileSize?: number;

  isMultiFile?: boolean;
  maxFiles?: number;
  withDropArea?: boolean;
  uploadedSectionTitle?: string;

  className?: string;
  value?: File | File[];
  onChange?: (files: File[]) => void;
  onFileRejected?: (file: File, reason: FileRejectionReason) => void;
}

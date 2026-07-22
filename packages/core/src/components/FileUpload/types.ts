import { Interpolation, Theme } from '@emotion/react';

export type FileRejectionReason = 'size' | 'format';

export interface FileUploadProgressEntry {
  name: string;
  progress: number;
}

/** A single percentage applies to every listed file uniformly; a list matches per-file by `name` — files with no matching entry show no progress. */
export type FileUploadProgress = number | FileUploadProgressEntry[];

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
  /** Upload progress for files in the multi-file list (`isMultiFile`). FileUpload only handles local selection, not the network upload itself — pass this in as the consumer's own upload reports progress. Files with no corresponding progress show just their size. */
  uploadProgress?: FileUploadProgress;
  /** Single-file mode only (`!isMultiFile`, ignored when `withDropArea` is set — its own selected-file view already covers this): show the selected file as a `FileAttachment` card below the input, instead of inline text next to the button. The input row then always shows `placeholder`, matching how multi-file mode behaves. */
  showFileAttachment?: boolean;

  className?: string;
  value?: File | File[];
  onChange?: (files: File[]) => void;
  onFileRejected?: (file: File, reason: FileRejectionReason) => void;
}

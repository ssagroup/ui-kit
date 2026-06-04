import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTheme } from '@emotion/react';
import Button from '@components/Button';
import FormHelperText from '@components/FormHelperText';
import Label from '@components/Label';
import Icon from '@components/Icon';
import FileUploadItem from './FileUploadItem';
import { FileUploadProps, FileRejectionReason } from './types';
import * as S from './styles';

const normalizeValue = (value?: File | File[]): File[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${Math.round(bytes / (1024 * 1024))} MB`;
};

/**
 * FileUpload - File input component with optional drag-and-drop support
 *
 * Supports single and multi-file selection with built-in validation for
 * file formats and size. In multi-file mode, selected files are listed
 * below the input with individual remove controls.
 *
 * @example
 * ```tsx
 * // Single file
 * <FileUpload
 *   label="Attachment"
 *   placeholder="No file selected"
 *   actionText="Choose File"
 *   allowedFormats={['pdf', 'doc']}
 *   maxFileSize={5 * 1024 * 1024}
 *   onChange={(files) => console.log(files)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Multi-file with drop area
 * <FileUpload
 *   label="Documents"
 *   isMultiFile
 *   maxFiles={5}
 *   withDropArea
 *   uploadedSectionTitle="Uploaded files"
 *   value={files}
 *   onChange={setFiles}
 * />
 * ```
 */
const FileUpload = ({
  label,
  placeholder = 'No file selected',
  helperText,
  actionText = 'Choose File',
  error,
  disabled = false,
  css,
  className,
  allowedFormats,
  maxFileSize,
  isMultiFile = false,
  maxFiles,
  withDropArea = false,
  uploadedSectionTitle,
  value,
  onChange,
  onFileRejected,
}: FileUploadProps) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>(normalizeValue(value));
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    setFiles(normalizeValue(value));
  }, [value]);

  const applyValidation = useCallback(
    (incoming: File[]): File[] => {
      const notify = (file: File, reason: FileRejectionReason) =>
        onFileRejected?.(file, reason);

      return incoming.filter((file) => {
        if (
          allowedFormats?.length &&
          !allowedFormats.some(
            (item) =>
              file.name.toLowerCase().endsWith(`.${item.toLowerCase()}`) ||
              file.type.toLowerCase().includes(item.toLowerCase()),
          )
        ) {
          notify(file, 'format');
          return false;
        }

        if (maxFileSize && file.size > maxFileSize) {
          notify(file, 'size');
          return false;
        }

        return true;
      });
    },
    [allowedFormats, maxFileSize, onFileRejected],
  );

  const mergeFiles = useCallback(
    (current: File[], incoming: File[]): File[] => {
      if (!isMultiFile) return incoming.slice(0, 1);

      const combined = [...current, ...incoming];
      return maxFiles ? combined.slice(0, maxFiles) : combined;
    },
    [isMultiFile, maxFiles],
  );

  const handleFilesChange = useCallback(
    (incoming: File[]) => {
      const validated = applyValidation(incoming);
      const merged = mergeFiles(files, validated);
      setFiles(merged);
      onChange?.(merged);
    },
    [files, applyValidation, mergeFiles, onChange],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    handleFilesChange(selected);
    e.target.value = '';
  };

  const handleRemove = (file: File) => {
    const updated = files.filter((f) => f !== file);
    setFiles(updated);
    onChange?.(updated);
  };

  const handleChooseClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    handleFilesChange(Array.from(e.dataTransfer.files));
  };

  const acceptAttr = allowedFormats?.map((f) => `.${f}`).join(',');
  const hasError = !!error;

  const inlineFileName = !isMultiFile && files[0]?.name;
  const showUploadedFiles = isMultiFile && files.length > 0;

  return (
    <div css={[S.wrapper, css]} className={className}>
      {label && <Label isDisabled={disabled}>{label}</Label>}

      <input
        ref={inputRef}
        type="file"
        css={S.hiddenInput}
        multiple={isMultiFile}
        accept={acceptAttr}
        onChange={handleInputChange}
        disabled={disabled}
      />

      {withDropArea ? (
        <div
          css={[
            S.dropArea(theme),
            isDragOver && S.dropAreaActive(theme),
            hasError && S.dropAreaError(theme),
            disabled && S.dropAreaDisabled(theme),
          ]}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!isMultiFile && files[0] ? undefined : handleChooseClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) =>
            e.key === 'Enter' && !files[0] && handleChooseClick()
          }>
          {!isMultiFile && files[0] ? (
            <>
              <Icon
                name="file-pdf"
                size={36}
                color={theme.colors.greyDarker60}
              />
              <span css={S.dropAreaTitle(theme)}>{files[0].name}</span>
              <span css={S.dropAreaHint(theme)}>
                {formatBytes(files[0].size)}
              </span>
              <button
                css={S.dropAreaClearButton(theme)}
                type="button"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(files[0]);
                }}
                aria-label="Remove file">
                <Icon
                  name="delete"
                  size={14}
                  color={theme.colors.greyDarker60}
                />
                Remove
              </button>
            </>
          ) : (
            <>
              <Icon
                name="export"
                size={28}
                color={
                  isDragOver
                    ? theme.palette.primary.main
                    : theme.colors.greyDarker60
                }
              />
              <span css={S.dropAreaTitle(theme)}>
                {placeholder || 'Drag and drop your files'}
              </span>
              {helperText}
              <span css={S.dropAreaAction(theme)}>{actionText}</span>
            </>
          )}
        </div>
      ) : (
        <div
          css={[
            S.inputRow(theme),
            hasError && S.inputRowError(theme),
            disabled && S.inputRowDisabled(theme),
          ]}>
          <Button
            variant="primary"
            size="small"
            text={actionText}
            isDisabled={disabled}
            onClick={handleChooseClick}
            type="button"
          />
          <span
            css={[
              S.fileNameText(theme),
              !inlineFileName && S.placeholderText(theme),
            ]}>
            {inlineFileName || placeholder}
          </span>
        </div>
      )}

      {(error || (helperText && !withDropArea)) && (
        <FormHelperText
          status={error ? 'error' : 'basic'}
          disabled={disabled}
          css={withDropArea ? { marginTop: 12 } : undefined}>
          {error || helperText}
        </FormHelperText>
      )}

      {showUploadedFiles && (
        <div css={S.filesList}>
          {uploadedSectionTitle && (
            <span css={S.filesListTitle(theme)}>{uploadedSectionTitle}</span>
          )}
          {files.map((file, index) => (
            <FileUploadItem
              key={`${file.name}-${index}`}
              file={file}
              onRemove={handleRemove}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

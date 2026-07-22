import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import { FileAttachmentProps } from './types';
import { formatBytes, getFileTypeIcon, isImageFile } from './utils';
import { useFilePreviewUrl } from './hooks';
import * as S from './styles';

/**
 * FileAttachment - Read-only row displaying a single attached/uploading file
 *
 * @example
 * ```tsx
 * <FileAttachment
 *   file={{ name: 'Report.pdf', size: 20 * 1024 * 1024 }}
 *   progress={50}
 *   onRemove={() => handleRemove(file)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Progress bar look instead of the default percentage text
 * <FileAttachment
 *   file={{ name: 'Report.pdf', size: 20 * 1024 * 1024 }}
 *   progress={50}
 *   progressDisplay="bar"
 *   onRemove={() => handleRemove(file)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Omitting `progress` entirely shows just the file size, no progress copy —
 * // e.g. a file that's been selected but whose upload hasn't started yet.
 * <FileAttachment
 *   file={{ name: 'Report.pdf', size: 20 * 1024 * 1024 }}
 *   onRemove={() => handleRemove(file)}
 * />
 * ```
 */
const FileAttachment = ({
  file,
  size = 'large',
  progress,
  progressDisplay = 'text',
  uploadingText = 'Uploading',
  uploadedText = 'Uploaded Successfully',
  showDescription = true,
  icon,
  isDisabled = false,
  onRemove,
  className,
  css: cssProp,
}: FileAttachmentProps) => {
  const theme = useTheme();
  const clampedProgress =
    progress === undefined ? undefined : Math.min(100, Math.max(0, progress));
  const isUploaded = clampedProgress !== undefined && clampedProgress >= 100;
  const iconName = icon ?? getFileTypeIcon(file.name);
  const canPreviewImage = !icon && isImageFile(file.name);
  const objectPreviewUrl = useFilePreviewUrl(
    canPreviewImage ? file.content : undefined,
  );
  const previewSrc = canPreviewImage
    ? (file.previewUrl ?? objectPreviewUrl)
    : undefined;

  return (
    <div
      css={[
        S.container(theme, size),
        isDisabled && S.disabledContainer(theme),
        cssProp,
      ]}
      className={className}>
      <div
        css={[
          S.iconWrapper(size),
          !iconName && !previewSrc && S.placeholderWrapper(theme),
        ]}>
        {previewSrc ? (
          <img src={previewSrc} alt="" css={S.previewImage} />
        ) : (
          <Icon
            name={iconName ?? 'picture'}
            size={
              iconName
                ? S.iconSizeBySize[size]
                : S.placeholderIconSizeBySize[size]
            }
            color={iconName ? theme.colors.greyDarker60 : theme.colors.white}
          />
        )}
      </div>

      <div css={S.textColumn}>
        <span css={S.title(theme)}>{file.name}</span>

        {showDescription && (
          <div css={S.description(theme)}>
            <span>{formatBytes(file.size)}</span>
            {clampedProgress !== undefined && (
              <>
                <span>|</span>
                {progressDisplay === 'bar' ? (
                  <>
                    <div css={S.progressTrack(theme)} role="progressbar">
                      <div
                        css={S.progressFill(theme)}
                        style={{ width: `${clampedProgress}%` }}
                      />
                    </div>
                    <span>{clampedProgress}%</span>
                  </>
                ) : (
                  <>
                    <span>{clampedProgress}%</span>
                    <span css={S.dot(theme)} />
                    <span>{isUploaded ? uploadedText : uploadingText}</span>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {onRemove && (
        <button
          type="button"
          css={S.deleteButton(theme)}
          disabled={isDisabled}
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}>
          <Icon name="delete" size={16} color="currentColor" />
        </button>
      )}
    </div>
  );
};

export default FileAttachment;

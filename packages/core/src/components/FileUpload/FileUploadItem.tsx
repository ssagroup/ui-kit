import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import * as S from './styles';

interface FileUploadItemProps {
  file: File;
  onRemove: (file: File) => void;
  disabled?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileUploadItem = ({ file, onRemove, disabled }: FileUploadItemProps) => {
  const theme = useTheme();

  return (
    <div css={S.fileItem(theme)}>
      <div css={S.fileIconWrapper}>
        <Icon name="file-pdf" size={32} color={theme.colors.greyDarker60} />
      </div>

      <div css={S.fileInfo}>
        <span css={S.fileName(theme)}>{file.name}</span>
        <span css={S.fileSize(theme)}>{formatFileSize(file.size)}</span>
      </div>

      <button
        css={S.deleteButton(theme)}
        type="button"
        disabled={disabled}
        onClick={() => onRemove(file)}
        aria-label={`Remove ${file.name}`}>
        <Icon name="bin" size={16} color="currentColor" />
      </button>
    </div>
  );
};

export default FileUploadItem;

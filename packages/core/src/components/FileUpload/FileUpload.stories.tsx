import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import FileUpload from './FileUpload';
import { FileUploadProps, FileRejectionReason } from './types';

type Args = FileUploadProps;

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed above the input',
    },
    placeholder: {
      control: 'text',
      description:
        'Placeholder text shown when no file is selected. When `withDropArea` is true, this becomes the drop zone title.',
    },
    helperText: {
      control: 'text',
      description:
        'Helper text shown below the input. Replaced by `error` when both are provided.',
    },
    actionText: {
      control: 'text',
      description:
        'Label for the action button. When `withDropArea` is true, this appears as the clickable text at the bottom of the drop zone.',
    },
    error: {
      control: 'text',
      description:
        'Error message shown below the input. Overrides `helperText` when set.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all interactions.',
    },
    isMultiFile: {
      control: 'boolean',
      description:
        'Allows selecting multiple files. Selected files are listed below the input. The input row always shows the placeholder in this mode.',
    },
    withDropArea: {
      control: 'boolean',
      description:
        'Replaces the button + text input row with a drag-and-drop zone.',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed (multi-file mode only).',
    },
    maxFileSize: {
      control: 'number',
      description:
        'Maximum file size in bytes. Files exceeding this are rejected.',
    },
    uploadedSectionTitle: {
      control: 'text',
      description:
        'Title rendered above the uploaded files list — the multi-file list, or the single-file card when `showFileAttachment` is set.',
    },
    uploadProgress: {
      control: { disable: true },
      description:
        "Upload progress for the file(s) shown as FileAttachment cards (multi-file list, or single-file with `showFileAttachment`) — a single number applied to every file, or a `{ name, progress }[]` matched by file name. FileUpload only handles local selection, so this must come from the consumer's own upload. Files with no matching progress show just their size.",
    },
    showFileAttachment: {
      control: 'boolean',
      description:
        'Single-file mode only (ignored when `withDropArea` is set — its own selected-file view already covers this): show the selected file as a FileAttachment card below the input, instead of inline text next to the button. The input row then always shows `placeholder`, matching multi-file mode.',
    },
    allowedFormats: {
      control: { disable: true },
      description:
        'Array of allowed file extensions, e.g. `["pdf", "png"]`. Files not matching are rejected via `onFileRejected`.',
    },
    value: { control: { disable: true } },
    onChange: { control: { disable: true } },
    onFileRejected: { control: { disable: true } },
    css: { control: { disable: true } },
    className: { control: { disable: true } },
  },
  args: {
    label: 'Label',
    placeholder: 'No file selected',
    actionText: 'Choose File',
    disabled: false,
    isMultiFile: false,
    withDropArea: false,
    showFileAttachment: false,
  },
  parameters: {
    docs: {
      description: {
        component: `
File input component supporting single and multi-file selection with optional drag-and-drop.

**Controlled** — always pass \`value\` + \`onChange\` to manage selected files from the parent.

**Validation** — use \`allowedFormats\` and \`maxFileSize\` to silently reject invalid files. Subscribe to \`onFileRejected\` to react to each rejection (e.g. display a toast).

**FileAttachment cards** — multi-file mode always lists selected files as \`FileAttachment\` cards below the input. Single-file mode can opt into the same treatment via \`showFileAttachment\` (ignored when \`withDropArea\` is set). Both accept \`uploadProgress\` and \`uploadedSectionTitle\`; FileUpload only handles local selection, so progress must come from the consumer's own upload.
        `,
      },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
    />
  );
};
Default.args = {};
Default.storyName = 'Default';
Default.parameters = {
  docs: {
    description: {
      story:
        'Basic single-file upload. All props are editable via the Controls panel.',
    },
  },
};

// ─── With helper text ─────────────────────────────────────────────────────────

export const WithHelperText: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
    />
  );
};
WithHelperText.storyName = 'With Helper Text';
WithHelperText.args = {
  label: 'Profile Photo',
  helperText: 'Accepted formats: JPG, PNG. Max size 2 MB.',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  maxFileSize: 2 * 1024 * 1024,
};
WithHelperText.parameters = {
  docs: {
    description: {
      story:
        'Use `helperText` to hint about format or size requirements. Set alongside `allowedFormats` and `maxFileSize` so the hint matches the actual validation.',
    },
  },
};

// ─── With error ───────────────────────────────────────────────────────────────

export const WithError: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
    />
  );
};
WithError.storyName = 'With Error';
WithError.args = {
  label: 'Contract',
  error: 'File is required',
};
WithError.parameters = {
  docs: {
    description: {
      story:
        'Pass `error` to show a validation error below the input. When both `error` and `helperText` are set, `error` takes priority.',
    },
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
    />
  );
};
Disabled.storyName = 'Disabled';
Disabled.args = {
  label: 'Document',
  helperText: 'Upload is currently unavailable.',
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story:
        'Disabled state — all interactions are blocked and the input appears visually muted.',
    },
  },
};

// ─── Single-file with attachment card ──────────────────────────────────────────

export const WithFileAttachment: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
    />
  );
};
WithFileAttachment.storyName = 'Single-file — With FileAttachment Card';
WithFileAttachment.args = {
  label: 'Attachment',
  showFileAttachment: true,
};
WithFileAttachment.parameters = {
  docs: {
    description: {
      story:
        "With `showFileAttachment`, the selected file renders as a `FileAttachment` card below the input (icon, size, delete button, image preview for images) instead of inline text next to the button — the input row always shows the placeholder, matching multi-file mode. Combine with `uploadProgress` (a plain number works here, since there's only ever one file) to show upload progress.",
    },
  },
};

// ─── Multi-file ───────────────────────────────────────────────────────────────

export const MultiFile: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
    />
  );
};
MultiFile.storyName = 'Multi-file';
MultiFile.args = {
  label: 'Documents',
  actionText: 'Add File',
  helperText: 'You can upload up to 5 files.',
  uploadedSectionTitle: 'Uploaded files',
  isMultiFile: true,
  maxFiles: 5,
};
MultiFile.parameters = {
  docs: {
    description: {
      story:
        'With `isMultiFile`, every file the user picks is appended to the list below the input. Use `maxFiles` to cap the total. The input row always shows the placeholder regardless of selection.',
    },
  },
};

// ─── Multi-file with format restriction ───────────────────────────────────────

export const MultiFileWithFormats: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
    />
  );
};
MultiFileWithFormats.storyName = 'Multi-file — With Format Restriction';
MultiFileWithFormats.args = {
  label: 'Reports',
  actionText: 'Add File',
  helperText: 'PDF and Word documents only, max 10 MB each.',
  uploadedSectionTitle: 'Added files',
  isMultiFile: true,
  maxFiles: 3,
  allowedFormats: ['pdf', 'doc', 'docx'],
  maxFileSize: 10 * 1024 * 1024,
};
MultiFileWithFormats.parameters = {
  docs: {
    description: {
      story:
        'Combines `allowedFormats` and `maxFileSize` to reject invalid files silently. Add `onFileRejected` to surface the reason to users.',
    },
  },
};

// ─── Multi-file with upload progress ───────────────────────────────────────────

const makeDemoFile = (name: string, sizeBytes: number) =>
  new File(['x'.repeat(sizeBytes)], name);

// 1x1 px PNG, padded with trailing filler bytes (ignored by PNG decoders past
// the IEND chunk) so the demo shows a realistic file size while still
// rendering as a real, decodable image preview.
const TINY_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const makeImageDemoFile = (name: string, sizeBytes: number) => {
  const binary = atob(TINY_PNG_BASE64);
  const bytes = new Uint8Array(sizeBytes);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], name, { type: 'image/png' });
};

export const MultiFileWithUploadProgress: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([
    makeDemoFile('invoice.pdf', 2 * 1024 * 1024),
    makeImageDemoFile('photo.png', 4 * 1024 * 1024),
    makeDemoFile('notes.docx', 512 * 1024),
  ]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 400 }}
      uploadProgress={[
        { name: 'invoice.pdf', progress: 100 },
        { name: 'photo.png', progress: 45 },
      ]}
    />
  );
};
MultiFileWithUploadProgress.storyName = 'Multi-file — With Upload Progress';
MultiFileWithUploadProgress.args = {
  label: 'Documents',
  uploadedSectionTitle: 'Uploaded files',
  isMultiFile: true,
};
MultiFileWithUploadProgress.parameters = {
  docs: {
    description: {
      story:
        'FileUpload only handles local file selection — it has no upload progress of its own. Pass `uploadProgress` (a single number applied to every file, or a `{ name, progress }[]` matched by file name) as your own upload reports progress. `photo.png` also demonstrates the automatic image preview (its `File` is passed straight through to `FileAttachment`). `notes.docx` has no matching entry, so it shows just its size — the fallback for files with no progress data yet.',
    },
  },
};

// ─── Drop area ────────────────────────────────────────────────────────────────

export const WithDropArea: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 460 }}
    />
  );
};
WithDropArea.storyName = 'With Drop Area';
WithDropArea.args = {
  label: 'Upload Document',
  placeholder: 'Drag and drop your files',
  actionText: 'Select File',
  withDropArea: true,
};
WithDropArea.parameters = {
  docs: {
    description: {
      story:
        'Setting `withDropArea` replaces the button row with a drag-and-drop zone. Clicking anywhere in the zone opens the file picker. When a single file is selected, the zone switches to a file preview with a remove button.',
    },
  },
};

// ─── Drop area multi-file ─────────────────────────────────────────────────────

export const WithDropAreaMultiFile: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 460 }}
    />
  );
};
WithDropAreaMultiFile.storyName = 'With Drop Area — Multi-file';
WithDropAreaMultiFile.args = {
  label: 'Bulk Upload',
  placeholder: 'Drag and drop your files',
  actionText: 'Select Files',
  helperText: 'PDF, PNG or JPG — up to 10 files.',
  uploadedSectionTitle: 'Queued files',
  withDropArea: true,
  isMultiFile: true,
  maxFiles: 10,
  allowedFormats: ['pdf', 'png', 'jpg', 'jpeg'],
};
WithDropAreaMultiFile.parameters = {
  docs: {
    description: {
      story:
        'Drop area combined with multi-file mode. Files are listed below after selection.',
    },
  },
};

// ─── Drop area error ─────────────────────────────────────────────────────────

export const WithDropAreaError: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUpload
      {...args}
      value={files}
      onChange={setFiles}
      css={{ maxWidth: 460 }}
    />
  );
};
WithDropAreaError.storyName = 'With Drop Area — Error';
WithDropAreaError.args = {
  label: 'Required Document',
  placeholder: 'Drag and drop your files',
  actionText: 'Select File',
  error: 'Please upload a required document.',
  withDropArea: true,
};
WithDropAreaError.parameters = {
  docs: {
    description: {
      story:
        'Drop area in error state — the border turns red and the error message appears below.',
    },
  },
};

// ─── onFileRejected ───────────────────────────────────────────────────────────

const REJECTION_MESSAGES: Record<
  FileRejectionReason,
  (name: string) => string
> = {
  size: (name) => `"${name}" exceeds the maximum file size`,
  format: (name) => `"${name}" has an unsupported format`,
};

export const WithFileRejection: Story = (args: Args) => {
  const [files, setFiles] = useState<File[]>([]);
  const [rejections, setRejections] = useState<string[]>([]);

  const handleRejected = (file: File, reason: FileRejectionReason) => {
    setRejections((prev) => [REJECTION_MESSAGES[reason](file.name), ...prev]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 400,
      }}>
      <FileUpload
        {...args}
        value={files}
        onChange={setFiles}
        onFileRejected={handleRejected}
      />
      {rejections.length > 0 && (
        <div>
          <p
            style={{
              margin: '0 0 6px 4px',
              fontSize: 12,
              fontWeight: 600,
              color: '#555',
            }}>
            Rejected files
          </p>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
            {rejections.map((msg, i) => (
              <li
                key={i}
                style={{
                  fontSize: 12,
                  padding: '6px 10px',
                  borderRadius: 8,
                  background: 'rgb(255 235 235)',
                  color: 'rgb(180 30 30)',
                }}>
                {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
WithFileRejection.storyName = 'With File Rejection (onFileRejected)';
WithFileRejection.args = {
  label: 'Restricted Upload',
  helperText: 'PDF only, max 1 MB.',
  actionText: 'Choose File',
  isMultiFile: true,
  uploadedSectionTitle: 'Accepted files',
  allowedFormats: ['pdf'],
  maxFileSize: 1024 * 1024,
};
WithFileRejection.parameters = {
  docs: {
    description: {
      story:
        '`onFileRejected(file, reason)` fires for every file that fails validation. `reason` is either `"size"` or `"format"`. Try uploading a non-PDF file or one larger than 1 MB to see the rejection log below.',
    },
  },
};

// ─── Custom styled (css prop) ─────────────────────────────────────────────────

export const CustomStyled: Story = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload
      label="Custom Upload"
      placeholder="No file selected"
      actionText="Browse"
      helperText="Styles applied via the css prop."
      value={files}
      onChange={setFiles}
      css={{
        maxWidth: 360,
        padding: '12px 16px',
        background: 'rgb(246 244 255)',
        border: '1px solid rgb(180 160 255)',
        borderRadius: 16,
      }}
    />
  );
};
CustomStyled.storyName = 'Custom Styled (css prop)';
CustomStyled.args = {};
CustomStyled.parameters = {
  docs: {
    description: {
      story:
        'Use the `css` prop to override the outer wrapper styles — useful for constraining width, adjusting spacing, or theming the container inside a form. The `css` value is an Emotion `Interpolation<Theme>`, so it can be an object, a template literal, or a theme function.',
    },
  },
};

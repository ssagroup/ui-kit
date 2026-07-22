import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Label from '@components/Label';
import Wrapper from '@components/Wrapper';

import FileAttachment from './FileAttachment';

// 1x1 px PNG, used to build realistic image sources for the preview stories below
// without any network dependency.
const TINY_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const tinyPngFile = (name: string) => {
  const binary = atob(TINY_PNG_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], name, { type: 'image/png' });
};

const meta = {
  title: 'Components/FileAttachment',
  component: FileAttachment,
  argTypes: {
    size: {
      control: 'radio',
      options: ['large', 'small'],
      description: 'Visual size of the row and its file icon.',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Upload progress, 0-100. 100 renders the "uploaded" copy.',
    },
    progressDisplay: {
      control: 'radio',
      options: ['text', 'bar'],
      description:
        'Whether progress is shown as plain percentage text or a progress bar.',
    },
    uploadingText: {
      control: 'text',
      description:
        'Status copy shown next to the percentage while progress is below 100 (text display mode only).',
    },
    uploadedText: {
      control: 'text',
      description:
        'Status copy shown next to the percentage once progress reaches 100 (text display mode only).',
    },
    showDescription: {
      control: 'boolean',
      description: 'Toggles the size/progress/status line below the title.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Dims the row and disables the delete button.',
    },
    icon: {
      control: { disable: true },
      description:
        'Overrides the auto-detected file-type icon (derived from the file extension). Falls back to a grey placeholder icon when the extension is unrecognized.',
    },
    onRemove: {
      control: { disable: true },
      description:
        'Called when the delete button is clicked. The delete button only renders when this is provided.',
    },
    file: {
      control: { disable: true },
      description:
        '`{ name, size, content?, previewUrl? }`. `content` (a local `File`/`Blob`) or `previewUrl` (a remote URL) render an image thumbnail instead of the file-type icon, but only when `name` has an image extension (png/jpg/jpeg/gif/webp/bmp/avif/svg) — `previewUrl` wins if both are given.',
    },
    css: { control: { disable: true } },
    className: { control: { disable: true } },
  },
  args: {
    file: { name: 'Report.pdf', size: 20 * 1024 * 1024 },
    size: 'large',
    progress: 100,
    progressDisplay: 'text',
    uploadingText: 'Uploading',
    uploadedText: 'Uploaded Successfully',
    showDescription: true,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: `
Read-only row displaying a single attached/uploading file — icon, name, size, and progress.

**File-type icon** — auto-detected from the file name's extension (pdf/doc/docx/xls/xlsx). Unrecognized extensions fall back to a grey placeholder icon. Override with \`icon\`.

**Image preview** — pass \`file.content\` (a local \`File\`/\`Blob\`, not yet uploaded) or \`file.previewUrl\` (a remote URL for an already-uploaded image) to render an actual thumbnail instead of the file-type icon. Gated strictly on the file name's extension, so a mislabeled \`.pdf\`/\`.php\`/etc. is never rendered as an \`<img>\` even if preview data is supplied for it.

**Progress** — \`progress\` (0-100, clamped) plus \`progressDisplay\` chooses between plain percentage text or a progress bar. Status copy ("Uploading"/"Uploaded Successfully") is derived automatically and overridable via \`uploadingText\`/\`uploadedText\`. Omitting \`progress\` entirely shows just the size, no percentage/status copy — for files that have been selected but have no upload progress to report yet.

**Delete button** — only rendered when \`onRemove\` is provided.
        `,
      },
    },
  },
} satisfies Meta<typeof FileAttachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onRemove: () => {
      /* no-op */
    },
  },
};

export const NoProgressData: Story = {
  name: 'No progress data (selected, not yet uploading)',
  args: {
    progress: undefined,
    onRemove: () => {
      /* no-op */
    },
  },
};

export const Uploading: Story = {
  args: {
    progress: 50,
    onRemove: () => {
      /* no-op */
    },
  },
};

export const UploadingWithProgressBar: Story = {
  name: 'Uploading — Progress bar',
  args: {
    progress: 50,
    progressDisplay: 'bar',
    onRemove: () => {
      /* no-op */
    },
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    onRemove: () => {
      /* no-op */
    },
  },
};

export const PlaceholderContent: Story = {
  name: 'Unrecognized file type (Placeholder icon)',
  args: {
    file: { name: 'photo.png', size: 3 * 1024 * 1024 },
    onRemove: () => {
      /* no-op */
    },
  },
};

export const ImagePreviewLocalFile: Story = {
  name: 'Image preview — local file (not yet uploaded)',
  args: {
    file: {
      name: 'thumbnail.png',
      size: 812,
      content: tinyPngFile('thumbnail.png'),
    },
    onRemove: () => {
      /* no-op */
    },
  },
};

export const ImagePreviewRemoteUrl: Story = {
  name: 'Image preview — remote URL (already uploaded)',
  args: {
    file: {
      name: 'thumbnail.png',
      size: 812,
      previewUrl: `data:image/png;base64,${TINY_PNG_BASE64}`,
    },
    onRemove: () => {
      /* no-op */
    },
  },
};

export const WithoutDeleteButton: Story = {
  name: 'No delete button (onRemove not provided)',
  args: {},
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    onRemove: () => {
      /* no-op */
    },
  },
};

export const MultipleFiles: Story = {
  name: 'Multiple files (composed list)',
  render: () => {
    const files = [
      { name: 'Report.pdf', size: 20 * 1024 * 1024, progress: 100 },
      { name: 'Budget.xlsx', size: 4 * 1024 * 1024, progress: 100 },
      { name: 'photo.png', size: 2 * 1024 * 1024, progress: 65 },
    ];

    return (
      <Wrapper direction="column" alignItems="flex-start" css={{ gap: 8 }}>
        <Label>Uploaded Files</Label>
        {files.map((file) => (
          <FileAttachment
            key={file.name}
            file={file}
            progress={file.progress}
            onRemove={() => {
              /* no-op */
            }}
          />
        ))}
      </Wrapper>
    );
  },
};

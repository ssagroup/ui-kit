import userEvent from '@testing-library/user-event';
import { screen } from '../../../customTest';

import FileAttachment from './FileAttachment';

describe('FileAttachment', () => {
  it('renders the file name and formatted size', () => {
    render(
      <FileAttachment file={{ name: 'Report.pdf', size: 2 * 1024 * 1024 }} />,
    );

    expect(screen.getByText('Report.pdf')).toBeInTheDocument();
    expect(screen.getByText('2 MB')).toBeInTheDocument();
  });

  describe('progress omitted', () => {
    it('shows only the size, with no percentage or status copy', () => {
      render(
        <FileAttachment file={{ name: 'Report.pdf', size: 2 * 1024 * 1024 }} />,
      );

      expect(screen.getByText('2 MB')).toBeInTheDocument();
      expect(screen.queryByText('|')).not.toBeInTheDocument();
      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
      expect(screen.queryByText('Uploading')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Uploaded Successfully'),
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('still shows only the size when progressDisplay is "bar"', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progressDisplay="bar"
        />,
      );

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('progress text mode (default)', () => {
    it('shows "Uploading" while in progress', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={50}
        />,
      );

      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('Uploading')).toBeInTheDocument();
    });

    it('shows "Uploaded Successfully" at 100%', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={100}
        />,
      );

      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Uploaded Successfully')).toBeInTheDocument();
    });

    it('supports overriding the status text', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={50}
          uploadingText="Sending..."
        />,
      );

      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });

    it('clamps an out-of-range progress value and still treats it as uploaded', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={230}
        />,
      );

      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Uploaded Successfully')).toBeInTheDocument();
    });
  });

  describe('progress bar mode', () => {
    it('renders a filled bar sized to the progress percentage', () => {
      const { container } = render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={30}
          progressDisplay="bar"
        />,
      );

      expect(screen.getByText('30%')).toBeInTheDocument();
      expect(screen.queryByText('Uploading')).not.toBeInTheDocument();

      const fill = container.querySelector(
        'div[style*="width: 30%"]',
      ) as HTMLElement;
      expect(fill).toBeInTheDocument();
    });

    it('exposes the track via role="progressbar"', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={30}
          progressDisplay="bar"
        />,
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('clamps progress above 100 to 100%', () => {
      const { container } = render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={150}
          progressDisplay="bar"
        />,
      );

      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(
        container.querySelector('div[style*="width: 100%"]'),
      ).toBeInTheDocument();
    });

    it('clamps negative progress to 0%', () => {
      const { container } = render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={-20}
          progressDisplay="bar"
        />,
      );

      expect(screen.getByText('0%')).toBeInTheDocument();
      expect(
        container.querySelector('div[style*="width: 0%"]'),
      ).toBeInTheDocument();
    });
  });

  describe('showDescription', () => {
    it('hides both the size and the progress copy when false', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          progress={100}
          showDescription={false}
        />,
      );

      expect(screen.queryByText('1 KB')).not.toBeInTheDocument();
      expect(screen.queryByText('100%')).not.toBeInTheDocument();
    });
  });

  describe('icon resolution', () => {
    it.each([
      ['contract.pdf'],
      ['notes.doc'],
      ['notes.docx'],
      ['budget.xls'],
      ['budget.xlsx'],
    ])('renders a file-type icon for %s', (name) => {
      const { container } = render(
        <FileAttachment file={{ name, size: 1024 }} />,
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('falls back to the placeholder icon for unrecognized extensions', () => {
      render(<FileAttachment file={{ name: 'photo.png', size: 1024 }} />);

      // The placeholder wrapper is present even though no specific file-type icon exists
      expect(screen.getByText('photo.png')).toBeInTheDocument();
    });

    it('respects an explicit icon override', () => {
      const { container } = render(
        <FileAttachment
          file={{ name: 'photo.png', size: 1024 }}
          icon="file-pdf"
        />,
      );

      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('image preview', () => {
    beforeEach(() => {
      (URL.createObjectURL as jest.Mock).mockReturnValue(
        'blob:mock-preview-url',
      );
      URL.revokeObjectURL = jest.fn();
    });

    it('renders an <img> from previewUrl for an image extension', () => {
      const { container } = render(
        <FileAttachment
          file={{
            name: 'photo.png',
            size: 1024,
            previewUrl: 'https://example.com/photo.png',
          }}
        />,
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/photo.png');
    });

    it('renders an <img> from an object URL when a local File/Blob is given', () => {
      const content = new File(['x'], 'photo.png', { type: 'image/png' });
      const { container } = render(
        <FileAttachment file={{ name: 'photo.png', size: 1024, content }} />,
      );

      expect(URL.createObjectURL).toHaveBeenCalledWith(content);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'blob:mock-preview-url');
    });

    it('revokes the object URL on unmount', () => {
      const content = new File(['x'], 'photo.png', { type: 'image/png' });
      const { unmount } = render(
        <FileAttachment file={{ name: 'photo.png', size: 1024, content }} />,
      );

      unmount();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-preview-url');
    });

    it('prefers previewUrl over an object URL when both are given', () => {
      const content = new File(['x'], 'photo.png', { type: 'image/png' });
      const { container } = render(
        <FileAttachment
          file={{
            name: 'photo.png',
            size: 1024,
            content,
            previewUrl: 'https://example.com/photo.png',
          }}
        />,
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/photo.png');
    });

    it.each([['document.pdf'], ['script.php'], ['archive.zip']])(
      'never renders an <img> for a non-image file name like %s, even with preview data',
      (name) => {
        const content = new File(['x'], name);
        const { container } = render(
          <FileAttachment
            file={{
              name,
              size: 1024,
              content,
              previewUrl: 'https://example.com/not-an-image',
            }}
          />,
        );

        expect(container.querySelector('img')).not.toBeInTheDocument();
      },
    );

    it('does not attempt a preview when an explicit icon override is given', () => {
      const { container } = render(
        <FileAttachment
          file={{
            name: 'photo.png',
            size: 1024,
            previewUrl: 'https://example.com/photo.png',
          }}
          icon="file-pdf"
        />,
      );

      expect(container.querySelector('img')).not.toBeInTheDocument();
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('renders a smaller icon in "small" size', () => {
      const { container } = render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          size="small"
        />,
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '24px');
    });

    it('renders a larger icon in "large" size (default)', () => {
      const { container } = render(
        <FileAttachment file={{ name: 'Report.pdf', size: 1024 }} />,
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '40px');
    });
  });

  describe('delete button', () => {
    it('does not render without onRemove', () => {
      render(<FileAttachment file={{ name: 'Report.pdf', size: 1024 }} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onRemove when clicked', async () => {
      const onRemove = jest.fn();
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          onRemove={onRemove}
        />,
      );

      await userEvent.click(
        screen.getByRole('button', { name: 'Remove Report.pdf' }),
      );
      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('is disabled when isDisabled is true', () => {
      render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          onRemove={() => {
            /* no-op */
          }}
          isDisabled
        />,
      );

      expect(
        screen.getByRole('button', { name: 'Remove Report.pdf' }),
      ).toBeDisabled();
    });
  });

  describe('custom styling', () => {
    it('applies a custom className', () => {
      const { container } = render(
        <FileAttachment
          file={{ name: 'Report.pdf', size: 1024 }}
          className="custom-class"
        />,
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});

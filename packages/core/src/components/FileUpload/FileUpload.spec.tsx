import userEvent from '@testing-library/user-event';
import { screen, fireEvent, waitFor, act } from '../../../customTest';

import FileUpload from './FileUpload';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makePdf = (name = 'document.pdf', sizeBytes = 1024) =>
  new File(['x'.repeat(sizeBytes)], name, { type: 'application/pdf' });

const makePng = (name = 'image.png', sizeBytes = 1024) =>
  new File(['x'.repeat(sizeBytes)], name, { type: 'image/png' });

const getFileInput = () =>
  document.querySelector('input[type="file"]') as HTMLInputElement;

/**
 * Upload files directly via fireEvent to bypass the `accept` attribute
 * filtering that userEvent.upload applies. This mirrors what users can do
 * in real browsers (e.g. selecting "All Files" in the OS picker), letting
 * us test our own format validation logic independently.
 */
const uploadFilesDirect = (files: File[]) => {
  const input = getFileInput();
  Object.defineProperty(input, 'files', {
    value: files,
    writable: false,
    configurable: true,
  });
  fireEvent.change(input);
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('FileUpload', () => {
  // ─── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders the label', () => {
      render(<FileUpload label="My Label" />);
      expect(screen.getByText('My Label')).toBeInTheDocument();
    });

    it('renders without a label', () => {
      render(<FileUpload placeholder="No file selected" />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('renders placeholder text', () => {
      render(<FileUpload placeholder="Choose a file…" />);
      expect(screen.getByText('Choose a file…')).toBeInTheDocument();
    });

    it('renders the action button text', () => {
      render(<FileUpload actionText="Browse" />);
      expect(screen.getByText('Browse')).toBeInTheDocument();
    });

    it('renders helper text', () => {
      render(<FileUpload helperText="Max 5 MB" />);
      expect(screen.getByText('Max 5 MB')).toBeInTheDocument();
    });

    it('renders error message and hides helper text when both are provided', () => {
      render(<FileUpload helperText="Max 5 MB" error="File is required" />);
      expect(screen.getByText('File is required')).toBeInTheDocument();
      expect(screen.queryByText('Max 5 MB')).not.toBeInTheDocument();
    });

    it('renders in disabled state', () => {
      render(<FileUpload label="Upload" disabled />);
      expect(getFileInput()).toBeDisabled();
    });
  });

  // ─── Single-file selection ──────────────────────────────────────────────────

  describe('single-file selection', () => {
    it('calls onChange with the selected file', async () => {
      const onChange = jest.fn();
      render(<FileUpload onChange={onChange} />);

      const file = makePdf();
      await userEvent.upload(getFileInput(), file);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([file]);
    });

    it('shows the filename after selection', async () => {
      render(<FileUpload placeholder="No file selected" />);

      await userEvent.upload(getFileInput(), makePdf('report.pdf'));

      expect(screen.getByText('report.pdf')).toBeInTheDocument();
      expect(screen.queryByText('No file selected')).not.toBeInTheDocument();
    });

    it('replaces the previous file when a new one is selected', async () => {
      const onChange = jest.fn();
      render(<FileUpload onChange={onChange} />);

      await userEvent.upload(getFileInput(), makePdf('first.pdf'));
      await userEvent.upload(getFileInput(), makePdf('second.pdf'));

      const lastCall = onChange.mock.calls[
        onChange.mock.calls.length - 1
      ][0] as File[];
      expect(lastCall).toHaveLength(1);
      expect(lastCall[0].name).toBe('second.pdf');
    });

    it('syncs with controlled value prop', () => {
      const file = makePdf('controlled.pdf');
      render(<FileUpload value={file} placeholder="No file selected" />);
      expect(screen.getByText('controlled.pdf')).toBeInTheDocument();
    });
  });

  // ─── showFileAttachment (single-file) ───────────────────────────────────────

  describe('showFileAttachment', () => {
    it('shows the selected file as a card below the input, not inline', async () => {
      render(
        <FileUpload
          showFileAttachment
          placeholder="No file selected"
          onChange={jest.fn()}
        />,
      );

      await userEvent.upload(getFileInput(), makePdf('report.pdf'));

      expect(screen.getByText('report.pdf')).toBeInTheDocument();
      // Input row keeps showing the placeholder instead of the filename
      expect(screen.getByText('No file selected')).toBeInTheDocument();
    });

    it('removes the file via the card delete button', async () => {
      const onChange = jest.fn();
      render(<FileUpload showFileAttachment onChange={onChange} />);

      await userEvent.upload(getFileInput(), makePdf('report.pdf'));
      await userEvent.click(screen.getByLabelText('Remove report.pdf'));

      expect(screen.queryByText('report.pdf')).not.toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith([]);
    });

    it('applies uploadProgress to the single-file card', async () => {
      render(
        <FileUpload
          showFileAttachment
          uploadProgress={65}
          onChange={jest.fn()}
        />,
      );

      await userEvent.upload(getFileInput(), makePdf('report.pdf'));

      expect(screen.getByText('65%')).toBeInTheDocument();
    });

    it('is ignored when withDropArea is set, keeping the drop zone’s own selected-file view', async () => {
      render(
        <FileUpload showFileAttachment withDropArea onChange={jest.fn()} />,
      );

      await userEvent.upload(getFileInput(), makePdf('report.pdf'));

      // The drop zone's own (static-label) remove control is present...
      expect(screen.getByLabelText('Remove file')).toBeInTheDocument();
      // ...but not an additional FileAttachment card/delete button
      // (FileAttachment's delete button label includes the file name).
      expect(
        screen.queryByLabelText('Remove report.pdf'),
      ).not.toBeInTheDocument();
    });
  });

  // ─── Multi-file ─────────────────────────────────────────────────────────────

  describe('multi-file mode', () => {
    it('appends files across multiple selections', async () => {
      const onChange = jest.fn();
      render(<FileUpload isMultiFile onChange={onChange} />);

      await userEvent.upload(getFileInput(), makePdf('a.pdf'));
      await userEvent.upload(getFileInput(), makePdf('b.pdf'));

      const lastCall = onChange.mock.calls[
        onChange.mock.calls.length - 1
      ][0] as File[];
      expect(lastCall).toHaveLength(2);
    });

    it('respects maxFiles cap', async () => {
      const onChange = jest.fn();
      render(<FileUpload isMultiFile maxFiles={2} onChange={onChange} />);

      await userEvent.upload(getFileInput(), [
        makePdf('a.pdf'),
        makePdf('b.pdf'),
        makePdf('c.pdf'),
      ]);

      expect(onChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: 'a.pdf' }),
          expect.objectContaining({ name: 'b.pdf' }),
        ]),
      );
      const result = onChange.mock.calls[0][0] as File[];
      expect(result).toHaveLength(2);
    });

    it('shows uploadedSectionTitle when files are present', async () => {
      render(
        <FileUpload
          isMultiFile
          uploadedSectionTitle="Uploaded files"
          onChange={jest.fn()}
        />,
      );

      await userEvent.upload(getFileInput(), makePdf());

      expect(screen.getByText('Uploaded files')).toBeInTheDocument();
    });

    it('renders a file item for each selected file', async () => {
      render(<FileUpload isMultiFile onChange={jest.fn()} />);

      await userEvent.upload(getFileInput(), [
        makePdf('one.pdf'),
        makePdf('two.pdf'),
      ]);

      expect(screen.getByText('one.pdf')).toBeInTheDocument();
      expect(screen.getByText('two.pdf')).toBeInTheDocument();
    });

    it('removes a file when its delete button is clicked', async () => {
      const onChange = jest.fn();
      render(<FileUpload isMultiFile onChange={onChange} />);

      await userEvent.upload(getFileInput(), [
        makePdf('keep.pdf'),
        makePdf('remove.pdf'),
      ]);

      const removeButtons = screen.getAllByLabelText(/^Remove/);
      const removeButton = removeButtons.find((btn) =>
        btn.getAttribute('aria-label')?.includes('remove.pdf'),
      );
      await userEvent.click(removeButton!);

      expect(screen.queryByText('remove.pdf')).not.toBeInTheDocument();
      expect(screen.getByText('keep.pdf')).toBeInTheDocument();

      const lastCall = onChange.mock.calls[
        onChange.mock.calls.length - 1
      ][0] as File[];
      expect(lastCall).toHaveLength(1);
      expect(lastCall[0].name).toBe('keep.pdf');
    });

    it('does not show any progress copy when uploadProgress is not provided', async () => {
      render(<FileUpload isMultiFile onChange={jest.fn()} />);

      await userEvent.upload(getFileInput(), makePdf('one.pdf'));

      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    });

    it('applies a single uploadProgress number to every file', async () => {
      render(
        <FileUpload isMultiFile onChange={jest.fn()} uploadProgress={40} />,
      );

      await userEvent.upload(getFileInput(), [
        makePdf('one.pdf'),
        makePdf('two.pdf'),
      ]);

      expect(screen.getAllByText('40%')).toHaveLength(2);
    });

    it('matches per-file progress by name, leaving unmatched files without progress', async () => {
      render(
        <FileUpload
          isMultiFile
          onChange={jest.fn()}
          uploadProgress={[{ name: 'one.pdf', progress: 75 }]}
        />,
      );

      await userEvent.upload(getFileInput(), [
        makePdf('one.pdf'),
        makePdf('two.pdf'),
      ]);

      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.queryAllByText(/%/)).toHaveLength(1);
    });
  });

  // ─── Validation / onFileRejected ────────────────────────────────────────────

  describe('file validation', () => {
    it('rejects files with disallowed format and calls onFileRejected', () => {
      const onFileRejected = jest.fn();
      render(
        <FileUpload
          allowedFormats={['pdf']}
          onChange={jest.fn()}
          onFileRejected={onFileRejected}
        />,
      );

      uploadFilesDirect([makePng('photo.png')]);

      expect(onFileRejected).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'photo.png' }),
        'format',
      );
    });

    it('rejects oversized files and calls onFileRejected', async () => {
      const onFileRejected = jest.fn();
      const maxFileSize = 500;
      render(
        <FileUpload
          maxFileSize={maxFileSize}
          onChange={jest.fn()}
          onFileRejected={onFileRejected}
        />,
      );

      await userEvent.upload(
        getFileInput(),
        makePdf('big.pdf', maxFileSize + 1),
      );

      expect(onFileRejected).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'big.pdf' }),
        'size',
      );
    });

    it('does not call onChange for a fully rejected file', () => {
      const onChange = jest.fn();
      render(
        <FileUpload
          allowedFormats={['pdf']}
          onChange={onChange}
          onFileRejected={jest.fn()}
        />,
      );

      uploadFilesDirect([makePng()]);

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('accepts valid files without calling onFileRejected', () => {
      const onFileRejected = jest.fn();
      render(
        <FileUpload
          allowedFormats={['pdf']}
          maxFileSize={10 * 1024}
          onChange={jest.fn()}
          onFileRejected={onFileRejected}
        />,
      );

      uploadFilesDirect([makePdf('valid.pdf', 1024)]);

      expect(onFileRejected).not.toHaveBeenCalled();
    });

    it('reports format rejection before size when both checks fail', () => {
      const onFileRejected = jest.fn();
      render(
        <FileUpload
          allowedFormats={['pdf']}
          maxFileSize={100}
          onChange={jest.fn()}
          onFileRejected={onFileRejected}
        />,
      );

      uploadFilesDirect([makePng('bad.png', 9999)]);

      expect(onFileRejected).toHaveBeenCalledWith(expect.anything(), 'format');
      expect(onFileRejected).not.toHaveBeenCalledWith(
        expect.anything(),
        'size',
      );
    });
  });

  // ─── Drop area ──────────────────────────────────────────────────────────────

  describe('withDropArea', () => {
    it('renders the drop zone instead of the button row', () => {
      render(
        <FileUpload
          withDropArea
          placeholder="Drag and drop your files"
          actionText="Select File"
        />,
      );
      expect(screen.getByText('Drag and drop your files')).toBeInTheDocument();
      expect(screen.getByText('Select File')).toBeInTheDocument();
      // The drop zone is a div with role="button", not a <button> element
      expect(
        document.querySelector('button[type="button"]'),
      ).not.toBeInTheDocument();
    });

    it('accepts dropped files via drag-and-drop', async () => {
      const onChange = jest.fn();
      render(<FileUpload withDropArea onChange={onChange} />);

      const dropZone = screen.getByRole('button');
      const file = makePdf('dropped.pdf');

      await act(() => {
        fireEvent.dragOver(dropZone);
        fireEvent.drop(dropZone, {
          dataTransfer: { files: [file] },
        });
      });

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith([file]);
      });
    });

    it('shows the selected filename inside the drop zone (single-file)', async () => {
      render(<FileUpload withDropArea onChange={jest.fn()} />);

      await userEvent.upload(getFileInput(), makePdf('chosen.pdf'));

      expect(screen.getByText('chosen.pdf')).toBeInTheDocument();
    });

    it('shows a remove button when a file is selected in single-file drop zone', async () => {
      render(<FileUpload withDropArea onChange={jest.fn()} />);

      await userEvent.upload(getFileInput(), makePdf('to-remove.pdf'));

      expect(
        screen.getByRole('button', { name: 'Remove file' }),
      ).toBeInTheDocument();
    });

    it('clears the selection when the remove button is clicked inside the drop zone', async () => {
      const onChange = jest.fn();
      render(
        <FileUpload
          withDropArea
          placeholder="Drag and drop your files"
          onChange={onChange}
        />,
      );

      await userEvent.upload(getFileInput(), makePdf('to-remove.pdf'));
      await userEvent.click(
        screen.getByRole('button', { name: 'Remove file' }),
      );

      expect(screen.queryByText('to-remove.pdf')).not.toBeInTheDocument();
      expect(screen.getByText('Drag and drop your files')).toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith([]);
    });
  });

  // ─── Disabled ───────────────────────────────────────────────────────────────

  describe('disabled state', () => {
    it('does not call onChange when disabled', async () => {
      const onChange = jest.fn();
      render(<FileUpload disabled onChange={onChange} />);

      await userEvent.upload(getFileInput(), makePdf());

      expect(onChange).not.toHaveBeenCalled();
    });

    it('disables delete buttons in multi-file mode', () => {
      render(
        <FileUpload
          isMultiFile
          disabled
          value={[makePdf('locked.pdf')]}
          onChange={jest.fn()}
        />,
      );

      const deleteBtn = screen.getByLabelText('Remove locked.pdf');
      expect(deleteBtn).toBeDisabled();
    });
  });
});

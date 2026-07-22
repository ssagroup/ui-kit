import { useEffect, useState } from 'react';

/** Creates an object URL for a local File/Blob and revokes it on unmount or when `content` changes, avoiding a memory leak. */
export const useFilePreviewUrl = (
  content?: File | Blob,
): string | undefined => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!content) {
      setUrl(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(content);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [content]);

  return url;
};

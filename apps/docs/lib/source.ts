import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';

// Version-skew shim: fumadocs-mdx@11 returns `files` as a lazy function
// (`() => VirtualFile[]`) at runtime, while fumadocs-core@15.8's loader expects
// `files` to be an array. The TS type already declares `files` as an array
// (core's `Source` type), so we only normalize the runtime value and keep the
// original typing — that preserves the typed page data (`page.data.body`, etc.).
const mdxSource = docs.toFumadocsSource();

const filesValue = mdxSource.files as unknown;
const files = (
  typeof filesValue === 'function'
    ? (filesValue as () => unknown[])()
    : filesValue
) as typeof mdxSource.files;

export const source = loader({
  baseUrl: '/docs',
  source: { ...mdxSource, files },
});

import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from '@/components/component-preview';

/**
 * MDX components available to every docs page without an explicit import.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

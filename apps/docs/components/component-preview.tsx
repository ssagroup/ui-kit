'use client';

import { useState, type ReactNode } from 'react';
import { registry } from '@/registry';

/**
 * Renders a live, themed preview of an SSA UI Kit component alongside its source.
 *
 * Usage in MDX:
 *
 * <ComponentPreview name="button-demo">
 * ```tsx
 * <Button variant="primary">Primary</Button>
 * ```
 * </ComponentPreview>
 *
 * `name` resolves to an example in registry/index.tsx; `children` is the fenced
 * code block, rendered by Fumadocs with syntax highlighting in the Code tab.
 */
export function ComponentPreview({
  name,
  children,
}: {
  name: string;
  children?: ReactNode;
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const Example = registry[name];

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-fd-border">
      <div className="flex items-center gap-1 border-b border-fd-border bg-fd-card px-2 py-1.5">
        {(['preview', 'code'] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={
              'rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors ' +
              (tab === value
                ? 'bg-fd-accent text-fd-accent-foreground'
                : 'text-fd-muted-foreground hover:text-fd-foreground')
            }
          >
            {value}
          </button>
        ))}
      </div>

      {tab === 'preview' ? (
        <div className="flex min-h-[180px] items-center justify-center bg-fd-background p-8">
          {Example ? (
            <Example />
          ) : (
            <span className="text-sm text-fd-muted-foreground">
              Unknown preview: <code>{name}</code>
            </span>
          )}
        </div>
      ) : (
        <div className="bg-fd-background [&_pre]:my-0 [&_pre]:rounded-none [&_pre]:border-0">
          {children}
        </div>
      )}
    </div>
  );
}

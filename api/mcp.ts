import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import type { IncomingMessage, ServerResponse } from 'node:http';

const SOURCES = [
  { name: 'core', url: 'https://ui-kit-core.web.app' },
  { name: 'fitness', url: 'https://ui-kit-fitness.web.app' },
  { name: 'templates', url: 'https://ui-kit-template.web.app' },
  { name: 'infra-dash', url: 'https://ui-kit-infra-dash.web.app' },
] as const;

type StoryEntry = {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
  tags?: string[];
};

async function fetchIndex(
  url: string,
): Promise<Record<string, StoryEntry> | null> {
  try {
    const res = await fetch(`${url}/index.json`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { entries?: Record<string, StoryEntry> };
    return data.entries ?? null;
  } catch {
    return null;
  }
}

function createServer() {
  const server = new McpServer({ name: 'ssa-ui-kit', version: '1.0.0' });

  server.tool(
    'list_components',
    'List all available UI components in the SSA UI Kit, grouped by package (core, fitness, templates, infra-dash). Use this before writing any UI code to discover what components exist.',
    {},
    async () => {
      const lines: string[] = ['# SSA UI Kit — Available Components\n'];

      await Promise.all(
        SOURCES.map(async (src) => {
          const entries = await fetchIndex(src.url);
          if (!entries) return;

          const components = new Map<string, string[]>();
          for (const entry of Object.values(entries)) {
            if (entry.type !== 'story') continue;
            if (!components.has(entry.title)) components.set(entry.title, []);
            components.get(entry.title)!.push(entry.name);
          }

          if (components.size === 0) return;
          lines.push(`## ${src.name}`);
          for (const [title, stories] of components) {
            lines.push(`- **${title}** — variants: ${stories.join(', ')}`);
          }
          lines.push('');
        }),
      );

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    },
  );

  server.tool(
    'get_component_docs',
    'Get documentation, story links, and available variants for a specific SSA UI Kit component. Search by component name before using it in code.',
    {
      query: z
        .string()
        .describe(
          'Component name to look up, e.g. "Button", "NumberField", or "Components/Select"',
        ),
    },
    async ({ query }) => {
      const search = query.toLowerCase();
      const sections: string[] = [];

      await Promise.all(
        SOURCES.map(async (src) => {
          const entries = await fetchIndex(src.url);
          if (!entries) return;

          const matched = new Map<string, StoryEntry[]>();
          for (const entry of Object.values(entries)) {
            if (!entry.title.toLowerCase().includes(search)) continue;
            if (!matched.has(entry.title)) matched.set(entry.title, []);
            matched.get(entry.title)!.push(entry);
          }

          for (const [title, items] of matched) {
            const stories = items.filter((e) => e.type === 'story');
            const docs = items.find((e) => e.type === 'docs');
            const base = 'https://uikit.ssa.group/?path=';

            const lines = [`### ${title} (${src.name})`];
            if (docs) lines.push(`- Docs: ${base}/docs/${docs.id}`);
            if (stories.length > 0) {
              lines.push('- Stories:');
              for (const s of stories) {
                lines.push(`  - ${s.name}: ${base}/story/${s.id}`);
              }
            }
            sections.push(lines.join('\n'));
          }
        }),
      );

      const text =
        sections.length > 0
          ? sections.join('\n\n')
          : `No component found matching "${query}"`;

      return {
        content: [{ type: 'text' as const, text }],
      };
    },
  );

  return server;
}

export default async function handler(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse,
) {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on('close', () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}

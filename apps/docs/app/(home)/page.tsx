import Link from 'next/link';

const features = [
  {
    title: 'Live, themed previews',
    body: 'Examples import @ssa-ui-kit/core directly and render with the real Emotion theme — not screenshots.',
    icon: '✦',
  },
  {
    title: 'Instant search',
    body: 'Full-text search across every page, built in. Press ⌘K from anywhere.',
    icon: '⌕',
  },
  {
    title: 'Light & dark',
    body: 'First-class theming out of the box, matching the kit’s design tokens.',
    icon: '◑',
  },
  {
    title: 'Storybook stays',
    body: 'This is the “read the docs” surface. Storybook remains the playground and visual-regression fallback.',
    icon: '⊞',
  },
];

const components = [
  {
    name: 'Button',
    href: '/docs/button',
    body: 'Variants driven entirely by the theme palette.',
  },
  {
    name: 'Typeahead',
    href: '/docs/typeahead',
    body: 'Stateful autocomplete with react-hook-form, fully interactive.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 pt-24 pb-20 text-center">
        {/* Aurora backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="fd-aurora h-[480px] w-[480px] rounded-full bg-fd-primary/20 blur-[120px]" />
          <div className="fd-aurora h-[360px] w-[360px] translate-x-40 rounded-full bg-indigo-500/15 blur-[100px] [animation-delay:-9s]" />
        </div>

        <span className="fd-rise mb-5 inline-flex items-center rounded-full border border-fd-border bg-fd-card/60 px-3 py-1 text-xs text-fd-muted-foreground backdrop-blur">
          Proof of concept · Fumadocs + Next.js
        </span>
        <h1 className="fd-rise mx-auto max-w-3xl text-4xl font-bold tracking-tight [animation-delay:80ms] md:text-6xl">
          SSA UI Kit, documented like a product
        </h1>
        <p className="fd-rise mx-auto mt-6 max-w-xl text-lg text-fd-muted-foreground [animation-delay:160ms]">
          A shadcn-style documentation experience for our component library —
          searchable, themeable, and with live, interactive examples rendered
          from the real <code>@ssa-ui-kit/core</code> package.
        </p>
        <div className="fd-rise mt-10 flex items-center justify-center [animation-delay:240ms]">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-7 py-3 text-sm font-medium text-fd-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:opacity-95"
          >
            Read the docs →
          </Link>
        </div>
        <div className="fd-rise mt-5 inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-card/60 px-3 py-1.5 font-mono text-xs text-fd-muted-foreground [animation-delay:320ms]">
          <span className="text-fd-primary">$</span> pnpm add @ssa-ui-kit/core
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-fd-border bg-fd-card/40 p-5 transition-colors hover:border-fd-primary/40"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
                {f.icon}
              </div>
              <h3 className="mb-1 text-sm font-semibold">{f.title}</h3>
              <p className="text-sm text-fd-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Component teasers */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-24">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Documented in this POC</h2>
          <Link
            href="/docs"
            className="text-sm text-fd-muted-foreground hover:text-fd-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group flex items-center justify-between rounded-xl border border-fd-border bg-fd-card/40 p-5 transition-colors hover:border-fd-primary/40 hover:bg-fd-accent/40"
            >
              <div>
                <h3 className="text-base font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">{c.body}</p>
              </div>
              <span className="text-fd-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-fd-primary">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

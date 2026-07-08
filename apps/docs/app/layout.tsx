import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'SSA UI Kit — Documentation',
    template: '%s · SSA UI Kit',
  },
  description:
    'Documentation for the SSA UI Kit — installation, usage, and live component examples.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ forcedTheme: 'light' }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

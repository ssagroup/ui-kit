<h1 align="center">SSA UI kit</h1>

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://github.com/ssagroup/ui-kit/blob/main/CODE_OF_CONDUCT.md)

![image](https://github.com/user-attachments/assets/48a55da6-0609-4575-8c58-34a7ddc5b7f0)

SSA UI kit is an open-source React-based library combining multiple UI Components, Widgets, Blocks, and Forms classified by application area and implemented following Atomic design principles.

## 🚀 Hero Example

Get started in 60 seconds. Here's a complete example showing Card, Button, Input, and Table working together:

```tsx
import { ThemeProvider } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Input,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellHeader,
  mainTheme,
  Theme as T,
} from '@ssa-ui-kit/core';

// TypeScript: Extend Emotion theme types
declare module '@emotion/react' {
  export interface Theme extends T {}
}

function App() {
  const methods = useForm();
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <ThemeProvider theme={mainTheme}>
      <FormProvider {...methods}>
        <Card>
          <CardHeader>
            <Typography variant="h2">User Management</Typography>
          </CardHeader>
          <CardContent>
            <Input
              name="search"
              placeholder="Search users..."
              register={methods.register}
              css={{ marginBottom: 16 }}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHeader>Name</TableCellHeader>
                  <TableCellHeader>Email</TableCellHeader>
                  <TableCellHeader>Actions</TableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button size="small" text="Edit" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </FormProvider>
    </ThemeProvider>
  );
}
```

## 📦 Installation

```bash
# Core components
npm install @ssa-ui-kit/core
# or
yarn add @ssa-ui-kit/core
# or
pnpm add @ssa-ui-kit/core

# Hooks (optional, separate package)
npm install @ssa-ui-kit/hooks
# or
yarn add @ssa-ui-kit/hooks
# or
pnpm add @ssa-ui-kit/hooks
```

### Peer Dependencies

Make sure you have React 19.x, Emotion, and React Hook Form installed:

```bash
npm install react@19.x react-dom@19.x @emotion/react @emotion/styled react-hook-form
```

## 🏁 Quick Start

### 1. Set up Theme Provider

Wrap your app with `ThemeProvider` from `@emotion/react` and pass `mainTheme`:

```tsx
import { ThemeProvider } from '@emotion/react';
import { mainTheme, Theme as T } from '@ssa-ui-kit/core';

// TypeScript: Extend Emotion theme types (required for TypeScript projects)
declare module '@emotion/react' {
  export interface Theme extends T {}
}

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### 2. TypeScript Setup (if using TypeScript)

In your main entry file (e.g., `src/index.tsx`), add the theme type augmentation:

```tsx
import '@emotion/react';
import { Theme as T } from '@ssa-ui-kit/core';

declare module '@emotion/react' {
  export interface Theme extends T {}
}
```

> [!TIP]
> If you are using a monorepo or a custom Vite/Webpack setup, we recommend putting the `declare module '@emotion/react'` block in a global `types/emotion.d.ts` file to keep your components clean.

## 📚 Component Examples

### Button

Buttons come in multiple variants, sizes, and can include icons:

```tsx
import { Button, Icon } from '@ssa-ui-kit/core';

// Basic button
<Button text="Click me" variant="primary" size="medium" />

// Button with icon
<Button
  text="Save"
  startIcon={<Icon name="check" size={16} />}
  variant="secondary"
/>

// Variants: primary, secondary, tertiary, info, attention
// Sizes: small, medium, large
```

### Input

Form inputs with validation states and helper text:

```tsx
import { Input } from '@ssa-ui-kit/core';
import { useForm, FormProvider } from 'react-hook-form';

function MyForm() {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <Input
        name="email"
        placeholder="Enter your email"
        status="basic" // or 'error', 'success'
        helperText="We'll never share your email"
        showHelperText
      />
    </FormProvider>
  );
}
```

**Note:** Input components work with `react-hook-form`. Wrap your form with `FormProvider` from `react-hook-form`.

### Table

Build data tables with sorting, styling, and row actions:

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellHeader,
} from '@ssa-ui-kit/core';

function UserTable() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCellHeader>Name</TableCellHeader>
          <TableCellHeader>Email</TableCellHeader>
          <TableCellHeader>Role</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## 🎣 Hooks Examples

### useApi

Handle async data fetching with loading and error states:

```tsx
import { useApi } from '@ssa-ui-kit/hooks';

function UserList() {
  const { data, isLoading, error, query } = useApi(
    async (userId: string) => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    }
  );

  useEffect(() => {
    query('123');
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

### useToggle

Toggle between multiple values (useful for boolean or multi-state toggles):

```tsx
import { useToggle } from '@ssa-ui-kit/hooks';

function ToggleExample() {
  // Boolean toggle (default)
  const [isOpen, toggleOpen] = useToggle();

  // Multi-state toggle
  const [theme, toggleTheme] = useToggle(['light', 'dark', 'auto']);

  return (
    <div>
      <button onClick={() => toggleOpen()}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <button onClick={() => toggleTheme()}>
        Theme: {theme}
      </button>
    </div>
  );
}
```

### useWindowSize

Track window dimensions with reactive updates:

```tsx
import { useWindowSize } from '@ssa-ui-kit/hooks';

function ResponsiveComponent() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div>
      <p>Window size: {width}x{height}</p>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### Other Available Hooks

- `useClickOutside` - Detect clicks outside an element
- `useDebouncedCallback` - Debounce function calls
- `useThrottledCallback` - Throttle function calls
- `useClipboard` - Copy to clipboard functionality
- `useDeviceType` - Detect device type
- `useResizeObserver` - Observe element size changes
- `usePaginationRange` - Generate pagination ranges

## 🛠️ Core Technologies

The project is built using:

- [React](https://react.dev/) 19.x
- [TypeScript](https://www.typescriptlang.org/)
- CSS-in-JS with [Emotion](https://emotion.sh/docs/introduction)
- Charts with [Nivo](https://nivo.rocks/)
- [Floating UI](https://floating-ui.com/) for tooltips
- [Storybook](https://storybook.js.org/) for component documentation
- [pNPM](https://pnpm.io/) as package manager

## 📖 Documentation

For detailed component documentation, examples, and API references, visit our [Storybook documentation](https://ssagroup.github.io/ui-kit/).

## 🤝 Want to contribute?

Please refer to our [CONTRIBUTING.md](https://github.com/ssagroup/ui-kit/blob/main/CONTRIBUTING.md).

## 📄 License

[MIT](https://github.com/ssagroup/ui-kit/blob/main/LICENSE)

## 🙏 Thanks

<a href="https://www.lost-pixel.com/"><img src="https://user-images.githubusercontent.com/29632358/168112844-77e76a0d-b96f-4bc8-b753-cd39f4afd428.png" width="100" height="100" alt="Lost Pixel" /></a>

Thanks to [Lost Pixel](https://www.lost-pixel.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.

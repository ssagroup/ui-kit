import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { render as rtlRender, screen } from '@testing-library/react';
import {
  createFeatureFlags,
  resetFeatureFlagWarnings,
} from './createFeatureFlags';

const registry = {
  newThing: {
    description: 'Turns on the new thing.',
    introducedIn: '3.28.0',
    defaultIn: '4.0.0',
    default: false,
    issue: '#999',
  },
  alreadyDefault: {
    description: 'Already on by default.',
    introducedIn: '3.0.0',
    defaultIn: '4.0.0',
    default: true,
  },
};

const { Context, Provider, useFlag, useFlags } = createFeatureFlags(registry);

const Probe = ({ name }: { name: keyof typeof registry }) => (
  <span data-testid={name}>{String(useFlag(name))}</span>
);

const flagText = (name: string) => screen.getByTestId(name).textContent;

describe('createFeatureFlags', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetFeatureFlagWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => warnSpy.mockRestore());

  it('falls back to the registry default with no provider', () => {
    rtlRender(
      <>
        <Probe name="newThing" />
        <Probe name="alreadyDefault" />
      </>,
    );
    expect(flagText('newThing')).toBe('false');
    expect(flagText('alreadyDefault')).toBe('true');
  });

  it('applies provider values', () => {
    rtlRender(
      <Provider flags={{ newThing: true, alreadyDefault: false }}>
        <Probe name="newThing" />
        <Probe name="alreadyDefault" />
      </Provider>,
    );
    expect(flagText('newThing')).toBe('true');
    expect(flagText('alreadyDefault')).toBe('false');
  });

  it('lets an inner provider override only the flags it names', () => {
    rtlRender(
      <Provider flags={{ newThing: true, alreadyDefault: false }}>
        <Provider flags={{ newThing: false }}>
          <Probe name="newThing" />
          <Probe name="alreadyDefault" />
        </Provider>
      </Provider>,
    );
    expect(flagText('newThing')).toBe('false');
    expect(flagText('alreadyDefault')).toBe('false');
  });

  it('treats an undefined value as unset, inheriting the parent', () => {
    rtlRender(
      <Provider flags={{ newThing: true }}>
        <Provider flags={{ newThing: undefined }}>
          <Probe name="newThing" />
        </Provider>
      </Provider>,
    );
    expect(flagText('newThing')).toBe('true');
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('reaches portaled content through the React tree', () => {
    rtlRender(
      <Provider flags={{ newThing: true }}>
        {createPortal(<Probe name="newThing" />, document.body)}
      </Provider>,
    );
    expect(flagText('newThing')).toBe('true');
  });

  it('warns once when an opt-in flag is left undecided', () => {
    rtlRender(
      <>
        <Probe name="newThing" />
        <Probe name="newThing" />
      </>,
    );
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('`newThing`');
    expect(warnSpy.mock.calls[0][0]).toContain('4.0.0');
    expect(warnSpy.mock.calls[0][0]).toContain('#999');
  });

  it('does not warn when the flag is explicitly off or already default', () => {
    rtlRender(
      <Provider flags={{ newThing: false }}>
        <Probe name="newThing" />
        <Probe name="alreadyDefault" />
      </Provider>,
    );
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('warns once about unknown flags passed to the provider', () => {
    const flags = { removedFlag: true } as unknown as { newThing: boolean };
    const { rerender } = rtlRender(<Provider flags={flags} />);
    rerender(<Provider flags={{ ...flags }} />);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('`removedFlag`');
  });

  it('keeps the context value stable across re-renders with equal flags', () => {
    const seen = new Set<unknown>();
    const Spy = () => {
      seen.add(useContext(Context));
      return null;
    };
    const { rerender } = rtlRender(
      <Provider flags={{ newThing: true }}>
        <Spy />
      </Provider>,
    );
    rerender(
      <Provider flags={{ newThing: true }}>
        <Spy />
      </Provider>,
    );
    expect(seen.size).toBe(1);
  });

  it('is silent in production builds', () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    try {
      rtlRender(<Probe name="newThing" />);
      expect(warnSpy).not.toHaveBeenCalled();
    } finally {
      process.env.NODE_ENV = previous;
    }
  });

  describe('useFlags', () => {
    const AllFlags = ({ read }: { read: (keyof typeof registry)[] }) => {
      const flags = useFlags();
      return (
        <span data-testid="all">{read.map((n) => flags[n]).join(',')}</span>
      );
    };

    it('resolves every flag, against providers and defaults', () => {
      rtlRender(
        <Provider flags={{ newThing: true }}>
          <AllFlags read={['newThing', 'alreadyDefault']} />
        </Provider>,
      );
      expect(flagText('all')).toBe('true,true');
    });

    it('lists every registry flag as a key', () => {
      let keys: string[] = [];
      const Keys = () => {
        keys = Object.keys(useFlags());
        return null;
      };
      rtlRender(<Keys />);
      expect(keys).toEqual(['newThing', 'alreadyDefault']);
    });

    it('warns only for flags that are actually read', () => {
      rtlRender(<AllFlags read={['alreadyDefault']} />);
      expect(warnSpy).not.toHaveBeenCalled();

      rtlRender(<AllFlags read={['newThing']} />);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });
});

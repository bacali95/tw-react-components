import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { getValueFromCookie } from '../helpers';

export type ThemeState = 'dark' | 'light' | 'system';

export type LayoutContext = {
  theme: ThemeState;
  resolvedTheme: Exclude<ThemeState, 'system'>;
  setTheme: (theme: ThemeState) => void;
  showIds: boolean;
  toggleShowIds: () => void;
};

export const LayoutContext = createContext<LayoutContext | undefined>(undefined);

export const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const THEME_COOKIE_NAME = 'theme:state';
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const SHOW_IDS_COOKIE_NAME = 'show-ids:state';
export const SHOW_IDS_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const LayoutContextProvider: FC<
  PropsWithChildren<Pick<LayoutContext, 'theme' | 'showIds'>>
> = ({ children, theme: defaultTheme, showIds: defaultShowIds }) => {
  const [theme, _setTheme] = useState(
    defaultTheme ?? getValueFromCookie<ThemeState>(THEME_COOKIE_NAME, 'system'),
  );
  const [showIds, _setShowIds] = useState(
    defaultShowIds ?? getValueFromCookie<boolean>(SHOW_IDS_COOKIE_NAME, false),
  );

  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === 'system' ? getSystemTheme() : theme,
  );

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== 'system') {
      setResolvedTheme(theme);
      return;
    }

    setResolvedTheme(getSystemTheme());

    const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) =>
      setResolvedTheme(getSystemTheme(e));

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);

    mediaQuery.addEventListener('change', handleMediaQuery);

    return () => mediaQuery.removeEventListener('change', handleMediaQuery);
  }, [theme]);

  const setTheme = (theme: ThemeState) => {
    _setTheme(theme);

    // This sets the cookie to keep the theme state.
    document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}`;
  };

  const toggleShowIds = () =>
    _setShowIds((showIds) => {
      const newValue = !showIds;

      // This sets the cookie to keep the showIds state.
      document.cookie = `${SHOW_IDS_COOKIE_NAME}=${newValue}; path=/; max-age=${SHOW_IDS_COOKIE_MAX_AGE}`;

      return newValue;
    });

  return (
    <LayoutContext.Provider value={{ theme, resolvedTheme, setTheme, showIds, toggleShowIds }}>
      {children}
    </LayoutContext.Provider>
  );
};

export function useLayoutContext() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('Please use LayoutContextProvider!');
  }

  return context;
}

function getSystemTheme(e?: MediaQueryList | MediaQueryListEvent) {
  if (typeof window === 'undefined') return 'light';

  if (!e) e = window.matchMedia(THEME_MEDIA_QUERY);

  return e.matches ? 'dark' : 'light';
}

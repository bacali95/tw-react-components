import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type LayoutContext = {
  theme: ThemeState;
  sidebar: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
};

export const LayoutContext = createContext<LayoutContext | undefined>(undefined);

export const LayoutContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(getValueFromLocalStorage<ThemeState>(THEME_KEY, 'light'));
  const [sidebar, setSidebar] = useState(getValueFromLocalStorage<boolean>(SIDEBAR_KEY, true));

  useEffect(() => {
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((theme) => {
      const newValue = theme === 'dark' ? 'light' : 'dark';

      window.localStorage.setItem(THEME_KEY, newValue);

      return newValue;
    });
  };

  const toggleSidebar = () =>
    setSidebar((sidebar) => {
      window.localStorage.setItem(SIDEBAR_KEY, String(!sidebar));

      return !sidebar;
    });

  return (
    <LayoutContext.Provider value={{ theme, toggleTheme, sidebar, toggleSidebar }}>
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

export type ThemeState = 'dark' | 'light';

export const THEME_KEY = 'tw-react-components__theme';

export const SIDEBAR_KEY = 'tw-react-components__sidebar';

function getValueFromLocalStorage<T extends string | boolean>(key: string, _default: T): T {
  const transformers: Record<any, (value: any) => any> = {
    string: String,
    boolean: (value) => value === 'true',
  };

  return typeof window !== 'undefined'
    ? transformers[typeof _default]((window.localStorage.getItem(key) as T) ?? _default)
    : _default;
}

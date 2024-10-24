import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type LayoutContext = {
  theme: ThemeState;
  toggleTheme: () => void;
};

export const LayoutContext = createContext<LayoutContext | undefined>(undefined);

export const LayoutContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(getValueFromLocalStorage<ThemeState>(THEME_KEY, 'light'));

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

  return <LayoutContext.Provider value={{ theme, toggleTheme }}>{children}</LayoutContext.Provider>;
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

function getValueFromLocalStorage<T extends string | boolean>(key: string, _default: T): T {
  const transformers: Record<any, (value: any) => any> = {
    string: String,
    boolean: (value) => value === 'true',
  };

  return typeof window !== 'undefined'
    ? transformers[typeof _default]((window.localStorage.getItem(key) as T) ?? _default)
    : _default;
}

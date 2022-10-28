import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type Props = { className?: string };

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const [theme, setTheme] = useState<Theme>();
  const darkMode = theme === 'dark';

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('color-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Switch
      checked={darkMode}
      onChange={toggleTheme}
      className={classNames(
        className,
        'flex h-8 w-14 items-center rounded-full border p-1 dark:border-blue-700',
        {
          'bg-blue-700': darkMode,
          'bg-gray-100': !darkMode,
        }
      )}
    >
      <div
        className={classNames('flex transform transition duration-200 ease-in-out', {
          'translate-x-6': darkMode,
          'translate-x-0': !darkMode,
        })}
      >
        {darkMode ? (
          <MoonIcon className="h-6 w-6 rounded-full bg-gray-800 p-1 text-white" />
        ) : (
          <SunIcon className="h-6 w-6 rounded-full bg-gray-200 p-1 text-black" />
        )}
      </div>
    </Switch>
  );
};

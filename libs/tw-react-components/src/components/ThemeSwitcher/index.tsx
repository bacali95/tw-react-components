import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { MoonIcon, SunIcon } from 'lucide-react';
import { FC } from 'react';

import { useLayoutContext } from '../../contexts';

type Props = { className?: string };

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useLayoutContext();
  const darkMode = theme === 'dark';

  return (
    <Switch
      checked={darkMode}
      onChange={toggleTheme}
      className={classNames(
        className,
        'flex h-8 w-14 items-center rounded-full border p-1 dark:border-blue-700',
        {
          'bg-blue-700': darkMode,
          'bg-slate-100': !darkMode,
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
          <MoonIcon className="h-6 w-6 rounded-full bg-slate-800 p-1 text-white" />
        ) : (
          <SunIcon className="h-6 w-6 rounded-full bg-slate-200 p-1 text-black" />
        )}
      </div>
    </Switch>
  );
};

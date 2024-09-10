import { MoonIcon, SunIcon } from 'lucide-react';
import { FC } from 'react';

import { useLayoutContext } from '../../contexts';
import { Switch } from '../Switch';

type Props = { className?: string };

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useLayoutContext();
  const darkMode = theme === 'dark';

  return (
    <Switch
      className={className}
      checked={darkMode}
      onCheckedChange={toggleTheme}
      thumbProps={{
        children: darkMode ? (
          <MoonIcon className="h-6 w-6 rounded-full bg-slate-900 p-1 text-white" />
        ) : (
          <SunIcon className="h-6 w-6 rounded-full bg-white p-1 text-black" />
        ),
      }}
    />
  );
};

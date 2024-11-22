import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import type { FC } from 'react';

import { useLayoutContext } from '../../contexts';
import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';

type Props = { className?: string };

export const ThemeSelector: FC<Props> = ({ className }) => {
  const { resolvedTheme, setTheme } = useLayoutContext();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          prefixIcon={resolvedTheme === 'dark' ? MoonIcon : SunIcon}
          className={className}
          variant="text"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => setTheme('light')}>
          <DropdownMenu.Icon icon={SunIcon} />
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>
          <DropdownMenu.Icon icon={MoonIcon} />
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')}>
          <DropdownMenu.Icon icon={MonitorIcon} />
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

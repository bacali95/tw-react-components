import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import type { FC } from 'react';

import { useLayoutContext } from '../../contexts';
import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';

type Props = { className?: string; dataTestId?: string };

export const ThemeSelector: FC<Props> = ({ className, dataTestId = 'theme-selector' }) => {
  const { resolvedTheme, setTheme } = useLayoutContext();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild dataTestId={`${dataTestId}-trigger`}>
        <Button
          prefixIcon={resolvedTheme === 'dark' ? MoonIcon : SunIcon}
          className={className}
          variant="text"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content dataTestId={`${dataTestId}-content`}>
        <DropdownMenu.Item onClick={() => setTheme('light')} dataTestId={`${dataTestId}-light`}>
          <DropdownMenu.Icon icon={SunIcon} />
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')} dataTestId={`${dataTestId}-dark`}>
          <DropdownMenu.Icon icon={MoonIcon} />
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')} dataTestId={`${dataTestId}-system`}>
          <DropdownMenu.Icon icon={MonitorIcon} />
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

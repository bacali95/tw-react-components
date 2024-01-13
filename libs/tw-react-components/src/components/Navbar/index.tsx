import { MenuIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

import { useLayoutContext } from '../../contexts';
import { Button } from '../Button';
import { Card } from '../Card';
import { Flex } from '../Flex';

export const Navbar: FC<PropsWithChildren> = ({ children }) => {
  const { toggleSidebar } = useLayoutContext();

  return (
    <div className="p-1">
      <Card className="select-none !py-2" fullWidth>
        <Flex align="center" justify="between">
          <Button prefixIcon={MenuIcon} transparent onClick={toggleSidebar} />
          <div className="flex items-center gap-2">{children}</div>
        </Flex>
      </Card>
    </div>
  );
};

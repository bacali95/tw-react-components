import { MenuIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

import { useLayoutContext } from '../../contexts';
import { Block } from '../Block';
import { Button } from '../Button';
import { Flex } from '../Flex';

export const Navbar: FC<PropsWithChildren> = ({ children }) => {
  const { toggleSidebar } = useLayoutContext();

  return (
    <Block className="border-b border-slate-100 p-3 dark:border-slate-700/80" fullWidth>
      <Flex align="center" justify="between">
        <Button className="md:hidden" prefixIcon={MenuIcon} transparent onClick={toggleSidebar} />
        <Flex className="ml-auto gap-2" align="center">
          {children}
        </Flex>
      </Flex>
    </Block>
  );
};

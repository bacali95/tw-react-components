import * as Accordion from '@radix-ui/react-accordion';
import { ComponentProps, FC, ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLayoutContext } from '../../contexts';
import { SidebarItemComp } from './SidebarItem';
import { SidebarItemGroup } from './SidebarItemGroup';

export type SidebarItem = {
  pathname: string;
  title: string;
  label?: ReactNode;
  Icon: FC<ComponentProps<'svg'>>;
  IconSelected: FC<ComponentProps<'svg'>>;
  items?: SidebarItem[];
};

export type SidebarProps = {
  items: SidebarItem[];
  smallLogo: ReactNode;
  fullLogo: ReactNode;
};

export const Sidebar: FC<SidebarProps> = ({ items, smallLogo, fullLogo }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(
    window.location.pathname.replace(/^\//, '').replace(/\/$/, '')
  );
  const { sidebarOpen } = useLayoutContext();

  const onLinkClick = (tab: string) => () => {
    setCurrentTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <nav className="p-1 text-black dark:text-white">
      <div
        className="h-full flex-col overflow-hidden transition-all duration-200 ease-in-out data-[open=true]:w-56 data-[open=false]:w-14"
        data-open={sidebarOpen}
      >
        <div className="h-full rounded-lg bg-white p-2 shadow dark:bg-gray-800">
          <div className="mb-2 cursor-pointer p-2 py-3 text-center text-2xl">
            <Link to="/" target="_blank">
              {sidebarOpen ? fullLogo : smallLogo}
            </Link>
          </div>
          <Accordion.Root className="space-y-1" type="multiple">
            {items.map((item) =>
              !item.items ? (
                <SidebarItemComp
                  key={item.pathname}
                  active={currentTab === item.pathname}
                  sidebarOpen={sidebarOpen}
                  onClick={onLinkClick}
                  {...item}
                />
              ) : (
                <SidebarItemGroup
                  key={item.pathname}
                  active={currentTab === item.pathname}
                  currentTab={currentTab}
                  sidebarOpen={sidebarOpen}
                  onClick={onLinkClick}
                  {...item}
                  items={item.items}
                />
              )
            )}
          </Accordion.Root>
        </div>
      </div>
    </nav>
  );
};

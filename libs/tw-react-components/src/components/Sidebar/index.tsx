import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronRightIcon } from 'lucide-react';
import { ComponentProps, FC, ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLayoutContext } from '../../contexts';
import { SidebarItemComp } from './SidebarItem';

export type SidebarItem = {
  pathname: string;
  title: string;
  label?: ReactNode;
  Icon: FC<ComponentProps<'svg'>>;
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
        className="h-full flex-col transition-all duration-200 ease-in-out data-[open=false]:w-16 data-[open=true]:w-56"
        data-open={sidebarOpen}
      >
        <div className="h-full rounded-lg bg-white p-2 shadow dark:bg-slate-800">
          <div className="mb-2 cursor-pointer p-2 py-3 text-center text-2xl">
            <Link to="/" target="_blank">
              {sidebarOpen ? fullLogo : smallLogo}
            </Link>
          </div>
          <Accordion.Root className="overflow-hidden" type="single" collapsible>
            {items.map((item) => (
              <Accordion.Item
                key={item.pathname}
                className={classNames('flex flex-col rounded-md', {
                  'bg-slate-100 dark:bg-slate-900':
                    item.items &&
                    (currentTab === item.pathname ||
                      item.items.some((subItem) => currentTab === subItem.pathname)),
                })}
                value={item.pathname}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="relative w-full p-1 data-[state=open]:[--rotate-chevron:90deg]">
                    <SidebarItemComp
                      {...item}
                      active={currentTab === item.pathname}
                      sidebarOpen={sidebarOpen}
                      onClick={onLinkClick}
                    />

                    {sidebarOpen && item.items && (
                      <ChevronRightIcon className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 rotate-[var(--rotate-chevron,0deg)] transition-transform duration-200" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                {item.items && (
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[slideDown_200ms_ease-out] data-[state=closed]:animate-[slideUp_200ms_ease-out]">
                    <div className="flex flex-col gap-1 p-1">
                      {item.items.map((subItem) => (
                        <SidebarItemComp
                          key={subItem.pathname}
                          {...subItem}
                          isChild
                          active={currentTab === subItem.pathname}
                          sidebarOpen={sidebarOpen}
                          onClick={onLinkClick}
                        />
                      ))}
                    </div>
                  </Accordion.Content>
                )}
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </nav>
  );
};

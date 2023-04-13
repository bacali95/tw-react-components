import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronRightIcon } from 'lucide-react';
import { ComponentProps, FC, ReactNode, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLayoutContext } from '../../contexts';
import { useOutsideClick } from '../../hooks';
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
  const { sidebarOpen, toggleSidebar } = useLayoutContext();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(
    ref,
    () => sidebarOpen && window.document.documentElement.offsetWidth < 768 && toggleSidebar()
  );

  const onLinkClick = (tab: string) => () => {
    setCurrentTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <nav
      className="fixed top-0 left-0 z-50 h-full text-black duration-200 data-[open=false]:-translate-x-full dark:text-white md:relative md:p-1 md:data-[open=false]:translate-x-0"
      data-open={sidebarOpen}
      ref={ref}
    >
      <div
        className="h-full w-56 flex-col transition-all duration-200 ease-in-out md:data-[open=false]:w-16 md:data-[open=true]:w-56"
        data-open={sidebarOpen}
      >
        <div className="h-full bg-white p-2 shadow dark:bg-slate-800 md:rounded-lg">
          <div className="mb-2 cursor-pointer p-2 py-3 text-center text-2xl">
            <Link to="/" target="_blank">
              {sidebarOpen ? fullLogo : smallLogo}
            </Link>
          </div>
          <Accordion.Root className="overflow-hidden" type="single">
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

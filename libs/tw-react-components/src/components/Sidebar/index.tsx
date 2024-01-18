import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronRightIcon, LucideIcon } from 'lucide-react';
import { ReactNode, forwardRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SidebarItemComp } from './SidebarItem';

export type SidebarItem = {
  pathname: string;
  title: string;
  label?: ReactNode;
  Icon: LucideIcon;
  hidden?: boolean;
  items?: SidebarItem[];
};

export type SidebarProps = {
  open?: boolean;
  className?: string;
  items: SidebarItem[];
  basePath?: string;
  smallLogo?: ReactNode;
  fullLogo?: ReactNode;
};

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ open = true, className, items, basePath = '/', smallLogo, fullLogo }, ref) => {
    const location = useLocation();
    const currentTab = useMemo(
      () => location.pathname.replace(basePath, '').replace(/^\//, '').replace(/\/$/, ''),
      [basePath, location.pathname]
    );
    const parentTab = useMemo(
      () =>
        items.find(
          (item) =>
            item.pathname === currentTab ||
            item.items?.some((subItem) => subItem.pathname === currentTab)
        )?.pathname,
      [currentTab, items]
    );

    return (
      <nav
        className={classNames(
          'fixed left-0 top-0 z-50 h-full w-56 flex-col bg-white p-2 text-black shadow transition-all duration-200 ease-in-out md:relative md:rounded-lg dark:bg-slate-800 dark:text-white',
          'data-[open=false]:-translate-x-full md:data-[open=false]:w-16 md:data-[open=true]:w-56 md:data-[open=false]:translate-x-0 ',
          className
        )}
        data-open={open}
        ref={ref}
      >
        {smallLogo && fullLogo && (
          <div className="mb-2 cursor-pointer p-2 py-3 text-center text-2xl">
            <Link to="/" target="_blank">
              {open ? fullLogo : smallLogo}
            </Link>
          </div>
        )}
        <Accordion.Root className="overflow-hidden" type="single" value={parentTab}>
          {items.map((item) =>
            item.hidden ? undefined : (
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
                      basePath={basePath}
                      sidebarOpen={open}
                    />

                    {open && item.items && (
                      <ChevronRightIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-[var(--rotate-chevron,0deg)] transition-transform duration-200" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
                {item.items && (
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_200ms_ease-out] data-[state=open]:animate-[slideDown_200ms_ease-out]">
                    <div className="flex flex-col gap-1 p-1 pt-0">
                      {item.items.map((subItem) =>
                        subItem.hidden ? undefined : (
                          <SidebarItemComp
                            key={subItem.pathname}
                            {...subItem}
                            isChild
                            active={currentTab === subItem.pathname}
                            basePath={basePath}
                            sidebarOpen={open}
                          />
                        )
                      )}
                    </div>
                  </Accordion.Content>
                )}
              </Accordion.Item>
            )
          )}
        </Accordion.Root>
      </nav>
    );
  }
);

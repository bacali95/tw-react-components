import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, LucideIcon } from 'lucide-react';
import { ReactNode, forwardRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useLayoutContext } from '../../contexts';
import { cn } from '../../helpers';
import { Block } from '../Block';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { SidebarItemComp } from './SidebarItem';

export type SidebarSeparator = { type: 'separator'; title?: string };

export type SidebarItem = {
  type?: 'item';
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
  items: (SidebarItem | SidebarSeparator)[];
  basePath?: string;
  smallLogo?: ReactNode;
  fullLogo?: ReactNode;
  footer?: ReactNode;
};

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, items, basePath = '/', smallLogo, fullLogo, footer }, ref) => {
    const location = useLocation();
    const { sidebarOpen, setSidebarOpen } = useLayoutContext();

    const currentPath = useMemo(
      () => location.pathname.replace(basePath, '').replace(/^\/*/, ''),
      [basePath, location.pathname]
    );
    const parentTab = useMemo(
      () =>
        items.filter(isItem).find((item) => isLinkStartsWithPathname(currentPath, item.pathname))
          ?.pathname,
      [currentPath, items]
    );

    const OpenCloseIcon = sidebarOpen ? ChevronsLeftIcon : ChevronsRightIcon;

    return (
      <>
        <div
          className="absolute left-0 top-0 h-full w-full backdrop-blur-sm transition-opacity data-[open=true]:z-50 data-[open=false]:hidden data-[open=false]:opacity-0 data-[open=true]:opacity-100 xl:hidden"
          data-open={sidebarOpen}
        />
        <nav
          className={cn(
            'group/navbar fixed left-0 top-0 z-50 flex h-full w-56 shrink-0 flex-col bg-white p-2 transition-all duration-200 ease-in-out xl:relative dark:bg-slate-900',
            'border-r data-[open=false]:-translate-x-full xl:data-[open=false]:w-16 xl:data-[open=true]:w-72 xl:data-[open=false]:translate-x-0 xl:data-[open=false]:hover:w-72 dark:border-slate-700/80',
            className
          )}
          data-open={sidebarOpen}
          ref={ref}
        >
          {smallLogo && fullLogo && (
            <div className="mb-2 cursor-pointer overflow-hidden whitespace-nowrap p-2 py-3 text-center text-2xl">
              <Link to="/" target="_blank">
                <span className={cn('group-hover/navbar:block', !sidebarOpen && 'hidden')}>
                  {fullLogo}
                </span>
                <span className={cn('group-hover/navbar:hidden', sidebarOpen && 'hidden')}>
                  {smallLogo}
                </span>
              </Link>
            </div>
          )}
          <Accordion.Root className="overflow-hidden" type="single" value={parentTab}>
            {items.map((item, index) =>
              item.type === 'separator' ? (
                !item.title ? (
                  <Block key={index} className="my-2 h-px bg-slate-300 dark:bg-slate-700/80" />
                ) : (
                  <Block
                    key={index}
                    className="mb-2 mt-6 pl-2 text-sm font-bold text-slate-600 group-hover/navbar:block data-[open=false]:hidden dark:text-slate-500"
                    data-open={sidebarOpen}
                  >
                    {item.title}
                  </Block>
                )
              ) : (
                !item.hidden && (
                  <Accordion.Item
                    key={item.pathname}
                    className={cn('flex flex-col rounded-md', {
                      'bg-slate-100 dark:bg-slate-800':
                        item.items && isLinkStartsWithPathname(currentPath, item.pathname),
                    })}
                    value={item.pathname}
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="relative w-full p-0.5 data-[state=open]:[--rotate-chevron:90deg]">
                        <SidebarItemComp
                          {...item}
                          active={
                            isLinkStartsWithPathname(currentPath, item.pathname) &&
                            (!item.items ||
                              item.items.every(
                                (subItem) =>
                                  !isLinkStartsWithPathname(
                                    currentPath,
                                    `${item.pathname}/${subItem.pathname}`
                                  )
                              ))
                          }
                          basePath={basePath}
                          sidebarOpen={sidebarOpen}
                          onClick={item.items?.length ? undefined : () => setSidebarOpen(false)}
                        />

                        {item.items && (
                          <ChevronRightIcon
                            className={cn(
                              'absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-[var(--rotate-chevron,0deg)] transition-transform duration-200',
                              !sidebarOpen && 'invisible',
                              'group-hover/navbar:visible'
                            )}
                          />
                        )}
                      </Accordion.Trigger>
                    </Accordion.Header>
                    {item.items && (
                      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_200ms_ease-out] data-[state=open]:animate-[slideDown_200ms_ease-out]">
                        <div className="flex flex-col gap-1 p-1 pt-0">
                          {item.items.map((subItem) => {
                            const subPathname = `${item.pathname}/${subItem.pathname}`;

                            return (
                              !subItem.hidden && (
                                <SidebarItemComp
                                  key={subPathname}
                                  {...subItem}
                                  pathname={subPathname}
                                  isChild
                                  active={isLinkStartsWithPathname(currentPath, subPathname)}
                                  basePath={basePath}
                                  sidebarOpen={sidebarOpen}
                                  onClick={() => setSidebarOpen(false)}
                                />
                              )
                            );
                          })}
                        </div>
                      </Accordion.Content>
                    )}
                  </Accordion.Item>
                )
              )
            )}
          </Accordion.Root>
          <Flex className="mt-auto" direction="column" fullWidth>
            {footer}
            <Button
              className="invisible w-full justify-center xl:visible"
              prefixIcon={OpenCloseIcon}
              transparent
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </Flex>
        </nav>
      </>
    );
  }
);

function isLinkStartsWithPathname(link: string, pathname: string) {
  return pathname === '' ? link === pathname : link.startsWith(pathname);
}

function isItem(item: SidebarItem | SidebarSeparator): item is SidebarItem {
  return item.type !== 'separator';
}

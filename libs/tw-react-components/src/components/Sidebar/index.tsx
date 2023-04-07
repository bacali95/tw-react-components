import classNames from 'classnames';
import { ComponentProps, FC, ReactNode, useEffect, useState } from 'react';
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
  const { sidebar } = useLayoutContext();
  const [completelyVisible, setCompletelyVisible] = useState(sidebar);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (sidebar) timeout = setTimeout(() => setCompletelyVisible(true), 200);
    else timeout = setTimeout(() => setCompletelyVisible(false), 50);

    return () => timeout && clearTimeout(timeout);
  }, [sidebar]);

  const onLinkClick = (tab: string) => () => {
    setCurrentTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <nav className="p-1 text-black dark:text-white">
      <div
        className={classNames('h-full flex-col transition-all duration-200 ease-in-out', {
          'w-56': sidebar,
          'w-16': !sidebar,
        })}
      >
        <div className="h-full rounded-lg bg-white p-2 shadow dark:bg-gray-800">
          <div className="mb-2 cursor-pointer p-2 py-3 text-center text-2xl">
            <Link to="/" target="_blank">
              {completelyVisible ? fullLogo : smallLogo}
            </Link>
          </div>
          <div className="space-y-1">
            {items.map((item) =>
              !item.items ? (
                <SidebarItemComp
                  key={item.pathname}
                  active={currentTab === item.pathname}
                  completelyVisible={completelyVisible}
                  onClick={onLinkClick}
                  {...item}
                />
              ) : (
                <SidebarItemGroup
                  key={item.pathname}
                  active={currentTab === item.pathname}
                  currentTab={currentTab}
                  completelyVisible={completelyVisible}
                  onClick={onLinkClick}
                  {...item}
                  items={item.items}
                />
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import { ComponentProps, FC, ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLayoutContext } from '../../contexts';
import { Tooltip } from '../Tooltip';

export type SidebarItem = {
  key: string;
  title: string;
  Icon: FC<ComponentProps<'svg'>>;
  IconSelected: FC<ComponentProps<'svg'>>;
  label?: ReactNode;
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

  const ItemWrapper = ({ title, children }: { title: string; children: ReactNode }) =>
    sidebar ? (
      <div>
        <Tooltip className="!z-50" content={title} placement="right">
          {children}
        </Tooltip>
      </div>
    ) : (
      <>{children}</>
    );

  return (
    <nav className="p-1 text-black dark:text-white">
      <div
        className={classNames('h-full flex-col transition-all duration-200 ease-in-out', {
          'w-72': sidebar,
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
            {items.map(({ key, Icon, IconSelected, label, title }) => (
              <ItemWrapper key={key} title={title}>
                <div
                  className={classNames(
                    'flex w-full cursor-pointer items-center rounded-md p-2 font-medium',
                    {
                      'bg-gray-100 dark:bg-gray-900 dark:text-white': currentTab === key,
                      'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700':
                        currentTab !== key,
                      'justify-center': !sidebar,
                    }
                  )}
                  onClick={onLinkClick(key)}
                >
                  {currentTab === key ? (
                    <IconSelected className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                  <div
                    className={classNames({
                      'ml-2': completelyVisible,
                      'invisible h-0 w-0': !completelyVisible,
                    })}
                  >
                    {title}
                    <div className="ml-auto flex items-center space-x-2">{label}</div>
                  </div>
                </div>
              </ItemWrapper>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

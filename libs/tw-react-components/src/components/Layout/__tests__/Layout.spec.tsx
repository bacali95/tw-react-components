import { render, screen } from '@testing-library/react';
import type { FC } from 'react';
import type { NavLinkProps } from 'react-router';

import type { LayoutSidebarProps } from '..';
import { Layout } from '..';
import { SidebarContextProvider } from '../../Sidebar';

// Mock the hooks that the Sidebar component uses
jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useIsMobile: jest.fn().mockReturnValue(false),
}));

const MockNavLink: FC<NavLinkProps> = ({ to, className, children }) => (
  <a href={to.toString()} className={typeof className === 'string' ? className : undefined}>
    {typeof children === 'function'
      ? children({ isActive: false, isPending: false, isTransitioning: false })
      : children}
  </a>
);

const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'default',
});

const renderLayout = (items: LayoutSidebarProps['items']) =>
  render(
    <SidebarContextProvider>
      <Layout sidebarProps={{ items }} NavLink={MockNavLink} useLocation={useLocation}>
        <div>Content</div>
      </Layout>
    </SidebarContextProvider>,
  );

describe('Layout Component', () => {
  it('renders visible items and hides hidden items', () => {
    renderLayout([
      { type: 'item', pathname: 'visible', title: 'Visible Item' },
      { type: 'item', pathname: 'hidden', title: 'Hidden Item', hidden: true },
    ]);

    expect(screen.getByText('Visible Item')).toBeInTheDocument();
    expect(screen.queryByText('Hidden Item')).not.toBeInTheDocument();
  });

  it('renders a group and its visible sub-items, hiding hidden sub-items', () => {
    renderLayout([
      {
        type: 'group',
        title: 'My Group',
        items: [
          { pathname: 'a', title: 'Item A' },
          { pathname: 'b', title: 'Item B', hidden: true },
        ],
      },
    ]);

    expect(screen.getByText('My Group')).toBeInTheDocument();
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.queryByText('Item B')).not.toBeInTheDocument();
  });

  it('renders a group that has at least one visible sub-item even when the group itself is marked hidden', () => {
    renderLayout([
      {
        type: 'group',
        title: 'Hidden Group',
        hidden: true,
        items: [
          { pathname: 'a', title: 'Item A' },
          { pathname: 'b', title: 'Item B', hidden: true },
        ],
      },
    ]);

    expect(screen.getByText('Hidden Group')).toBeInTheDocument();
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.queryByText('Item B')).not.toBeInTheDocument();
  });

  it('hides a group entirely when it is marked hidden and has no visible sub-items', () => {
    renderLayout([
      {
        type: 'group',
        title: 'Fully Hidden Group',
        hidden: true,
        items: [{ pathname: 'a', title: 'Item A', hidden: true }],
      },
    ]);

    expect(screen.queryByText('Fully Hidden Group')).not.toBeInTheDocument();
    expect(screen.queryByText('Item A')).not.toBeInTheDocument();
  });

  it('renders an item that has at least one visible sub-item even when the item itself is marked hidden', () => {
    renderLayout([
      {
        type: 'item',
        pathname: 'parent',
        title: 'Hidden Parent',
        hidden: true,
        items: [
          { pathname: 'a', title: 'Item A' },
          { pathname: 'b', title: 'Item B', hidden: true },
        ],
      },
    ]);

    // Sub-items only mount into the DOM once the collapsible trigger opens,
    // so presence of the (collapsed) parent trigger confirms it wasn't filtered out.
    expect(screen.getByText('Hidden Parent')).toBeInTheDocument();
  });

  it('hides an item entirely when it is marked hidden and has no visible sub-items', () => {
    renderLayout([
      {
        type: 'item',
        pathname: 'parent',
        title: 'Fully Hidden Parent',
        hidden: true,
        items: [{ pathname: 'a', title: 'Item A', hidden: true }],
      },
    ]);

    expect(screen.queryByText('Fully Hidden Parent')).not.toBeInTheDocument();
    expect(screen.queryByText('Item A')).not.toBeInTheDocument();
  });
});

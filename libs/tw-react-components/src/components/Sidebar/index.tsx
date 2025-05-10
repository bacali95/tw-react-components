import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';
import type { CSSProperties, ComponentProps, FC } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn, getValueFromCookie } from '../../helpers';
import { useIsMobile, useOnSwipe } from '../../hooks';
import { Button } from '../Button';
import { BasicInput } from '../Form';
import { Separator } from '../Separator';
import { Sheet } from '../Sheet';
import { Skeleton } from '../Skeleton';
import { Tooltip } from '../Tooltip';

export const SIDEBAR_COOKIE_NAME = 'sidebar:state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContext | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

export type SidebarContextProviderProps = ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const SidebarContextProvider: FC<SidebarContextProviderProps> = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const screenRef = useRef<HTMLElement>(
    typeof document === 'undefined' ? null : document.documentElement,
  );

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(getValueFromCookie<boolean>(SIDEBAR_COOKIE_NAME, defaultOpen));
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === 'function' ? value(open) : value);
      }

      const newValue = typeof value === 'function' ? value(open) : value;

      _setOpen(newValue);

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${newValue}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Add swipe gesture support for opening and closing the sidebar.
  useOnSwipe(screenRef, (direction) =>
    direction === 'right' ? setOpen(true) : direction === 'left' && setOpen(false),
  );

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  const contextValue = useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
SidebarContextProvider.displayName = 'SidebarContextProvider';

export type SidebarProps = ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  dataTestId?: string;
};

const SidebarComp: FC<SidebarProps> = ({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  dataTestId = 'sidebar',
  ...props
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-testid={dataTestId}
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <Sheet.Content
          data-testid={dataTestId}
          data-sidebar="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </Sheet.Content>
      </Sheet>
    );
  }

  return (
    <div
      className="text-sidebar-foreground group peer hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.2))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 pr-0 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.2)_+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className,
        )}
        {...props}
        data-testid={dataTestId}
        data-state={state}
      >
        <div
          data-sidebar="sidebar"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
SidebarComp.displayName = 'Sidebar';

export type SidebarTriggerProps = ComponentProps<typeof Button> & { dataTestId?: string };

const SidebarTrigger: FC<SidebarTriggerProps> = ({
  className,
  onClick,
  dataTestId = 'sidebar-trigger',
  ...props
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-testid={dataTestId}
      data-sidebar="trigger"
      variant="text"
      suffixIcon={PanelLeft}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    />
  );
};
SidebarTrigger.displayName = 'SidebarTrigger';

export type SidebarRailProps = ComponentProps<'button'> & { dataTestId?: string };

const SidebarRail: FC<SidebarRailProps> = ({
  className,
  dataTestId = 'sidebar-rail',
  ...props
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-testid={dataTestId}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  );
};
SidebarRail.displayName = 'SidebarRail';

export type SidebarInsetProps = ComponentProps<'main'> & { dataTestId?: string };

const SidebarInset: FC<SidebarInsetProps> = ({
  className,
  dataTestId = 'sidebar-inset',
  ...props
}) => (
  <main
    data-testid={dataTestId}
    className={cn(
      'bg-background relative flex w-full flex-1 flex-col',
      'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2',
      className,
    )}
    {...props}
  />
);
SidebarInset.displayName = 'SidebarInset';

export type SidebarInputProps = ComponentProps<typeof BasicInput> & { dataTestId?: string };

const SidebarInput: FC<SidebarInputProps> = ({
  className,
  dataTestId = 'sidebar-input',
  ...props
}) => (
  <BasicInput
    dataTestId={dataTestId}
    data-sidebar="input"
    className={cn('focus-visible:ring-sidebar-ring focus-visible:ring-2', className)}
    {...props}
  />
);
SidebarInput.displayName = 'SidebarInput';

export type SidebarHeaderProps = ComponentProps<'div'> & { dataTestId?: string };

const SidebarHeader: FC<SidebarHeaderProps> = ({
  className,
  dataTestId = 'sidebar-header',
  ...props
}) => (
  <div
    data-testid={dataTestId}
    data-sidebar="header"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);
SidebarHeader.displayName = 'SidebarHeader';

export type SidebarFooterProps = ComponentProps<'div'> & { dataTestId?: string };

const SidebarFooter: FC<SidebarFooterProps> = ({
  className,
  dataTestId = 'sidebar-footer',
  ...props
}) => (
  <div
    data-testid={dataTestId}
    data-sidebar="footer"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);
SidebarFooter.displayName = 'SidebarFooter';

export type SidebarSeparatorProps = ComponentProps<typeof Separator> & { dataTestId?: string };

const SidebarSeparator: FC<SidebarSeparatorProps> = ({
  className,
  dataTestId = 'sidebar-separator',
  ...props
}) => (
  <Separator
    dataTestId={dataTestId}
    data-sidebar="separator"
    className={cn('bg-sidebar-border mx-2 w-auto', className)}
    {...props}
  />
);
SidebarSeparator.displayName = 'SidebarSeparator';

export type SidebarContentProps = ComponentProps<'div'> & { dataTestId?: string };

const SidebarContent: FC<SidebarContentProps> = ({
  className,
  dataTestId = 'sidebar-content',
  ...props
}) => (
  <div
    data-testid={dataTestId}
    data-sidebar="content"
    className={cn(
      'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
      className,
    )}
    {...props}
  />
);
SidebarContent.displayName = 'SidebarContent';

export type SidebarGroupProps = ComponentProps<'div'> & { dataTestId?: string };

const SidebarGroup: FC<SidebarGroupProps> = ({
  className,
  dataTestId = 'sidebar-group',
  ...props
}) => (
  <div
    data-testid={dataTestId}
    data-sidebar="group"
    className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
    {...props}
  />
);
SidebarGroup.displayName = 'SidebarGroup';

export type SidebarGroupLabelProps = ComponentProps<'div'> & {
  asChild?: boolean;
  dataTestId?: string;
};

const SidebarGroupLabel: FC<SidebarGroupLabelProps> = ({
  className,
  asChild = false,
  dataTestId = 'sidebar-group-label',
  ...props
}) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-testid={dataTestId}
      data-sidebar="group-label"
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-9 shrink-0 items-center rounded-md px-2 text-sm font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  );
};
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export type SidebarGroupActionProps = ComponentProps<'button'> & {
  asChild?: boolean;
  dataTestId?: string;
};

const SidebarGroupAction: FC<SidebarGroupActionProps> = ({
  className,
  asChild = false,
  dataTestId = 'sidebar-group-action',
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-testid={dataTestId}
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
};
SidebarGroupAction.displayName = 'SidebarGroupAction';

export type SidebarGroupContentProps = ComponentProps<'div'> & { dataTestId?: string };

const SidebarGroupContent: FC<SidebarGroupContentProps> = ({
  className,
  dataTestId = 'sidebar-group-content',
  ...props
}) => (
  <div
    data-testid={dataTestId}
    data-sidebar="group-content"
    className={cn('w-full', className)}
    {...props}
  />
);
SidebarGroupContent.displayName = 'SidebarGroupContent';

export type SidebarMenuProps = ComponentProps<'ul'> & { dataTestId?: string };

const SidebarMenu: FC<SidebarMenuProps> = ({
  className,
  dataTestId = 'sidebar-menu',
  ...props
}) => (
  <ul
    data-testid={dataTestId}
    data-sidebar="menu"
    className={cn('flex w-full min-w-0 flex-col gap-1', className)}
    {...props}
  />
);
SidebarMenu.displayName = 'SidebarMenu';

export type SidebarMenuItemProps = ComponentProps<'li'> & { dataTestId?: string };

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  className,
  dataTestId = 'sidebar-menu-item',
  ...props
}) => (
  <li
    data-testid={dataTestId}
    data-sidebar="menu-item"
    className={cn('group/menu-item relative', className)}
    {...props}
  />
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = cva(
  'cursor-pointer peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'h-9',
        sm: 'h-7 text-sm',
        lg: 'h-12 text-md group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type SidebarMenuButtonProps = ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | ComponentProps<typeof Tooltip>;
  dataTestId?: string;
} & VariantProps<typeof sidebarMenuButtonVariants>;

const SidebarMenuButton: FC<SidebarMenuButtonProps> = ({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  dataTestId = 'sidebar-menu-button',
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-testid={dataTestId}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip || state !== 'collapsed' || isMobile) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      content: tooltip,
    };
  }

  return (
    <Tooltip asChild placement="right" {...tooltip}>
      {button}
    </Tooltip>
  );
};
SidebarMenuButton.displayName = 'SidebarMenuButton';

export type SidebarMenuActionProps = ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
  dataTestId?: string;
};

const SidebarMenuAction: FC<SidebarMenuActionProps> = ({
  className,
  asChild = false,
  showOnHover = false,
  dataTestId = 'sidebar-menu-action',
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-testid={dataTestId}
      data-sidebar="menu-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className,
      )}
      {...props}
    />
  );
};
SidebarMenuAction.displayName = 'SidebarMenuAction';

export type SidebarMenuBadgeProps = ComponentProps<'div'> & { dataTestId?: string };

const SidebarMenuBadge: FC<SidebarMenuBadgeProps> = ({
  className,
  dataTestId = 'sidebar-menu-badge',
  ...props
}) => (
  <div
    data-testid={dataTestId}
    data-sidebar="menu-badge"
    className={cn(
      'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
      'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      className,
    )}
    {...props}
  />
);
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

export type SidebarMenuSkeletonProps = ComponentProps<'div'> & {
  showIcon?: boolean;
  dataTestId?: string;
};

const SidebarMenuSkeleton: FC<SidebarMenuSkeletonProps> = ({
  className,
  showIcon = false,
  dataTestId = 'sidebar-menu-skeleton',
  ...props
}) => {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-testid={dataTestId}
      data-sidebar="menu-skeleton"
      className={cn('flex h-9 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as CSSProperties
        }
      />
    </div>
  );
};
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

export type SidebarMenuSubProps = ComponentProps<'ul'> & { dataTestId?: string };

const SidebarMenuSub: FC<SidebarMenuSubProps> = ({
  className,
  dataTestId = 'sidebar-menu-sub',
  ...props
}) => (
  <ul
    data-testid={dataTestId}
    data-sidebar="menu-sub"
    className={cn(
      'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
      className,
    )}
    {...props}
  />
);
SidebarMenuSub.displayName = 'SidebarMenuSub';

export type SidebarMenuSubItemProps = ComponentProps<'li'> & { dataTestId?: string };

const SidebarMenuSubItem: FC<SidebarMenuSubItemProps> = ({
  dataTestId = 'sidebar-menu-sub-item',
  ...props
}) => <li data-testid={dataTestId} {...props} />;
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

const SidebarMenuSubButton: FC<
  ComponentProps<'button'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
    dataTestId?: string;
  }
> = ({
  asChild = false,
  size = 'md',
  isActive,
  className,
  dataTestId = 'sidebar-menu-sub-button',
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-testid={dataTestId}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-8 w-full min-w-0 -translate-x-px cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-md',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
};
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export const Sidebar = Object.assign(SidebarComp, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Input: SidebarInput,
  Inset: SidebarInset,
  Menu: SidebarMenu,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuButton: SidebarMenuButton,
  MenuItem: SidebarMenuItem,
  MenuSkeleton: SidebarMenuSkeleton,
  MenuSub: SidebarMenuSub,
  MenuSubButton: SidebarMenuSubButton,
  MenuSubItem: SidebarMenuSubItem,
  Rail: SidebarRail,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger,
});

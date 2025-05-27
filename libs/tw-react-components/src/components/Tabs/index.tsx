import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

type TabsProps = ComponentProps<typeof TabsPrimitive.Root> & {
  dataTestId?: string;
};

const $Tabs: FC<TabsProps> = ({ className, dataTestId = 'tabs', ...props }) => (
  <TabsPrimitive.Root
    className={cn('flex flex-col gap-2', className)}
    data-testid={dataTestId}
    {...props}
  />
);
$Tabs.displayName = TabsPrimitive.Root.displayName;

type TabsListProps = ComponentProps<typeof TabsPrimitive.List> & {
  dataTestId?: string;
};

const TabsList: FC<TabsListProps> = ({ className, dataTestId = 'tabs-list', ...props }) => (
  <TabsPrimitive.List
    className={cn(
      'inline-flex w-full items-center justify-center gap-1 rounded-lg border bg-slate-100 p-1 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger> & {
  dataTestId?: string;
};

const TabsTrigger: FC<TabsTriggerProps> = ({
  className,
  dataTestId = 'tabs-trigger',
  ...props
}) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex w-full cursor-pointer items-center justify-center rounded-md px-2 py-1.5 font-medium whitespace-nowrap transition-all hover:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-slate-800',
      'data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content> & {
  dataTestId?: string;
};

const TabsContent: FC<TabsContentProps> = ({ dataTestId = 'tabs-content', ...props }) => (
  <TabsPrimitive.Content data-testid={dataTestId} {...props} />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export const Tabs = Object.assign($Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

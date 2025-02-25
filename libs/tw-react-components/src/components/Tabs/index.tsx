import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

const $Tabs: FC<ComponentProps<typeof TabsPrimitive.Root>> = ({ className, ...props }) => (
  <TabsPrimitive.Root className={cn('flex flex-col gap-2', className)} {...props} />
);
$Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList: FC<ComponentProps<typeof TabsPrimitive.List>> = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn(
      'inline-flex w-full items-center justify-center gap-1 rounded-lg border bg-slate-100 p-1 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500',
      className,
    )}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger: FC<ComponentProps<typeof TabsPrimitive.Trigger>> = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex w-full items-center justify-center whitespace-nowrap rounded-md px-2 py-1.5 font-medium transition-all hover:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-slate-800',
      'data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white',
      className,
    )}
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = TabsPrimitive.Content;

export const Tabs = Object.assign($Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

const $Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={classNames(
      'inline-flex h-9 w-full items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-400 dark:bg-slate-700 ',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={classNames(
      'inline-flex w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-white',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={classNames('mt-2', className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export const Tabs = Object.assign($Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

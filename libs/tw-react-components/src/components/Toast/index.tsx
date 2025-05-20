import * as ToastPrimitives from '@radix-ui/react-toast';
import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import type { ComponentProps, FC, ReactElement } from 'react';

import { cn } from '../../helpers';

const ToastProvider = ToastPrimitives.Provider;

export type ToastViewportProps = ComponentProps<typeof ToastPrimitives.Viewport> & {
  dataTestId?: string;
};

const ToastViewport: FC<ToastViewportProps> = ({
  className,
  dataTestId = 'toast-viewport',
  ...props
}) => (
  <ToastPrimitives.Viewport
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'success group border-success bg-success text-success-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ToastProps = ComponentProps<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants> & {
    dataTestId?: string;
  };

const ToastRoot: FC<ToastProps> = ({ className, variant, dataTestId = 'toast', ...props }) => {
  return (
    <ToastPrimitives.Root
      className={cn(toastVariants({ variant }), className)}
      data-testid={dataTestId}
      {...props}
    />
  );
};
ToastRoot.displayName = ToastPrimitives.Root.displayName;

export type ToastActionProps = ComponentProps<typeof ToastPrimitives.Action> & {
  dataTestId?: string;
};

const ToastAction: FC<ToastActionProps> = ({
  className,
  dataTestId = 'toast-action',
  ...props
}) => (
  <ToastPrimitives.Action
    className={cn(
      'hover:bg-secondary focus:ring-ring inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-md border bg-transparent px-3 font-medium transition-colors focus:ring-1 focus:outline-none disabled:pointer-events-none disabled:opacity-50',
      'group-[.success]:border-muted/40 group-[.success]:hover:border-success/30 group-[.success]:hover:bg-success group-[.success]:hover:text-success-foreground group-[.success]:focus:ring-success',
      'group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
);
ToastAction.displayName = ToastPrimitives.Action.displayName;

export type ToastCloseProps = ComponentProps<typeof ToastPrimitives.Close> & {
  dataTestId?: string;
};

const ToastClose: FC<ToastCloseProps> = ({ className, dataTestId = 'toast-close', ...props }) => (
  <ToastPrimitives.Close
    className={cn(
      'text-foreground/50 hover:text-foreground absolute top-1 right-1 cursor-pointer rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:ring-1 focus:outline-none',
      'group-[.success]:text-green-300 group-[.success]:hover:text-green-50 group-[.success]:focus:ring-green-400 group-[.success]:focus:ring-offset-green-600',
      'group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className,
    )}
    toast-close=""
    data-testid={dataTestId}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
);
ToastClose.displayName = ToastPrimitives.Close.displayName;

export type ToastTitleProps = ComponentProps<typeof ToastPrimitives.Title> & {
  dataTestId?: string;
};

const ToastTitle: FC<ToastTitleProps> = ({ className, dataTestId = 'toast-title', ...props }) => (
  <ToastPrimitives.Title
    className={cn('font-semibold [&+div]:text-sm', className)}
    data-testid={dataTestId}
    {...props}
  />
);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export type ToastDescriptionProps = ComponentProps<typeof ToastPrimitives.Description> & {
  dataTestId?: string;
};

const ToastDescription: FC<ToastDescriptionProps> = ({
  className,
  dataTestId = 'toast-description',
  ...props
}) => (
  <ToastPrimitives.Description
    className={cn('opacity-90', className)}
    data-testid={dataTestId}
    {...props}
  />
);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export type ToastActionElement = ReactElement<typeof ToastAction>;

export const Toast = Object.assign(
  {},
  {
    Provider: ToastProvider,
    Viewport: ToastViewport,
    Root: ToastRoot,
    Title: ToastTitle,
    Description: ToastDescription,
    Close: ToastClose,
    Action: ToastAction,
  },
);

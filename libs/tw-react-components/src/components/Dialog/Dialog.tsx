import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';

import { cn } from '../../helpers';
import { Button } from '../Button';

const $Dialog: FC<ComponentProps<typeof DialogPrimitive.Root>> = (props) => (
  <DialogPrimitive.Root {...props} />
);
$Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay: FC<ComponentProps<typeof DialogPrimitive.Overlay>> = ({
  className,
  ...props
}) => (
  <DialogPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
      className,
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent: FC<
  ComponentProps<typeof DialogPrimitive.Content> & { fullScreen?: boolean }
> = ({ className, fullScreen, children, ...props }) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'fixed left-[50%] top-[50%] z-50 flex max-h-[95dvh] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-lg border p-4 shadow-lg duration-200',
        className,
        fullScreen && 'h-full max-h-none w-full max-w-none rounded-none',
      )}
      aria-describedby="dialog-content"
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        asChild
      >
        <Button prefixIcon={XIcon} size="small" variant="text" />
      </DialogPrimitive.Close>
      <DialogPrimitive.Description className="hidden" />
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle: FC<ComponentProps<typeof DialogPrimitive.Title>> = ({ className, ...props }) => (
  <DialogPrimitive.Title
    className={cn('text-foreground text-lg font-semibold', className)}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription: FC<ComponentProps<typeof DialogPrimitive.Description>> = ({
  className,
  ...props
}) => (
  <DialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export const Dialog = Object.assign($Dialog, {
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Close: DialogClose,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

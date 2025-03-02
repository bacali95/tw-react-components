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

// Adding dataTestId to the Overlay component props
type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay> & {
  dataTestId?: string;
};

const DialogOverlay: FC<DialogOverlayProps> = ({ className, dataTestId, ...props }) => (
  <DialogPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Adding dataTestId to the Content component props
type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  fullScreen?: boolean;
  dataTestId?: string;
};

const DialogContent: FC<DialogContentProps> = ({
  className,
  fullScreen,
  children,
  dataTestId = 'dialog-content',
  ...props
}) => (
  <DialogPortal>
    <DialogOverlay dataTestId={`${dataTestId}-overlay`} />
    <DialogPrimitive.Content
      className={cn(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'fixed left-[50%] top-[50%] z-50 flex max-h-[95dvh] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-lg border p-4 shadow-lg duration-200',
        className,
        fullScreen && 'h-full max-h-none w-full max-w-none rounded-none',
      )}
      aria-describedby="dialog-content"
      data-testid={dataTestId}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        asChild
        data-testid={`${dataTestId}-close-button`}
      >
        <Button prefixIcon={XIcon} size="small" variant="text" />
      </DialogPrimitive.Close>
      <DialogPrimitive.Description className="hidden" />
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Adding dataTestId to the Header component props
type DialogHeaderProps = HTMLAttributes<HTMLDivElement> & {
  dataTestId?: string;
};

const DialogHeader = ({ className, dataTestId = 'dialog-header', ...props }: DialogHeaderProps) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-left', className)}
    data-testid={dataTestId}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

// Adding dataTestId to the Footer component props
type DialogFooterProps = HTMLAttributes<HTMLDivElement> & {
  dataTestId?: string;
};

const DialogFooter = ({ className, dataTestId = 'dialog-footer', ...props }: DialogFooterProps) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    data-testid={dataTestId}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

// Adding dataTestId to the Title component props
type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title> & {
  dataTestId?: string;
};

const DialogTitle: FC<DialogTitleProps> = ({
  className,
  dataTestId = 'dialog-title',
  ...props
}) => (
  <DialogPrimitive.Title
    className={cn('text-foreground text-lg font-semibold', className)}
    data-testid={dataTestId}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Adding dataTestId to the Description component props
type DialogDescriptionProps = ComponentProps<typeof DialogPrimitive.Description> & {
  dataTestId?: string;
};

const DialogDescription: FC<DialogDescriptionProps> = ({
  className,
  dataTestId = 'dialog-description',
  ...props
}) => (
  <DialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    data-testid={dataTestId}
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

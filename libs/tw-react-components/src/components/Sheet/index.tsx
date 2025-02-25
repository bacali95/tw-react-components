import * as SheetPrimitive from '@radix-ui/react-dialog';
import { type VariantProps, cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';

import { cn } from '../../helpers';
import { Button } from '../Button';

const $Sheet: FC<ComponentProps<typeof SheetPrimitive.Root>> = (props) => (
  <SheetPrimitive.Root {...props} />
);
$Sheet.displayName = SheetPrimitive.Root.displayName;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay: FC<ComponentProps<typeof SheetPrimitive.Overlay>> = ({
  className,
  ...props
}) => (
  <SheetPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
      className,
    )}
    {...props}
  />
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed flex flex-col z-50 gap-4 bg-background p-4 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface SheetContentProps
  extends ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent: FC<SheetContentProps> = ({ side = 'right', className, children, ...props }) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <SheetPrimitive.Close
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        asChild
      >
        <Button prefixIcon={XIcon} size="small" variant="text" />
      </SheetPrimitive.Close>
      <SheetPrimitive.Description className="hidden" />
    </SheetPrimitive.Content>
  </SheetPortal>
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle: FC<ComponentProps<typeof SheetPrimitive.Title>> = ({ className, ...props }) => (
  <SheetPrimitive.Title
    className={cn('text-foreground text-lg font-semibold', className)}
    {...props}
  />
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription: FC<ComponentProps<typeof SheetPrimitive.Description>> = ({
  className,
  ...props
}) => (
  <SheetPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export const Sheet = Object.assign($Sheet, {
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription,
});

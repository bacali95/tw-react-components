import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';

import { cn } from '../../helpers';
import { List } from '../List';

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger: FC<
  ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
> = ({ className, inset, children, ...props }) => (
  <DropdownMenuPrimitive.SubTrigger {...props} asChild>
    <List.Item className={className} inset={inset}>
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </List.Item>
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent: FC<ComponentProps<typeof DropdownMenuPrimitive.SubContent>> = ({
  className,
  children,
  ...props
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent {...props} asChild>
      <List className={className}>{children}</List>
    </DropdownMenuPrimitive.SubContent>
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent: FC<ComponentProps<typeof DropdownMenuPrimitive.Content>> = ({
  className,
  children,
  sideOffset = 4,
  ...props
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content sideOffset={sideOffset} {...props} asChild>
      <List className={className}>{children}</List>
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem: FC<
  ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
> = ({ className, inset, children, ...props }) => (
  <DropdownMenuPrimitive.Item {...props} asChild>
    <List.Item inset={inset} className={className}>
      {children}
    </List.Item>
  </DropdownMenuPrimitive.Item>
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem: FC<ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>> = ({
  className,
  children,
  ...props
}) => (
  <DropdownMenuPrimitive.CheckboxItem {...props} asChild>
    <List.Item inset className={className}>
      <DropdownMenuPrimitive.ItemIndicator asChild>
        <List.Indicator icon={CheckIcon} iconClassName="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </List.Item>
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem: FC<ComponentProps<typeof DropdownMenuPrimitive.RadioItem>> = ({
  className,
  children,
  ...props
}) => (
  <DropdownMenuPrimitive.RadioItem {...props} asChild>
    <List.Item inset className={className}>
      <DropdownMenuPrimitive.ItemIndicator asChild>
        <List.Indicator icon={CircleIcon} iconClassName="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </List.Item>
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel: FC<
  ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
> = ({ className, inset, children, ...props }) => (
  <DropdownMenuPrimitive.Label {...props} asChild>
    <List.Label className={className} inset={inset}>
      {children}
    </List.Label>
  </DropdownMenuPrimitive.Label>
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator: FC<ComponentProps<typeof DropdownMenuPrimitive.Separator>> = ({
  className,
  ...props
}) => (
  <DropdownMenuPrimitive.Separator {...props} asChild>
    <List.Separator className={className} />
  </DropdownMenuPrimitive.Separator>
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn('ml-auto text-xs tracking-widest text-slate-500', className)} {...props} />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export const DropdownMenu = Object.assign(DropdownMenuPrimitive.Root, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Icon: List.Icon,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuGroup,
  Portal: DropdownMenuPortal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  RadioGroup: DropdownMenuRadioGroup,
});

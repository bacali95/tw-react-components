import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';

import { cn } from '../../helpers';
import { List } from '../List';

type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.Trigger> & {
  dataTestId?: string;
};

const DropdownMenuTrigger: FC<DropdownMenuTriggerProps> = ({
  children,
  dataTestId = 'dropdown-menu-trigger',
  ...props
}) => (
  <DropdownMenuPrimitive.Trigger data-testid={dataTestId} {...props}>
    {children}
  </DropdownMenuPrimitive.Trigger>
);

type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuPrimitive.Group> & {
  dataTestId?: string;
};

const DropdownMenuGroup: FC<DropdownMenuGroupProps> = ({
  children,
  dataTestId = 'dropdown-menu-group',
  ...props
}) => (
  <DropdownMenuPrimitive.Group data-testid={dataTestId} {...props}>
    {children}
  </DropdownMenuPrimitive.Group>
);

type DropdownMenuPortalProps = ComponentProps<typeof DropdownMenuPrimitive.Portal> & {
  dataTestId?: string;
};

const DropdownMenuPortal: FC<DropdownMenuPortalProps> = ({
  children,
  dataTestId = 'dropdown-menu-portal',
  ...props
}) => <DropdownMenuPrimitive.Portal {...props}>{children}</DropdownMenuPrimitive.Portal>;

type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuPrimitive.Sub> & {
  dataTestId?: string;
};

const DropdownMenuSub: FC<DropdownMenuSubProps> = ({
  children,
  dataTestId = 'dropdown-menu-sub',
  ...props
}) => <DropdownMenuPrimitive.Sub {...props}>{children}</DropdownMenuPrimitive.Sub>;

type DropdownMenuRadioGroupProps = ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> & {
  dataTestId?: string;
};

const DropdownMenuRadioGroup: FC<DropdownMenuRadioGroupProps> = ({
  children,
  dataTestId = 'dropdown-menu-radio-group',
  ...props
}) => (
  <DropdownMenuPrimitive.RadioGroup data-testid={dataTestId} {...props}>
    {children}
  </DropdownMenuPrimitive.RadioGroup>
);

type DropdownMenuSubTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
  dataTestId?: string;
};

const DropdownMenuSubTrigger: FC<DropdownMenuSubTriggerProps> = ({
  className,
  inset,
  children,
  dataTestId = 'dropdown-menu-subtrigger',
  ...props
}) => (
  <DropdownMenuPrimitive.SubTrigger {...props} asChild>
    <List.Item className={className} inset={inset} data-testid={dataTestId}>
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </List.Item>
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuPrimitive.SubContent> & {
  dataTestId?: string;
};

const DropdownMenuSubContent: FC<DropdownMenuSubContentProps> = ({
  className,
  children,
  dataTestId = 'dropdown-menu-subcontent',
  ...props
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent {...props} asChild>
      <List className={className} data-testid={dataTestId}>
        {children}
      </List>
    </DropdownMenuPrimitive.SubContent>
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive.Content> & {
  dataTestId?: string;
};

const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
  className,
  children,
  sideOffset = 4,
  dataTestId = 'dropdown-menu-content',
  ...props
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content sideOffset={sideOffset} {...props} asChild>
      <List className={className} data-testid={dataTestId}>
        {children}
      </List>
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  dataTestId?: string;
};

const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  className,
  inset,
  children,
  dataTestId = 'dropdown-menu-item',
  ...props
}) => (
  <DropdownMenuPrimitive.Item {...props} asChild>
    <List.Item inset={inset} className={className} data-testid={dataTestId}>
      {children}
    </List.Item>
  </DropdownMenuPrimitive.Item>
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

type DropdownMenuCheckboxItemProps = ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  dataTestId?: string;
};

const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({
  className,
  children,
  dataTestId = 'dropdown-menu-checkbox-item',
  ...props
}) => (
  <DropdownMenuPrimitive.CheckboxItem {...props} asChild>
    <List.Item inset className={className} data-testid={dataTestId}>
      <DropdownMenuPrimitive.ItemIndicator asChild>
        <List.Indicator icon={CheckIcon} iconClassName="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </List.Item>
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

type DropdownMenuRadioItemProps = ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  dataTestId?: string;
};

const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({
  className,
  children,
  dataTestId = 'dropdown-menu-radio-item',
  ...props
}) => (
  <DropdownMenuPrimitive.RadioItem {...props} asChild>
    <List.Item inset className={className} data-testid={dataTestId}>
      <DropdownMenuPrimitive.ItemIndicator asChild>
        <List.Indicator icon={CircleIcon} iconClassName="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </List.Item>
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
  dataTestId?: string;
};

const DropdownMenuLabel: FC<DropdownMenuLabelProps> = ({
  className,
  inset,
  children,
  dataTestId = 'dropdown-menu-label',
  ...props
}) => (
  <DropdownMenuPrimitive.Label {...props} asChild>
    <List.Label className={className} inset={inset} data-testid={dataTestId}>
      {children}
    </List.Label>
  </DropdownMenuPrimitive.Label>
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

type DropdownMenuSeparatorProps = ComponentProps<typeof DropdownMenuPrimitive.Separator> & {
  dataTestId?: string;
};

const DropdownMenuSeparator: FC<DropdownMenuSeparatorProps> = ({
  className,
  dataTestId = 'dropdown-menu-separator',
  ...props
}) => (
  <DropdownMenuPrimitive.Separator {...props} asChild>
    <List.Separator className={className} data-testid={dataTestId} />
  </DropdownMenuPrimitive.Separator>
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement> & {
  dataTestId?: string;
};

const DropdownMenuShortcut: FC<DropdownMenuShortcutProps> = ({
  className,
  dataTestId = 'dropdown-menu-shortcut',
  ...props
}) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-slate-500', className)}
      data-testid={dataTestId}
      {...props}
    />
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

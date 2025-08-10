import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

export type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root> & {
  dataTestId?: string;
};

const $Accordion: FC<AccordionProps> = ({ dataTestId = 'accordion', ...props }) => (
  <AccordionPrimitive.Root data-testid={dataTestId} data-slot="accordion" {...props} />
);

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item> & {
  dataTestId?: string;
};

const AccordionItem: FC<AccordionItemProps> = ({
  className,
  dataTestId = 'accordion-item',
  ...props
}) => (
  <AccordionPrimitive.Item
    className={cn('border-b last:border-b-0', className)}
    data-slot="accordion-item"
    data-testid={dataTestId}
    {...props}
  />
);

export type AccordionTriggerProps = ComponentProps<typeof AccordionPrimitive.Trigger> & {
  dataTestId?: string;
};

const AccordionTrigger: FC<AccordionTriggerProps> = ({
  className,
  children,
  dataTestId = 'accordion-trigger',
  ...props
}) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      data-slot="accordion-trigger"
      data-testid={dataTestId}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export type AccordionContentProps = ComponentProps<typeof AccordionPrimitive.Content> & {
  dataTestId?: string;
};

const AccordionContent: FC<AccordionContentProps> = ({
  className,
  children,
  dataTestId = 'accordion-content',
  ...props
}) => (
  <AccordionPrimitive.Content
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    data-slot="accordion-content"
    data-testid={dataTestId}
    {...props}
  >
    <div className={cn('pt-0 pb-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
);

export const Accordion = Object.assign($Accordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

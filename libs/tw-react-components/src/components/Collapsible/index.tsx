import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const $Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export const Collapsible = Object.assign($Collapsible, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});
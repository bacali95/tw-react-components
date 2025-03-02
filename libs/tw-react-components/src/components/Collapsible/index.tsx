import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import type { ComponentProps, FC } from 'react';

type CollapsibleRootProps = ComponentProps<typeof CollapsiblePrimitive.Root> & {
  dataTestId?: string;
};

const CollapsibleRoot: FC<CollapsibleRootProps> = ({ dataTestId = 'collapsible', ...props }) => (
  <CollapsiblePrimitive.Root data-testid={dataTestId} {...props} />
);

type CollapsibleTriggerProps = ComponentProps<typeof CollapsiblePrimitive.Trigger> & {
  dataTestId?: string;
};

const CollapsibleTrigger: FC<CollapsibleTriggerProps> = ({
  dataTestId = 'collapsible-trigger',
  ...props
}) => <CollapsiblePrimitive.Trigger data-testid={dataTestId} {...props} />;

type CollapsibleContentProps = ComponentProps<typeof CollapsiblePrimitive.Content> & {
  dataTestId?: string;
};

const CollapsibleContent: FC<CollapsibleContentProps> = ({
  dataTestId = 'collapsible-content',
  ...props
}) => <CollapsiblePrimitive.Content data-testid={dataTestId} {...props} />;

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});

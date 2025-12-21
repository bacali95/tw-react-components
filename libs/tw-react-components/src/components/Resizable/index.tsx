import { GripVertical } from 'lucide-react';
import type { FC } from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '../../helpers';

export type ResizableGroupProps = React.ComponentProps<typeof ResizablePrimitive.Group> & {
  dataTestId?: string;
};

const ResizableGroup: FC<ResizableGroupProps> = ({ className, dataTestId, ...props }) => (
  <ResizablePrimitive.Group
    className={cn('flex h-full w-full', className)}
    id={dataTestId}
    {...props}
  />
);

export type ResizablePanelProps = React.ComponentProps<typeof ResizablePrimitive.Panel> & {
  dataTestId?: string;
};

const ResizablePanel: FC<ResizablePanelProps> = ({ dataTestId, ...props }) => (
  <ResizablePrimitive.Panel id={dataTestId} {...props} />
);

export type ResizableSeparatorProps = React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean;
  dataTestId?: string;
};

const ResizableSeparator: FC<ResizableSeparatorProps> = ({
  withHandle,
  className,
  dataTestId,
  ...props
}) => (
  <ResizablePrimitive.Separator
    className={cn(
      'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden',
      'aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
      className,
    )}
    id={dataTestId}
    {...props}
  >
    {withHandle && (
      <div
        className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border"
        data-testid={`${dataTestId}-handle`}
      >
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.Separator>
);

export const Resizable = {
  Group: ResizableGroup,
  Panel: ResizablePanel,
  Separator: ResizableSeparator,
};

import { GripVertical } from 'lucide-react';
import type { FC } from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '../../helpers';

export type ResizablePanelGroupProps = React.ComponentProps<
  typeof ResizablePrimitive.PanelGroup
> & { dataTestId?: string };

const ResizablePanelGroup: FC<ResizablePanelGroupProps> = ({
  className,
  dataTestId = 'resizable-panel-group',
  ...props
}) => (
  <ResizablePrimitive.PanelGroup
    className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
    data-testid={dataTestId}
    {...props}
  />
);

export type ResizablePanelProps = React.ComponentProps<typeof ResizablePrimitive.Panel> & {
  dataTestId?: string;
};

const ResizablePanel: FC<ResizablePanelProps> = ({ dataTestId = 'resizable-panel', ...props }) => (
  <ResizablePrimitive.Panel data-testid={dataTestId} {...props} />
);

export type ResizableHandleProps = React.ComponentProps<
  typeof ResizablePrimitive.PanelResizeHandle
> & {
  withHandle?: boolean;
  dataTestId?: string;
};

const ResizableHandle: FC<ResizableHandleProps> = ({
  withHandle,
  className,
  dataTestId = 'resizable-handle',
  ...props
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1',
      'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  >
    {withHandle && (
      <div
        className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border"
        data-testid={`${dataTestId}-handle`}
      >
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export const Resizable = {
  PanelGroup: ResizablePanelGroup,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
};
